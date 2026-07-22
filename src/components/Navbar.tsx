import React, { useState, useRef, useEffect } from 'react';
import { Bell, Sun, Moon, LogOut, Settings, User } from 'lucide-react';
import type { PMAlert } from '../types';
import { PMAlertsNotificationCenter } from './PMAlertsNotificationCenter';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  alerts: PMAlert[];
  onGenerateJob: (alert: PMAlert) => void;
  onSnooze: (alertId: string) => void;
  onMarkRead: (alertId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  alerts,
  onGenerateJob,
  onSnooze,
  onMarkRead
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAlertsMenu, setShowAlertsMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      {/* Left: Branding */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="International DRILL EX Logo" style={{ height: '42px', objectFit: 'contain' }} />
      </div>

      {/* Middle: Removed for cleaner layout */}
      <div className="navbar-left" style={{ margin: '0 24px' }}>
      </div>

      {/* Right: Actions, Bell, Theme and Profile Dropdown */}
      <div className="navbar-right">

        {/* Theme Toggle */}
        <button className="btn-icon-only" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification Bell */}
        <div className="notifications-btn relative" style={{ cursor: 'pointer' }}>
          <button className="btn-icon-only" onClick={() => setShowAlertsMenu(!showAlertsMenu)}>
            <Bell size={18} />
            {alerts.filter(a => !a.readStatus).length > 0 && (
              <span className="badge-dot" style={{ top: '4px', right: '4px', background: 'var(--status-overdue-bg)' }} />
            )}
          </button>
          
          <PMAlertsNotificationCenter 
            isOpen={showAlertsMenu}
            onClose={() => setShowAlertsMenu(false)}
            alerts={alerts}
            onGenerateJob={(alert) => {
              onGenerateJob(alert);
              setShowAlertsMenu(false);
            }}
            onSnooze={onSnooze}
            onMarkRead={onMarkRead}
          />
        </div>

        {/* User Profile Dropdown */}
        <div className="profile-trigger-container" ref={profileRef} style={{ position: 'relative' }}>
          <div className="profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ padding: '2px 6px' }}>
            <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '12px' }}>EV</div>
            <div className="profile-info">
              <span className="profile-name" style={{ fontSize: '12.5px' }}>Marcus Vance</span>
              <span className="profile-role" style={{ fontSize: '10px' }}>Engineer Profile</span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="dropdown-menu" style={{ width: '180px' }}>
              <div className="dropdown-header" style={{ fontSize: '12px', padding: '8px 12px' }}>Profile Settings</div>
              <div className="dropdown-item" style={{ padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                  <User size={13} />
                  <span className="dropdown-item-title">Account Info</span>
                </div>
              </div>
              <div className="dropdown-item" style={{ padding: '8px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                  <Settings size={13} />
                  <span className="dropdown-item-title">Settings</span>
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />
              <div className="dropdown-item" style={{ padding: '8px 12px', color: 'var(--status-overdue-text)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                  <LogOut size={13} />
                  <span className="dropdown-item-title">Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
