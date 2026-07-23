export interface DeploymentRecord {
  id: string;
  type: 'Intake to Workshop' | 'Dispatch to Customer Site' | 'Site Transfer';
  date: string;
  customer: string;
  site: string;
  location: string;
  meterReading: number;
  recordedBy: string;
  notes: string;
}

export interface Equipment {
  id: string;
  assetNumber: string;
  name: string;
  serialNumber: string;
  category: string;
  type: string;
  status: 'Operational' | 'In Workshop' | 'Under Maintenance' | 'Decommissioned';
  site: string;
  currentLocation: string;
  lastInspection: string;
  nextPM: string;
  healthScore: number;
  model: string;
  manufacturer: string;
  engineNumber?: string;
  chassisNumber?: string;
  manufacturingYear?: number;
  purchaseDate?: string;
  warrantyExpiry?: string;
  warrantyDetails?: string;
  customer?: string;
  imageUrl?: string;
  operatingHours?: number;
  daysSinceService?: number;
  activeJobsCount?: number;
  lifetimePartsReplaced?: number;
  deploymentHistory?: DeploymentRecord[];
}

export interface ServiceRecord {
  id: string;
  date: string;
  description: string;
  engineer: string;
  notes: string;
}

export interface PartHistory {
  id: string;
  partName: string;
  removedSerial: string;
  installedSerial: string;
  installDate: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  type: 'PDF' | 'Image' | 'Certificate';
  url: string;
  dateAdded: string;
}

export interface ProgressLogEntry {
  id: string;
  timestamp: string;
  progress: number;
  status: 'Open' | 'In Progress' | 'Waiting for Parts' | 'Under Inspection' | 'Completed';
  stage: string;
  notes: string;
  engineerName: string;
}

export interface MaintenanceJob {
  id: string;
  title: string;
  equipmentId: string;
  equipmentName: string;
  equipmentSerial: string;
  status: 'Open' | 'In Progress' | 'Waiting for Parts' | 'Under Inspection' | 'Completed';
  type: 'Preventive' | 'Corrective' | 'Breakdown' | 'Inspection' | 'Overhaul' | 'Calibration';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assigneeName: string;
  assigneeRole: string;
  progress: number;
  createdAt: string;
  description: string;
  partsRequired: string[];
  progressLogs?: ProgressLogEntry[];
}

export interface ActivityLog {
  id: string;
  description: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  category: 'Intake' | 'Maintenance' | 'PM' | 'Alert';
}

export interface SparePart {
  id: string;
  partNumber: string;
  description: string;
  manufacturer: string;
  batchNumber: string;
  stockQty: number;
  uom: string;
  reorderPoint: number;
  warehouseLocation: string;
  unitCost: number;
}

export interface PartUsageRecord {
  id: string;
  jobId: string;
  equipmentId: string;
  partId: string;
  partNumber: string;
  description: string;
  qtyConsumed: number;
  uom: string;
  installedSerialNo: string;
  removedSerialNo: string;
  installedDate: string;
  installedBy: string;
  warrantyExpiryDate: string;
}

export interface PMScheduleRule {
  id: string;
  equipmentId: string;
  equipmentName: string;
  category: string;
  triggerType: 'Calendar' | 'Hours' | 'Kilometers';
  intervalValue: number;
  lastServicedMetric: number | string;
  nextDueMetric: number | string;
  status: 'On Schedule' | 'Upcoming Due' | 'Overdue';
  reminderDaysAhead: number;
}

export interface PMAlert {
  id: string;
  scheduleId: string;
  equipmentId: string;
  alertType: 'Overdue' | 'Upcoming' | 'Intake Received' | 'Job Completed';
  message: string;
  timestamp: string;
  channel: 'Dashboard' | 'Email';
  readStatus: boolean;
}

export interface IntakeRecord {
  id: string;
  jobRef: string;
  dateReceived: string;
  timeReceived: string;
  equipmentId: string;
  equipmentName: string;
  customer: string;
  site: string;
  meterReading: number;
  reportedFault: string;
  receivingEngineer: string;
  status: 'Pending Diagnostic' | 'Assigned to Job' | 'Inspected';
}

export type ReportCategory = 'Equipment' | 'Maintenance' | 'Spare Parts';

export interface ReportFilter {
  dateRangeStart?: string;
  dateRangeEnd?: string;
  datePreset: 'This Month' | 'Last Quarter' | 'Year to Date' | 'Custom Range';
  customerId?: string;
  siteId?: string;
  equipmentId?: string;
  maintenanceType?: string;
}

export interface ReportSummaryItem {
  id: string;
  code: string;
  equipmentName: string;
  customer: string;
  site: string;
  date: string;
  maintenanceType: string;
  partsCost: number;
  laborHours: number;
  status: 'Completed' | 'In Progress' | 'Overdue' | 'Active';
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  siteLocations: number;
}

export interface Site {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  location: string;
  region: string;
  contactName: string;
  contactPhone: string;
}

export interface MaintenanceType {
  id: string;
  name: string;
  description: string;
  active: boolean;
}
