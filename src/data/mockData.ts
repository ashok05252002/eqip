import type { Equipment, MaintenanceJob, ActivityLog, SparePart, ServiceRecord, PartHistory, DocumentRecord, IntakeRecord, PartUsageRecord, PMScheduleRule, PMAlert, ReportSummaryItem, Customer, Site, MaintenanceType } from '../types';

export const initialEquipment: Equipment[] = [
  {
    id: 'eq-1',
    assetNumber: 'AST-2018-0012',
    name: 'Cameron 13-5/8" 10K BOP Stack',
    serialNumber: 'CAM-BOP-9081',
    category: 'Well Control',
    type: 'Blowout Preventer',
    status: 'Operational',
    site: 'Offshore Platform B',
    currentLocation: 'Platform B - Deck 1',
    lastInspection: '2026-05-14',
    nextPM: '2026-08-14',
    healthScore: 94,
    model: 'U II Single BOP',
    manufacturer: 'Cameron',
    engineNumber: 'N/A',
    chassisNumber: 'CAM-CH-8821A',
    manufacturingYear: 2018,
    purchaseDate: '2019-02-15',
    warrantyExpiry: '2024-02-15',
    warrantyDetails: '5-Year Manufacturer Warranty (Expired)',
    customer: 'Aramco',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=400',
    operatingHours: 14500,
    daysSinceService: 45,
    activeJobsCount: 1,
    lifetimePartsReplaced: 12,
    deploymentHistory: [
      {
        id: 'dep-101',
        type: 'Intake to Workshop',
        date: '2026-06-01',
        customer: 'Aramco',
        site: 'Central Workshop Bay 2',
        location: 'Dammam Workshop Facility',
        meterReading: 14200,
        recordedBy: 'Ahmed Al-Sayed',
        notes: 'Received for scheduled 500h preventive maintenance & seal replacement.'
      },
      {
        id: 'dep-100',
        type: 'Dispatch to Customer Site',
        date: '2025-11-15',
        customer: 'Aramco',
        site: 'Offshore Platform B',
        location: 'Arabian Gulf Block 4',
        meterReading: 11000,
        recordedBy: 'Michael Vance',
        notes: 'Dispatched following complete workshop overhaul & hydro-test certification.'
      }
    ]
  },
  {
    id: 'eq-2',
    assetNumber: 'AST-2021-0994',
    name: 'NOV 3000HP Drawworks',
    serialNumber: 'NOV-DW-4410',
    category: 'Hosting Systems',
    type: 'AC Drawworks',
    status: 'In Workshop',
    site: 'Gulf Coast Central Workshop',
    currentLocation: 'Workshop Bay 3',
    lastInspection: '2026-07-10',
    nextPM: '2026-07-28',
    healthScore: 68,
    model: 'ADS-30D',
    manufacturer: 'National Oilwell Varco',
    engineNumber: 'GE-M-88992',
    chassisNumber: 'NOV-CH-441',
    manufacturingYear: 2021,
    purchaseDate: '2021-08-10',
    warrantyExpiry: '2026-08-10',
    warrantyDetails: '5-Year Extended Comprehensive Warranty',
    customer: 'ExxonMobil',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400',
    operatingHours: 8500,
    daysSinceService: 12,
    activeJobsCount: 2,
    lifetimePartsReplaced: 8,
    deploymentHistory: [
      {
        id: 'dep-201',
        type: 'Intake to Workshop',
        date: '2026-07-10',
        customer: 'ExxonMobil',
        site: 'Gulf Coast Central Workshop',
        location: 'Workshop Bay 3',
        meterReading: 8500,
        recordedBy: 'Sarah Jenkins',
        notes: 'Received from Permian Rig 4 due to main brake disc wear.'
      }
    ]
  },
  {
    id: 'eq-3',
    assetNumber: 'AST-2016-0044',
    name: 'Halliburton HT-400 Mud Pump',
    serialNumber: 'HAL-MP-7721',
    category: 'Mud Circulation',
    type: 'Triplex Pump',
    status: 'Under Maintenance',
    site: 'Permian Basin Rig 4',
    currentLocation: 'Rig 4 - Mud Pit Area',
    lastInspection: '2026-01-10',
    nextPM: '2026-07-10',
    healthScore: 45,
    model: 'HT-400 Triplex',
    manufacturer: 'Halliburton',
    engineNumber: 'CAT-E-7721',
    chassisNumber: 'HAL-CH-1002',
    manufacturingYear: 2015,
    purchaseDate: '2016-01-20',
    warrantyExpiry: '2021-01-20',
    warrantyDetails: 'Standard 5-Year Warranty (Expired)',
    customer: 'Chevron',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
    operatingHours: 22000,
    daysSinceService: 180,
    activeJobsCount: 1,
    lifetimePartsReplaced: 45
  },
  {
    id: 'eq-4',
    assetNumber: 'AST-2023-0102',
    name: 'Caterpillar 3512C Generator',
    serialNumber: 'CAT-GEN-8849',
    category: 'Power Systems',
    type: 'Diesel Generator Set',
    status: 'Operational',
    site: 'Bakken Field Rig 2',
    currentLocation: 'Rig 2 - Power Control Room',
    lastInspection: '2026-06-01',
    nextPM: '2026-09-01',
    healthScore: 89,
    model: '3512C HD Land',
    manufacturer: 'Caterpillar',
    engineNumber: 'CAT-3512-8849',
    chassisNumber: 'CAT-CH-8849',
    manufacturingYear: 2023,
    purchaseDate: '2023-11-05',
    warrantyExpiry: '2028-11-05',
    warrantyDetails: 'Platinum 5-Year Powertrain Warranty',
    customer: 'BP',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
    operatingHours: 4200,
    daysSinceService: 30,
    activeJobsCount: 0,
    lifetimePartsReplaced: 2
  },
  {
    id: 'eq-5',
    assetNumber: 'AST-2022-0055',
    name: 'Schlumberger Wireline Winch Unit',
    serialNumber: 'SLB-WL-3022',
    category: 'Well Intervention',
    type: 'Offshore Winch Unit',
    status: 'Operational',
    site: 'Offshore Platform Alpha',
    currentLocation: 'Platform Alpha - Lower Deck',
    lastInspection: '2026-07-15',
    nextPM: '2026-10-15',
    healthScore: 92,
    model: 'MAX-4000',
    manufacturer: 'Schlumberger',
    engineNumber: 'N/A',
    chassisNumber: 'SLB-CH-3022',
    manufacturingYear: 2022,
    purchaseDate: '2022-05-10',
    warrantyExpiry: '2025-05-10',
    warrantyDetails: '3-Year Standard Manufacturer Warranty',
    customer: 'ExxonMobil',
    imageUrl: 'https://images.unsplash.com/photo-1581092335878-2d9fd86aecf3?auto=format&fit=crop&q=80&w=400',
    operatingHours: 1200,
    daysSinceService: 7,
    activeJobsCount: 0,
    lifetimePartsReplaced: 1
  },
  {
    id: 'eq-6',
    assetNumber: 'AST-9921',
    name: 'FMC Flowline Plug Valve 3"',
    serialNumber: 'FMC-PV-0044',
    category: 'Flow Control',
    type: 'Valve',
    status: 'In Workshop',
    site: 'Gulf Coast Central Workshop',
    currentLocation: 'Workshop',
    lastInspection: '2026-07-15',
    nextPM: '2026-08-15',
    healthScore: 72,
    model: 'ULTRA-TEMP 3',
    manufacturer: 'FMC Technologies',
    engineNumber: 'N/A',
    chassisNumber: 'N/A',
    manufacturingYear: 2022,
    purchaseDate: '2022-10-01',
    warrantyExpiry: '2027-10-01',
    customer: 'ExxonMobil',
    operatingHours: 3200,
    daysSinceService: 5,
    activeJobsCount: 1,
    lifetimePartsReplaced: 0
  },
  {
    id: 'eq-7',
    assetNumber: 'AST-7734',
    name: 'GE Vetco Gray Christmas Tree 15K',
    serialNumber: 'GE-XM-6671',
    category: 'Wellhead Systems',
    type: 'Wellhead',
    status: 'Operational',
    site: 'Offshore Platform B',
    currentLocation: 'Well 2B',
    lastInspection: '2026-04-20',
    nextPM: '2026-10-20',
    healthScore: 97,
    model: 'VG-15 Subsea',
    manufacturer: 'GE Oil & Gas',
    engineNumber: 'N/A',
    chassisNumber: 'N/A',
    manufacturingYear: 2019,
    purchaseDate: '2019-12-15',
    warrantyExpiry: '2029-12-15',
    customer: 'Aramco',
    operatingHours: 41000,
    daysSinceService: 88,
    activeJobsCount: 0,
    lifetimePartsReplaced: 2
  },
  {
    id: 'eq-8',
    assetNumber: 'AST-5511',
    name: 'NOV TDS-11SA Top Drive',
    serialNumber: 'NOV-TD-8812',
    category: 'Drilling Systems',
    type: 'Top Drive',
    status: 'Operational',
    site: 'Bakken Field Rig 2',
    currentLocation: 'Rig 2',
    lastInspection: '2026-05-05',
    nextPM: '2026-08-05',
    healthScore: 84,
    model: 'TDS-11SA',
    manufacturer: 'National Oilwell Varco',
    engineNumber: 'AC-MT-119',
    chassisNumber: 'NOV-CH-8812',
    manufacturingYear: 2016,
    purchaseDate: '2016-06-30',
    warrantyExpiry: '2021-06-30',
    customer: 'BP',
    operatingHours: 28500,
    daysSinceService: 60,
    activeJobsCount: 0,
    lifetimePartsReplaced: 15
  },
  {
    id: 'eq-9',
    assetNumber: 'AST-3329',
    name: 'Swaco Mongoose Shale Shaker',
    serialNumber: 'SWA-SH-1229',
    category: 'Solid Control',
    type: 'Shaker',
    status: 'Operational',
    site: 'Permian Basin Rig 4',
    currentLocation: 'Rig 4',
    lastInspection: '2026-06-10',
    nextPM: '2026-07-25',
    healthScore: 79,
    model: 'Mongoose PRO',
    manufacturer: 'M-I SWACO',
    engineNumber: 'WEG-M-1229',
    chassisNumber: 'SWI-CH-1229',
    manufacturingYear: 2021,
    purchaseDate: '2021-03-14',
    warrantyExpiry: '2026-03-14',
    customer: 'Chevron',
    operatingHours: 7800,
    daysSinceService: 35,
    activeJobsCount: 0,
    lifetimePartsReplaced: 1
  },
  {
    id: 'eq-10',
    assetNumber: 'AST-1100',
    name: 'Hydril GK Annular BOP 11"',
    serialNumber: 'HYD-BOP-4310',
    category: 'Well Control',
    type: 'BOP',
    status: 'Under Maintenance',
    site: 'Offshore Platform B',
    currentLocation: 'Workshop',
    lastInspection: '2026-01-12',
    nextPM: '2026-07-12',
    healthScore: 50,
    model: 'GK-11-5000',
    manufacturer: 'Hydril',
    engineNumber: 'N/A',
    chassisNumber: 'HYD-CH-4310',
    manufacturingYear: 2017,
    purchaseDate: '2017-08-22',
    warrantyExpiry: '2022-08-22',
    customer: 'Aramco',
    operatingHours: 18000,
    daysSinceService: 190,
    activeJobsCount: 1,
    lifetimePartsReplaced: 6
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
    type: 'Corrective',
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
    type: 'Breakdown',
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
    type: 'Preventive',
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
    type: 'Preventive',
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
    status: 'Open',
    type: 'Corrective',
    priority: 'Medium',
    assigneeName: 'Sarah Jenkins',
    assigneeRole: 'Mechanical Lead',
    progress: 0,
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
    status: 'Open',
    type: 'Inspection',
    priority: 'Critical',
    assigneeName: 'Marcus Vance',
    assigneeRole: 'Senior Well Control Technician',
    progress: 0,
    createdAt: '2026-07-22',
    description: 'Preventative Maintenance past due date. Removing annular packer unit to inspect for mechanical wear, rubber tearing, or chemical decay.',
    partsRequired: ['GK 11" Synthetic Packing Unit']
  }
];

