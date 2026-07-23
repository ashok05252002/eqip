import React, { useState } from 'react';
import type { ReportCategory, ReportFilter, ReportSummaryItem, Equipment, SparePart, Customer, Site } from '../types';
import { 
  BarChart3, 
  FileSpreadsheet, 
  FileText as FilePdf, 
  Printer,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Briefcase,
  DollarSign,
  Package,
  Wrench,
  AlertTriangle
} from 'lucide-react';

interface ReportsAnalyticsHubViewProps {
  reportsData: ReportSummaryItem[];
  equipment: Equipment[];
  parts: SparePart[];
  customers: Customer[];
  sites: Site[];
}

export const ReportsAnalyticsHubView: React.FC<ReportsAnalyticsHubViewProps> = ({ reportsData, equipment, parts, customers, sites }) => {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('Maintenance');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ReportFilter>({ datePreset: 'This Month' });

  const [customerFilter, setCustomerFilter] = useState('');
  const [siteFilter, setSiteFilter] = useState('');
  const [selectedReportType, setSelectedReportType] = useState('All Reports');

  // Filter the Maintenance data
  const filteredMaintenanceData = reportsData.filter(item => {
    const matchesSearch = item.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCustomer = customerFilter ? item.customer === customerFilter : true;
    const matchesSite = siteFilter ? item.site === siteFilter : true;
    const matchesType = selectedReportType === 'Breakdown Report' ? item.maintenanceType === 'Breakdown' :
                        selectedReportType === 'Maintenance Due Report' ? item.status === 'Overdue' || item.status === 'Active' : true;
    return matchesSearch && matchesCustomer && matchesSite && matchesType;
  });

  // Filter Equipment data
  const filteredEquipmentData = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCustomer = customerFilter ? item.customer === customerFilter : true;
    const matchesSite = siteFilter ? item.site === siteFilter : true;
    return matchesSearch && matchesCustomer && matchesSite;
  });

  // Filter Parts data
  const filteredPartsData = parts.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.partNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Calculate KPIs based on active tab
  const totalJobs = filteredMaintenanceData.length;
  const totalDowntime = filteredMaintenanceData.reduce((acc, curr) => acc + curr.laborHours, 0);
  const totalCost = filteredMaintenanceData.reduce((acc, curr) => acc + curr.partsCost, 0);
  
  const completedJobs = filteredMaintenanceData.filter(item => item.status === 'Completed').length;
  const pmRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  const totalEquipment = filteredEquipmentData.length;
  const operationalEquipment = filteredEquipmentData.filter(e => e.status === 'Operational').length;
  const avgHealth = totalEquipment > 0 ? Math.round(filteredEquipmentData.reduce((acc, curr) => acc + curr.healthScore, 0) / totalEquipment) : 0;

  const totalParts = filteredPartsData.length;
  const lowStockParts = filteredPartsData.filter(p => p.stockQty <= p.reorderPoint).length;
  const totalInventoryValue = filteredPartsData.reduce((acc, curr) => acc + (curr.stockQty * curr.unitCost), 0);

  const handleExportExcel = () => {
    alert(`Report (${activeCategory}) exported to Excel successfully!`);
  };

  const handleExportPDF = () => {
    alert(`Report (${activeCategory}) exported to PDF successfully!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="view-container fade-in flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BarChart3 size={24} className="text-primary" />
          Reports & Operational Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">Generate, filter, and export equipment, workshop, and inventory insights.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-fit mb-6 shadow-sm">
        {['Equipment', 'Maintenance', 'Spare Parts'].map(tab => (
          <button
            key={tab}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeCategory === tab ? 'bg-primary dark:bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200'}`}
            onClick={() => setActiveCategory(tab as ReportCategory)}
          >
            {tab} Reports
          </button>
        ))}
      </div>

      {/* Filter Panel & Export Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        
        {/* Dynamic Filtering Engine */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* SOW 2.11 Report Type Preset Selector */}
          <select 
            className="form-input py-1.5 text-sm font-semibold text-primary bg-emerald-50/50 border-emerald-300 w-52"
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
          >
            <option value="All Reports">📋 All {activeCategory} Reports</option>
            {activeCategory === 'Equipment' && (
              <>
                <option value="Equipment Register">Equipment Register</option>
                <option value="Equipment Status Report">Equipment Status Report</option>
                <option value="Equipment Location Report">Equipment Location Report</option>
              </>
            )}
            {activeCategory === 'Maintenance' && (
              <>
                <option value="Maintenance History">Maintenance History</option>
                <option value="Maintenance Due Report">Maintenance Due Report</option>
                <option value="Breakdown Report">Breakdown Report</option>
                <option value="Workshop Activity Report">Workshop Activity Report</option>
                <option value="Maintenance by Customer">Maintenance by Customer</option>
                <option value="Maintenance by Site">Maintenance by Site</option>
                <option value="Maintenance by Equipment">Maintenance by Equipment</option>
              </>
            )}
            {activeCategory === 'Spare Parts' && (
              <>
                <option value="Parts Consumption">Parts Consumption Report</option>
                <option value="Parts Usage by Equipment">Parts Usage by Equipment</option>
                <option value="Parts Usage by Customer">Parts Usage by Customer</option>
                <option value="Serial Number Traceability">Serial Number Traceability</option>
              </>
            )}
          </select>

          <div className="relative">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              className="form-input pl-8 py-1.5 text-sm font-medium w-36"
              value={filters.datePreset}
              onChange={e => setFilters({...filters, datePreset: e.target.value as any})}
            >
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
          </div>

          <select 
            className="form-input py-1.5 text-sm w-36"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
          >
            <option value="">All Customers</option>
            {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>

          <select 
            className="form-input py-1.5 text-sm w-36"
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
          >
            <option value="">All Sites</option>
            {sites.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>

          <button className="btn-secondary py-1.5 px-3 flex items-center gap-2 text-sm border-slate-200">
            <Filter size={14} /> More Filters
          </button>
        </div>

        {/* Export Toolbar */}
        <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-end">
          <button 
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 dark:text-emerald-400"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={16} /> Export to Excel
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold border-2 transition-all border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-red-400"
            onClick={handleExportPDF}
          >
            <FilePdf size={16} /> Export to PDF
          </button>
          <button 
            className="btn-secondary py-1.5 px-3"
            onClick={handlePrint}
            title="Print Report"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>

      {/* Top KPI Summary Row */}
      {activeCategory === 'Maintenance' && (
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Jobs</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalJobs}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Downtime</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalDowntime} <span className="text-sm font-medium text-slate-500">hrs</span></p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Parts Cost</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">OMR {totalCost.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">PM Rate</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{pmRate}%</p>
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'Equipment' && (
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg shrink-0">
              <Wrench size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Equipment</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalEquipment}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Operational</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{operationalEquipment}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Under Maint.</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalEquipment - operationalEquipment}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Health</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{avgHealth}%</p>
            </div>
          </div>
        </div>
      )}

      {activeCategory === 'Spare Parts' && (
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Parts SKUs</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalParts}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Low Stock</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{lowStockParts}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Inventory Value</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">OMR {totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Report Data Viewer */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-1 flex flex-col shadow-sm slide-in-bottom">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Report Preview</h3>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search in report..." 
              className="form-input pl-8 py-1.5 text-sm w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-auto flex-1">
          <table className="custom-table w-full">
            {activeCategory === 'Maintenance' && (
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 shadow-sm">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Job / Ref #</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Equipment Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer & Site</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Labor</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Parts Cost</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
            )}
            {activeCategory === 'Equipment' && (
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 shadow-sm">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Equipment ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name & Model</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer & Site</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Health</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Operating Hrs</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Next PM</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
            )}
            {activeCategory === 'Spare Parts' && (
              <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 shadow-sm">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Part Number</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Manufacturer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit Cost</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
            )}
            <tbody>
              {(activeCategory === 'Maintenance' && filteredMaintenanceData.length === 0) ||
               (activeCategory === 'Equipment' && filteredEquipmentData.length === 0) ||
               (activeCategory === 'Spare Parts' && filteredPartsData.length === 0) ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-500">
                    No records found matching the current filters.
                  </td>
                </tr>
              ) : (
                <>
                  {activeCategory === 'Maintenance' && filteredMaintenanceData.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">{item.code}</td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{item.equipmentName}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.customer}</div>
                        <div className="text-xs text-slate-500">{item.site}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-medium border border-slate-200 dark:border-slate-600">
                          {item.maintenanceType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">{item.laborHours} <span className="text-xs text-slate-400">h</span></td>
                      <td className="px-4 py-3 text-sm font-mono text-slate-700 dark:text-slate-300">OMR {item.partsCost.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-[10px] ${
                          item.status === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300' :
                          item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300' :
                          item.status === 'Active' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300' :
                          'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm font-medium text-primary hover:text-emerald-700 transition-colors">Edit</button>
                      </td>
                    </tr>
                  ))}

                  {activeCategory === 'Equipment' && filteredEquipmentData.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">{item.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.model}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.customer}</div>
                        <div className="text-xs text-slate-500">{item.site}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.healthScore > 80 ? 'bg-emerald-500' : item.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${item.healthScore}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold">{item.healthScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">{(item.operatingHours || 0).toLocaleString()} <span className="text-xs text-slate-400">hrs</span></td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.nextPM}</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-[10px] ${
                          item.status === 'Operational' ? 'badge-green' :
                          item.status === 'In Workshop' ? 'badge-amber' :
                          item.status === 'Under Maintenance' ? 'badge-blue' :
                          'badge-gray'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm font-medium text-primary hover:text-emerald-700 transition-colors">Edit</button>
                      </td>
                    </tr>
                  ))}

                  {activeCategory === 'Spare Parts' && filteredPartsData.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">{item.partNumber}</td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.manufacturer}</td>
                      <td className="px-4 py-3 text-sm font-mono text-slate-700 dark:text-slate-300">OMR {item.unitCost.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item.stockQty} <span className="text-xs text-slate-400">{item.uom}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.warehouseLocation}</td>
                      <td className="px-4 py-3">
                        {item.stockQty <= item.reorderPoint ? (
                          <span className="badge text-[10px] bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300">Low Stock</span>
                        ) : (
                          <span className="badge text-[10px] bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300">In Stock</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm font-medium text-primary hover:text-emerald-700 transition-colors">Edit</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 text-sm text-slate-500">
          <div>Showing {activeCategory === 'Maintenance' ? filteredMaintenanceData.length : activeCategory === 'Equipment' ? filteredEquipmentData.length : filteredPartsData.length} records</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};
