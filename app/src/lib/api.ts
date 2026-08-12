const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ============ Devices ============
export const devicesApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<{ devices: Device[]; total: number }>(`/devices${qs}`);
  },
  stats: () => request<DeviceStats>('/devices/stats'),
  search: (q: string) => request<{ devices: DeviceWithHistory[] }>(`/devices/search?q=${encodeURIComponent(q)}`),
  getById: (id: number) => request<DeviceDetail>(`/devices/${id}`),
  updateStatus: (id: number, data: Partial<Device>) =>
    request<{ device: Device }>(`/devices/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ============ Intake ============
export const intakeApi = {
  submitTriage: (data: TriageSubmission) =>
    request<TriageResult>('/intake/triage', { method: 'POST', body: JSON.stringify(data) }),
  recent: (limit?: number) =>
    request<{ logs: IntakeLog[] }>(`/intake/recent${limit ? `?limit=${limit}` : ''}`),
  pipelineStats: () => request<PipelineStats>('/intake/pipeline-stats'),
};

// ============ Repairs ============
export const repairsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<{ repairs: Repair[] }>(`/repairs${qs}`);
  },
  stats: () => request<RepairStats>('/repairs/stats'),
  create: (data: { device_id: number; issue: string; issue_category?: string; assigned_to?: number }) =>
    request<{ success: boolean; repair_id: number }>('/repairs', { method: 'POST', body: JSON.stringify(data) }),
  complete: (id: number, notes?: string) =>
    request<{ success: boolean }>(`/repairs/${id}/complete`, { method: 'PUT', body: JSON.stringify({ resolution_notes: notes }) }),
  markUnrepairable: (id: number) =>
    request<{ success: boolean }>(`/repairs/${id}/unrepairable`, { method: 'PUT' }),
  linkDonor: (repairId: number, data: { donor_device_id: number; part_harvested: string; notes?: string }) =>
    request<{ success: boolean; donor_link_id: number }>(`/repairs/${repairId}/donor`, { method: 'POST', body: JSON.stringify(data) }),
  parts: () => request<{ parts: HarvestedPart[] }>('/repairs/parts'),
};

// ============ Assignments ============
export const assignmentsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<{ assignments: Assignment[]; total: number }>(`/assignments${qs}`);
  },
  preview: (academicYear?: string) =>
    request<AssignmentPreview>('/assignments/preview', {
      method: 'POST',
      body: JSON.stringify({ academic_year: academicYear || '2025-2026' }),
    }),
  execute: (academicYear: string, assignments: ProposedAssignment[]) =>
    request<{ success: boolean; assigned_count: number }>('/assignments/execute', {
      method: 'POST',
      body: JSON.stringify({ academic_year: academicYear, assignments }),
    }),
  rules: () => request<AssignmentRules>('/assignments/rules'),
  history: (studentId: string) => request<StudentHistory>(`/assignments/history/${studentId}`),
};

// ============ Import ============
export const importApi = {
  uploadCsv: async (file: File, importedBy?: number) => {
    const formData = new FormData();
    formData.append('file', file);
    if (importedBy) formData.append('imported_by', String(importedBy));

    const res = await fetch(`${API_BASE}/import/csv`, { method: 'POST', body: formData });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message);
    }
    return res.json() as Promise<ImportResult>;
  },
  history: () => request<{ batches: ImportBatch[] }>('/import/history'),
};

// ============ Types ============
export interface Device {
  id: number;
  asset_tag: string;
  serial_number: string;
  model: string;
  device_type: string;
  manufacturer: string;
  status: string;
  condition: string;
  damage_details: string[] | null;
  is_new: boolean;
  purchase_date: string;
  warranty_expiry: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeviceWithHistory extends Device {
  assignment_history: Array<{
    student_name: string;
    student_id: string;
    grade: number;
    academic_year: string;
    assigned_date: string;
    returned_date: string | null;
  }> | null;
}

export interface DeviceDetail {
  device: Device;
  assignments: Array<Assignment & { first_name: string; last_name: string; student_id: string; grade: number }>;
  repairs: Array<Repair & { technician: string }>;
  intakeLogs: IntakeLog[];
}

export interface DeviceStats {
  total: number;
  healthy: number;
  inRepair: number;
  newDevices: number;
  donorDevices: number;
  warrantyActive: number;
  warrantyPercent: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
}

export interface TriageSubmission {
  device_id: number;
  condition: 'healthy' | 'minor_damage' | 'major_damage' | 'needs_powerwash';
  triage_notes?: string;
  triaged_by?: number;
}

export interface TriageResult {
  success: boolean;
  intake_log_id: number;
  previous_status: string;
  new_status: string;
}

export interface IntakeLog {
  id: number;
  device_id: number;
  triaged_by: number | null;
  previous_status: string;
  new_status: string;
  condition: string;
  triage_notes: string | null;
  created_at: string;
  asset_tag?: string;
  serial_number?: string;
  model?: string;
  triaged_by_name?: string;
}

export interface PipelineStats {
  triage: number;
  repair: number;
  clean: number;
  ready: number;
}

export interface Repair {
  id: number;
  device_id: number;
  issue: string;
  issue_category: string;
  status: string;
  assigned_to: number | null;
  resolution_notes: string | null;
  completed_at: string | null;
  created_at: string;
  asset_tag?: string;
  serial_number?: string;
  model?: string;
  device_type?: string;
  technician_name?: string;
}

export interface RepairStats {
  inRepair: number;
  awaitingParts: number;
  donorDevices: number;
  partsNeeded: Array<{ issue_category: string; count: number }>;
}

export interface HarvestedPart {
  part_harvested: string;
  available_count: number;
  donor_models: string;
}

export interface Assignment {
  id: number;
  student_id: number;
  device_id: number;
  academic_year: string;
  assignment_type: string;
  assigned_date: string;
  returned_date: string | null;
  is_current: boolean;
  first_name?: string;
  last_name?: string;
  student_display_id?: string;
  grade?: number;
  asset_tag?: string;
  serial_number?: string;
  model?: string;
  device_type?: string;
}

export interface ProposedAssignment {
  student_id: number;
  student_display_id: string;
  student_name: string;
  grade: number;
  device_id: number;
  asset_tag: string;
  model: string;
  assignment_type: string;
  rule: number;
  rule_label: string;
  reason?: string;
}

export interface AssignmentPreview {
  proposed: ProposedAssignment[];
  warnings: string[];
  stats: { rule1: number; rule2: number; rule3: number; unassigned: number };
  summary: { total_students: number; total_assigned: number; total_unassigned: number };
}

export interface AssignmentRules {
  rules: Array<{
    id: number;
    name: string;
    description: string;
    grade_filter: number[];
    device_pool: string;
    priority: number;
  }>;
  pools: { new_devices: number; lenovo_stock: number; recycled_healthy: number };
  total_students: number;
}

export interface StudentHistory {
  student: { id: number; student_id: string; first_name: string; last_name: string; grade: number };
  history: Array<Assignment & { device_status: string }>;
}

export interface ImportResult {
  success: boolean;
  batch_id: number;
  total_rows: number;
  success_count: number;
  error_count: number;
  generated_tags: Array<{ row: number; serial_number: string; asset_tag: string }>;
  errors: Array<{ row: number; error: string }>;
}

export interface ImportBatch {
  id: number;
  filename: string;
  row_count: number;
  success_count: number;
  error_count: number;
  status: string;
  created_at: string;
  imported_by_name?: string;
}
