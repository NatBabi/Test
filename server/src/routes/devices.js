const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/devices — List all devices with optional filters
router.get('/', async (req, res, next) => {
  try {
    const { status, type, model, search, limit = 50, offset = 0 } = req.query;
    let query = 'SELECT * FROM devices WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (type) {
      query += ' AND device_type = ?';
      params.push(type);
    }
    if (model) {
      query += ' AND model LIKE ?';
      params.push(`%${model}%`);
    }
    if (search) {
      query += ' AND (asset_tag LIKE ? OR serial_number LIKE ? OR model LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY updated_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM devices WHERE 1=1';
    const countParams = [];
    if (status) { countQuery += ' AND status = ?'; countParams.push(status); }
    if (type) { countQuery += ' AND device_type = ?'; countParams.push(type); }
    if (model) { countQuery += ' AND model LIKE ?'; countParams.push(`%${model}%`); }
    if (search) {
      countQuery += ' AND (asset_tag LIKE ? OR serial_number LIKE ? OR model LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({ devices: rows, total: countResult[0].total });
  } catch (err) {
    next(err);
  }
});

// GET /api/devices/stats — Dashboard aggregates
router.get('/stats', async (req, res, next) => {
  try {
    const [statusCounts] = await pool.query(
      `SELECT status, COUNT(*) as count FROM devices GROUP BY status`
    );
    const [typeCounts] = await pool.query(
      `SELECT device_type, COUNT(*) as count FROM devices GROUP BY device_type`
    );
    const [totalDevices] = await pool.query(
      `SELECT COUNT(*) as total FROM devices`
    );
    const [healthyCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'healthy'`
    );
    const [repairCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'in_repair'`
    );
    const [newCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE is_new = TRUE`
    );
    const [donorCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'donor'`
    );
    const [warrantyActive] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE warranty_expiry > NOW()`
    );

    const total = totalDevices[0].total;

    res.json({
      total,
      healthy: healthyCount[0].count,
      inRepair: repairCount[0].count,
      newDevices: newCount[0].count,
      donorDevices: donorCount[0].count,
      warrantyActive: warrantyActive[0].count,
      warrantyPercent: total > 0 ? Math.round((warrantyActive[0].count / total) * 100) : 0,
      byStatus: statusCounts.reduce((acc, row) => { acc[row.status] = row.count; return acc; }, {}),
      byType: typeCounts.reduce((acc, row) => { acc[row.device_type] = row.count; return acc; }, {}),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/devices/search?q=... — Lookup by serial or asset tag
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query required' });

    const [devices] = await pool.query(
      `SELECT d.*, 
        (SELECT JSON_ARRAYAGG(JSON_OBJECT(
          'student_name', CONCAT(s.first_name, ' ', s.last_name),
          'student_id', s.student_id,
          'grade', s.grade,
          'academic_year', a.academic_year,
          'assigned_date', a.assigned_date,
          'returned_date', a.returned_date
        )) FROM assignments a JOIN students s ON a.student_id = s.id WHERE a.device_id = d.id ORDER BY a.assigned_date DESC) as assignment_history
      FROM devices d
      WHERE d.asset_tag LIKE ? OR d.serial_number LIKE ?
      LIMIT 5`,
      [`%${q}%`, `%${q}%`]
    );

    res.json({ devices });
  } catch (err) {
    next(err);
  }
});

// GET /api/devices/:id — Device detail with history
router.get('/:id', async (req, res, next) => {
  try {
    const [devices] = await pool.query(
      `SELECT * FROM devices WHERE id = ?`, [req.params.id]
    );
    if (!devices.length) return res.status(404).json({ error: 'Device not found' });

    const [assignments] = await pool.query(
      `SELECT a.*, s.first_name, s.last_name, s.student_id, s.grade
       FROM assignments a
       JOIN students s ON a.student_id = s.id
       WHERE a.device_id = ?
       ORDER BY a.assigned_date DESC`,
      [req.params.id]
    );

    const [repairs] = await pool.query(
      `SELECT r.*, u.display_name as technician
       FROM repairs r
       LEFT JOIN users u ON r.assigned_to = u.id
       WHERE r.device_id = ?
       ORDER BY r.created_at DESC`,
      [req.params.id]
    );

    const [intakeLogs] = await pool.query(
      `SELECT il.*, u.display_name as triaged_by_name
       FROM intake_logs il
       LEFT JOIN users u ON il.triaged_by = u.id
       WHERE il.device_id = ?
       ORDER BY il.created_at DESC`,
      [req.params.id]
    );

    res.json({
      device: devices[0],
      assignments,
      repairs,
      intakeLogs,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/devices/:id/status — Update device status
router.put('/:id/status', async (req, res, next) => {
  try {
    const { status, condition, damage_details, notes } = req.body;
    const updates = [];
    const params = [];

    if (status) { updates.push('status = ?'); params.push(status); }
    if (condition) { updates.push('`condition` = ?'); params.push(condition); }
    if (damage_details !== undefined) { updates.push('damage_details = ?'); params.push(JSON.stringify(damage_details)); }
    if (notes !== undefined) { updates.push('notes = ?'); params.push(notes); }

    if (!updates.length) return res.status(400).json({ error: 'No fields to update' });

    params.push(req.params.id);
    await pool.query(`UPDATE devices SET ${updates.join(', ')} WHERE id = ?`, params);

    const [updated] = await pool.query('SELECT * FROM devices WHERE id = ?', [req.params.id]);
    res.json({ device: updated[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
