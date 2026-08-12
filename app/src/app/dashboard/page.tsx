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
  const [mounted, setMounted] = useState(false);
  const [scanInput, setScanInput] = useState('');

  useEffect(() => {
    setMounted(true);
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

  function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!scanInput.trim()) return;
    window.location.href = `/intake?asset=${encodeURIComponent(scanInput.trim())}`;
  }

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
    healthy: { icon: 'check_circle', bgClass: 'bg-[#D1FAE5] text-[#065F46]' },
    needs_powerwash: { icon: 'mop', bgClass: 'bg-[#F3E8FF] text-[#6B21A8]' },
    major_damage: { icon: 'error', bgClass: 'bg-[#FEE2E2] text-[#991B1B]' },
    minor_damage: { icon: 'build_circle', bgClass: 'bg-[#FEF3C7] text-[#92400E]' },
  };

  return (
    <div className="space-y-grid-gutter animate-fade-in-up">
      {/* Quick Scan & Header Bar */}
      <div className="glass rounded-2xl p-4 shadow-soft-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h2 className="text-display-lg font-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">Command Center</h2>
          <p className="text-body-sm font-body-sm text-outline mt-1 tracking-wide">
            Summer Engine Operations • High-speed visual triage active
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <form onSubmit={handleScan} className="relative w-full sm:w-80 hover-lift shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">barcode_scanner</span>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 bg-white/80 border border-outline-variant/30 rounded-xl text-on-surface font-mono-data placeholder:font-body-md placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary shadow-soft-sm transition-all outline-none"
              placeholder="Scan Asset Tag..."
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="absolute inset-y-1.5 right-1.5 bg-primary hover:bg-primary-hover text-white rounded-lg px-3 text-label-caps transition-colors shadow-soft-sm">
              Triage
            </button>
          </form>

          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none glass text-on-surface hover:text-primary transition-all rounded-xl py-2.5 px-4 flex justify-center items-center gap-2 font-label-caps shadow-soft-sm hover:shadow-soft-md hover-lift border border-outline-variant/30">
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              Run Engine
            </button>
            <a href="/intake" className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-2.5 px-4 flex justify-center items-center gap-2 font-label-caps shadow-soft-md hover:shadow-glow hover-lift">
              <span className="material-symbols-outlined text-[20px]">add_box</span>
              Start Intake
            </a>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-gap">
        {/* Total Inventory */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-label-caps text-outline font-bold tracking-widest">Total Inventory</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-primary">devices</span>
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-display-lg font-display-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary block">
              {loading ? '—' : stats.total.toLocaleString()}
            </span>
            <span className="text-label-caps text-success flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              +{stats.newDevices} new this cycle
            </span>
          </div>
        </div>

        {/* Devices Ready */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-label-caps text-outline font-bold tracking-widest">Devices Ready</span>
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-success">check_circle</span>
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-display-lg font-display-lg text-on-surface block">
              {loading ? '—' : stats.healthy.toLocaleString()}
            </span>
            <div className="w-full bg-surface-variant rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-success to-emerald-400 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${stats.total > 0 ? Math.round((stats.healthy / stats.total) * 100) : 0}%` }} />
            </div>
            <span className="text-label-caps text-outline mt-2 block">
              {stats.total > 0 ? Math.round((stats.healthy / stats.total) * 100) : 0}% of total fleet
            </span>
          </div>
        </div>

        {/* Pending Repairs */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-label-caps text-outline font-bold tracking-widest">Pending Repairs</span>
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-warning">build</span>
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-display-lg font-display-lg text-on-surface block">
              {loading ? '—' : stats.inRepair}
            </span>
            {stats.inRepair > 3 && (
              <span className="text-label-caps text-error flex items-center gap-1 mt-2 bg-error/10 px-2 py-1 rounded-md w-max">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                High volume
              </span>
            )}
          </div>
        </div>

        {/* Warranty Coverage */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <span className="text-label-caps text-outline font-bold tracking-widest">Warranty Cover</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-blue-600">verified_user</span>
            </div>
          </div>
          <div className="relative z-10">
            <span className="text-display-lg font-display-lg text-on-surface block">{stats.warrantyPercent}%</span>
            <div className="w-full bg-surface-variant mt-3 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000" style={{ width: `${stats.warrantyPercent}%` }} />
            </div>
            <span className="mt-2 text-label-caps text-outline block">
              {100 - stats.warrantyPercent}% exposed risk
            </span>
          </div>
        </div>
      </section>

      {/* Main Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-grid-gutter">
        {/* Chart Area */}
        <section className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 flex flex-col h-[420px] shadow-soft-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-title-sm font-title-sm text-on-surface">Summer Turnaround</h3>
              <p className="text-label-caps text-outline mt-1">DAILY PROCESSING VOLUME</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center cursor-help hover:bg-outline-variant transition-colors">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">analytics</span>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex-1 w-full relative flex items-end">
            {/* Y-axis gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-full border-t border-dashed border-outline-variant/50 h-0" />
              ))}
            </div>
            {/* Bars */}
            <div className="w-full h-[calc(100%-2rem)] flex items-end justify-between px-2 sm:px-6 z-10 gap-3">
              {barData.map((bar, i) => (
                <div
                  key={bar.day}
                  className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80 relative group ${
                    i === 3 ? 'bg-gradient-to-t from-primary to-secondary shadow-glow' : 'bg-surface-variant hover:bg-outline-variant'
                  }`}
                  style={{
                    height: `${bar.value}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-label-caps px-3 py-1.5 rounded-lg whitespace-nowrap transition-all pointer-events-none shadow-xl">
                    {bar.value * 10} units
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-on-surface"></div>
                  </div>
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 sm:px-6 py-2 text-label-caps text-outline font-bold">
              {barData.map(bar => <span key={bar.day} className="w-full text-center">{bar.day}</span>)}
            </div>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="glass rounded-3xl p-6 md:p-8 flex flex-col h-[420px] shadow-soft-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-title-sm font-title-sm text-on-surface">Live Activity</h3>
            <button className="text-label-caps text-primary hover:text-secondary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors">
              View All
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-5">
            {activity.map((log, index) => {
              const ci = conditionIcons[log.condition] || conditionIcons.healthy;
              return (
                <div key={log.id} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-soft-sm ${ci.bgClass}`}>
                    <span className="material-symbols-outlined text-[20px]">{ci.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-body-sm text-on-surface truncate">
                      <span className="font-semibold text-primary">{log.triaged_by_name || 'System'}</span>
                      {' '}triaged{' '}
                      <span className="font-mono-data text-outline font-bold">
                        {log.asset_tag}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-label-caps status-${log.new_status}`}>
                        {log.new_status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[11px] font-medium text-outline">
                        • {mounted ? timeAgo(log.created_at) : '...'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {activity.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-outline gap-2">
                <span className="material-symbols-outlined text-[32px] opacity-50">inbox</span>
                <span className="text-label-caps">No recent activity</span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Device Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        {Object.entries(stats.byType).map(([type, count]) => (
          <div key={type} className="glass rounded-2xl p-5 flex items-center gap-5 shadow-soft-sm hover-lift group">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container/50 text-secondary group-hover:bg-gradient-to-br from-primary to-secondary group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300 shadow-soft-sm group-hover:shadow-glow">
              <span className="material-symbols-outlined text-[28px]">
                {type === 'chromebook' ? 'laptop_chromebook' : type === 'ipad' ? 'tablet_mac' : 'laptop_mac'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-label-caps text-outline capitalize font-bold tracking-wider">{type}s</p>
              <p className="text-headline-md font-headline-md text-on-surface mt-1">{count}</p>
            </div>
            <div className="text-title-sm font-bold text-outline-variant">
              {stats.total > 0 ? Math.round((count / stats.total) * 100) : 0}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}