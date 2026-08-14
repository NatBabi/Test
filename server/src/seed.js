/**
 * ITAPS SQLite Seed Script
 * Creates tables and inserts seed data into itaps.sqlite
 */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'itaps.sqlite');

// Delete existing DB to start fresh
const fs = require('fs');
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

console.log('Creating ITAPS SQLite database...\n');

// ============================================
// Schema
// ============================================
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('intern','store_manager','helpdesk','director','vice_director')),
  email TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  grade INTEGER NOT NULL CHECK (grade BETWEEN 3 AND 8),
  is_new_student INTEGER DEFAULT 0,
  homeroom TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS devices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  asset_tag TEXT NOT NULL UNIQUE,
  serial_number TEXT NOT NULL UNIQUE,
  model TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT 'chromebook' CHECK (device_type IN ('chromebook','ipad','laptop')),
  manufacturer TEXT,
  status TEXT NOT NULL DEFAULT 'new_intake' CHECK (status IN ('healthy','needs_powerwash','damaged','in_repair','donor','decommissioned','new_intake')),
  condition TEXT DEFAULT 'good' CHECK (condition IN ('excellent','good','fair','poor','parts_only')),
  damage_details TEXT,
  is_new INTEGER DEFAULT 0,
  purchase_date TEXT,
  warranty_expiry TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  device_id INTEGER NOT NULL,
  academic_year TEXT NOT NULL,
  assignment_type TEXT NOT NULL DEFAULT 'manual' CHECK (assignment_type IN ('new','returning','replacement','manual')),
  assigned_date TEXT DEFAULT (datetime('now')),
  returned_date TEXT,
  is_current INTEGER DEFAULT 1,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (device_id) REFERENCES devices(id)
);