export const initialParts: SparePart[] = [
  {
    id: 'prt-1',
    partNumber: 'CAM-SK-1358-10',
    description: 'BOP Ram Seal Kit 13-5/8" 10K',
    manufacturer: 'Cameron',
    batchNumber: 'B-2025-X01',
    stockQty: 4,
    uom: 'Kit',
    reorderPoint: 2,
    warehouseLocation: 'Aisle B - Row 3',
    unitCost: 3450.00
  },
  {
    id: 'prt-2',
    partNumber: 'SKF-SRB-8820',
    description: 'Heavy-Duty Spherical Roller Bearing',
    manufacturer: 'SKF',
    batchNumber: 'B-2024-M44',
    stockQty: 0,
    uom: 'Each',
    reorderPoint: 2,
    warehouseLocation: 'Aisle E - Row 1',
    unitCost: 1250.00
  },
  {
    id: 'prt-3',
    partNumber: 'HAL-VS-HT400',
    description: 'Mud Pump Valve & Seat Kit',
    manufacturer: 'Halliburton',
    batchNumber: 'B-2025-Y12',
    stockQty: 12,
    uom: 'Set',
    reorderPoint: 5,
    warehouseLocation: 'Aisle A - Row 5',
    unitCost: 420.00
  },
  {
    id: 'prt-4',
    partNumber: 'BX-159-RING',
    description: 'Flange Gasket BX-159',
    manufacturer: 'Flexitallic',
    batchNumber: 'B-2026-A01',
    stockQty: 1,
    uom: 'Each',
    reorderPoint: 4,
    warehouseLocation: 'Aisle C - Row 2',
    unitCost: 180.00
  },
  {
    id: 'prt-5',
    partNumber: 'CAT-FF-3512',
    description: 'CAT Fuel Filter Element',
    manufacturer: 'Caterpillar',
    batchNumber: 'B-2026-F99',
    stockQty: 25,
    uom: 'Each',
    reorderPoint: 10,
    warehouseLocation: 'Aisle D - Row 4',
    unitCost: 45.00
  },
  {
    id: 'prt-6',
    partNumber: 'HYD-PU-GK11',
    description: 'GK 11" Synthetic Packing Unit',
    manufacturer: 'Hydril',
    batchNumber: 'B-2025-H82',
    stockQty: 2,
    uom: 'Each',
    reorderPoint: 1,
    warehouseLocation: 'Aisle B - Row 4',
    unitCost: 8900.00
  },
  {
    id: 'prt-7',
    partNumber: 'FMC-RK-3PV',
    description: 'Plug Valve Repair Kit 3"',
    manufacturer: 'FMC Technologies',
    batchNumber: 'B-2025-V05',
    stockQty: 5,
    uom: 'Kit',
    reorderPoint: 3,
    warehouseLocation: 'Aisle C - Row 6',
    unitCost: 620.00
  },
  {
    id: 'prt-8',
    partNumber: 'CAT-OF-3512',
    description: 'Lube Oil Filter',
    manufacturer: 'Caterpillar',
    batchNumber: 'B-2026-F98',
    stockQty: 18,
    uom: 'Each',
    reorderPoint: 10,
    warehouseLocation: 'Aisle D - Row 4',
    unitCost: 38.00
  }
];

