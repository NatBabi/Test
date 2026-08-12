const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/intake/triage — Submit triage assessment
router.post('/triage', async (req, res, next) => {
  try {
    const { device_id, condition, triage_notes, triaged_by } = req.body;

    if (!device_id || !condition) {
      return res.status(400).json({ error: 'device_id and condition are required' });
    }

    // Get current device status
    const [devices] = await pool.query('SELECT * FROM devices WHERE id = ?', [device_id]);
    if (!devices.length) return res.status(404).json({ error: 'Device not found' });

    const previousStatus = devices[0].status;

    // Map condition to device status
    const statusMap = {
      'healthy': 'healthy',
      'minor_damage': 'in_repair',
      'major_damage': 'in_repair',
      'needs_powerwash': 'needs_powerwash',
    };
    const newStatus = statusMap[condition] || 'new_intake';

    // Update device status
    await pool.query(
      'UPDATE devices SET status = ?, `condition` = ? WHERE id = ?',
      [newStatus, condition === 'healthy' ? 'good' : condition === 'minor_damage' ? 'fair' : 'poor', device_id]
    );

    // Create intake log
    const [result] = await pool.query(
      `INSERT INTO intake_logs (device_id, triaged_by, previous_status, new_status, \`condition\`, triage_notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [device_id, triaged_by || null, previousStatus, newStatus, condition, triage_notes || null]
    );

    // If damaged, auto-create a repair entry
    if (condition === 'minor_damage' || condition === 'major_damage') {
      await pool.query(
        `INSERT INTO repairs (device_id, issue, status, assigned_to)
         VALUES (?, ?, 'triage', ?)`,
        [device_id, `Damage detected during triage: ${triage_notes || 'See intake log'}`, triaged_by || null]
      );
    }

    res.json({
      success: true,
      intake_log_id: result.insertId,
      previous_status: previousStatus,
      new_status: newStatus,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/intake/recent — Recent intake activity feed
router.get('/recent', async (req, res, next) => {
  try {
    const { limit = 20 } = req.query;
    const [logs] = await pool.query(
      `SELECT il.*, d.asset_tag, d.serial_number, d.model,
              u.display_name as triaged_by_name
       FROM intake_logs il
       JOIN devices d ON il.device_id = d.id
       LEFT JOIN users u ON il.triaged_by = u.id
       ORDER BY il.created_at DESC
       LIMIT ?`,
      [parseInt(limit)]
    );
    res.json({ logs });
  } catch (err) {
    next(err);
  }
});

// GET /api/intake/pipeline-stats — Pipeline summary
router.get('/pipeline-stats', async (req, res, next) => {
  try {
    const [triageCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'new_intake'`
    );
    const [repairCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'in_repair'`
    );
    const [powerwashCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'needs_powerwash'`
    );
    const [readyCount] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'healthy'`
    );

    res.json({
      triage: triageCount[0].count,
      repair: repairCount[0].count,
      clean: powerwashCount[0].count,
      ready: readyCount[0].count,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
