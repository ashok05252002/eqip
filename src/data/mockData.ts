import type { Equipment, MaintenanceJob, ActivityLog, SparePart } from '../types';

export const initialEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Cameron 13-5/8" 10K BOP Stack',
    serialNumber: 'CAM-BOP-9081',
    category: 'Well Control',
    status: 'Deployed',
    site: 'Offshore Platform B',
    lastInspection: '2026-05-14',
    nextPM: '2026-08-14',
    healthScore: 94,
    model: 'U II Single BOP',
    manufacturer: 'Cameron'
  },
  {
    id: 'eq-2',
    name: 'NOV 3000HP Drawworks',
    serialNumber: 'NOV-DW-4410',
    category: 'Hosting Systems',
    status: 'In Workshop',
    site: 'Gulf Coast Central Workshop',
    lastInspection: '2026-07-10',
    nextPM: '2026-07-28',
    healthScore: 68,
    model: 'ADS-30D',
    manufacturer: 'National Oilwell Varco'
  },
  {
    id: 'eq-3',
    name: 'Halliburton HT-400 Mud Pump',
    serialNumber: 'HAL-MP-7721',
    category: 'Mud Circulation',
    status: 'Overdue PM',
    site: 'Permian Basin Rig 4',
    lastInspection: '2026-01-10',
    nextPM: '2026-07-10',
    healthScore: 45,
    model: 'HT-400 Triplex',
    manufacturer: 'Halliburton'
  },
  {
    id: 'eq-4',
    name: 'Caterpillar 3512C Generator',
    serialNumber: 'CAT-GEN-8849',
    category: 'Power Systems',
    status: 'Deployed',
    site: 'Bakken Field Rig 2',
    lastInspection: '2026-06-01',
    nextPM: '2026-09-01',
    healthScore: 89,
    model: '3512C HD Land',
    manufacturer: 'Caterpillar'
  },
  {
    id: 'eq-5',
    name: 'Schlumberger Wireline Winch Unit',
    serialNumber: 'SLB-WL-3022',
    category: 'Well Intervention',
    status: 'Deployed',
    site: 'Permian Basin Rig 4',
    lastInspection: '2026-06-18',
    nextPM: '2026-09-18',
    healthScore: 91,
    model: 'WinchMaster SE',
    manufacturer: 'Schlumberger'
  },
  {
    id: 'eq-6',
    name: 'FMC Flowline Plug Valve 3"',
    serialNumber: 'FMC-PV-0044',
    category: 'Flow Control',
    status: 'In Workshop',
    site: 'Gulf Coast Central Workshop',
    lastInspection: '2026-07-15',
    nextPM: '2026-08-15',
    healthScore: 72,
    model: 'ULTRA-TEMP 3',
    manufacturer: 'FMC Technologies'
  },
  {
    id: 'eq-7',
    name: 'GE Vetco Gray Christmas Tree 15K',
    serialNumber: 'GE-XM-6671',
    category: 'Wellhead Systems',
    status: 'Deployed',
    site: 'Offshore Platform B',
    lastInspection: '2026-04-20',
    nextPM: '2026-10-20',
    healthScore: 97,
    model: 'VG-15 Subsea',
    manufacturer: 'GE Oil & Gas'
  },
  {
    id: 'eq-8',
    name: 'NOV TDS-11SA Top Drive',
    serialNumber: 'NOV-TD-8812',
    category: 'Drilling Systems',
    status: 'Deployed',
    site: 'Permian Basin Rig 4',
    lastInspection: '2026-07-02',
    nextPM: '2026-10-02',
    healthScore: 88,
    model: 'TDS-11SA',
    manufacturer: 'National Oilwell Varco'
  },
  {
    id: 'eq-9',
    name: 'Swinney Mud Agitator 15HP',
    serialNumber: 'SWI-MA-1229',
    category: 'Mud Circulation',
    status: 'Deployed',
    site: 'Bakken Field Rig 2',
    lastInspection: '2026-06-25',
    nextPM: '2026-09-25',
    healthScore: 85,
    model: 'MA-15 Heavy Duty',
    manufacturer: 'Swinney Engineering'
  },
  {
    id: 'eq-10',
    name: 'Hydril GK Annular BOP 11"',
    serialNumber: 'HYD-BOP-4310',
    category: 'Well Control',
    status: 'Overdue PM',
    site: 'Offshore Platform B',
    lastInspection: '2026-01-12',
    nextPM: '2026-07-12',
    healthScore: 50,
    model: 'GK-11-5000',
    manufacturer: 'Hydril'
  }
];

