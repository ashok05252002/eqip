import { useState, useEffect } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';

import {
  initialEquipment,
  initialJobs,
  initialLogs,
} from './data/mockData';
import type { Equipment, MaintenanceJob, ActivityLog } from './types';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('oemms-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // State arrays for Dashboard telemetry
  const [equipment] = useState<Equipment[]>(initialEquipment);
  const [jobs] = useState<MaintenanceJob[]>(initialJobs);
  const [logs] = useState<ActivityLog[]>(initialLogs);

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
      />

      {/* Primary Layout wrapper */}
      <div className="content-wrapper">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        {/* Executive Dashboard Content Panel */}
        <DashboardView
          equipment={equipment}
          jobs={jobs}
          logs={logs}
        />
      </div>
    </div>
  );
}

export default App;
