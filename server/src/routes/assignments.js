const express = require('express');
const router = express.Router();
const pool = require('../db');
const assignmentEngine = require('../services/assignmentEngine');

// GET /api/assignments — Current assignments
router.get('/', async (req, res, next) => {
  try {
    const { academic_year, grade, search, limit = 50, offset = 0 } = req.query;
    let query = `
      SELECT a.*, 
        s.first_name, s.last_name, s.student_id, s.grade,
        d.asset_tag, d.serial_number, d.model, d.device_type
      FROM assignments a
      JOIN students s ON a.student_id = s.id
      JOIN devices d ON a.device_id = d.id
      WHERE 1=1
    `;
    const params = [];

    if (academic_year) { query += ' AND a.academic_year = ?'; params.push(academic_year); }
    if (grade) { query += ' AND s.grade = ?'; params.push(parseInt(grade)); }
    if (search) {
      query += ' AND (s.first_name LIKE ? OR s.last_name LIKE ? OR s.student_id LIKE ? OR d.asset_tag LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY s.grade ASC, s.last_name ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(query, params);

    // Count total
    let countQuery = `SELECT COUNT(*) as total FROM assignments a JOIN students s ON a.student_id = s.id JOIN devices d ON a.device_id = d.id WHERE 1=1`;
    const countParams = [];
    if (academic_year) { countQuery += ' AND a.academic_year = ?'; countParams.push(academic_year); }
    if (grade) { countQuery += ' AND s.grade = ?'; countParams.push(parseInt(grade)); }
    const [countResult] = await pool.query(countQuery, countParams);

    res.json({ assignments: rows, total: countResult[0].total });
  } catch (err) {
    next(err);
  }
});

// POST /api/assignments/preview — Dry-run assignment engine
router.post('/preview', async (req, res, next) => {
  try {
    const { academic_year = '2025-2026' } = req.body;
    const result = await assignmentEngine.preview(pool, academic_year);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/assignments/execute — Commit assignments
router.post('/execute', async (req, res, next) => {
  try {
    const { academic_year = '2025-2026', assignments } = req.body;
    if (!assignments || !assignments.length) {
      return res.status(400).json({ error: 'No assignments to execute' });
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      for (const a of assignments) {
        // Create assignment record
        await connection.query(
          `INSERT INTO assignments (student_id, device_id, academic_year, assignment_type, is_current)
           VALUES (?, ?, ?, ?, TRUE)`,
          [a.student_id, a.device_id, academic_year, a.assignment_type]
        );
      }

      await connection.commit();
      res.json({
        success: true,
        assigned_count: assignments.length,
        academic_year,
      });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    next(err);
  }
});

// GET /api/assignments/history/:studentId — Student device history
router.get('/history/:studentId', async (req, res, next) => {
  try {
    const [student] = await pool.query(
      'SELECT * FROM students WHERE student_id = ?', [req.params.studentId]
    );
    if (!student.length) return res.status(404).json({ error: 'Student not found' });

    const [history] = await pool.query(
      `SELECT a.*, d.asset_tag, d.serial_number, d.model, d.device_type, d.status as device_status
       FROM assignments a
       JOIN devices d ON a.device_id = d.id
       WHERE a.student_id = ?
       ORDER BY a.assigned_date DESC`,
      [student[0].id]
    );

    res.json({ student: student[0], history });
  } catch (err) {
    next(err);
  }
});

// GET /api/assignments/rules — Get allocation rules (config)
router.get('/rules', async (req, res, next) => {
  try {
    // Return the current rule configuration
    const rules = [
      {
        id: 1,
        name: 'Priority: New & Grade 3 Students',
        description: 'Grade 3 and new students get assigned from the pool of new devices or healthy Lenovo stock',
        grade_filter: [3],
        include_new_students: true,
        device_pool: 'new_or_lenovo',
        priority: 1,
      },
      {
        id: 2,
        name: 'Returning Students',
        description: 'Returning students (Grades 4-8) get reassigned their exact device from the previous year if healthy',
        grade_filter: [4, 5, 6, 7, 8],
        include_new_students: false,
        device_pool: 'previous_device',
        priority: 2,
      },
      {
        id: 3,
        name: 'Replacement Pool',
        description: 'If a returning student\'s device was cannibalized or broken, assign a healthy recycled device',
        grade_filter: [4, 5, 6, 7, 8],
        include_new_students: false,
        device_pool: 'recycled_healthy',
        priority: 3,
      },
    ];

    // Get available device counts for each pool
    const [newDevices] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE is_new = TRUE AND status = 'healthy'`
    );
    const [lenovoStock] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE manufacturer = 'Lenovo' AND status = 'healthy'`
    );
    const [recycledPool] = await pool.query(
      `SELECT COUNT(*) as count FROM devices WHERE is_new = FALSE AND status = 'healthy'`
    );
    const [totalStudents] = await pool.query(
      `SELECT COUNT(*) as count FROM students WHERE is_active = TRUE`
    );

    res.json({
      rules,
      pools: {
        new_devices: newDevices[0].count,
        lenovo_stock: lenovoStock[0].count,
        recycled_healthy: recycledPool[0].count,
      },
      total_students: totalStudents[0].count,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