export const mockPartUsageRecords: PartUsageRecord[] = [
  {
    id: 'usg-1',
    jobId: 'JOB-2025-1102',
    equipmentId: 'eq-1',
    partId: 'prt-1',
    partNumber: 'CAM-SK-1358-10',
    description: 'BOP Ram Seal Kit 13-5/8" 10K',
    qtyConsumed: 1,
    uom: 'Kit',
    installedSerialNo: 'CAM-S-2025-882',
    removedSerialNo: 'CAM-S-2023-441',
    installedDate: '2025-11-12',
    installedBy: 'Marcus Vance',
    warrantyExpiryDate: '2026-11-12'
  },
  {
    id: 'usg-2',
    jobId: 'JOB-2026-0219',
    equipmentId: 'eq-1',
    partId: 'prt-4',
    partNumber: 'BX-159-RING',
    description: 'Flange Gasket BX-159',
    qtyConsumed: 2,
    uom: 'Each',
    installedSerialNo: 'N/A',
    removedSerialNo: 'N/A',
    installedDate: '2026-02-28',
    installedBy: 'Sarah Jenkins',
    warrantyExpiryDate: '2027-02-28'
  },
  {
    id: 'usg-3',
    jobId: 'JOB-2026-0505',
    equipmentId: 'eq-4',
    partId: 'prt-5',
    partNumber: 'CAT-FF-3512',
    description: 'CAT Fuel Filter Element',
    qtyConsumed: 4,
    uom: 'Each',
    installedSerialNo: 'N/A',
    removedSerialNo: 'N/A',
    installedDate: '2026-05-14',
    installedBy: 'David Kojo',
    warrantyExpiryDate: '2026-11-14'
  }
];

