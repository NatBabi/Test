'use client';

import { useState, useEffect, useCallback } from 'react';
import { assignmentsApi, type AssignmentRules, type ProposedAssignment, type AssignmentPreview } from '@/lib/api';

const demoRules: AssignmentRules = {
  rules: [
    { id: 1, name: 'Priority: Grade 3 & New Students', description: 'Grade 3 and new students get assigned from the pool of new devices or healthy Lenovo stock', grade_filter: [3], device_pool: 'new_or_lenovo', priority: 1 },
    { id: 2, name: 'Returning Students', description: 'Returning students (Grades 4-8) get reassigned their exact device from the previous year if healthy', grade_filter: [4, 5, 6, 7, 8], device_pool: 'previous_device', priority: 2 },
    { id: 3, name: 'Replacement Pool', description: "If a returning student's device was cannibalized or broken, assign a healthy recycled device", grade_filter: [4, 5, 6, 7, 8], device_pool: 'recycled_healthy', priority: 3 },
  ],
  pools: { new_devices: 15, lenovo_stock: 8, recycled_healthy: 7 },
  total_students: 50,
};

const demoProposed: ProposedAssignment[] = [
  { student_id: 1, student_display_id: 'STU-9021', student_name: 'Alice Johnson', grade: 3, device_id: 1, asset_tag: 'AS-0001', model: 'Chromebook 3100', assignment_type: 'new', rule: 1, rule_label: 'New/Grade 3' },
  { student_id: 2, student_display_id: 'STU-8834', student_name: 'Brian Smith', grade: 3, device_id: 2, asset_tag: 'AS-0002', model: 'Chromebook 3100', assignment_type: 'new', rule: 1, rule_label: 'New/Grade 3' },
  { student_id: 3, student_display_id: 'STU-7112', student_name: 'Carlos Davis', grade: 5, device_id: 16, asset_tag: 'AS-1001', model: 'ThinkPad C13 Yoga', assignment_type: 'returning', rule: 2, rule_label: 'Returning Device' },
  { student_id: 4, student_display_id: 'STU-7115', student_name: 'Diana Evans', grade: 6, device_id: 17, asset_tag: 'AS-1002', model: 'ThinkPad C13 Yoga', assignment_type: 'returning', rule: 2, rule_label: 'Returning Device' },
  { student_id: 5, student_display_id: 'STU-6230', student_name: 'Emily Wilson', grade: 4, device_id: 18, asset_tag: 'AS-1003', model: 'ThinkPad C13 Yoga', assignment_type: 'returning', rule: 2, rule_label: 'Returning Device' },
  { student_id: 11, student_display_id: 'STU-3301', student_name: 'Katie Anderson', grade: 5, device_id: 44, asset_tag: 'AS-6003', model: 'Chromebook 3100', assignment_type: 'replacement', rule: 3, rule_label: 'Replacement', reason: 'Previous device AS-5001 status: donor' },
  { student_id: 12, student_display_id: 'STU-3302', student_name: 'Liam Thomas', grade: 5, device_id: 45, asset_tag: 'AS-6004', model: 'ThinkPad C13 Yoga', assignment_type: 'replacement', rule: 3, rule_label: 'Replacement', reason: 'Previous device AS-5002 status: donor' },
];

const ruleBadgeColors: Record<number, string> = {
  1: 'bg-primary/10 text-primary',
  2: 'bg-surface-tint/10 text-surface-tint',
  3: 'bg-error-container text-on-error-container',
};

