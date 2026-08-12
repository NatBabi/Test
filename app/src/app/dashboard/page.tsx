'use client';

import { useState, useEffect } from 'react';
import { devicesApi, intakeApi, type DeviceStats, type IntakeLog } from '@/lib/api';

// Demo data for when API is not available
const demoStats: DeviceStats = {
  total: 52, healthy: 35, inRepair: 4, newDevices: 15, donorDevices: 4,
  warrantyActive: 45, warrantyPercent: 86,
  byStatus: { healthy: 35, in_repair: 4, donor: 4, new_intake: 3, needs_powerwash: 2, decommissioned: 2, damaged: 0 },
  byType: { chromebook: 40, ipad: 8, laptop: 4 },
};

const demoActivity: IntakeLog[] = [
  { id: 1, device_id: 1, triaged_by: 8, previous_status: 'new_intake', new_status: 'healthy', condition: 'healthy', triage_notes: 'Device in good condition', created_at: new Date(Date.now() - 120000).toISOString(), asset_tag: 'AS-7001', serial_number: 'DL20250801', model: 'Chromebook 3100', triaged_by_name: 'Intern A.' },
  { id: 2, device_id: 2, triaged_by: 9, previous_status: 'new_intake', new_status: 'needs_powerwash', condition: 'needs_powerwash', triage_notes: 'Previous student profile still on device', created_at: new Date(Date.now() - 900000).toISOString(), asset_tag: 'AS-7002', serial_number: 'DL20250802', model: 'Chromebook 3100', triaged_by_name: 'Intern B.' },
  { id: 3, device_id: 3, triaged_by: 8, previous_status: 'new_intake', new_status: 'in_repair', condition: 'major_damage', triage_notes: 'Screen completely shattered', created_at: new Date(Date.now() - 3600000).toISOString(), asset_tag: 'AS-9921', serial_number: 'DL20210201', model: 'Chromebook 3100', triaged_by_name: 'Intern A.' },
];