export const mockPMRules: PMScheduleRule[] = [
  {
    id: 'pm-1',
    equipmentId: 'eq-1',
    equipmentName: 'Top Drive System TDS-11SA',
    category: 'Preventive',
    triggerType: 'Hours',
    intervalValue: 500,
    lastServicedMetric: 4200,
    nextDueMetric: 4700,
    status: 'Overdue',
    reminderDaysAhead: 50
  },
  {
    id: 'pm-2',
    equipmentId: 'eq-2',
    equipmentName: 'Drawworks 3000 HP',
    category: 'Inspection',
    triggerType: 'Calendar',
    intervalValue: 90,
    lastServicedMetric: '2026-05-10',
    nextDueMetric: '2026-08-08',
    status: 'Upcoming Due',
    reminderDaysAhead: 14
  },
  {
    id: 'pm-3',
    equipmentId: 'eq-3',
    equipmentName: 'Mud Pump Triplex #1',
    category: 'Overhaul',
    triggerType: 'Hours',
    intervalValue: 2000,
    lastServicedMetric: 8000,
    nextDueMetric: 10000,
    status: 'On Schedule',
    reminderDaysAhead: 100
  },
  {
    id: 'pm-4',
    equipmentId: 'eq-5',
    equipmentName: 'Diesel Generator Set #1',
    category: 'Preventive',
    triggerType: 'Hours',
    intervalValue: 250,
    lastServicedMetric: 1250,
    nextDueMetric: 1500,
    status: 'Upcoming Due',
    reminderDaysAhead: 25
  },
  {
    id: 'pm-5',
    equipmentId: 'eq-6',
    equipmentName: '13-5/8" 10K Annular BOP',
    category: 'Calibration',
    triggerType: 'Calendar',
    intervalValue: 180,
    lastServicedMetric: '2026-01-15',
    nextDueMetric: '2026-07-14',
    status: 'Overdue',
    reminderDaysAhead: 14
  }
];

