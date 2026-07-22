export interface Equipment {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  status: 'Deployed' | 'In Workshop' | 'Overdue PM';
  site: string;
  lastInspection: string;
  nextPM: string;
  healthScore: number;
  model: string;
  manufacturer: string;
}

export interface MaintenanceJob {
  id: string;
  title: string;
  equipmentId: string;
  equipmentName: string;
  equipmentSerial: string;
  status: 'In Progress' | 'Waiting for Parts' | 'Under Inspection' | 'Completed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assigneeName: string;
  assigneeRole: string;
  progress: number;
  createdAt: string;
  description: string;
  partsRequired: string[];
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
  name: string;
  partNumber: string;
  stockLevel: number;
  minStock: number;
  unitPrice: number;
  category: string;
  location: string;
}
