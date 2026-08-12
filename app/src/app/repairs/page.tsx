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
  triage: { bg: 'bg-[#E0E7FF] text-[#3730A3]', label: 'Triage' },
  in_progress: { bg: 'bg-[#FEF3C7] text-[#92400E]', label: 'In Progress' },
  awaiting_parts: { bg: 'bg-[#FEE2E2] text-[#991B1B]', label: 'Awaiting Parts' },
  completed: { bg: 'bg-[#DCFCE7] text-[#166534]', label: 'Completed' },
  unrepairable: { bg: 'bg-[#F1F5F9] text-[#475569]', label: 'Unrepairable' },
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
          <h2 className="text-display-lg font-display-lg text-on-surface tracking-tight">Repair Tracking</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">Manage active device repairs and donor parts inventory.</p>
        </div>
        <button className="bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-low px-4 py-2 rounded-lg text-body-sm font-body-sm font-medium transition-shadow hover:shadow-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">print</span>
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
        <div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Devices in Repair</span>
            <span className="material-symbols-outlined text-outline">laptop_mac</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-on-surface">{stats.inRepair}</span>
            <span className="text-body-sm font-body-sm text-error bg-error-container/30 px-2 rounded-full">active</span>
          </div>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Awaiting Parts</span>
            <span className="material-symbols-outlined text-outline">hourglass_empty</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-on-surface">{stats.awaitingParts}</span>
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              {stats.partsNeeded.length > 0 && `${stats.partsNeeded[0].count} ${stats.partsNeeded[0].issue_category}s needed`}
            </span>
          </div>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Donor Devices Available</span>
            <span className="material-symbols-outlined text-outline">recycling</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-on-surface">{stats.donorDevices}</span>
            <span className="text-body-sm font-body-sm text-secondary bg-secondary-container/50 px-2 rounded-full">
              {stats.donorDevices > 3 ? 'High stock' : 'Low stock'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        {/* Active Repairs Table */}
        <div className="lg:col-span-8 bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-[#F8FAFC]">
            <h3 className="text-title-sm font-title-sm text-on-surface">Active Repairs</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                className="pl-9 pr-4 py-1.5 border border-outline-variant rounded-lg text-body-sm font-body-sm w-[200px] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all bg-surface"
                placeholder="Search Tag or S/N..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-outline-variant">
                  <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Asset Tag</th>
                  <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Model</th>
                  <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Issue</th>
                  <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium">Status</th>
                  <th className="p-table-cell-padding text-label-caps font-label-caps text-secondary font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm text-on-surface divide-y divide-[#F1F5F9]">
                {filteredRepairs.map((repair) => {
                  const badge = statusBadge[repair.status] || statusBadge.triage;
                  return (
                    <tr key={repair.id} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="p-table-cell-padding font-mono-data text-mono-data">#{repair.asset_tag}</td>
                      <td className="p-table-cell-padding">{repair.model}</td>
                      <td className="p-table-cell-padding text-on-surface-variant">{repair.issue}</td>
                      <td className="p-table-cell-padding">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="p-table-cell-padding text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setTargetAssetTag(repair.asset_tag || ''); }}
                            className="text-primary hover:text-[#3B82F6] p-1 rounded transition-colors"
                            title="Select for repair"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit_note</span>
                          </button>
                          <button
                            onClick={() => handleCompleteRepair(repair.id)}
                            className="text-[#166534] hover:text-[#15803D] p-1 rounded transition-colors"
                            title="Complete repair"
                          >
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                          </button>
                          <button
                            onClick={() => handleMarkUnrepairable(repair.id)}
                            className="text-error hover:text-[#DC2626] p-1 rounded transition-colors"
                            title="Mark unrepairable"
                          >
                            <span className="material-symbols-outlined text-[20px]">cancel</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredRepairs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-on-surface-variant">
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
          <div className="bg-surface border border-outline-variant rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">build_circle</span>
              <h3 className="text-title-sm font-title-sm text-on-surface">Log Repair Action</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Target Asset Tag</label>
                <input
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
                  placeholder="e.g. AS-9921"
                  value={targetAssetTag}
                  onChange={(e) => setTargetAssetTag(e.target.value)}
                />
              </div>
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                <label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Link Donor Device (Optional)</label>
                <p className="text-[12px] text-on-surface-variant mb-2 leading-tight">If salvaging parts, enter the donor asset tag to track component cannibalization.</p>
                <input
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all bg-surface mb-3"
                  placeholder="Donor Asset Tag"
                  value={donorAssetTag}
                  onChange={(e) => setDonorAssetTag(e.target.value)}
                />
                <label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Part Harvested</label>
                <select
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] bg-surface"
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
                <label className="block text-body-sm font-body-sm font-bold text-on-surface mb-1">Resolution Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-outline-variant rounded-lg text-body-sm font-body-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all resize-none"
                  placeholder="Brief description of fix..."
                  rows={2}
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleLinkDonor}
                  className="flex-1 bg-surface text-primary border border-outline-variant hover:bg-[#F8FAFC] py-2 rounded-lg text-body-sm font-body-sm font-semibold transition-colors"
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
                  className="flex-1 bg-[#3B82F6] text-on-primary hover:bg-[#2563EB] py-2 rounded-lg text-body-sm font-body-sm font-semibold transition-colors shadow-sm"
                >
                  Complete Repair
                </button>
              </div>
            </div>
          </div>

          {/* Harvested Parts */}
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1">
            <div className="p-4 border-b border-outline-variant bg-[#F8FAFC] flex justify-between items-center">
              <h3 className="text-body-md font-body-md font-semibold text-on-surface">Harvested Parts</h3>
              <button className="text-label-caps font-label-caps text-[#3B82F6] hover:underline">View All</button>
            </div>
            <div className="p-2">
              <table className="w-full text-left border-collapse">
                <tbody className="text-[13px] font-body-sm text-on-surface divide-y divide-[#F1F5F9]">
                  {parts.map((part) => (
                    <tr key={part.part_harvested} className="hover:bg-[#F8FAFC]">
                      <td className="py-2 px-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-outline">
                          {partIcons[part.part_harvested] || 'settings'}
                        </span>
                        <span className="capitalize">{part.part_harvested}</span>
                        <span className="text-[10px] text-on-surface-variant">({part.donor_models})</span>
                      </td>
                      <td className={`py-2 px-2 text-right font-medium ${part.available_count <= 2 ? 'text-error' : ''}`}>
                        {part.available_count}
                      </td>
                    </tr>
                  ))}
                  {parts.length === 0 && (
                    <tr>
                      <td colSpan={2} className="py-4 text-center text-on-surface-variant">No harvested parts</td>
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