export const mockPMAlerts: PMAlert[] = [
  {
    id: 'al-1',
    scheduleId: 'pm-1',
    equipmentId: 'eq-1',
    alertType: 'Overdue',
    message: 'Overdue: Top Drive TDS-11SA passed 4700h mark by 18 hours',
    timestamp: '2 hours ago',
    channel: 'Dashboard',
    readStatus: false
  },
  {
    id: 'al-2',
    scheduleId: 'pm-5',
    equipmentId: 'eq-6',
    alertType: 'Overdue',
    message: 'Overdue: Annular BOP requires mandatory 6-month calibration',
    timestamp: '1 day ago',
    channel: 'Dashboard',
    readStatus: false
  },
  {
    id: 'al-3',
    scheduleId: 'pm-2',
    equipmentId: 'eq-2',
    alertType: 'Upcoming',
    message: 'Upcoming: Drawworks 90-day Inspection due in 12 days',
    timestamp: '3 hours ago',
    channel: 'Email',
    readStatus: true
  },
  {
    id: 'al-4',
    scheduleId: 'pm-4',
    equipmentId: 'eq-5',
    alertType: 'Upcoming',
    message: 'Upcoming: Generator #1 Oil Change due in 20 hours',
    timestamp: '4 hours ago',
    channel: 'Dashboard',
    readStatus: false
  }
];

