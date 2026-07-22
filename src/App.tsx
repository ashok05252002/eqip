import { useState, useEffect } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { EquipmentMasterView } from './components/EquipmentMasterView';
import { EquipmentProfileView } from './components/EquipmentProfileView';
import { ReceivingHubView } from './components/ReceivingHubView';
import { ReceivingReceiptView } from './components/ReceivingReceiptView';
import { MaintenanceJobHubView } from './components/MaintenanceJobHubView';
import { MaintenanceJobDetailView } from './components/MaintenanceJobDetailView';
import { SparePartsInventoryHubView } from './components/SparePartsInventoryHubView';
import { PMSchedulerDashboardView } from './components/PMSchedulerDashboardView';
import { CreatePMScheduleModal } from './components/CreatePMScheduleModal';
import { ReportsAnalyticsHubView } from './components/ReportsAnalyticsHubView';
import { CustomerMasterView } from './components/CustomerMasterView';
import { SiteMasterView } from './components/SiteMasterView';
import { MaintenanceTypeMasterView } from './components/MaintenanceTypeMasterView';
import {
  initialEquipment,
  initialJobs,
  initialLogs,
  initialParts,
  mockIntakeRecords,
  mockPMRules,
  mockPMAlerts,
  mockReportData,
  mockCustomers,
  mockSites,
  mockMaintenanceTypes
} from './data/mockData';
import type { Equipment, MaintenanceJob, ActivityLog, IntakeRecord, SparePart, PMScheduleRule, PMAlert, ReportSummaryItem, Customer, Site, MaintenanceType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'equipment' | 'equipment-profile' | 'receiving' | 'receiving-receipt' | 'jobs' | 'job-detail' | 'parts' | 'schedules' | 'reports' | 'customer-master' | 'site-master' | 'maintenance-type-master'>('dashboard');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [recentJobRef, setRecentJobRef] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('oemms-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // State arrays for Dashboard telemetry
  const [equipment] = useState<Equipment[]>(initialEquipment);
  const [jobs, setJobs] = useState<MaintenanceJob[]>(initialJobs);
  const [logs] = useState<ActivityLog[]>(initialLogs);
  const [intakeRecords] = useState<IntakeRecord[]>(mockIntakeRecords);
  const [parts, setParts] = useState<SparePart[]>(initialParts);
  const [pmRules, setPmRules] = useState<PMScheduleRule[]>(mockPMRules);
  const [pmAlerts, setPmAlerts] = useState<PMAlert[]>(mockPMAlerts);
  const [reportData] = useState<ReportSummaryItem[]>(mockReportData);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [sites] = useState<Site[]>(mockSites);
  const [maintenanceTypes] = useState<MaintenanceType[]>(mockMaintenanceTypes);
  const [isCreatePMModalOpen, setIsCreatePMModalOpen] = useState(false);

  // Sync theme configurations
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('oemms-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Primary Layout wrapper */}
      <div className="content-wrapper">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          alerts={pmAlerts}
          onSnooze={(id) => {
            setPmAlerts(prev => prev.filter(a => a.id !== id));
          }}
          onMarkRead={(id) => {
            setPmAlerts(prev => prev.map(a => a.id === id ? { ...a, readStatus: true } : a));
          }}
          onGenerateJob={(alert) => {
            setPmAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, readStatus: true } : a));
            setCurrentView('jobs');
          }}
        />
        
        {/* View Routing */}
        {currentView === 'dashboard' && (
          <DashboardView
            equipment={equipment}
            jobs={jobs}
            logs={logs}
          />
        )}
        
        {currentView === 'equipment' && (
          <EquipmentMasterView 
            equipment={equipment} 
            onViewProfile={(id) => {
              setSelectedEquipmentId(id);
              setCurrentView('equipment-profile');
            }} 
          />
        )}

        {currentView === 'equipment-profile' && selectedEquipmentId && (
          <EquipmentProfileView 
            equipmentId={selectedEquipmentId}
            onBack={() => setCurrentView('equipment')}
          />
        )}

        {currentView === 'receiving' && (
          <ReceivingHubView 
            intakeRecords={intakeRecords}
            onGenerateReceipt={(jobRef) => {
              setRecentJobRef(jobRef);
              setCurrentView('receiving-receipt');
            }}
          />
        )}

        {currentView === 'receiving-receipt' && recentJobRef && (
          <ReceivingReceiptView 
            jobRef={recentJobRef}
            onBackToHub={() => setCurrentView('receiving')}
          />
        )}

        {currentView === 'jobs' && (
          <MaintenanceJobHubView 
            jobs={jobs}
            setJobs={setJobs}
            onViewJobDetail={(id) => {
              setSelectedJobId(id);
              setCurrentView('job-detail');
            }}
          />
        )}

        {currentView === 'job-detail' && selectedJobId && (
          <MaintenanceJobDetailView 
            job={jobs.find(j => j.id === selectedJobId)!}
            parts={parts}
            onBack={() => setCurrentView('jobs')}
            onUpdateStatus={(jobId, newStatus) => {
              setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
            }}
            onConsumePart={(partId, qty) => {
              setParts(prev => prev.map(p => p.id === partId ? { ...p, stockQty: p.stockQty - qty } : p));
            }}
          />
        )}

        {currentView === 'parts' && (
          <SparePartsInventoryHubView parts={parts} />
        )}

        {currentView === 'schedules' && (
          <PMSchedulerDashboardView 
            schedules={pmRules}
            onCreateNew={() => setIsCreatePMModalOpen(true)}
          />
        )}

        {currentView === 'reports' && (
          <ReportsAnalyticsHubView 
            reportsData={reportData} 
            equipment={equipment}
            parts={parts}
            customers={customers}
            sites={sites}
          />
        )}

        {currentView === 'customer-master' && (
          <CustomerMasterView customers={customers} />
        )}

        {currentView === 'site-master' && (
          <SiteMasterView sites={sites} />
        )}

        {currentView === 'maintenance-type-master' && (
          <MaintenanceTypeMasterView maintenanceTypes={maintenanceTypes} />
        )}
      </div>

      <CreatePMScheduleModal
        isOpen={isCreatePMModalOpen}
        onClose={() => setIsCreatePMModalOpen(false)}
        equipmentList={equipment}
        onSave={(rule) => setPmRules(prev => [...prev, rule])}
      />
    </div>
  );
}

export default App;
