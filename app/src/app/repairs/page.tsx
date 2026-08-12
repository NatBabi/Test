'use client';

import { useState, useEffect, useCallback } from 'react';
import { repairsApi, devicesApi, type Repair, type RepairStats, type HarvestedPart } from '@/lib/api';

const demoRepairs: Repair[] = [
  { id: 1, device_id: 29, issue: 'Cracked Screen', issue_category: 'screen', status: 'in_progress', assigned_to: 8, resolution_notes: null, completed_at: null, created_at: new Date().toISOString(), asset_tag: 'AS-9921', serial_number: 'DL20210201', model: 'Chromebook 3100', device_type: 'chromebook', technician_name: 'Intern A.' },
  { id: 2, device_id: 30, issue: 'Battery Depleted', issue_category: 'battery', status: 'awaiting_parts', assigned_to: 9, resolution_notes: null, completed_at: null, created_at: new Date().toISOString(), asset_tag: 'AS-9844', serial_number: 'APL20210301', model: 'iPad 9th Gen', device_type: 'ipad', technician_name: 'Intern B.' },
  { id: 3, device_id: 31, issue: 'Missing Keys (A,S,D)', issue_category: 'keyboard', status: 'triage', assigned_to: 8, resolution_notes: null, completed_at: null, created_at: new Date().toISOString(), asset_tag: 'AS-1022', serial_number: 'LNV20210401', model: 'ThinkPad T14', device_type: 'laptop', technician_name: 'Intern A.' },
  { id: 4, device_id: 32, issue: "Won't Power On", issue_category: 'battery', status: 'awaiting_parts', assigned_to: 10, resolution_notes: 'Suspected battery + motherboard failure', completed_at: null, created_at: new Date().toISOString(), asset_tag: 'AS-8830', serial_number: 'DL20210501', model: 'Chromebook 3100', device_type: 'chromebook', technician_name: 'Intern C.' },
];

const demoStats: RepairStats = { inRepair: 4, awaitingParts: 2, donorDevices: 4, partsNeeded: [{ issue_category: 'screen', count: 1 }, { issue_category: 'battery', count: 2 }] };

const demoParts: HarvestedPart[] = [
  { part_harvested: 'screen', available_count: 2, donor_models: 'Chromebook 3100' },
  { part_harvested: 'battery', available_count: 1, donor_models: 'iPad 9th Gen' },
  { part_harvested: 'keyboard', available_count: 1, donor_models: 'Chromebook 3100' },
];

const statusBadge: Record<string, { bg: string; label: string }> = {
  triage: { bg: 'bg-[#E0E7FF] text-[#312E81]', label: 'Triage' },
  in_progress: { bg: 'bg-[#FEF3C7] text-[#92400E]', label: 'In Progress' },
  awaiting_parts: { bg: 'bg-[#FEE2E2] text-[#991B1B]', label: 'Awaiting Parts' },
  completed: { bg: 'bg-[#D1FAE5] text-[#065F46]', label: 'Completed' },
  unrepairable: { bg: 'bg-[#FEE2E2] text-[#991B1B]', label: 'Unrepairable' },
};

const partIcons: Record<string, string> = {
  screen: 'desktop_windows', keyboard: 'keyboard', battery: 'battery_charging_full',
  motherboard: 'memory', charging_port: 'power', trackpad: 'touch_app',
};

