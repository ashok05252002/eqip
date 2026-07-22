import React from 'react';
import {
  LayoutDashboard,
  Wrench,
  ClipboardCheck,
  Hammer,
  Boxes,
  Calendar,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Equipment Master', icon: Wrench },
    { name: 'Receiving / Intake', icon: ClipboardCheck },
    { name: 'Maintenance Jobs', icon: Hammer },
    { name: 'Spare Parts Inventory', icon: Boxes },
    { name: 'PM Schedules', icon: Calendar },
    { name: 'Document Vault', icon: FileText },
    { name: 'Analytics & Reports', icon: BarChart3 },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">G</div>
        {!collapsed && (
          <div className="profile-info">
            <span className="brand-text">GREECOLOR</span>
            <span className="brand-subtext">OEMMS v1.2</span>
          </div>
        )}
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === 'Dashboard';

          return (
            <div
              key={item.name}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              title={item.name}
              style={{ cursor: isActive ? 'pointer' : 'default' }}
            >
              <Icon size={20} className="sidebar-icon" />
              <span className="sidebar-label">{item.name}</span>
            </div>
          );
        })}
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
