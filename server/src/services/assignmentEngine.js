/**
 * Auto-Assignment Engine
 * 
 * Implements the automated device assignment logic:
 * 
 * Rule 1: Grade 3 & New Students → New devices or healthy Lenovo stock
 * Rule 2: Returning Students (Grades 4-8) → Same device from last year if healthy
 * Rule 3: Replacement → If previous device was cannibalized/broken, assign healthy recycled device
 */

class AssignmentEngine {
  /**
   * Preview proposed assignments without committing
   */
  async preview(pool, academicYear) {
    const previousYear = this._getPreviousYear(academicYear);
    const proposed = [];
    const warnings = [];
    const stats = { rule1: 0, rule2: 0, rule3: 0, unassigned: 0 };

    // Fetch all active students
    const [students] = await pool.query(
      `SELECT * FROM students WHERE is_active = TRUE ORDER BY grade ASC, last_name ASC`
    );

    // Fetch available new devices
    const [newDevices] = await pool.query(
      `SELECT * FROM devices WHERE is_new = TRUE AND status = 'healthy' 
       AND id NOT IN (SELECT device_id FROM assignments WHERE is_current = TRUE)
       ORDER BY asset_tag ASC`
    );

    // Fetch healthy Lenovo stock
    const [lenovoStock] = await pool.query(
      `SELECT * FROM devices WHERE manufacturer = 'Lenovo' AND status = 'healthy' AND is_new = FALSE
       AND id NOT IN (SELECT device_id FROM assignments WHERE is_current = TRUE)
       ORDER BY asset_tag ASC`
    );

    // Fetch previous year assignments for returning students
    const [prevAssignments] = await pool.query(
      `SELECT a.*, d.status as device_status, d.id as dev_id, d.asset_tag, d.model
       FROM assignments a
       JOIN devices d ON a.device_id = d.id
       WHERE a.academic_year = ?`,
      [previousYear]
    );
    const prevAssignmentMap = new Map();
    prevAssignments.forEach(a => prevAssignmentMap.set(a.student_id, a));

    // Fetch all healthy recycled devices (for replacements)
    const [recycledDevices] = await pool.query(
      `SELECT * FROM devices WHERE status = 'healthy' AND is_new = FALSE
       AND id NOT IN (SELECT device_id FROM assignments WHERE is_current = TRUE)
       ORDER BY \`condition\` ASC, asset_tag ASC`
    );

    // Track used devices to avoid double-assignment
    const usedDeviceIds = new Set();
    let newDeviceIdx = 0;
    let lenovoIdx = 0;
    let recycledIdx = 0;

    for (const student of students) {
      // ===== RULE 1: Grade 3 & New Students =====
      if (student.grade === 3 || student.is_new_student) {
        let assignedDevice = null;

        // Try new devices first
        while (newDeviceIdx < newDevices.length && usedDeviceIds.has(newDevices[newDeviceIdx].id)) {
          newDeviceIdx++;
        }
        if (newDeviceIdx < newDevices.length) {
          assignedDevice = newDevices[newDeviceIdx];
          newDeviceIdx++;
        }

        // Fall back to Lenovo stock
        if (!assignedDevice) {
          while (lenovoIdx < lenovoStock.length && usedDeviceIds.has(lenovoStock[lenovoIdx].id)) {
            lenovoIdx++;
          }
          if (lenovoIdx < lenovoStock.length) {
            assignedDevice = lenovoStock[lenovoIdx];
            lenovoIdx++;
          }
        }

        if (assignedDevice) {
          usedDeviceIds.add(assignedDevice.id);
          proposed.push({
            student_id: student.id,
            student_display_id: student.student_id,
            student_name: `${student.first_name} ${student.last_name}`,
            grade: student.grade,
            device_id: assignedDevice.id,
            asset_tag: assignedDevice.asset_tag,
            model: assignedDevice.model,
            assignment_type: 'new',
            rule: 1,
            rule_label: 'New/Grade 3',
          });
          stats.rule1++;
        } else {
          warnings.push(`No available device for new student ${student.first_name} ${student.last_name} (${student.student_id})`);
          stats.unassigned++;
        }
        continue;
      }

      // ===== RULE 2: Returning Students — Same Device =====
      const prevAssignment = prevAssignmentMap.get(student.id);
      if (prevAssignment && prevAssignment.device_status === 'healthy' && !usedDeviceIds.has(prevAssignment.dev_id)) {
        usedDeviceIds.add(prevAssignment.dev_id);
        proposed.push({
          student_id: student.id,
          student_display_id: student.student_id,
          student_name: `${student.first_name} ${student.last_name}`,
          grade: student.grade,
          device_id: prevAssignment.dev_id,
          asset_tag: prevAssignment.asset_tag,
          model: prevAssignment.model,
          assignment_type: 'returning',
          rule: 2,
          rule_label: 'Returning Device',
        });
        stats.rule2++;
        continue;
      }

      // ===== RULE 3: Replacement — Previous device broken/cannibalized =====
      while (recycledIdx < recycledDevices.length && usedDeviceIds.has(recycledDevices[recycledIdx].id)) {
        recycledIdx++;
      }
      if (recycledIdx < recycledDevices.length) {
        const replacementDevice = recycledDevices[recycledIdx];
        usedDeviceIds.add(replacementDevice.id);
        recycledIdx++;

        const reason = prevAssignment
          ? `Previous device ${prevAssignment.asset_tag} status: ${prevAssignment.device_status}`
          : 'No previous assignment found';

        proposed.push({
          student_id: student.id,
          student_display_id: student.student_id,
          student_name: `${student.first_name} ${student.last_name}`,
          grade: student.grade,
          device_id: replacementDevice.id,
          asset_tag: replacementDevice.asset_tag,
          model: replacementDevice.model,
          assignment_type: 'replacement',
          rule: 3,
          rule_label: 'Replacement',
          reason,
        });
        stats.rule3++;
      } else {
        warnings.push(`No replacement device available for ${student.first_name} ${student.last_name} (${student.student_id})`);
        stats.unassigned++;
      }
    }

    return {
      proposed,
      warnings,
      stats,
      summary: {
        total_students: students.length,
        total_assigned: proposed.length,
        total_unassigned: stats.unassigned,
      },
    };
  }

  _getPreviousYear(academicYear) {
    const parts = academicYear.split('-');
    return `${parseInt(parts[0]) - 1}-${parseInt(parts[1]) - 1}`;
  }
}

module.exports = new AssignmentEngine();