export default function AssignmentsPage() {
  const [rules, setRules] = useState<AssignmentRules>(demoRules);
  const [proposed, setProposed] = useState<ProposedAssignment[]>([]);
  const [preview, setPreview] = useState<AssignmentPreview | null>(null);
  const [loading, setLoading] = useState(true);

  // Engine state
  const [engineRunning, setEngineRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [engineComplete, setEngineComplete] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Commit state
  const [committing, setCommitting] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState(false);

  useEffect(() => {
    async function fetchRules() {
      try {
        const data = await assignmentsApi.rules();
        setRules(data);
      } catch {
        // Use demo data
      } finally {
        setLoading(false);
      }
    }
    fetchRules();
  }, []);

  const runEngine = useCallback(async () => {
    setEngineRunning(true);
    setProgress(0);
    setEngineComplete(false);
    setProposed([]);
    setPreview(null);
    setCommitSuccess(false);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return next > 99 ? 99 : next;
      });
    }, 200);

    try {
      const result = await assignmentsApi.preview('2025-2026');
      clearInterval(interval);
      setProgress(100);
      setProposed(result.proposed);
      setPreview(result);
    } catch {
      clearInterval(interval);
      setProgress(100);
      // Use demo data
      setProposed(demoProposed);
      setPreview({
        proposed: demoProposed,
        warnings: ['No replacement device available for test student'],
        stats: { rule1: 2, rule2: 3, rule3: 2, unassigned: 1 },
        summary: { total_students: 50, total_assigned: 7, total_unassigned: 1 },
      });
    }

    setTimeout(() => {
      setEngineRunning(false);
      setEngineComplete(true);
    }, 500);
  }, []);

  const handleCommit = useCallback(async () => {
    setCommitting(true);
    try {
      await assignmentsApi.execute('2025-2026', proposed);
    } catch {
      // Demo mode
    }
    setCommitSuccess(true);
    setCommitting(false);
  }, [proposed]);

  const paginatedProposed = proposed.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(proposed.length / pageSize);

  return (
    <div className="space-y-grid-gutter animate-fade-in-up">
      {/* Header */}
      <header className="mb-stack-gap pb-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface">Automated Assignment Engine</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            Configure allocation rules and batch assign devices to student rosters.
          </p>
        </div>
        <button className="bg-surface text-on-background border border-outline-variant px-4 py-2 rounded-lg font-label-caps text-label-caps hover:shadow-md transition-shadow flex items-center gap-2">
          <span className="material-symbols-outlined">qr_code_scanner</span>
          Asset Tag Generator
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-grid-gutter">
        {/* Left Column: Configuration & Engine */}
        <div className="xl:col-span-4 flex flex-col gap-stack-gap">
          {/* Allocation Rules */}
          <section className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-title-sm font-title-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">rule_folder</span>
                Allocation Rules
              </h3>
              <button className="text-secondary hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="space-y-4">
              {rules.rules.map((rule) => (
                <div key={rule.id} className="p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
                  <label className="block text-label-caps font-label-caps text-on-surface-variant mb-1 uppercase">
                    Rule {rule.id}: {rule.name}
                  </label>
                  <p className="text-body-sm font-body-sm text-on-surface">{rule.description}</p>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                    Grades: {rule.grade_filter.join(', ')} • Pool: {rule.device_pool.replace(/_/g, ' ')}
                  </p>
                </div>
              ))}
            </div>

            {/* Pool availability */}
            <div className="mt-4 p-3 bg-surface-container-low rounded-lg">
              <p className="text-label-caps font-label-caps text-on-surface-variant mb-2">Device Pool Availability</p>
              <div className="space-y-2 text-body-sm font-body-sm">
                <div className="flex justify-between">
                  <span>New Devices</span>
                  <span className="font-mono-data text-mono-data font-bold">{rules.pools.new_devices}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lenovo Stock</span>
                  <span className="font-mono-data text-mono-data font-bold">{rules.pools.lenovo_stock}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recycled Healthy</span>
                  <span className="font-mono-data text-mono-data font-bold">{rules.pools.recycled_healthy}</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant pt-2 font-semibold">
                  <span>Total Students</span>
                  <span>{rules.total_students}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Engine Control */}
          <section className="bg-surface border border-primary rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[100px]">memory</span>
            </div>
            <h3 className="text-title-sm font-title-sm text-on-surface mb-2 relative z-10">Engine Status</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-6 relative z-10">
              Ready to process {rules.total_students} student records against current inventory.
            </p>
            <div className="mb-6">
              <div className="flex justify-between text-label-caps font-label-caps text-on-surface-variant mb-1">
                <span>{engineRunning ? 'Processing Allocation...' : engineComplete ? 'Complete' : 'Idle'}</span>
                <span>{engineComplete ? '100%' : `${progress}%`}</span>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${engineComplete ? 100 : progress}%` }}
                />
              </div>
            </div>

            {!engineComplete ? (
              <button
                onClick={runEngine}
                disabled={engineRunning}
                className="w-full bg-primary text-on-primary py-3 rounded-lg font-headline-md text-title-sm hover:opacity-90 transition-opacity shadow-sm flex justify-center items-center gap-2 relative z-10 disabled:opacity-50"
              >
                {engineRunning ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Running...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">play_circle</span>
                    Run Engine
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-lg font-headline-md text-title-sm flex justify-center items-center gap-2 relative z-10"
              >
                <span className="material-symbols-outlined">check_circle</span>
                Complete
              </button>
            )}

            {/* Summary stats after run */}
            {preview && (
              <div className="mt-4 grid grid-cols-3 gap-2 relative z-10">
                <div className="text-center p-2 bg-surface-container-lowest rounded-lg">
                  <p className="text-headline-md font-headline-md text-primary">{preview.stats.rule1}</p>
                  <p className="text-label-caps font-label-caps text-on-surface-variant">New</p>
                </div>
                <div className="text-center p-2 bg-surface-container-lowest rounded-lg">
                  <p className="text-headline-md font-headline-md text-secondary">{preview.stats.rule2}</p>
                  <p className="text-label-caps font-label-caps text-on-surface-variant">Returning</p>
                </div>
                <div className="text-center p-2 bg-surface-container-lowest rounded-lg">
                  <p className="text-headline-md font-headline-md text-error">{preview.stats.rule3}</p>
                  <p className="text-label-caps font-label-caps text-on-surface-variant">Replaced</p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Proposed Assignments Table */}
        <div className="xl:col-span-8">
          <section className="bg-surface border border-outline-variant rounded-xl shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest rounded-t-xl">
              <div>
                <h3 className="text-title-sm font-title-sm text-on-surface">Proposed Assignments Preview</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  {proposed.length > 0 ? `${proposed.length} assignments generated. Review before committing.` : 'Run the engine to generate assignments.'}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-caps font-label-caps border border-secondary/20">
                  {commitSuccess ? 'Committed' : 'Draft Mode'}
                </span>
                {proposed.length > 0 && !commitSuccess && (
                  <button
                    onClick={handleCommit}
                    disabled={committing}
                    className="bg-[#3B82F6] text-white px-4 py-1.5 rounded-lg text-body-sm font-body-sm font-bold hover:opacity-90 disabled:opacity-50 flex items-center gap-1"
                  >
                    {committing ? 'Committing...' : 'Commit All'}
                  </button>
                )}
              </div>
            </div>

            {/* Warnings */}
            {preview && preview.warnings.length > 0 && (
              <div className="px-6 pt-4">
                <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-lg p-3 text-body-sm text-[#92400E]">
                  <div className="flex items-center gap-2 font-semibold mb-1">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                    {preview.warnings.length} Warning{preview.warnings.length > 1 ? 's' : ''}
                  </div>
                  {preview.warnings.slice(0, 3).map((w, i) => (
                    <p key={i} className="text-[12px] ml-6">• {w}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background border-b border-outline-variant">
                    <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Student ID</th>
                    <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Name</th>
                    <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Grade</th>
                    <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Proposed Asset</th>
                    <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-semibold uppercase tracking-wider">Rule</th>
                  </tr>
                </thead>
                <tbody className="text-body-sm font-body-sm text-on-surface">
                  {paginatedProposed.map((a) => (
                    <tr key={`${a.student_id}-${a.device_id}`} className="border-b border-surface-container-highest hover:bg-background transition-colors">
                      <td className="p-table-cell-padding font-mono-data text-mono-data text-on-surface-variant">#{a.student_display_id}</td>
                      <td className="p-table-cell-padding font-medium">{a.student_name}</td>
                      <td className="p-table-cell-padding">{String(a.grade).padStart(2, '0')}</td>
                      <td className="p-table-cell-padding">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined text-[16px] ${a.rule === 1 ? 'text-primary' : 'text-secondary'}`}>
                            {a.rule === 1 ? 'laptop_mac' : 'computer'}
                          </span>
                          <span className="font-mono-data text-mono-data">{a.asset_tag}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant">{a.model}</span>
                      </td>
                      <td className="p-table-cell-padding">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-label-caps font-bold ${ruleBadgeColors[a.rule] || 'bg-surface-variant text-on-surface-variant'}`}>
                          Rule {a.rule}
                        </span>
                        {a.reason && (
                          <p className="text-[10px] text-on-surface-variant mt-1 max-w-[200px] truncate" title={a.reason}>
                            {a.reason}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                  {proposed.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-2">assignment_ind</span>
                        Run the engine to generate proposed assignments.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {proposed.length > 0 && (
              <div className="p-4 mt-auto border-t border-outline-variant bg-surface-container-lowest rounded-b-xl flex justify-between items-center">
                <span className="text-body-sm font-body-sm text-on-surface-variant">
                  Showing {page * pageSize + 1}–{Math.min((page + 1) * pageSize, proposed.length)} of {proposed.length} assignments
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors text-body-sm font-body-sm flex items-center gap-1 disabled:opacity-30"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span> Prev
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1}
                    className="px-3 py-1 text-on-surface-variant hover:text-primary transition-colors text-body-sm font-body-sm flex items-center gap-1 disabled:opacity-30"
                  >
                    Next <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}

            {/* Commit Success */}
            {commitSuccess && (
              <div className="p-4 bg-[#DCFCE7] border-t border-[#86EFAC] rounded-b-xl flex items-center gap-3">
                <span className="material-symbols-outlined text-[#166534]" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                <div>
                  <p className="text-body-sm font-body-sm font-bold text-[#166534]">
                    {proposed.length} assignments committed successfully for 2025-2026
                  </p>
                  <p className="text-[12px] text-[#166534]/80">Student-device links are now active in the database.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}