CREATE TABLE IF NOT EXISTS repairs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id INTEGER NOT NULL,
  issue TEXT NOT NULL,
  issue_category TEXT DEFAULT 'other' CHECK (issue_category IN ('screen','keyboard','battery','motherboard','charging_port','software','other')),
  status TEXT NOT NULL DEFAULT 'triage' CHECK (status IN ('triage','in_progress','awaiting_parts','completed','unrepairable')),
  assigned_to INTEGER,
  resolution_notes TEXT,
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (device_id) REFERENCES devices(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS donor_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repair_id INTEGER NOT NULL,
  donor_device_id INTEGER NOT NULL,
  part_harvested TEXT NOT NULL CHECK (part_harvested IN ('screen','keyboard','battery','motherboard','charging_port','trackpad','hinges','other')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (repair_id) REFERENCES repairs(id) ON DELETE CASCADE,
  FOREIGN KEY (donor_device_id) REFERENCES devices(id)
);

CREATE TABLE IF NOT EXISTS intake_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id INTEGER NOT NULL,
  triaged_by INTEGER,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('healthy','minor_damage','major_damage','needs_powerwash')),
  triage_notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (device_id) REFERENCES devices(id),
  FOREIGN KEY (triaged_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS import_batches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  row_count INTEGER NOT NULL DEFAULT 0,
  success_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  imported_by INTEGER,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing','completed','failed')),
  error_log TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (imported_by) REFERENCES users(id)
);
`);
console.log('✅ Tables created');

// ============================================
// Seed: Users
// ============================================
const insertUser = db.prepare('INSERT INTO users (username, display_name, role, email) VALUES (?, ?, ?, ?)');
const users = [
  ['director_k', 'Karen Mitchell', 'director', 'k.mitchell@school.edu'],
  ['vice_dir_r', 'Roberto Vega', 'vice_director', 'r.vega@school.edu'],
  ['store_mgr', 'Linda Park', 'store_manager', 'l.park@school.edu'],
  ['helpdesk_a', 'Alex Turner', 'helpdesk', 'a.turner@school.edu'],
  ['helpdesk_b', 'Maria Santos', 'helpdesk', 'm.santos@school.edu'],
  ['helpdesk_c', 'James Wu', 'helpdesk', 'j.wu@school.edu'],
  ['helpdesk_d', 'Priya Nair', 'helpdesk', 'p.nair@school.edu'],
  ['intern_01', 'Intern A.', 'intern', 'intern.a@school.edu'],
  ['intern_02', 'Intern B.', 'intern', 'intern.b@school.edu'],
  ['intern_03', 'Intern C.', 'intern', 'intern.c@school.edu'],
];
const insertUsers = db.transaction(() => { for (const u of users) insertUser.run(...u); });
insertUsers();
console.log(`✅ ${users.length} users seeded`);

// ============================================
// Seed: Students
// ============================================
const insertStudent = db.prepare('INSERT INTO students (student_id, first_name, last_name, grade, is_new_student, homeroom) VALUES (?, ?, ?, ?, ?, ?)');
const students = [
  ['STU-9021', 'Alice', 'Johnson', 3, 1, 'Room 101'],
  ['STU-8834', 'Brian', 'Smith', 3, 1, 'Room 101'],
  ['STU-7112', 'Carlos', 'Davis', 5, 0, 'Room 203'],
  ['STU-7115', 'Diana', 'Evans', 6, 0, 'Room 204'],
  ['STU-6230', 'Emily', 'Wilson', 4, 0, 'Room 102'],
  ['STU-6231', 'Frank', 'Garcia', 4, 0, 'Room 102'],
  ['STU-5540', 'Grace', 'Lee', 7, 0, 'Room 301'],
  ['STU-5541', 'Henry', 'Brown', 7, 0, 'Room 301'],
  ['STU-4012', 'Isla', 'Martinez', 8, 0, 'Room 302'],
  ['STU-4013', 'Jack', 'Taylor', 8, 0, 'Room 302'],
  ['STU-3301', 'Katie', 'Anderson', 5, 0, 'Room 203'],
  ['STU-3302', 'Liam', 'Thomas', 5, 0, 'Room 203'],
  ['STU-2240', 'Mia', 'Jackson', 6, 0, 'Room 204'],
  ['STU-2241', 'Noah', 'White', 6, 0, 'Room 204'],
  ['STU-1150', 'Olivia', 'Harris', 3, 1, 'Room 101'],
  ['STU-1151', 'Peter', 'Clark', 3, 1, 'Room 101'],
  ['STU-9900', 'Quinn', 'Lewis', 4, 0, 'Room 102'],
  ['STU-9901', 'Rachel', 'Walker', 4, 0, 'Room 102'],
  ['STU-8800', 'Samuel', 'Young', 7, 0, 'Room 301'],
  ['STU-8801', 'Tara', 'King', 7, 0, 'Room 301'],
  ['STU-7700', 'Umar', 'Wright', 8, 0, 'Room 302'],
  ['STU-7701', 'Violet', 'Scott', 8, 0, 'Room 302'],
  ['STU-6600', 'Will', 'Green', 5, 0, 'Room 203'],
  ['STU-6601', 'Xena', 'Adams', 5, 0, 'Room 203'],
  ['STU-5500', 'Yusuf', 'Baker', 6, 0, 'Room 204'],
  ['STU-5501', 'Zara', 'Nelson', 6, 0, 'Room 204'],
  ['STU-4400', 'Aaron', 'Carter', 3, 1, 'Room 101'],
  ['STU-4401', 'Bella', 'Reed', 3, 1, 'Room 101'],
  ['STU-3300', 'Chris', 'Cook', 4, 0, 'Room 102'],
  ['STU-3301B', 'Dana', 'Morgan', 4, 0, 'Room 102'],
  ['STU-2200', 'Ethan', 'Bell', 7, 0, 'Room 301'],
  ['STU-2201', 'Fiona', 'Murphy', 7, 0, 'Room 301'],
  ['STU-1100', 'George', 'Rivera', 8, 0, 'Room 302'],
  ['STU-1101', 'Hannah', 'Cooper', 8, 0, 'Room 302'],
  ['STU-0900', 'Ivan', 'Richardson', 5, 0, 'Room 203'],
  ['STU-0901', 'Julia', 'Cox', 5, 0, 'Room 203'],
  ['STU-0800', 'Kevin', 'Howard', 6, 0, 'Room 204'],
  ['STU-0801', 'Luna', 'Ward', 6, 0, 'Room 204'],
  ['STU-0700', 'Mason', 'Torres', 3, 1, 'Room 101'],
  ['STU-0701', 'Nina', 'Peterson', 3, 1, 'Room 101'],
  ['STU-0600', 'Oscar', 'Gray', 4, 0, 'Room 102'],
  ['STU-0601', 'Paula', 'Ramirez', 4, 0, 'Room 102'],
  ['STU-0500', 'Raj', 'Patel', 7, 0, 'Room 301'],
  ['STU-0501', 'Sara', 'James', 7, 0, 'Room 301'],
  ['STU-0400', 'Tom', 'Watson', 8, 0, 'Room 302'],
  ['STU-0401', 'Uma', 'Brooks', 8, 0, 'Room 302'],
  ['STU-0300', 'Victor', 'Kelly', 5, 0, 'Room 203'],
  ['STU-0301', 'Wendy', 'Sanders', 5, 0, 'Room 203'],
  ['STU-0200', 'Xavier', 'Price', 6, 0, 'Room 204'],
  ['STU-0201', 'Yolanda', 'Bennett', 6, 0, 'Room 204'],
];
const insertStudents = db.transaction(() => { for (const s of students) insertStudent.run(...s); });
insertStudents();
console.log(`✅ ${students.length} students seeded`);

// ============================================
// Seed: Devices
// ============================================
const insertDevice = db.prepare(`INSERT INTO devices (asset_tag, serial_number, model, device_type, manufacturer, status, condition, is_new, purchase_date, warranty_expiry, damage_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const devices = [
  // New Dell Chromebooks
  ['AS-0001','5CD918274X','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0002','5CD918275Y','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0003','5CD918276Z','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0004','5CD918277A','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0005','5CD918278B','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0006','5CD918279C','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0007','5CD918280D','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0008','5CD918281E','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0009','5CD918282F','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0010','5CD918283G','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0011','5CD918284H','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0012','5CD918285I','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0013','5CD918286J','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0014','5CD918287K','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  ['AS-0015','5CD918288L','Chromebook 3100','chromebook','Dell','healthy','excellent',1,'2025-07-01','2028-07-01',null],
  // Lenovo healthy stock
  ['AS-1001','LNV20220001','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2022-08-15','2025-08-15',null],
  ['AS-1002','LNV20220002','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2022-08-15','2025-08-15',null],
  ['AS-1003','LNV20220003','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2022-08-15','2025-08-15',null],
  ['AS-1004','LNV20220004','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2022-08-15','2025-08-15',null],
  ['AS-1005','LNV20220005','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2022-08-15','2025-08-15',null],
  ['AS-1006','LNV20220006','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','fair',0,'2022-08-15','2025-08-15',null],
  ['AS-1007','LNV20220007','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','fair',0,'2022-08-15','2025-08-15',null],
  ['AS-1008','LNV20220008','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','fair',0,'2022-08-15','2025-08-15',null],
  // Older Dell mixed
  ['AS-2001','DL20200101','Chromebook 3100','chromebook','Dell','healthy','fair',0,'2020-09-01','2023-09-01',null],
  ['AS-2002','DL20200102','Chromebook 3100','chromebook','Dell','healthy','fair',0,'2020-09-01','2023-09-01',null],
  ['AS-2003','DL20200103','Chromebook 3100','chromebook','Dell','needs_powerwash','fair',0,'2020-09-01','2023-09-01',null],
  ['AS-2004','DL20200104','Chromebook 3100','chromebook','Dell','needs_powerwash','fair',0,'2020-09-01','2023-09-01',null],
  // Damaged
  ['AS-9921','DL20210201','Chromebook 3100','chromebook','Dell','in_repair','poor',0,'2021-01-10','2024-01-10','["screen"]'],
  ['AS-9844','APL20210301','iPad 9th Gen','ipad','Apple','in_repair','poor',0,'2021-03-15','2024-03-15','["battery"]'],
  ['AS-1022','LNV20210401','ThinkPad T14','laptop','Lenovo','in_repair','fair',0,'2021-04-20','2024-04-20','["keyboard"]'],
  ['AS-8830','DL20210501','Chromebook 3100','chromebook','Dell','in_repair','poor',0,'2021-05-05','2024-05-05','["battery","motherboard"]'],
  // Donors
  ['AS-5001','DL20190601','Chromebook 3100','chromebook','Dell','donor','parts_only',0,'2019-06-01','2022-06-01','["screen"]'],
  ['AS-5002','DL20190602','Chromebook 3100','chromebook','Dell','donor','parts_only',0,'2019-06-01','2022-06-01','["keyboard","battery"]'],
  ['AS-5003','APL20190701','iPad 9th Gen','ipad','Apple','donor','parts_only',0,'2019-07-01','2022-07-01','["screen"]'],
  ['AS-5004','LNV20190801','ThinkPad T14','laptop','Lenovo','donor','parts_only',0,'2019-08-01','2022-08-01','["motherboard"]'],
  // iPads healthy
  ['AS-3001','APL20230101','iPad 10th Gen','ipad','Apple','healthy','excellent',1,'2023-01-15','2026-01-15',null],
  ['AS-3002','APL20230102','iPad 10th Gen','ipad','Apple','healthy','excellent',1,'2023-01-15','2026-01-15',null],
  ['AS-3003','APL20230103','iPad 10th Gen','ipad','Apple','healthy','good',0,'2022-01-15','2025-01-15',null],
  ['AS-3004','APL20230104','iPad 10th Gen','ipad','Apple','healthy','good',0,'2022-01-15','2025-01-15',null],
  // Decommissioned
  ['AS-9001','DL20170901','Chromebook 3100','chromebook','Dell','decommissioned','parts_only',0,'2017-09-01','2020-09-01',null],
  ['AS-9002','DL20170902','Chromebook 3100','chromebook','Dell','decommissioned','parts_only',0,'2017-09-01','2020-09-01',null],
  // New intake
  ['AS-7001','DL20250801','Chromebook 3100','chromebook','Dell','new_intake','good',0,'2025-08-01','2028-08-01',null],
  ['AS-7002','DL20250802','Chromebook 3100','chromebook','Dell','new_intake','good',0,'2025-08-01','2028-08-01',null],
  ['AS-7003','DL20250803','Chromebook 3100','chromebook','Dell','new_intake','good',0,'2025-08-01','2028-08-01',null],
  // Recycled healthy
  ['AS-6001','DL20210601R','Chromebook 3100','chromebook','Dell','healthy','good',0,'2021-06-01','2024-06-01',null],
  ['AS-6002','DL20210602R','Chromebook 3100','chromebook','Dell','healthy','good',0,'2021-06-01','2024-06-01',null],
  ['AS-6003','DL20210603R','Chromebook 3100','chromebook','Dell','healthy','fair',0,'2021-06-01','2024-06-01',null],
  ['AS-6004','LNV20210604R','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2021-06-01','2024-06-01',null],
  ['AS-6005','LNV20210605R','ThinkPad C13 Yoga','chromebook','Lenovo','healthy','good',0,'2021-06-01','2024-06-01',null],
];
const insertDevices = db.transaction(() => { for (const d of devices) insertDevice.run(...d); });
insertDevices();
console.log(`✅ ${devices.length} devices seeded`);

// Helper to get IDs by lookup
const getStudentId = (sid) => db.prepare('SELECT id FROM students WHERE student_id = ?').get(sid)?.id;
const getDeviceId = (tag) => db.prepare('SELECT id FROM devices WHERE asset_tag = ?').get(tag)?.id;
const getUserId = (uname) => db.prepare('SELECT id FROM users WHERE username = ?').get(uname)?.id;

// ============================================
// Seed: Assignments (previous year)
// ============================================
const insertAssignment = db.prepare('INSERT INTO assignments (student_id, device_id, academic_year, assignment_type, assigned_date, returned_date, is_current) VALUES (?, ?, ?, ?, ?, ?, ?)');
const assignmentData = [
  ['STU-7112','AS-1001','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-7115','AS-1002','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-6230','AS-1003','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-6231','AS-1004','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-5540','AS-2001','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-5541','AS-2002','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-4012','AS-6001','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-4013','AS-6002','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-3301','AS-5001','2024-2025','returning','2024-09-01','2025-06-15',0],
  ['STU-3302','AS-5002','2024-2025','returning','2024-09-01','2025-06-15',0],
];
const insertAssignments = db.transaction(() => {
  for (const [sid, tag, year, type, assigned, returned, current] of assignmentData) {
    insertAssignment.run(getStudentId(sid), getDeviceId(tag), year, type, assigned, returned, current);
  }
});
insertAssignments();
console.log(`✅ ${assignmentData.length} assignments seeded`);

// ============================================
// Seed: Repairs
// ============================================
const insertRepair = db.prepare('INSERT INTO repairs (device_id, issue, issue_category, status, assigned_to, resolution_notes) VALUES (?, ?, ?, ?, ?, ?)');
const repairData = [
  ['AS-9921','Cracked Screen','screen','in_progress','intern_01',null],
  ['AS-9844','Battery Depleted','battery','awaiting_parts','intern_02',null],
  ['AS-1022','Missing Keys (A,S,D)','keyboard','triage','intern_01',null],
  ['AS-8830',"Won't Power On",'battery','awaiting_parts','intern_03','Suspected battery + motherboard failure'],
];
const insertRepairs = db.transaction(() => {
  for (const [tag, issue, cat, status, tech, notes] of repairData) {
    insertRepair.run(getDeviceId(tag), issue, cat, status, getUserId(tech), notes);
  }
});
insertRepairs();
console.log(`✅ ${repairData.length} repairs seeded`);

// ============================================
// Seed: Donor Links
// ============================================
const insertDonor = db.prepare('INSERT INTO donor_links (repair_id, donor_device_id, part_harvested, notes) VALUES (?, ?, ?, ?)');
insertDonor.run(1, getDeviceId('AS-5001'), 'screen', 'Screen harvested from decommissioned unit');
insertDonor.run(2, getDeviceId('AS-5003'), 'battery', 'iPad battery transplant');
console.log('✅ 2 donor links seeded');

// ============================================
// Seed: Intake Logs
// ============================================
const insertIntake = db.prepare('INSERT INTO intake_logs (device_id, triaged_by, previous_status, new_status, condition, triage_notes) VALUES (?, ?, ?, ?, ?, ?)');
insertIntake.run(getDeviceId('AS-7001'), getUserId('intern_01'), 'new_intake', 'healthy', 'healthy', 'Device in good condition, ready for assignment');
insertIntake.run(getDeviceId('AS-7002'), getUserId('intern_02'), 'new_intake', 'needs_powerwash', 'needs_powerwash', 'Previous student profile still on device');
insertIntake.run(getDeviceId('AS-9921'), getUserId('intern_01'), 'new_intake', 'in_repair', 'major_damage', 'Screen completely shattered, bezel intact');
console.log('✅ 3 intake logs seeded');

// ============================================
// Seed: Import Batches
// ============================================
const insertBatch = db.prepare('INSERT INTO import_batches (filename, row_count, success_count, error_count, imported_by, status) VALUES (?, ?, ?, ?, ?, ?)');
insertBatch.run('Dell_Chromebook_3100_Summer2025.csv', 15, 15, 0, getUserId('store_mgr'), 'completed');
console.log('✅ 1 import batch seeded');

db.close();
console.log('\n🚀 ITAPS database seeded successfully!');
console.log(`   Database: ${dbPath}`);
