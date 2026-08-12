const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/repairs — Active repairs list
router.get('/', async (req, res, next) => {
  try {
    const { status, search, limit = 50, offset = 0 } = req.query;
    let query = `
      SELECT r.*, d.asset_tag, d.serial_number, d.model, d.device_type,
             u.display_name as technician_name
      FROM repairs r
      JOIN devices d ON r.device_id = d.id
      LEFT JOIN users u ON r.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND r.status = ?';
      params.push(status);
    } else {
      query += " AND r.status != 'completed'";
    }

    if (search) {
      query += ' AND (d.asset_tag LIKE ? OR d.serial_number LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY r.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);
    res.json({ repairs: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/repairs/stats — Repair dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const [inRepair] = await pool.query(
      `SELECT COUNT(*) as count FROM repairs WHERE status IN ('in_progress', 'triage')`
    );
    const [awaitingParts] = await pool.query(
      `SELECT COUNT(*) as count FROM repairs WHERE status = 'awaiting_parts'`
    );
    const [donorDevices] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE status = 'donor'`
    );
    const [partsNeeded] = await pool.query(
      `SELECT issue_category, COUNT(*) as count FROM repairs WHERE status = 'awaiting_parts' GROUP BY issue_category`
    );

    res.json({
      inRepair: inRepair[0].count,
      awaitingParts: awaitingParts[0].count,
      donorDevices: donorDevices[0].count,
      partsNeeded: partsNeeded,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/repairs — Log new repair
router.post('/', async (req, res, next) => {
  try {
    const { device_id, issue, issue_category, assigned_to, notes } = req.body;
    if (!device_id || !issue) {
      return res.status(400).json({ error: 'device_id and issue are required' });
    }

    // Update device status to in_repair
    await pool.query(`UPDATE devices SET status = 'in_repair' WHERE id = ?`, [device_id]);

    const [result] = await pool.query(
      `INSERT INTO repairs (device_id, issue, issue_category, status, assigned_to, resolution_notes)
       VALUES (?, ?, ?, 'triage', ?, ?)`,
      [device_id, issue, issue_category || 'other', assigned_to || null, notes || null]
    );

    res.json({ success: true, repair_id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// PUT /api/repairs/:id/complete — Complete repair (auto-marks device Healthy)
router.put('/:id/complete', async (req, res, next) => {
  try {
    const { resolution_notes } = req.body;
    const [repairs] = await pool.query('SELECT * FROM repairs WHERE id = ?', [req.params.id]);
    if (!repairs.length) return res.status(404).json({ error: 'Repair not found' });

    const repair = repairs[0];

    // Mark repair complete
    await pool.query(
      `UPDATE repairs SET status = 'completed', resolution_notes = ?, completed_at = NOW() WHERE id = ?`,
      [resolution_notes || repair.resolution_notes, req.params.id]
    );

    // Auto-mark device as healthy
    await pool.query(
      `UPDATE devices SET status = 'healthy', \`condition\` = 'good' WHERE id = ?`,
      [repair.device_id]
    );

    res.json({ success: true, message: 'Repair completed. Device marked as healthy.' });
  } catch (err) {
    next(err);
  }
});

// PUT /api/repairs/:id/unrepairable — Mark as unrepairable
router.put('/:id/unrepairable', async (req, res, next) => {
  try {
    const [repairs] = await pool.query('SELECT * FROM repairs WHERE id = ?', [req.params.id]);
    if (!repairs.length) return res.status(404).json({ error: 'Repair not found' });

    await pool.query(
      `UPDATE repairs SET status = 'unrepairable', completed_at = NOW() WHERE id = ?`,
      [req.params.id]
    );

    // Mark device as donor (available for parts)
    await pool.query(
      `UPDATE devices SET status = 'donor', \`condition\` = 'parts_only' WHERE id = ?`,
      [repairs[0].device_id]
    );

    res.json({ success: true, message: 'Device marked as unrepairable and available for donor parts.' });
  } catch (err) {
    next(err);
  }
});

// POST /api/repairs/:id/donor — Link donor device (cannibalization)
router.post('/:id/donor', async (req, res, next) => {
  try {
    const { donor_device_id, part_harvested, notes } = req.body;
    if (!donor_device_id || !part_harvested) {
      return res.status(400).json({ error: 'donor_device_id and part_harvested are required' });
    }

    // Verify repair and donor device exist
    const [repairs] = await pool.query('SELECT * FROM repairs WHERE id = ?', [req.params.id]);
    if (!repairs.length) return res.status(404).json({ error: 'Repair not found' });

    const [donorDevices] = await pool.query('SELECT * FROM devices WHERE id = ?', [donor_device_id]);
    if (!donorDevices.length) return res.status(404).json({ error: 'Donor device not found' });

    // Create donor link
    const [result] = await pool.query(
      `INSERT INTO donor_links (repair_id, donor_device_id, part_harvested, notes)
       VALUES (?, ?, ?, ?)`,
      [req.params.id, donor_device_id, part_harvested, notes || null]
    );

    // Degrade donor device status — mark as donor with missing part info
    const existingDamage = donorDevices[0].damage_details ? JSON.parse(donorDevices[0].damage_details) : [];
    existingDamage.push(part_harvested);
    
    await pool.query(
      `UPDATE devices SET status = 'donor', \`condition\` = 'parts_only', damage_details = ?, 
       notes = CONCAT(COALESCE(notes, ''), '\n[Donor] ${part_harvested} harvested for repair #${req.params.id}')
       WHERE id = ?`,
      [JSON.stringify(existingDamage), donor_device_id]
    );

    // Update repair status to in_progress since part is now available
    await pool.query(
      `UPDATE repairs SET status = 'in_progress' WHERE id = ? AND status = 'awaiting_parts'`,
      [req.params.id]
    );

    res.json({
      success: true,
      donor_link_id: result.insertId,
      message: `Part "${part_harvested}" harvested from ${donorDevices[0].asset_tag}. Donor status degraded.`,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/repairs/parts — Harvested parts inventory
router.get('/parts', async (req, res, next) => {
  try {
    const [parts] = await pool.query(
      `SELECT dl.part_harvested, COUNT(*) as available_count,
              GROUP_CONCAT(DISTINCT d.model) as donor_models
       FROM donor_links dl
       JOIN devices d ON dl.donor_device_id = d.id
       GROUP BY dl.part_harvested
       ORDER BY available_count DESC`
    );
    res.json({ parts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
