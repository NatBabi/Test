-- ITAPS Seed Data
USE itaps;

-- ============================================
-- Users (IT Staff)
-- ============================================
INSERT INTO users (username, display_name, role, email) VALUES
('director_k', 'Karen Mitchell', 'director', 'k.mitchell@school.edu'),
('vice_dir_r', 'Roberto Vega', 'vice_director', 'r.vega@school.edu'),
('store_mgr', 'Linda Park', 'store_manager', 'l.park@school.edu'),
('helpdesk_a', 'Alex Turner', 'helpdesk', 'a.turner@school.edu'),
('helpdesk_b', 'Maria Santos', 'helpdesk', 'm.santos@school.edu'),
('helpdesk_c', 'James Wu', 'helpdesk', 'j.wu@school.edu'),
('helpdesk_d', 'Priya Nair', 'helpdesk', 'p.nair@school.edu'),
('intern_01', 'Intern A.', 'intern', 'intern.a@school.edu'),
('intern_02', 'Intern B.', 'intern', 'intern.b@school.edu'),
('intern_03', 'Intern C.', 'intern', 'intern.c@school.edu');

-- ============================================
-- Students
-- ============================================
INSERT INTO students (student_id, first_name, last_name, grade, is_new_student, homeroom) VALUES
('STU-9021', 'Alice', 'Johnson', 3, TRUE, 'Room 101'),
('STU-8834', 'Brian', 'Smith', 3, TRUE, 'Room 101'),
('STU-7112', 'Carlos', 'Davis', 5, FALSE, 'Room 203'),
('STU-7115', 'Diana', 'Evans', 6, FALSE, 'Room 204'),
('STU-6230', 'Emily', 'Wilson', 4, FALSE, 'Room 102'),
('STU-6231', 'Frank', 'Garcia', 4, FALSE, 'Room 102'),
('STU-5540', 'Grace', 'Lee', 7, FALSE, 'Room 301'),
('STU-5541', 'Henry', 'Brown', 7, FALSE, 'Room 301'),
('STU-4012', 'Isla', 'Martinez', 8, FALSE, 'Room 302'),
('STU-4013', 'Jack', 'Taylor', 8, FALSE, 'Room 302'),
('STU-3301', 'Katie', 'Anderson', 5, FALSE, 'Room 203'),
('STU-3302', 'Liam', 'Thomas', 5, FALSE, 'Room 203'),
('STU-2240', 'Mia', 'Jackson', 6, FALSE, 'Room 204'),
('STU-2241', 'Noah', 'White', 6, FALSE, 'Room 204'),
('STU-1150', 'Olivia', 'Harris', 3, TRUE, 'Room 101'),
('STU-1151', 'Peter', 'Clark', 3, TRUE, 'Room 101'),
('STU-9900', 'Quinn', 'Lewis', 4, FALSE, 'Room 102'),
('STU-9901', 'Rachel', 'Walker', 4, FALSE, 'Room 102'),
('STU-8800', 'Samuel', 'Young', 7, FALSE, 'Room 301'),
('STU-8801', 'Tara', 'King', 7, FALSE, 'Room 301'),
('STU-7700', 'Umar', 'Wright', 8, FALSE, 'Room 302'),
('STU-7701', 'Violet', 'Scott', 8, FALSE, 'Room 302'),
('STU-6600', 'Will', 'Green', 5, FALSE, 'Room 203'),
('STU-6601', 'Xena', 'Adams', 5, FALSE, 'Room 203'),
('STU-5500', 'Yusuf', 'Baker', 6, FALSE, 'Room 204'),
('STU-5501', 'Zara', 'Nelson', 6, FALSE, 'Room 204'),
('STU-4400', 'Aaron', 'Carter', 3, TRUE, 'Room 101'),
('STU-4401', 'Bella', 'Reed', 3, TRUE, 'Room 101'),
('STU-3300', 'Chris', 'Cook', 4, FALSE, 'Room 102'),
('STU-3301B', 'Dana', 'Morgan', 4, FALSE, 'Room 102'),
('STU-2200', 'Ethan', 'Bell', 7, FALSE, 'Room 301'),
('STU-2201', 'Fiona', 'Murphy', 7, FALSE, 'Room 301'),
('STU-1100', 'George', 'Rivera', 8, FALSE, 'Room 302'),
('STU-1101', 'Hannah', 'Cooper', 8, FALSE, 'Room 302'),
('STU-0900', 'Ivan', 'Richardson', 5, FALSE, 'Room 203'),
('STU-0901', 'Julia', 'Cox', 5, FALSE, 'Room 203'),
('STU-0800', 'Kevin', 'Howard', 6, FALSE, 'Room 204'),
('STU-0801', 'Luna', 'Ward', 6, FALSE, 'Room 204'),
('STU-0700', 'Mason', 'Torres', 3, TRUE, 'Room 101'),
('STU-0701', 'Nina', 'Peterson', 3, TRUE, 'Room 101'),
('STU-0600', 'Oscar', 'Gray', 4, FALSE, 'Room 102'),
('STU-0601', 'Paula', 'Ramirez', 4, FALSE, 'Room 102'),
('STU-0500', 'Raj', 'Patel', 7, FALSE, 'Room 301'),
('STU-0501', 'Sara', 'James', 7, FALSE, 'Room 301'),
('STU-0400', 'Tom', 'Watson', 8, FALSE, 'Room 302'),
('STU-0401', 'Uma', 'Brooks', 8, FALSE, 'Room 302'),
('STU-0300', 'Victor', 'Kelly', 5, FALSE, 'Room 203'),
('STU-0301', 'Wendy', 'Sanders', 5, FALSE, 'Room 203'),
('STU-0200', 'Xavier', 'Price', 6, FALSE, 'Room 204'),
('STU-0201', 'Yolanda', 'Bennett', 6, FALSE, 'Room 204');

