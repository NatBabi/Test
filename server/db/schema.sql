-- ITAPS Database Schema
-- IT Asset & Provisioning System

CREATE DATABASE IF NOT EXISTS itaps;
USE itaps;

-- ============================================
-- Users table (IT staff)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(100) NOT NULL,
  role ENUM('intern', 'store_manager', 'helpdesk', 'director', 'vice_director') NOT NULL,
  email VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Students table
-- ============================================
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(20) NOT NULL UNIQUE COMMENT 'School-issued student ID (e.g. STU-9021)',
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  grade INT NOT NULL CHECK (grade BETWEEN 3 AND 8),
  is_new_student BOOLEAN DEFAULT FALSE,
  homeroom VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_grade (grade),
  INDEX idx_student_id (student_id)
);

-- ============================================
-- Devices table
-- ============================================
CREATE TABLE IF NOT EXISTS devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_tag VARCHAR(20) NOT NULL UNIQUE COMMENT 'Engraved tag (e.g. AS-0001)',
  serial_number VARCHAR(50) NOT NULL UNIQUE,
  model VARCHAR(100) NOT NULL,
  device_type ENUM('chromebook', 'ipad', 'laptop') NOT NULL DEFAULT 'chromebook',
  manufacturer VARCHAR(50),
  status ENUM('healthy', 'needs_powerwash', 'damaged', 'in_repair', 'donor', 'decommissioned', 'new_intake') NOT NULL DEFAULT 'new_intake',
  `condition` ENUM('excellent', 'good', 'fair', 'poor', 'parts_only') DEFAULT 'good',
  damage_details JSON COMMENT 'Array of damage types: screen, keyboard, battery, etc.',
  is_new BOOLEAN DEFAULT FALSE COMMENT 'True for freshly purchased devices',
  purchase_date DATE,
  warranty_expiry DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_asset_tag (asset_tag),
  INDEX idx_serial (serial_number),
  INDEX idx_type (device_type)
);

-- ============================================
-- Assignments table (student ↔ device link)
-- ============================================
CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  device_id INT NOT NULL,
  academic_year VARCHAR(9) NOT NULL COMMENT 'e.g. 2025-2026',
  assignment_type ENUM('new', 'returning', 'replacement', 'manual') NOT NULL DEFAULT 'manual',
  assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  returned_date TIMESTAMP NULL,
  is_current BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE RESTRICT,
  INDEX idx_academic_year (academic_year),
  INDEX idx_current (is_current),
  INDEX idx_student (student_id),
  INDEX idx_device (device_id)
);

-- ============================================
-- Repairs table
-- ============================================
CREATE TABLE IF NOT EXISTS repairs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  issue VARCHAR(255) NOT NULL,
  issue_category ENUM('screen', 'keyboard', 'battery', 'motherboard', 'charging_port', 'software', 'other') DEFAULT 'other',
  status ENUM('triage', 'in_progress', 'awaiting_parts', 'completed', 'unrepairable') NOT NULL DEFAULT 'triage',
  assigned_to INT NULL COMMENT 'User ID of intern/tech handling repair',
  resolution_notes TEXT,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE RESTRICT,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_device (device_id)
);

-- ============================================
-- Donor Links table (cannibalization tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS donor_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  repair_id INT NOT NULL,
  donor_device_id INT NOT NULL,
  part_harvested ENUM('screen', 'keyboard', 'battery', 'motherboard', 'charging_port', 'trackpad', 'hinges', 'other') NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (repair_id) REFERENCES repairs(id) ON DELETE CASCADE,
  FOREIGN KEY (donor_device_id) REFERENCES devices(id) ON DELETE RESTRICT,
  INDEX idx_donor (donor_device_id),
  INDEX idx_repair (repair_id)
);

-- ============================================
-- Intake Logs table (triage records)
-- ============================================
CREATE TABLE IF NOT EXISTS intake_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  triaged_by INT NULL,
  previous_status VARCHAR(20),
  new_status VARCHAR(20) NOT NULL,
  `condition` ENUM('healthy', 'minor_damage', 'major_damage', 'needs_powerwash') NOT NULL,
  triage_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE RESTRICT,
  FOREIGN KEY (triaged_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_device (device_id)
);

-- ============================================
-- Import Batches table (CSV import tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS import_batches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  row_count INT NOT NULL DEFAULT 0,
  success_count INT NOT NULL DEFAULT 0,
  error_count INT NOT NULL DEFAULT 0,
  imported_by INT NULL,
  status ENUM('processing', 'completed', 'failed') DEFAULT 'processing',
  error_log JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (imported_by) REFERENCES users(id) ON DELETE SET NULL
);
