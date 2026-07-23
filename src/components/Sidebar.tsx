import React from 'react';
import {
  LayoutDashboard,
  Wrench,
  ClipboardCheck,
  Hammer,
  Boxes,
  Calendar,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Database,
  Users,
  MapPin,
  Settings
} from 'lucide-react';
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentView: 'dashboard' | 'equipment' | 'equipment-profile' | 'receiving' | 'receiving-receipt' | 'jobs' | 'job-detail' | 'parts' | 'schedules' | 'reports' | 'customer-master' | 'site-master' | 'maintenance-type-master';
  setCurrentView: (view: 'dashboard' | 'equipment' | 'equipment-profile' | 'receiving' | 'receiving-receipt' | 'jobs' | 'job-detail' | 'parts' | 'schedules' | 'reports' | 'customer-master' | 'site-master' | 'maintenance-type-master') => void;
}
export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  currentView,
  setCurrentView
}) => {
  const [masterDataOpen, setMasterDataOpen] = React.useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Receiving / Intake', icon: ClipboardCheck },
    { name: 'Maintenance Jobs', icon: Hammer },
    { name: 'Spare Parts Inventory', icon: Boxes },
    { name: 'PM Schedules', icon: Calendar },
    { name: 'Analytics & Reports', icon: BarChart3 },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand" style={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
        <img src="/logo.png" alt="International DRILL EX" style={{ width: '100%', height: 'auto', maxHeight: '48px', objectFit: 'contain' }} />
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Determine if active
          let isActive = false;
          if (item.name === 'Dashboard' && currentView === 'dashboard') isActive = true;
          if (item.name === 'Receiving / Intake' && (currentView === 'receiving' || currentView === 'receiving-receipt')) isActive = true;

          if (item.name === 'Maintenance Jobs' && (currentView === 'jobs' || currentView === 'job-detail')) isActive = true;
          if (item.name === 'Spare Parts Inventory' && currentView === 'parts') isActive = true;
          if (item.name === 'PM Schedules' && currentView === 'schedules') isActive = true;
          if (item.name === 'Analytics & Reports' && currentView === 'reports') isActive = true;

          // Available Views
          const isClickable = item.name === 'Dashboard' || item.name === 'Receiving / Intake' || item.name === 'Maintenance Jobs' || item.name === 'Spare Parts Inventory' || item.name === 'PM Schedules' || item.name === 'Analytics & Reports';

          return (
            <div
              key={item.name}
              className={`sidebar-item ${isActive ? 'active' : ''} ${!isClickable ? 'disabled' : ''}`}
              title={item.name}
              onClick={() => {
                if (item.name === 'Dashboard') setCurrentView('dashboard');
                if (item.name === 'Receiving / Intake') setCurrentView('receiving');
                if (item.name === 'Maintenance Jobs') setCurrentView('jobs');
                if (item.name === 'Spare Parts Inventory') setCurrentView('parts');
                if (item.name === 'PM Schedules') setCurrentView('schedules');
                if (item.name === 'Analytics & Reports') setCurrentView('reports');
              }}
              style={{ cursor: isClickable ? 'pointer' : 'not-allowed', opacity: isClickable ? 1 : 0.5 }}
            >
              <Icon size={20} className="sidebar-icon" />
              <span className="sidebar-label">{item.name}</span>
            </div>
          );
        })}
        
        {/* Master Data Accordion */}
        <div className="mt-4">
          <div 
            className={`sidebar-item flex justify-between items-center ${masterDataOpen || currentView.includes('master') || currentView === 'equipment' || currentView === 'equipment-profile' ? 'active' : ''}`}
            onClick={() => {
              if (collapsed) setCollapsed(false);
              setMasterDataOpen(!masterDataOpen);
            }}
            style={{ cursor: 'pointer', margin: '4px 8px', borderRadius: '8px', padding: '10px 12px' }}
          >
            <div className="flex items-center gap-3">
              <Database size={20} className="sidebar-icon" />
              {!collapsed && <span className="sidebar-label font-semibold text-slate-700">Master Data</span>}
            </div>
            {!collapsed && (masterDataOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </div>
          
          {!collapsed && masterDataOpen && (
            <div className="ml-4 pl-4 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-1 mt-1">
              <div 
                className={`sidebar-item text-sm py-2 px-3 ${currentView === 'equipment' || currentView === 'equipment-profile' ? 'active bg-slate-100 font-semibold' : ''}`}
                onClick={() => setCurrentView('equipment')}
              >
                <Wrench size={16} className="mr-2 inline" /> Equipment Master
              </div>
              <div 
                className={`sidebar-item text-sm py-2 px-3 ${currentView === 'customer-master' ? 'active bg-slate-100 font-semibold' : ''}`}
                onClick={() => setCurrentView('customer-master')}
              >
                <Users size={16} className="mr-2 inline" /> Customer Master
              </div>
              <div 
                className={`sidebar-item text-sm py-2 px-3 ${currentView === 'site-master' ? 'active bg-slate-100 font-semibold' : ''}`}
                onClick={() => setCurrentView('site-master')}
              >
                <MapPin size={16} className="mr-2 inline" /> Site Master
              </div>
              <div 
                className={`sidebar-item text-sm py-2 px-3 ${currentView === 'maintenance-type-master' ? 'active bg-slate-100 font-semibold' : ''}`}
                onClick={() => setCurrentView('maintenance-type-master')}
              >
                <Settings size={16} className="mr-2 inline" /> Maintenance Types
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button
          className="btn-icon-only"
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};