-- ============================================
-- Devices (mix of new, used, various statuses)
-- ============================================
INSERT INTO devices (asset_tag, serial_number, model, device_type, manufacturer, status, `condition`, is_new, purchase_date, warranty_expiry, damage_details) VALUES
-- New Dell Chromebooks (freshly shipped)
('AS-0001', '5CD918274X', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0002', '5CD918275Y', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0003', '5CD918276Z', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0004', '5CD918277A', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0005', '5CD918278B', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0006', '5CD918279C', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0007', '5CD918280D', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0008', '5CD918281E', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0009', '5CD918282F', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0010', '5CD918283G', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0011', '5CD918284H', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0012', '5CD918285I', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0013', '5CD918286J', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0014', '5CD918287K', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),
('AS-0015', '5CD918288L', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'excellent', TRUE, '2025-07-01', '2028-07-01', NULL),

-- Lenovo healthy stock (returning inventory)
('AS-1001', 'LNV20220001', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1002', 'LNV20220002', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1003', 'LNV20220003', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1004', 'LNV20220004', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1005', 'LNV20220005', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1006', 'LNV20220006', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'fair', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1007', 'LNV20220007', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'fair', FALSE, '2022-08-15', '2025-08-15', NULL),
('AS-1008', 'LNV20220008', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'fair', FALSE, '2022-08-15', '2025-08-15', NULL),

-- Older Dell Chromebooks (mixed statuses)
('AS-2001', 'DL20200101', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'fair', FALSE, '2020-09-01', '2023-09-01', NULL),
('AS-2002', 'DL20200102', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'fair', FALSE, '2020-09-01', '2023-09-01', NULL),
('AS-2003', 'DL20200103', 'Chromebook 3100', 'chromebook', 'Dell', 'needs_powerwash', 'fair', FALSE, '2020-09-01', '2023-09-01', NULL),
('AS-2004', 'DL20200104', 'Chromebook 3100', 'chromebook', 'Dell', 'needs_powerwash', 'fair', FALSE, '2020-09-01', '2023-09-01', NULL),

-- Damaged devices (in repair / awaiting parts)
('AS-9921', 'DL20210201', 'Chromebook 3100', 'chromebook', 'Dell', 'in_repair', 'poor', FALSE, '2021-01-10', '2024-01-10', '["screen"]'),
('AS-9844', 'APL20210301', 'iPad 9th Gen', 'ipad', 'Apple', 'in_repair', 'poor', FALSE, '2021-03-15', '2024-03-15', '["battery"]'),
('AS-1022', 'LNV20210401', 'ThinkPad T14', 'laptop', 'Lenovo', 'in_repair', 'fair', FALSE, '2021-04-20', '2024-04-20', '["keyboard"]'),
('AS-8830', 'DL20210501', 'Chromebook 3100', 'chromebook', 'Dell', 'in_repair', 'poor', FALSE, '2021-05-05', '2024-05-05', '["battery", "motherboard"]'),

-- Donor devices (cannibalized for parts)
('AS-5001', 'DL20190601', 'Chromebook 3100', 'chromebook', 'Dell', 'donor', 'parts_only', FALSE, '2019-06-01', '2022-06-01', '["screen"]'),
('AS-5002', 'DL20190602', 'Chromebook 3100', 'chromebook', 'Dell', 'donor', 'parts_only', FALSE, '2019-06-01', '2022-06-01', '["keyboard", "battery"]'),
('AS-5003', 'APL20190701', 'iPad 9th Gen', 'ipad', 'Apple', 'donor', 'parts_only', FALSE, '2019-07-01', '2022-07-01', '["screen"]'),
('AS-5004', 'LNV20190801', 'ThinkPad T14', 'laptop', 'Lenovo', 'donor', 'parts_only', FALSE, '2019-08-01', '2022-08-01', '["motherboard"]'),

-- iPads (healthy)
('AS-3001', 'APL20230101', 'iPad 10th Gen', 'ipad', 'Apple', 'healthy', 'excellent', TRUE, '2023-01-15', '2026-01-15', NULL),
('AS-3002', 'APL20230102', 'iPad 10th Gen', 'ipad', 'Apple', 'healthy', 'excellent', TRUE, '2023-01-15', '2026-01-15', NULL),
('AS-3003', 'APL20230103', 'iPad 10th Gen', 'ipad', 'Apple', 'healthy', 'good', FALSE, '2022-01-15', '2025-01-15', NULL),
('AS-3004', 'APL20230104', 'iPad 10th Gen', 'ipad', 'Apple', 'healthy', 'good', FALSE, '2022-01-15', '2025-01-15', NULL),

-- Decommissioned
('AS-9001', 'DL20170901', 'Chromebook 3100', 'chromebook', 'Dell', 'decommissioned', 'parts_only', FALSE, '2017-09-01', '2020-09-01', NULL),
('AS-9002', 'DL20170902', 'Chromebook 3100', 'chromebook', 'Dell', 'decommissioned', 'parts_only', FALSE, '2017-09-01', '2020-09-01', NULL),

-- New intake (just arrived, not yet triaged)
('AS-7001', 'DL20250801', 'Chromebook 3100', 'chromebook', 'Dell', 'new_intake', 'good', FALSE, '2025-08-01', '2028-08-01', NULL),
('AS-7002', 'DL20250802', 'Chromebook 3100', 'chromebook', 'Dell', 'new_intake', 'good', FALSE, '2025-08-01', '2028-08-01', NULL),
('AS-7003', 'DL20250803', 'Chromebook 3100', 'chromebook', 'Dell', 'new_intake', 'good', FALSE, '2025-08-01', '2028-08-01', NULL),

-- More healthy recycled stock for assignment pool
('AS-6001', 'DL20210601R', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'good', FALSE, '2021-06-01', '2024-06-01', NULL),
('AS-6002', 'DL20210602R', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'good', FALSE, '2021-06-01', '2024-06-01', NULL),
('AS-6003', 'DL20210603R', 'Chromebook 3100', 'chromebook', 'Dell', 'healthy', 'fair', FALSE, '2021-06-01', '2024-06-01', NULL),
('AS-6004', 'LNV20210604R', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2021-06-01', '2024-06-01', NULL),
('AS-6005', 'LNV20210605R', 'ThinkPad C13 Yoga', 'chromebook', 'Lenovo', 'healthy', 'good', FALSE, '2021-06-01', '2024-06-01', NULL);

-- ============================================
-- Previous year assignments (for returning students)
-- ============================================
INSERT INTO assignments (student_id, device_id, academic_year, assignment_type, assigned_date, returned_date, is_current) VALUES
-- Returning students who had devices last year
((SELECT id FROM students WHERE student_id = 'STU-7112'), (SELECT id FROM devices WHERE asset_tag = 'AS-1001'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-7115'), (SELECT id FROM devices WHERE asset_tag = 'AS-1002'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-6230'), (SELECT id FROM devices WHERE asset_tag = 'AS-1003'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-6231'), (SELECT id FROM devices WHERE asset_tag = 'AS-1004'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-5540'), (SELECT id FROM devices WHERE asset_tag = 'AS-2001'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-5541'), (SELECT id FROM devices WHERE asset_tag = 'AS-2002'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-4012'), (SELECT id FROM devices WHERE asset_tag = 'AS-6001'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-4013'), (SELECT id FROM devices WHERE asset_tag = 'AS-6002'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
-- Student whose device was cannibalized (needs replacement)
((SELECT id FROM students WHERE student_id = 'STU-3301'), (SELECT id FROM devices WHERE asset_tag = 'AS-5001'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE),
((SELECT id FROM students WHERE student_id = 'STU-3302'), (SELECT id FROM devices WHERE asset_tag = 'AS-5002'), '2024-2025', 'returning', '2024-09-01', '2025-06-15', FALSE);

-- ============================================
-- Repairs
-- ============================================
INSERT INTO repairs (device_id, issue, issue_category, status, assigned_to, resolution_notes) VALUES
((SELECT id FROM devices WHERE asset_tag = 'AS-9921'), 'Cracked Screen', 'screen', 'in_progress', (SELECT id FROM users WHERE username = 'intern_01'), NULL),
((SELECT id FROM devices WHERE asset_tag = 'AS-9844'), 'Battery Depleted', 'battery', 'awaiting_parts', (SELECT id FROM users WHERE username = 'intern_02'), NULL),
((SELECT id FROM devices WHERE asset_tag = 'AS-1022'), 'Missing Keys (A,S,D)', 'keyboard', 'triage', (SELECT id FROM users WHERE username = 'intern_01'), NULL),
((SELECT id FROM devices WHERE asset_tag = 'AS-8830'), 'Won''t Power On', 'battery', 'awaiting_parts', (SELECT id FROM users WHERE username = 'intern_03'), 'Suspected battery + motherboard failure');

-- ============================================
-- Donor Links (cannibalization history)
-- ============================================
INSERT INTO donor_links (repair_id, donor_device_id, part_harvested, notes) VALUES
(1, (SELECT id FROM devices WHERE asset_tag = 'AS-5001'), 'screen', 'Screen harvested from decommissioned unit'),
(2, (SELECT id FROM devices WHERE asset_tag = 'AS-5003'), 'battery', 'iPad battery transplant');

-- ============================================
-- Intake Logs
-- ============================================
INSERT INTO intake_logs (device_id, triaged_by, previous_status, new_status, `condition`, triage_notes) VALUES
((SELECT id FROM devices WHERE asset_tag = 'AS-7001'), (SELECT id FROM users WHERE username = 'intern_01'), 'new_intake', 'healthy', 'healthy', 'Device in good condition, ready for assignment'),
((SELECT id FROM devices WHERE asset_tag = 'AS-7002'), (SELECT id FROM users WHERE username = 'intern_02'), 'new_intake', 'needs_powerwash', 'needs_powerwash', 'Previous student profile still on device'),
((SELECT id FROM devices WHERE asset_tag = 'AS-9921'), (SELECT id FROM users WHERE username = 'intern_01'), 'new_intake', 'in_repair', 'major_damage', 'Screen completely shattered, bezel intact');

-- ============================================
-- Import Batches
-- ============================================
INSERT INTO import_batches (filename, row_count, success_count, error_count, imported_by, status) VALUES
('Dell_Chromebook_3100_Summer2025.csv', 15, 15, 0, (SELECT id FROM users WHERE username = 'store_mgr'), 'completed');