const barData = [
  { day: 'Mon', value: 20 }, { day: 'Tue', value: 35 }, { day: 'Wed', value: 45 },
  { day: 'Thu', value: 80 }, { day: 'Fri', value: 60 }, { day: 'Sat', value: 90 }, { day: 'Sun', value: 75 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DeviceStats>(demoStats);
  const [activity, setActivity] = useState<IntakeLog[]>(demoActivity);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, activityData] = await Promise.all([
          devicesApi.stats(),
          intakeApi.recent(10),
        ]);
        setStats(statsData);
        setActivity(activityData.logs);
      } catch {
        // Use demo data if API unavailable
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? 's' : ''} ago`;
  }

  const conditionIcons: Record<string, { icon: string; bgClass: string }> = {
    healthy: { icon: 'check_circle', bgClass: 'bg-[#DCFCE7] text-[#166534]' },
    needs_powerwash: { icon: 'mop', bgClass: 'bg-[#F3E8FF] text-[#6B21A8]' },
    major_damage: { icon: 'error', bgClass: 'bg-[#FEE2E2] text-[#991B1B]' },
    minor_damage: { icon: 'build_circle', bgClass: 'bg-[#FEF3C7] text-[#92400E]' },
  };

  return (
    <div className="space-y-grid-gutter animate-fade-in-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface">Director&apos;s Command Center</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            Strategic overview of fleet health, procurement, and departmental operations.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors rounded-lg py-2 px-4 flex items-center gap-2 font-body-sm text-body-sm shadow-sm">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Run Assignment Engine
          </button>
          <a href="/intake" className="bg-primary text-on-primary hover:bg-primary/90 transition-colors rounded-lg py-2 px-4 flex items-center gap-2 font-body-sm text-body-sm shadow-sm">
            <span className="material-symbols-outlined text-[18px]">barcode_scanner</span>
            Start New Intake
          </a>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-gap">
        {/* Total Inventory */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Total Inventory</span>
            <div className="w-8 h-8 rounded-full bg-secondary-container/50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-on-secondary-container">devices</span>
            </div>
          </div>
          <div>
            <span className="text-display-lg font-display-lg text-primary block">
              {loading ? '—' : stats.total.toLocaleString()}
            </span>
            <span className="text-body-sm font-body-sm text-outline flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
              {stats.newDevices} new this cycle
            </span>
          </div>
        </div>

        {/* Devices Ready */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Devices Ready</span>
            <div className="w-8 h-8 rounded-full bg-[#DCFCE7]/50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#166534]">check_circle</span>
            </div>
          </div>
          <div>
            <span className="text-display-lg font-display-lg text-primary block">
              {loading ? '—' : stats.healthy.toLocaleString()}
            </span>
            <div className="w-full bg-surface-variant rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-primary h-1.5 rounded-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? Math.round((stats.healthy / stats.total) * 100) : 0}%` }} />
            </div>
            <span className="text-body-sm font-body-sm text-outline mt-1 block">
              {stats.total > 0 ? Math.round((stats.healthy / stats.total) * 100) : 0}% of total fleet
            </span>
          </div>
        </div>

        {/* Pending Repairs */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Pending Repairs</span>
            <div className="w-8 h-8 rounded-full bg-error-container/50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-on-error-container">build</span>
            </div>
          </div>
          <div>
            <span className="text-display-lg font-display-lg text-primary block">
              {loading ? '—' : stats.inRepair}
            </span>
            {stats.inRepair > 3 && (
              <span className="text-body-sm font-body-sm text-on-error-container flex items-center gap-1 mt-1 bg-error-container/20 px-2 py-0.5 rounded w-max">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                High volume alert
              </span>
            )}
          </div>
        </div>

        {/* Warranty Coverage */}
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex flex-col justify-between hover:shadow-[0_4px_6px_-1px_rgb(0,0,0,0.1)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Warranty Coverage</span>
            <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-[#0369A1]">verified_user</span>
            </div>
          </div>
          <div>
            <span className="text-display-lg font-display-lg text-primary block">{stats.warrantyPercent}%</span>
            <div className="w-full bg-surface-container mt-2 h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${stats.warrantyPercent}%` }} />
            </div>
            <span className="mt-2 text-body-sm font-body-sm text-on-surface-variant block">
              {100 - stats.warrantyPercent}% exposed risk
            </span>
          </div>
        </div>
      </section>

      {/* Main Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">
        {/* Chart Area */}
        <section className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-title-sm font-title-sm text-primary">Summer Turnaround Progress</h3>
            <div className="flex items-center gap-2">
              <span className="text-label-caps font-label-caps text-on-surface-variant">Daily Processing Volume</span>
              <span className="material-symbols-outlined text-[16px] text-outline">info</span>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex-1 w-full relative bg-surface-bright border-b border-l border-surface-variant flex items-end px-2">
            {/* Y-axis gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-full border-t border-dashed border-surface-variant h-0" />
              ))}
            </div>
            {/* Bars */}
            <div className="w-full h-[calc(100%-2rem)] flex items-end justify-between px-4 z-10 gap-2">
              {barData.map((bar, i) => (
                <div
                  key={bar.day}
                  className={`w-full rounded-t-sm transition-all duration-300 hover:opacity-80 relative group ${
                    i === 3 ? 'bg-secondary' : 'bg-surface-variant'
                  }`}
                  style={{
                    height: `${bar.value}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-label-caps font-label-caps px-2 py-1 rounded whitespace-nowrap transition-opacity pointer-events-none">
                    {bar.value * 10} Processed
                  </div>
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-6 py-2 text-label-caps font-label-caps text-outline">
              {barData.map(bar => <span key={bar.day}>{bar.day}</span>)}
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-title-sm font-title-sm text-primary">Recent Activity</h3>
            <button className="text-label-caps font-label-caps text-secondary hover:text-primary transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
            {activity.map((log) => {
              const ci = conditionIcons[log.condition] || conditionIcons.healthy;
              return (
                <div key={log.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${ci.bgClass}`}>
                    <span className="material-symbols-outlined text-[16px]">{ci.icon}</span>
                  </div>
                  <div>
                    <p className="text-body-sm font-body-sm text-on-surface">
                      <span className="font-semibold">{log.triaged_by_name || 'System'}</span>
                      {' '}triaged{' '}
                      <span className="font-mono-data text-mono-data bg-surface-variant px-1 rounded">
                        {log.asset_tag}
                      </span>
                      {' → '}
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold status-${log.new_status}`}>
                        {log.new_status.replace(/_/g, ' ')}
                      </span>
                    </p>
                    <span className="text-label-caps font-label-caps text-outline mt-1 block">
                      {timeAgo(log.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
            {activity.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-on-surface-variant text-body-sm">
                No recent activity
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Device Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        {Object.entries(stats.byType).map(([type, count]) => (
          <div key={type} className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary-container">
                {type === 'chromebook' ? 'laptop_chromebook' : type === 'ipad' ? 'tablet' : 'laptop_mac'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-label-caps font-label-caps text-on-surface-variant capitalize">{type}s</p>
              <p className="text-headline-md font-headline-md text-on-surface">{count}</p>
            </div>
            <div className="text-body-sm font-body-sm text-on-surface-variant">
              {stats.total > 0 ? Math.round((count / stats.total) * 100) : 0}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}