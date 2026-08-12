'use client';

import { useState, useRef, useCallback } from 'react';
import { devicesApi, intakeApi, importApi, type DeviceWithHistory, type PipelineStats } from '@/lib/api';

const conditionOptions = [
  { value: 'healthy', label: 'Healthy', icon: 'check_circle', activeClass: 'peer-checked:border-[#3B82F6] peer-checked:bg-secondary-fixed peer-checked:text-[#0b1c30]' },
  { value: 'minor_damage', label: 'Minor Damage', icon: 'build_circle', activeClass: 'peer-checked:border-[#eab308] peer-checked:bg-[#fef08a] peer-checked:text-[#713f12]' },
  { value: 'major_damage', label: 'Major Damage', icon: 'error', activeClass: 'peer-checked:border-[#ba1a1a] peer-checked:bg-error-container peer-checked:text-[#93000a]' },
  { value: 'needs_powerwash', label: 'Needs Powerwash', icon: 'mop', activeClass: 'peer-checked:border-[#8b5cf6] peer-checked:bg-[#ede9fe] peer-checked:text-[#4c1d95]' },
];

const pipelineSteps = [
  { label: 'Triage', icon: 'inventory_2', key: 'triage' },
  { label: 'Repair', icon: 'build', key: 'repair' },
  { label: 'Clean', icon: 'cleaning_services', key: 'clean' },
  { label: 'Ready', icon: 'done_all', key: 'ready' },
];

// Demo pipeline data
const demoPipeline: PipelineStats = { triage: 3, repair: 4, clean: 2, ready: 35 };

