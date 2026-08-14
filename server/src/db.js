const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = path.join(__dirname, '..', 'db', 'itaps.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better concurrent reads
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/**
 * Wraps better-sqlite3 in a mysql2/promise-compatible interface
 * so the existing route code works unchanged.
 *
 * pool.query(sql, params)  →  returns [[rows], fields]   for SELECT
 *                          →  returns [{ insertId, affectedRows, ... }]  for INSERT/UPDATE/DELETE
 */
const pool = {
  query(sql, params = []) {
    // Normalize MySQL placeholders — better-sqlite3 uses ? natively, same as mysql2
    // Handle MySQL-specific functions
    sql = sql.replace(/NOW\(\)/gi, "datetime('now')");
    sql = sql.replace(/JSON_ARRAYAGG\(/gi, 'json_group_array(');
    sql = sql.replace(/JSON_OBJECT\(/gi, 'json_object(');
    sql = sql.replace(/GROUP_CONCAT\(DISTINCT\s+/gi, 'group_concat(DISTINCT ');
    sql = sql.replace(/CAST\(SUBSTRING\((\w+),\s*(\d+)\)\s*AS\s*UNSIGNED\)/gi, 'CAST(substr($1, $2) AS INTEGER)');
    sql = sql.replace(/CONCAT\(/gi, '(');  // SQLite uses || for concat but CONCAT() also works in newer versions
    // Fix CONCAT to use || operator
    sql = sql.replace(/CONCAT\(COALESCE\(notes,\s*''\),\s*'([^']*)'\)/gi, "COALESCE(notes, '') || '$1'");

    const trimmed = sql.trim().toUpperCase();
    const isSelect = trimmed.startsWith('SELECT') || trimmed.startsWith('WITH');

    try {
      if (isSelect) {
        const stmt = db.prepare(sql);
        const rows = params.length ? stmt.all(...params) : stmt.all();
        return [rows, []]; // [rows, fields] like mysql2
      } else {
        const stmt = db.prepare(sql);
        const result = params.length ? stmt.run(...params) : stmt.run();
        return [{ insertId: result.lastInsertRowid, affectedRows: result.changes }, undefined];
      }
    } catch (err) {
      console.error('DB Error:', err.message);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw err;
    }
  },

  async getConnection() {
    // Simulate a connection for transaction support
    return {
      beginTransaction() { db.exec('BEGIN TRANSACTION'); },
      query(sql, params) { return pool.query(sql, params); },
      commit() { db.exec('COMMIT'); },
      rollback() { db.exec('ROLLBACK'); },
      release() { /* no-op for SQLite */ },
    };
  },
};

module.exports = pool;