export const initialJobs: MaintenanceJob[] = [
  {
    id: 'job-101',
    title: 'BOP Ram Seal Replacement',
    equipmentId: 'eq-1',
    equipmentName: 'Cameron 13-5/8" 10K BOP Stack',
    equipmentSerial: 'CAM-BOP-9081',
    status: 'In Progress',
    priority: 'Critical',
    assigneeName: 'Marcus Vance',
    assigneeRole: 'Senior Well Control Technician',
    progress: 45,
    createdAt: '2026-07-21',
    description: 'Replacing primary shear ram elastomer seals following pressure testing degradation detected during routine subsea monitoring.',
    partsRequired: ['BOP Ram Seal Kit 13-5/8"', 'Flange Gasket BX-159']
  },
  {
    id: 'job-102',
    title: 'Drawworks Main Drum Bearing Rebuild',
    equipmentId: 'eq-2',
    equipmentName: 'NOV 3000HP Drawworks',
    equipmentSerial: 'NOV-DW-4410',
    status: 'Waiting for Parts',
    priority: 'High',
    assigneeName: 'Sarah Jenkins',
    assigneeRole: 'Mechanical Lead',
    progress: 20,
    createdAt: '2026-07-18',
    description: 'Severe friction vibration detected on the main drum bearing. Disassembled bearing housing, awaiting heavy-duty roller bearings from supplier.',
    partsRequired: ['Heavy-Duty Spherical Roller Bearing', 'High-Temp Synthetic Grease']
  },
  {
    id: 'job-103',
    title: 'HT-400 Fluid End Inspection & Clean',
    equipmentId: 'eq-3',
    equipmentName: 'Halliburton HT-400 Mud Pump',
    equipmentSerial: 'HAL-MP-7721',
    status: 'Under Inspection',
    priority: 'High',
    assigneeName: 'Alex Mercer',
    assigneeRole: 'Reliability Engineer',
    progress: 75,
    createdAt: '2026-07-20',
    description: 'PM cycle overdue. Checking valves, seats, and plungers for micro-cracks or severe erosion. Hydrostatic test scheduled post-inspection.',
    partsRequired: ['Mud Pump Valve & Seat Kit', 'Plunger Packing Seal']
  },
  {
    id: 'job-104',
    title: 'Caterpillar Generator 250hr Service',
    equipmentId: 'eq-4',
    equipmentName: 'Caterpillar 3512C Generator',
    equipmentSerial: 'CAT-GEN-8849',
    status: 'Completed',
    priority: 'Medium',
    assigneeName: 'David Kojo',
    assigneeRole: 'Power Gen Technician',
    progress: 100,
    createdAt: '2026-07-19',
    description: 'Standard PM interval. Replaced fuel filters, oil filters, inspected air intakes, adjusted belt tension, and logged voltage outputs.',
    partsRequired: ['CAT Fuel Filter Element', 'Lube Oil Filter', '15W-40 Premium Engine Oil']
  },
  {
    id: 'job-105',
    title: 'Flowline Valve Body Leak Rectification',
    equipmentId: 'eq-6',
    equipmentName: 'FMC Flowline Plug Valve 3"',
    equipmentSerial: 'FMC-PV-0044',
    status: 'In Progress',
    priority: 'Medium',
    assigneeName: 'Sarah Jenkins',
    assigneeRole: 'Mechanical Lead',
    progress: 60,
    createdAt: '2026-07-22',
    description: 'Slight seepage reported around body flange connection. Cleaning seat pocket and installing new sealing elements.',
    partsRequired: ['Plug Valve Repair Kit 3"', 'Flange Gasket BX-154']
  },
  {
    id: 'job-106',
    title: 'Annular BOP Packing Unit Inspection',
    equipmentId: 'eq-10',
    equipmentName: 'Hydril GK Annular BOP 11"',
    equipmentSerial: 'HYD-BOP-4310',
    status: 'Under Inspection',
    priority: 'Critical',
    assigneeName: 'Marcus Vance',
    assigneeRole: 'Senior Well Control Technician',
    progress: 10,
    createdAt: '2026-07-22',
    description: 'Preventative Maintenance past due date. Removing annular packer unit to inspect for mechanical wear, rubber tearing, or chemical decay.',
    partsRequired: ['GK 11" Synthetic Packing Unit']
  }
];