export const mockReportData: ReportSummaryItem[] = [
  {
    id: 'rep-1',
    code: 'JOB-2026-0891',
    equipmentName: 'Top Drive System TDS-11SA',
    customer: 'Aramco',
    site: 'Ghawar Site #12',
    date: '2026-07-20',
    maintenanceType: 'Corrective',
    partsCost: 12500,
    laborHours: 14.5,
    status: 'Completed'
  },
  {
    id: 'rep-2',
    code: 'JOB-2026-0895',
    equipmentName: 'Mud Pump Triplex #1',
    customer: 'ADNOC',
    site: 'Rig 4',
    date: '2026-07-21',
    maintenanceType: 'Preventive',
    partsCost: 3200,
    laborHours: 8.0,
    status: 'In Progress'
  },
  {
    id: 'rep-3',
    code: 'JOB-2026-0810',
    equipmentName: 'Drawworks 3000 HP',
    customer: 'Baker Hughes',
    site: 'Offshore Platform Alpha',
    date: '2026-07-15',
    maintenanceType: 'Inspection',
    partsCost: 0,
    laborHours: 24.0,
    status: 'Overdue'
  },
  {
    id: 'rep-4',
    code: 'JOB-2026-0902',
    equipmentName: 'Diesel Generator Set #1',
    customer: 'Aramco',
    site: 'Ghawar Site #12',
    date: '2026-07-22',
    maintenanceType: 'Preventive',
    partsCost: 850,
    laborHours: 4.5,
    status: 'Active'
  },
  {
    id: 'rep-5',
    code: 'JOB-2026-0777',
    equipmentName: '13-5/8" 10K Annular BOP',
    customer: 'ADNOC',
    site: 'Rig 4',
    date: '2026-07-01',
    maintenanceType: 'Calibration',
    partsCost: 150,
    laborHours: 6.0,
    status: 'Completed'
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

export const mockServiceHistory: ServiceRecord[] = [
  { id: 'srv-1', date: '2025-11-12', description: 'Annual Full Strip Down & Inspection', engineer: 'Marcus Vance', notes: 'Found slight wear on secondary seals. Replaced and tested to 10,000 PSI.' },
  { id: 'srv-2', date: '2026-02-28', description: 'Hydraulic Line Replacement', engineer: 'Sarah Jenkins', notes: 'Replaced line #4 due to abrasion. Cleaned manifold.' },
  { id: 'srv-3', date: '2026-05-14', description: 'Quarterly PM and Calibration', engineer: 'David Kojo', notes: 'All sensors calibrated. System nominal.' }
];

export const mockPartHistory: PartHistory[] = [
  { id: 'ph-1', partName: 'Primary Shear Ram Seal', removedSerial: 'SRS-2023-441', installedSerial: 'SRS-2025-882', installDate: '2025-11-12' },
  { id: 'ph-2', partName: 'Hydraulic Hose 5/8"', removedSerial: 'HH-001', installedSerial: 'HH-045', installDate: '2026-02-28' },
  { id: 'ph-3', partName: 'Pressure Transducer', removedSerial: 'PT-9902', installedSerial: 'PT-1123', installDate: '2026-05-14' }
];

export const mockDocuments: DocumentRecord[] = [
  { id: 'doc-1', title: 'OEM Service Manual V2.4', type: 'PDF', url: '#', dateAdded: '2019-02-16' },
  { id: 'doc-2', title: 'API 16A Certification', type: 'Certificate', url: '#', dateAdded: '2024-01-10' },
  { id: 'doc-3', title: 'Q1 2026 Inspection Photos', type: 'Image', url: '#', dateAdded: '2026-05-15' },
  { id: 'doc-4', title: 'Hydraulic Schematic diagram', type: 'PDF', url: '#', dateAdded: '2019-02-16' }
];

export const engineersList = [
  'Marcus Vance',
  'Sarah Jenkins',
  'David Kojo',
  'Elena Rostova'
];

export const mockIntakeRecords: IntakeRecord[] = [
  {
    id: 'intake-1',
    jobRef: 'JOB-2026-0891',
    dateReceived: '2026-07-22',
    timeReceived: '08:15 AM',
    equipmentId: 'eq-2',
    equipmentName: 'NOV 3000HP Drawworks',
    customer: 'ExxonMobil',
    site: 'Gulf Coast Central Workshop',
    meterReading: 12450,
    reportedFault: 'Brake band slipping during heavy loads. Strange noise from primary gearbox.',
    receivingEngineer: 'Marcus Vance',
    status: 'Pending Diagnostic'
  },
  {
    id: 'intake-2',
    jobRef: 'JOB-2026-0892',
    dateReceived: '2026-07-21',
    timeReceived: '02:30 PM',
    equipmentId: 'eq-6',
    equipmentName: 'FMC Flowline Plug Valve 3"',
    customer: 'ExxonMobil',
    site: 'Gulf Coast Central Workshop',
    meterReading: 3200,
    reportedFault: 'Valve seized in open position. Unable to actuate manually.',
    receivingEngineer: 'Sarah Jenkins',
    status: 'Assigned to Job'
  },
  {
    id: 'intake-3',
    jobRef: 'JOB-2026-0888',
    dateReceived: '2026-07-20',
    timeReceived: '11:00 AM',
    equipmentId: 'eq-3',
    equipmentName: 'Halliburton HT-400 Mud Pump',
    customer: 'Chevron',
    site: 'Permian Basin Rig 4',
    meterReading: 8500,
    reportedFault: 'Fluid end leak detected on cylinder 2. Pressure dropping intermittently.',
    receivingEngineer: 'David Kojo',
    status: 'Inspected'
  }
];

export const mockCustomers: Customer[] = [
  { id: 'c-1', code: 'CUST-AR', name: 'Aramco', contactName: 'Abdullah Al-Saud', contactEmail: 'abdullah@aramco.com', contactPhone: '+966-13-872-0115', siteLocations: 12 },
  { id: 'c-2', code: 'CUST-EX', name: 'ExxonMobil', contactName: 'Sarah Jenkins', contactEmail: 's.jenkins@exxonmobil.com', contactPhone: '+1-281-555-0199', siteLocations: 8 },
  { id: 'c-3', code: 'CUST-CH', name: 'Chevron', contactName: 'Michael Chang', contactEmail: 'mchang@chevron.com', contactPhone: '+1-925-555-0122', siteLocations: 5 },
  { id: 'c-4', code: 'CUST-BP', name: 'BP', contactName: 'David Wright', contactEmail: 'dwright@bp.com', contactPhone: '+44-20-7496-4000', siteLocations: 4 }
];

export const mockSites: Site[] = [
  { id: 's-1', name: 'Offshore Platform B', customerId: 'c-1', customerName: 'Aramco', location: 'Arabian Gulf', region: 'Middle East', contactName: 'Fahad Al-Rashid', contactPhone: '+966-50-555-0192' },
  { id: 's-2', name: 'Gulf Coast Central Workshop', customerId: 'c-2', customerName: 'ExxonMobil', location: 'Houston, TX', region: 'North America', contactName: 'James Wilson', contactPhone: '+1-713-555-0199' },
  { id: 's-3', name: 'Permian Basin Rig 4', customerId: 'c-3', customerName: 'Chevron', location: 'Midland, TX', region: 'North America', contactName: 'Tom Hardy', contactPhone: '+1-432-555-0122' },
  { id: 's-4', name: 'Bakken Field Rig 2', customerId: 'c-4', customerName: 'BP', location: 'Williston, ND', region: 'North America', contactName: 'Eric Johnson', contactPhone: '+1-701-555-0188' },
  { id: 's-5', name: 'Offshore Platform Alpha', customerId: 'c-2', customerName: 'ExxonMobil', location: 'Gulf of Mexico', region: 'North America', contactName: 'Linda Smith', contactPhone: '+1-281-555-0211' }
];

export const mockMaintenanceTypes: MaintenanceType[] = [
  { id: 'mt-1', name: 'Preventive Maintenance', description: 'Scheduled maintenance to prevent failure', active: true },
  { id: 'mt-2', name: 'Corrective Maintenance', description: 'Maintenance performed to identify, isolate, and rectify a fault', active: true },
  { id: 'mt-3', name: 'Breakdown Maintenance', description: 'Maintenance performed on equipment that has broken down', active: true },
  { id: 'mt-4', name: 'Inspection', description: 'Routine check of equipment condition', active: true },
  { id: 'mt-5', name: 'Overhaul', description: 'Complete teardown and rebuild of equipment', active: true },
  { id: 'mt-6', name: 'Calibration', description: 'Adjustment of equipment to ensure accurate readings', active: true }
];