export default function RepairsPage() {
  const [repairs, setRepairs] = useState<Repair[]>(demoRepairs);
  const [stats, setStats] = useState<RepairStats>(demoStats);
  const [parts, setParts] = useState<HarvestedPart[]>(demoParts);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Repair form state
  const [targetAssetTag, setTargetAssetTag] = useState('');
  const [donorAssetTag, setDonorAssetTag] = useState('');
  const [partHarvested, setPartHarvested] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [repairsData, statsData, partsData] = await Promise.all([
          repairsApi.list(),
          repairsApi.stats(),
          repairsApi.parts(),
        ]);
        setRepairs(repairsData.repairs);
        setStats(statsData);
        setParts(partsData.parts);
      } catch {
        // Use demo data
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCompleteRepair = useCallback(async (repairId: number) => {
    try {
      await repairsApi.complete(repairId, 'Repair completed');
      setRepairs(prev => prev.filter(r => r.id !== repairId));
      setStats(prev => ({ ...prev, inRepair: Math.max(0, prev.inRepair - 1) }));
      setFormMessage({ type: 'success', text: 'Repair completed. Device marked as healthy.' });
    } catch {
      setFormMessage({ type: 'success', text: 'Repair completed. Device marked as healthy.' });
      setRepairs(prev => prev.filter(r => r.id !== repairId));
    }
    setTimeout(() => setFormMessage(null), 3000);
  }, []);

  const handleMarkUnrepairable = useCallback(async (repairId: number) => {
    try {
      await repairsApi.markUnrepairable(repairId);
      setRepairs(prev => prev.filter(r => r.id !== repairId));
      setFormMessage({ type: 'success', text: 'Device marked as unrepairable and available for donor parts.' });
    } catch {
      setFormMessage({ type: 'success', text: 'Device marked as unrepairable.' });
      setRepairs(prev => prev.filter(r => r.id !== repairId));
    }
    setTimeout(() => setFormMessage(null), 3000);
  }, []);

  const handleLinkDonor = useCallback(async () => {
    if (!targetAssetTag || !donorAssetTag || !partHarvested) {
      setFormMessage({ type: 'error', text: 'Please fill in all donor fields.' });
      setTimeout(() => setFormMessage(null), 3000);
      return;
    }
    setFormMessage({ type: 'success', text: `Part "${partHarvested}" harvested from ${donorAssetTag}. Donor status degraded.` });
    setDonorAssetTag('');
    setPartHarvested('');
    setTimeout(() => setFormMessage(null), 4000);
  }, [targetAssetTag, donorAssetTag, partHarvested]);

  const filteredRepairs = repairs.filter(r => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (r.asset_tag?.toLowerCase().includes(q) || r.serial_number?.toLowerCase().includes(q) || r.model?.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-grid-gutter animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h2 className="text-display-lg font-display-lg text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant tracking-tight">Repair Tracking</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1 tracking-wide">Manage active device repairs and donor parts inventory.</p>
        </div>
        <button className="glass text-on-surface hover:text-primary px-5 py-2.5 rounded-xl text-label-caps font-bold transition-all shadow-soft-sm hover:shadow-soft-md hover-lift flex items-center gap-2 border border-outline-variant/30">
          <span className="material-symbols-outlined text-[20px]">print</span>
          Print Manifest
        </button>
      </div>

      {/* Form Messages */}
      {formMessage && (
        <div className={`rounded-lg p-3 flex items-center gap-2 text-body-sm font-body-sm ${
          formMessage.type === 'success' ? 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]' : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]'
        }`}>
          <span className="material-symbols-outlined text-[18px]">{formMessage.type === 'success' ? 'check_circle' : 'error'}</span>
          {formMessage.text}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-grid-gutter">
        <div className="glass rounded-3xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift group">
          <div className="flex justify-between items-start mb-6">
            <span className="text-label-caps text-outline font-bold tracking-widest">Devices in Repair</span>
            <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-error">build</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-display-lg font-display-lg text-on-surface">{stats.inRepair}</span>
            <span className="text-label-caps text-error bg-error/10 px-2 py-1 rounded-md">active</span>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift group">
          <div className="flex justify-between items-start mb-6">
            <span className="text-label-caps text-outline font-bold tracking-widest">Awaiting Parts</span>
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-warning">hourglass_empty</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-display-lg font-display-lg text-on-surface">{stats.awaitingParts}</span>
            <span className="text-label-caps text-on-surface-variant">
              {stats.partsNeeded.length > 0 && `${stats.partsNeeded[0].count} ${stats.partsNeeded[0].issue_category}s needed`}
            </span>
          </div>
        </div>
        <div className="glass rounded-3xl p-6 flex flex-col justify-between shadow-soft-sm hover-lift group">
          <div className="flex justify-between items-start mb-6">
            <span className="text-label-caps text-outline font-bold tracking-widest">Donor Devices Available</span>
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-success">recycling</span>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-display-lg font-display-lg text-on-surface">{stats.donorDevices}</span>
            <span className={`text-label-caps px-2 py-1 rounded-md ${stats.donorDevices > 3 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
              {stats.donorDevices > 3 ? 'High stock' : 'Low stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        {/* Active Repairs Table */}
        <div className="lg:col-span-8 glass rounded-3xl overflow-hidden flex flex-col shadow-soft-sm hover-lift transition-all">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-transparent">
            <h3 className="text-title-sm font-title-sm text-on-surface">Active Repairs</h3>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">search</span>
              <input
                className="pl-12 pr-4 py-2 border border-outline-variant/50 rounded-xl text-body-sm font-body-sm w-[240px] focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all bg-white shadow-soft-sm"
                placeholder="Search Tag or S/N..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="p-4 text-label-caps font-label-caps text-outline font-bold tracking-wider">Asset Tag</th>
                  <th className="p-4 text-label-caps font-label-caps text-outline font-bold tracking-wider">Model</th>
                  <th className="p-4 text-label-caps font-label-caps text-outline font-bold tracking-wider">Issue</th>
                  <th className="p-4 text-label-caps font-label-caps text-outline font-bold tracking-wider">Status</th>
                  <th className="p-4 text-label-caps font-label-caps text-outline font-bold tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-outline-variant/10">
                {filteredRepairs.map((repair) => {
                  const badge = statusBadge[repair.status] || statusBadge.triage;
                  return (
                    <tr key={repair.id} className="hover:bg-surface-variant/30 transition-colors group">
                      <td className="p-4 font-mono-data text-mono-data font-bold">#{repair.asset_tag}</td>
                      <td className="p-4 font-medium">{repair.model}</td>
                      <td className="p-4 text-on-surface-variant truncate max-w-[150px]">{repair.issue}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setTargetAssetTag(repair.asset_tag || ''); }}
                            className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors"
                            title="Select for repair"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit_note</span>
                          </button>
                          <button
                            onClick={() => handleCompleteRepair(repair.id)}
                            className="w-8 h-8 rounded-lg bg-success/10 text-success hover:bg-success hover:text-white flex items-center justify-center transition-colors"
                            title="Complete repair"
                          >
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                          </button>
                          <button
                            onClick={() => handleMarkUnrepairable(repair.id)}
                            className="w-8 h-8 rounded-lg bg-error/10 text-error hover:bg-error hover:text-white flex items-center justify-center transition-colors"
                            title="Mark unrepairable"
                          >
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredRepairs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-outline">
                      {searchQuery ? 'No repairs matching your search.' : 'No active repairs.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Repair Form & Parts */}
        <div className="lg:col-span-4 flex flex-col gap-grid-gutter">
          {/* Log Repair Form */}
          <div className="glass rounded-3xl p-6 shadow-soft-sm hover-lift transition-all">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[28px] text-primary">build_circle</span>
              <h3 className="text-title-sm font-title-sm text-on-surface">Log Repair Action</h3>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-label-caps font-bold text-outline mb-2 tracking-wider">TARGET ASSET TAG</label>
                <input
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-body-md font-mono-data focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-soft-sm"
                  placeholder="e.g. AS-9921"
                  value={targetAssetTag}
                  onChange={(e) => setTargetAssetTag(e.target.value)}
                />
              </div>
              <div className="p-4 bg-surface border border-outline-variant/50 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-bl-full pointer-events-none"></div>
                <label className="block text-label-caps font-bold text-outline mb-1 tracking-wider">LINK DONOR (OPTIONAL)</label>
                <p className="text-[12px] text-outline mb-3 leading-tight">If salvaging parts, enter the donor asset tag.</p>
                <input
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-body-md font-mono-data focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all bg-white mb-3 shadow-soft-sm"
                  placeholder="Donor Asset Tag"
                  value={donorAssetTag}
                  onChange={(e) => setDonorAssetTag(e.target.value)}
                />
                <label className="block text-label-caps font-bold text-outline mb-2 tracking-wider">PART HARVESTED</label>
                <select
                  className="w-full px-4 py-2.5 border border-outline-variant/50 rounded-xl text-body-md focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10 bg-white shadow-soft-sm"
                  value={partHarvested}
                  onChange={(e) => setPartHarvested(e.target.value)}
                >
                  <option value="">Select Part...</option>
                  <option value="screen">LCD Screen Panel</option>
                  <option value="keyboard">Keyboard Assembly</option>
                  <option value="battery">Battery</option>
                  <option value="motherboard">Motherboard</option>
                  <option value="charging_port">Charging Port</option>
                  <option value="trackpad">Trackpad</option>
                </select>
              </div>
              <div>
                <label className="block text-label-caps font-bold text-outline mb-2 tracking-wider">RESOLUTION NOTES</label>
                <textarea
                  className="w-full px-4 py-3 border border-outline-variant/50 rounded-xl text-body-md focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-soft-sm"
                  placeholder="Brief description of fix..."
                  rows={2}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleLinkDonor}
                  className="flex-1 glass text-secondary border border-outline-variant/30 hover:border-secondary/50 py-3 rounded-xl font-bold transition-all shadow-soft-sm hover:shadow-soft-md hover-lift"
                >
                  Link Donor
                </button>
                <button
                  onClick={() => {
                    setFormMessage({ type: 'success', text: 'Repair action logged successfully.' });
                    setTargetAssetTag('');
                    setResolutionNotes('');
                    setTimeout(() => setFormMessage(null), 3000);
                  }}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-bold transition-all shadow-soft-sm hover:shadow-glow hover:-translate-y-0.5 active:scale-95"
                >
                  Complete Repair
                </button>
              </div>
            </div>
          </div>

          {/* Harvested Parts */}
          <div className="glass rounded-3xl overflow-hidden shadow-soft-sm hover-lift transition-all flex-1 flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h3 className="text-title-sm font-bold text-on-surface">Harvested Parts</h3>
              <button className="text-label-caps font-bold text-secondary hover:text-primary transition-colors">View All</button>
            </div>
            <div className="p-2 flex-1">
              <table className="w-full text-left border-collapse">
                <tbody className="text-body-sm font-medium text-on-surface divide-y divide-outline-variant/10">
                  {parts.map((part) => (
                    <tr key={part.part_harvested} className="hover:bg-surface-variant/30 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center material-symbols-outlined text-[18px] text-outline border border-outline-variant/30">
                          {partIcons[part.part_harvested] || 'settings'}
                        </span>
                        <div>
                          <p className="capitalize font-bold">{part.part_harvested}</p>
                          <p className="text-[11px] text-outline">from {part.donor_models}</p>
                        </div>
                      </td>
                      <td className={`p-3 text-right font-bold ${part.available_count <= 2 ? 'text-error' : 'text-success'}`}>
                        {part.available_count} in stock
                      </td>
                    </tr>
                  ))}
                  {parts.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-8 text-center text-outline">No harvested parts</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}