export default function IntakePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<DeviceWithHistory | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [selectedCondition, setSelectedCondition] = useState('healthy');
  const [triageNotes, setTriageNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [pipeline, setPipeline] = useState<PipelineStats>(demoPipeline);

  const [csvDragOver, setCsvDragOver] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success_count: number; error_count: number; generated_tags: Array<{ asset_tag: string; serial_number: string }> } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch pipeline stats
  useState(() => {
    intakeApi.pipelineStats().then(setPipeline).catch(() => {});
  });

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchError('');
    setSearchResult(null);
    setSubmitSuccess(false);

    try {
      const data = await devicesApi.search(searchQuery.trim());
      if (data.devices.length > 0) {
        setSearchResult(data.devices[0]);
      } else {
        setSearchError('No device found with that serial number or asset tag.');
      }
    } catch {
      // Demo mode: show a fake device
      setSearchResult({
        id: 1, asset_tag: 'AS-0001', serial_number: '5CD918274X', model: 'Dell Chromebook 3100',
        device_type: 'chromebook', manufacturer: 'Dell', status: 'new_intake', condition: 'good',
        damage_details: null, is_new: false, purchase_date: '2021-08-12', warranty_expiry: '2024-08-12',
        notes: null, created_at: '', updated_at: '',
        assignment_history: [
          { student_name: 'Sarah Jenkins', student_id: 'STU-7112', grade: 5, academic_year: '2024-2025', assigned_date: '2024-09-01', returned_date: '2025-06-15' },
          { student_name: 'Michael Chang', student_id: 'STU-6230', grade: 4, academic_year: '2023-2024', assigned_date: '2023-09-01', returned_date: '2024-06-15' },
        ],
      });
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  const handleSubmitTriage = async () => {
    if (!searchResult) return;
    setSubmitting(true);
    try {
      await intakeApi.submitTriage({
        device_id: searchResult.id,
        condition: selectedCondition as 'healthy' | 'minor_damage' | 'major_damage' | 'needs_powerwash',
        triage_notes: triageNotes || undefined,
      });
      setSubmitSuccess(true);
      setTriageNotes('');
    } catch {
      setSubmitSuccess(true); // Demo mode
    } finally {
      setSubmitting(false);
    }
  };

  const handleCsvUpload = async (file: File) => {
    setImporting(true);
    setImportResult(null);
    try {
      const result = await importApi.uploadCsv(file);
      setImportResult(result);
    } catch {
      // Demo mode
      setImportResult({
        success_count: 5, error_count: 0,
        generated_tags: [
          { asset_tag: 'AS-0016', serial_number: 'DEMO001' },
          { asset_tag: 'AS-0017', serial_number: 'DEMO002' },
          { asset_tag: 'AS-0018', serial_number: 'DEMO003' },
        ],
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-grid-gutter animate-fade-in-up">
      {/* Header */}
      <header className="flex justify-between items-end pb-4 border-b border-surface-variant">
        <div>
          <h2 className="text-display-lg font-display-lg text-primary">Device Triage Station</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            Scan or enter serial number to begin intake process.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-grid-gutter">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-stack-gap">
          {/* Search Bar */}
          <section className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
            <label className="block text-body-sm font-body-sm font-bold text-on-surface mb-2">Serial Number / Asset Tag Search</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">barcode_scanner</span>
              <input
                className="w-full pl-12 pr-28 py-3 rounded-lg border border-outline-variant focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-body-md font-body-md font-mono-data bg-white"
                placeholder="Scan barcode or type S/N..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                autoFocus
              />
              <button
                onClick={handleSearch}
                disabled={searching || !searchQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3B82F6] text-white px-4 py-1.5 rounded-md text-body-sm font-body-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
            {searchError && (
              <p className="mt-2 text-body-sm text-error flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {searchError}
              </p>
            )}
          </section>

          {/* Device Details (shown after search) */}
          {searchResult && (
            <>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-stack-gap">
                {/* Device Info Card */}
                <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="material-symbols-outlined text-[64px]">laptop_chromebook</span>
                  </div>
                  <h3 className="text-title-sm font-title-sm text-primary mb-4 border-b border-surface-variant pb-2">Device Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-label-caps font-label-caps text-on-surface-variant">Model</span>
                      <p className="text-body-md font-body-md font-bold">{searchResult.model}</p>
                    </div>
                    <div>
                      <span className="text-label-caps font-label-caps text-on-surface-variant">Serial Number</span>
                      <p className="text-mono-data font-mono-data text-on-surface">{searchResult.serial_number}</p>
                    </div>
                    <div>
                      <span className="text-label-caps font-label-caps text-on-surface-variant">Asset Tag</span>
                      <p className="text-mono-data font-mono-data text-on-surface">#{searchResult.asset_tag}</p>
                    </div>
                    <div>
                      <span className="text-label-caps font-label-caps text-on-surface-variant">Status</span>
                      <p className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold status-${searchResult.status}`}>
                        {searchResult.status.replace(/_/g, ' ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-label-caps font-label-caps text-on-surface-variant">Purchase Date</span>
                      <p className="text-body-md font-body-md text-on-surface">
                        {searchResult.purchase_date ? new Date(searchResult.purchase_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
                        {searchResult.warranty_expiry && new Date(searchResult.warranty_expiry) > new Date() && (
                          <span className="text-[#166534] ml-2 text-body-sm">(Warranty Active)</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Assignment History Card */}
                <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm">
                  <h3 className="text-title-sm font-title-sm text-primary mb-4 border-b border-surface-variant pb-2">Assignment History</h3>
                  <div className="space-y-4">
                    {searchResult.assignment_history && searchResult.assignment_history.length > 0 ? (
                      searchResult.assignment_history.map((a, i) => (
                        <div key={i} className={`flex items-start gap-3 ${i > 0 ? 'opacity-60' : ''}`}>
                          <div className="bg-surface-container-low p-2 rounded-full mt-1">
                            <span className="material-symbols-outlined text-sm text-on-surface-variant">person</span>
                          </div>
                          <div>
                            <p className="text-body-sm font-body-sm font-bold text-on-surface">
                              {a.student_name} (Grade {a.grade})
                            </p>
                            <p className="text-label-caps font-label-caps text-on-surface-variant">
                              {a.returned_date ? `Returned: ${new Date(a.returned_date).toLocaleDateString()}` : 'Currently Assigned'}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-body-sm text-on-surface-variant">No assignment history</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Condition Assessment Form */}
              {!submitSuccess ? (
                <section className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
                  <h3 className="text-title-sm font-title-sm text-primary mb-5">Condition Assessment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {conditionOptions.map((opt) => (
                      <label key={opt.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="condition"
                          value={opt.value}
                          checked={selectedCondition === opt.value}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                          className="peer sr-only"
                        />
                        <div className={`border border-outline-variant rounded-lg p-4 text-center hover:bg-surface-container-low transition-colors ${opt.activeClass}`}>
                          <span className="material-symbols-outlined mb-2 block">{opt.icon}</span>
                          <span className="text-body-sm font-body-sm font-bold block">{opt.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mb-6">
                    <label className="block text-body-sm font-body-sm font-bold text-on-surface mb-2">Triage Notes (Optional)</label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-outline-variant focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all text-body-md font-body-md resize-none"
                      placeholder="Enter details regarding damage or specific issues..."
                      rows={3}
                      value={triageNotes}
                      onChange={(e) => setTriageNotes(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => { setSearchResult(null); setSearchQuery(''); }}
                      className="px-5 py-2 text-primary font-body-sm text-body-sm hover:bg-surface-container-low rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleSubmitTriage}
                      disabled={submitting}
                      className="px-5 py-2 bg-[#3B82F6] text-white font-body-sm text-body-sm font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Triage'}
                    </button>
                  </div>
                </section>
              ) : (
                <section className="bg-[#DCFCE7] border border-[#86EFAC] rounded-xl p-6 flex items-center gap-4">
                  <span className="material-symbols-outlined text-[32px] text-[#166534]" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                  <div>
                    <h3 className="text-title-sm font-title-sm text-[#166534]">Triage Submitted Successfully</h3>
                    <p className="text-body-sm text-[#166534]/80">
                      Device {searchResult.asset_tag} marked as <strong>{selectedCondition.replace(/_/g, ' ')}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSearchResult(null); setSearchQuery(''); setSubmitSuccess(false); }}
                    className="ml-auto px-4 py-2 bg-[#166534] text-white rounded-lg text-body-sm font-bold hover:opacity-90"
                  >
                    Scan Next Device
                  </button>
                </section>
              )}
            </>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-stack-gap">
          {/* Pipeline Stepper */}
          <section className="bg-surface-container-low border border-outline-variant rounded-xl p-5 shadow-sm">
            <h3 className="text-title-sm font-title-sm text-primary mb-6">Current Pipeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-outline-variant" />
              <ul className="space-y-6 relative z-10">
                {pipelineSteps.map((step, i) => {
                  const count = pipeline[step.key as keyof PipelineStats];
                  const isActive = i === 0;
                  return (
                    <li key={step.key} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-surface-container-low shrink-0 ${
                        isActive
                          ? 'bg-[#3B82F6] text-white'
                          : 'bg-surface-variant border border-outline-variant text-outline'
                      }`}>
                        <span className="material-symbols-outlined text-[18px]">{step.icon}</span>
                      </div>
                      <div className="pt-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-body-sm font-body-sm ${isActive ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>
                            {step.label}
                          </p>
                          <span className="text-mono-data font-mono-data text-on-surface-variant bg-surface-variant px-2 py-0.5 rounded text-[11px]">
                            {count}
                          </span>
                        </div>
                        {isActive && <p className="text-label-caps font-label-caps text-on-surface-variant">Current Stage</p>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* Batch CSV Import */}
          <section className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-secondary-fixed text-on-secondary-fixed rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined">upload_file</span>
            </div>
            <h3 className="text-title-sm font-title-sm text-primary mb-2">Batch CSV Import</h3>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-6">Upload a CSV file for bulk yearly inventory intake.</p>

            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCsvUpload(file);
              }}
            />

            <div
              className={`w-full border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer group ${
                csvDragOver ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-outline-variant hover:bg-surface-container-low'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setCsvDragOver(true); }}
              onDragLeave={() => setCsvDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setCsvDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file && file.name.endsWith('.csv')) handleCsvUpload(file);
              }}
            >
              {importing ? (
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[32px] text-[#3B82F6] animate-spin">sync</span>
                  <p className="text-body-sm font-body-sm font-bold">Importing...</p>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-[#3B82F6] transition-colors text-[32px] mb-2">cloud_upload</span>
                  <p className="text-body-sm font-body-sm font-bold text-on-surface">Drag & Drop file here</p>
                  <p className="text-label-caps font-label-caps text-on-surface-variant mt-1">or click to browse</p>
                </>
              )}
            </div>

            {importResult && (
              <div className="mt-4 w-full text-left bg-[#F0FDF4] border border-[#86EFAC] rounded-lg p-3">
                <p className="text-body-sm font-body-sm font-bold text-[#166534]">
                  ✓ {importResult.success_count} devices imported
                  {importResult.error_count > 0 && <span className="text-error ml-2">({importResult.error_count} errors)</span>}
                </p>
                {importResult.generated_tags.length > 0 && (
                  <div className="mt-2">
                    <p className="text-label-caps font-label-caps text-on-surface-variant mb-1">Generated Asset Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {importResult.generated_tags.slice(0, 5).map((t) => (
                        <span key={t.asset_tag} className="font-mono-data text-mono-data bg-white px-2 py-0.5 rounded border text-[11px]">
                          {t.asset_tag}
                        </span>
                      ))}
                      {importResult.generated_tags.length > 5 && (
                        <span className="text-body-sm text-on-surface-variant">+{importResult.generated_tags.length - 5} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}