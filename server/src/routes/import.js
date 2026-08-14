const express = require('express');
const router = express.Router();
const multer = require('multer');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');
const pool = require('../db');

// Configure multer for CSV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// POST /api/import/csv — Bulk CSV upload
router.post('/csv', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    const csvContent = fs.readFileSync(req.file.path, 'utf-8');
    const parsed = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, '_'),
    });

    if (parsed.errors.length) {
      return res.status(400).json({
        error: 'CSV parsing errors',
        details: parsed.errors.slice(0, 10),
      });
    }

    const rows = parsed.data;
    const importedBy = req.body.imported_by || null;

    // Create import batch record
    const [batchResult] = await pool.query(
      `INSERT INTO import_batches (filename, row_count, imported_by, status) VALUES (?, ?, ?, 'processing')`,
      [req.file.originalname, rows.length, importedBy]
    );
    const batchId = batchResult.insertId;

    // Get the current max asset tag number
    const [maxTag] = await pool.query(
      `SELECT asset_tag FROM devices WHERE asset_tag LIKE 'AS-%' ORDER BY CAST(substr(asset_tag, 4) AS INTEGER) DESC LIMIT 1`
    );
    let nextTagNum = 1;
    if (maxTag.length) {
      const match = maxTag[0].asset_tag.match(/AS-(\d+)/);
      if (match) nextTagNum = parseInt(match[1]) + 1;
    }

    let successCount = 0;
    let errorCount = 0;
    const errors = [];
    const generatedTags = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        // Expected CSV columns: serial_number, model, device_type, manufacturer, purchase_date
        const serialNumber = row.serial_number || row.serial || row.sn;
        const model = row.model || row.device_model;
        const deviceType = row.device_type || row.type || 'chromebook';
        const manufacturer = row.manufacturer || row.brand || 'Dell';
        const purchaseDate = row.purchase_date || row.date || null;
        const warrantyExpiry = row.warranty_expiry || row.warranty || null;

        if (!serialNumber) {
          errorCount++;
          errors.push({ row: i + 1, error: 'Missing serial number' });
          continue;
        }

        const assetTag = `AS-${String(nextTagNum).padStart(4, '0')}`;
        nextTagNum++;

        await pool.query(
          `INSERT INTO devices (asset_tag, serial_number, model, device_type, manufacturer, status, \`condition\`, is_new, purchase_date, warranty_expiry)
           VALUES (?, ?, ?, ?, ?, 'healthy', 'excellent', TRUE, ?, ?)`,
          [assetTag, serialNumber, model || 'Unknown', deviceType, manufacturer, purchaseDate, warrantyExpiry]
        );

        generatedTags.push({ row: i + 1, serial_number: serialNumber, asset_tag: assetTag });
        successCount++;
      } catch (err) {
        errorCount++;
        errors.push({ row: i + 1, error: err.message });
      }
    }

    // Update batch record
    await pool.query(
      `UPDATE import_batches SET success_count = ?, error_count = ?, status = 'completed', error_log = ? WHERE id = ?`,
      [successCount, errorCount, errors.length ? JSON.stringify(errors) : null, batchId]
    );

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      batch_id: batchId,
      total_rows: rows.length,
      success_count: successCount,
      error_count: errorCount,
      generated_tags: generatedTags,
      errors: errors.slice(0, 10),
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/import/history — Import batch logs
router.get('/history', async (req, res, next) => {
  try {
    const [batches] = await pool.query(
      `SELECT ib.*, u.display_name as imported_by_name
       FROM import_batches ib
       LEFT JOIN users u ON ib.imported_by = u.id
       ORDER BY ib.created_at DESC
       LIMIT 20`
    );
    res.json({ batches });
  } catch (err) {
    next(err);
  }
});

// GET /api/import/tags/:batchId — Get generated tags for a batch (for printing)
router.get('/tags/:batchId', async (req, res, next) => {
  try {
    const [batch] = await pool.query('SELECT * FROM import_batches WHERE id = ?', [req.params.batchId]);
    if (!batch.length) return res.status(404).json({ error: 'Batch not found' });

    // Get devices imported in this batch's timeframe
    const [devices] = await pool.query(
      `SELECT asset_tag, serial_number, model, manufacturer 
       FROM devices 
       WHERE is_new = TRUE AND created_at >= ? 
       ORDER BY asset_tag ASC`,
      [batch[0].created_at]
    );

    res.json({ batch: batch[0], devices });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