export const initialParts: SparePart[] = [
  {
    id: 'prt-1',
    name: 'BOP Ram Seal Kit 13-5/8" 10K',
    partNumber: 'CAM-SK-1358-10',
    stockLevel: 4,
    minStock: 2,
    unitPrice: 3450.00,
    category: 'Well Control Elastomers',
    location: 'Aisle B - Row 3'
  },
  {
    id: 'prt-2',
    name: 'Heavy-Duty Spherical Roller Bearing',
    partNumber: 'SKF-SRB-8820',
    stockLevel: 0,
    minStock: 2,
    unitPrice: 1250.00,
    category: 'Bearings & Hardware',
    location: 'Aisle E - Row 1'
  },
  {
    id: 'prt-3',
    name: 'Mud Pump Valve & Seat Kit',
    partNumber: 'HAL-VS-HT400',
    stockLevel: 12,
    minStock: 5,
    unitPrice: 420.00,
    category: 'Pump Consumables',
    location: 'Aisle A - Row 5'
  },
  {
    id: 'prt-4',
    name: 'Flange Gasket BX-159',
    partNumber: 'BX-159-RING',
    stockLevel: 1,
    minStock: 4,
    unitPrice: 180.00,
    category: 'Gaskets & Seals',
    location: 'Aisle C - Row 2'
  },
  {
    id: 'prt-5',
    name: 'CAT Fuel Filter Element',
    partNumber: 'CAT-FF-3512',
    stockLevel: 25,
    minStock: 10,
    unitPrice: 45.00,
    category: 'Filters',
    location: 'Aisle D - Row 4'
  },
  {
    id: 'prt-6',
    name: 'GK 11" Synthetic Packing Unit',
    partNumber: 'HYD-PU-GK11',
    stockLevel: 2,
    minStock: 1,
    unitPrice: 8900.00,
    category: 'Well Control Elastomers',
    location: 'Aisle B - Row 4'
  },
  {
    id: 'prt-7',
    name: 'Plug Valve Repair Kit 3"',
    partNumber: 'FMC-RK-3PV',
    stockLevel: 5,
    minStock: 3,
    unitPrice: 620.00,
    category: 'Valves & Actuators',
    location: 'Aisle C - Row 6'
  },
  {
    id: 'prt-8',
    name: 'Lube Oil Filter',
    partNumber: 'CAT-OF-3512',
    stockLevel: 18,
    minStock: 10,
    unitPrice: 38.00,
    category: 'Filters',
    location: 'Aisle D - Row 4'
  }
];

export const initialLogs: ActivityLog[] = [
  {
    id: 'log-1',
    description: 'Equipment NOV 3000HP Drawworks (NOV-DW-4410) intake registered and assigned to Gulf Coast Central Workshop.',
    timestamp: '2026-07-22 11:32 AM',
    type: 'info',
    category: 'Intake'
  },
  {
    id: 'log-2',
    description: 'New maintenance job "Flowline Valve Body Leak Rectification" created for FMC Flowline Plug Valve (FMC-PV-0044).',
    timestamp: '2026-07-22 10:15 AM',
    type: 'success',
    category: 'Maintenance'
  },
  {
    id: 'log-3',
    description: 'CRITICAL ALERT: Annular BOP GK-11 (HYD-BOP-4310) has exceeded its preventative maintenance threshold of 180 days.',
    timestamp: '2026-07-22 08:00 AM',
    type: 'alert',
    category: 'Alert'
  },
  {
    id: 'log-4',
    description: 'Marcus Vance started task "BOP Ram Seal Replacement" on Cameron BOP Stack.',
    timestamp: '2026-07-21 03:45 PM',
    type: 'info',
    category: 'Maintenance'
  },
  {
    id: 'log-5',
    description: 'Spare Part "Heavy-Duty Spherical Roller Bearing" (SKF-SRB-8820) stock level dropped to 0 (Critical Reorder Threshold).',
    timestamp: '2026-07-21 09:12 AM',
    type: 'warning',
    category: 'Alert'
  },
  {
    id: 'log-6',
    description: 'Job completed: "Caterpillar Generator 250hr Service" (CAT-GEN-8849) signed off by David Kojo.',
    timestamp: '2026-07-19 04:30 PM',
    type: 'success',
    category: 'PM'
  },
  {
    id: 'log-7',
    description: 'Weekly pressure test certified for Christmas Tree 15K (GE-XM-6671) - Status: Excellent.',
    timestamp: '2026-07-18 11:00 AM',
    type: 'success',
    category: 'PM'
  }
];

export const sitesList = [
  'Permian Basin Rig 4',
  'Offshore Platform B',
  'Bakken Field Rig 2',
  'Gulf Coast Central Workshop'
];
