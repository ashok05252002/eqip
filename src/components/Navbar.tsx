import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Plus, Sun, Moon, LogOut, Settings, User } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
      {/* Left: Vibrant Green Logo and Platform Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'var(--primary)',
          color: 'white',
          fontWeight: 800,
          fontSize: '13px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>GREECOLOR</span>
          <span style={{ opacity: 0.7, fontSize: '10px' }}>/</span>
          <span>OEMMS</span>
        </div>
        <h1 style={{ fontSize: '14.5px', fontWeight: 700, margin: 0, letterSpacing: '-0.3px', color: 'var(--text-title)' }}>
          Enterprise Asset Command
        </h1>
      </div>

      {/* Middle: Global Search Bar Placeholder */}
      <div className="navbar-left" style={{ margin: '0 24px' }}>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search Equipment, Serial #, Job #... [Ctrl+K]"
            disabled
            style={{ cursor: 'not-allowed', background: 'var(--bg-main)', opacity: 0.8 }}
          />
          <Search size={16} className="search-icon" />
          <span className="search-shortcut" style={{ top: '50%', transform: 'translateY(-50%)' }}>Ctrl+K</span>
        </div>
      </div>

      {/* Right: Actions, Bell, Theme and Profile Dropdown */}
      <div className="navbar-right">
        {/* Quick Action Buttons (Static layout placeholders) */}
        <div className="nav-actions">
          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12.5px', cursor: 'default' }} disabled>
            <Plus size={14} />
            <span>Receive Equipment</span>
          </button>
          <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12.5px', cursor: 'default' }} disabled>
            <Plus size={14} />
            <span>New Job</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button className="btn-icon-only" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification Bell (Static layout representation with indicator badge) */}
        <div className="notifications-btn" style={{ cursor: 'default' }}>
          <button className="btn-icon-only" style={{ cursor: 'default' }}>
            <Bell size={18} />
            <span className="badge-dot" style={{ top: '4px', right: '4px' }} />
          </button>
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
