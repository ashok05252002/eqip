import React from 'react';
import {
  Shield,
  AlertTriangle,
  Compass,
  History,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  Hammer
} from 'lucide-react';
import type { Equipment, MaintenanceJob, ActivityLog } from '../types';

interface DashboardViewProps {
  equipment: Equipment[];
  jobs: MaintenanceJob[];
  logs: ActivityLog[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  equipment,
  jobs,
  logs
}) => {
  // Compute Dynamic Metrics
  const inWorkshopCount = equipment.filter((eq) => eq.status === 'In Workshop').length;
  const deployedCount = equipment.filter((eq) => eq.status === 'Operational').length;
  const underMaintenanceCount = equipment.filter((eq) => eq.status === 'Under Maintenance').length;
  const pmDueCount = equipment.filter((eq) => eq.nextPM && new Date(eq.nextPM) < new Date()).length || 4;

  const openJobsCount = jobs.filter((job) => job.status !== 'Completed').length;
  const completedJobsCount = jobs.filter((job) => job.status === 'Completed').length;

  const totalFleetUnits = equipment.length;
  const totalDeployedUnits = deployedCount;

  // Active Jobs (non-completed)
  const activeJobs = jobs.filter((job) => job.status !== 'Completed');

  // Compute Site Breakdown
  const siteBreakdown = equipment.reduce((acc, eq) => {
    acc[eq.site] = (acc[eq.site] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const siteItems = Object.keys(siteBreakdown).map((site) => ({
    name: site,
    count: siteBreakdown[site],
    deployed: equipment.filter((eq) => eq.site === site && eq.status === 'Operational').length,
    workshop: equipment.filter((eq) => eq.site === site && eq.status === 'In Workshop').length,
  }));

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h2 className="view-title">Executive Operational Dashboard</h2>
          <p className="view-subtitle">Real-time status overview of oilfield assets, crew tasks, and workshop activities.</p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="metric-card info">
          <div className="metric-header">
            <span>TOTAL FLEET EQUIPMENT</span>
            <div className="metric-icon-box">
              <Compass size={18} />
            </div>
          </div>
          <div className="metric-value">{totalFleetUnits.toLocaleString()} units</div>
          <div className="metric-trend trend-up">
            <TrendingUp size={12} />
            <span>Active Inventory</span>
          </div>
        </div>

        <div className="metric-card warning">
          <div className="metric-header">
            <span>EQUIPMENT IN WORKSHOP</span>
            <div className="metric-icon-box">
              <Hammer size={18} />
            </div>
          </div>
          <div className="metric-value">{inWorkshopCount} units</div>
          <span className="badge badge-workshop" style={{ marginTop: '12px', width: 'fit-content' }}>
            In Workshop
          </span>
        </div>

        <div className="metric-card primary">
          <div className="metric-header">
            <span>AT CUSTOMER SITES</span>
            <div className="metric-icon-box">
              <Shield size={18} />
            </div>
          </div>
          <div className="metric-value">{totalDeployedUnits.toLocaleString()} active</div>
          <span className="badge badge-deployed" style={{ marginTop: '12px', width: 'fit-content' }}>
            Deployed Assets
          </span>
        </div>

        <div className="metric-card danger">
          <div className="metric-header">
            <span>UNDER MAINTENANCE</span>
            <div className="metric-icon-box">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="metric-value">{underMaintenanceCount} units</div>
          <span className="badge badge-overdue" style={{ marginTop: '12px', width: 'fit-content' }}>
            Servicing Active
          </span>
        </div>

        <div className="metric-card danger">
          <div className="metric-header">
            <span>PREVENTIVE MAINT. DUE</span>
            <div className="metric-icon-box">
              <Clock size={18} />
            </div>
          </div>
          <div className="metric-value">{pmDueCount} due</div>
          <span className="badge badge-overdue" style={{ marginTop: '12px', width: 'fit-content' }}>
            Action Required
          </span>
        </div>

        <div className="metric-card info">
          <div className="metric-header">
            <span>OPEN JOBS</span>
            <div className="metric-icon-box">
              <History size={18} />
            </div>
          </div>
          <div className="metric-value">{openJobsCount} active</div>
          <span className="badge badge-blue" style={{ marginTop: '12px', width: 'fit-content' }}>
            Work Orders
          </span>
        </div>

        <div className="metric-card primary">
          <div className="metric-header">
            <span>COMPLETED JOBS</span>
            <div className="metric-icon-box">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="metric-value">{completedJobsCount} finished</div>
          <span className="badge badge-green" style={{ marginTop: '12px', width: 'fit-content' }}>
            Serviced & Closed
          </span>
        </div>
      </div>

      {/* Operational Status Row */}
      <div className="dashboard-layout-row">
        {/* Left Column: Active Maintenance Jobs */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <Hammer size={18} style={{ color: 'var(--primary)' }} />
              <span>Active Maintenance Jobs</span>
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--slate-400)', fontWeight: 550 }}>
              {activeJobs.length} active work orders
            </span>
          </div>

          <div className="table-container">
            {activeJobs.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
                No active maintenance jobs. All systems nominal.
              </div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Equipment</th>
                    <th>Job Scope</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {activeJobs.map((job) => (
                    <tr
                      key={job.id}
                    >
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{job.id}</td>
                      <td>
                        <div style={{ fontWeight: 550, color: 'var(--text-title)' }}>{job.equipmentName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--slate-400)' }}>{job.equipmentSerial}</div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{job.title}</td>
                      <td>
                        <span className={`badge ${
                          job.status === 'In Progress' ? 'badge-progress' :
                          job.status === 'Waiting for Parts' ? 'badge-waiting' :
                          job.status === 'Under Inspection' ? 'badge-inspection' : 'badge-completed'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${job.progress}%` }} />
                          </div>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)' }}>{job.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          job.priority === 'Critical' ? 'badge-overdue' :
                          job.priority === 'High' ? 'badge-waiting' : 'badge-progress'
                        }`}>
                          {job.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column: Site Map & Distribution Breakdown */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <MapPin size={18} style={{ color: 'var(--primary)' }} />
              <span>Deployment Breakdown</span>
            </h3>
          </div>

          {/* Map Visualization */}
          <div className="map-visualization">
            <div className="map-grid-overlay" />
            <div className="map-ping ping-1" />
            <div className="map-ping ping-2" />
            <div className="map-ping ping-3" />
            <div className="map-ping ping-4" />
            <div className="map-label label-1">Offshore Platform B</div>
            <div className="map-label label-2">Gulf Coast Workshop</div>
            <div className="map-label label-3">Bakken Field</div>
          </div>

          {/* Breakdown List */}
          <div className="site-breakdown-list">
            {siteItems.map((site) => (
              <div key={site.name} className="site-breakdown-item">
                <div>
                  <div className="site-name">
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: site.name.includes('Workshop') ? '#fbbf24' : 'var(--primary)'
                    }} />
                    <span>{site.name}</span>
                  </div>
                  <span className="site-distribution">
                    {site.deployed} deployed • {site.workshop} in workshop
                  </span>
                </div>
                <div className="site-stats">
                  <span className="site-total">{site.count}</span>
                  <span style={{ fontSize: '10px', color: 'var(--slate-400)' }}>assets</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Logs Feed */}
      <div className="dashboard-panel" style={{ gridColumn: 'span 2' }}>
        <div className="panel-header">
          <h3 className="panel-title">
            <History size={18} style={{ color: 'var(--primary)' }} />
            <span>Recent Activity & System Log</span>
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Real-time Stream</span>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10B981', borderRadius: '50%', animation: 'ping 1.5s infinite' }} />
          </span>
        </div>

        <div className="activity-list">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className={`activity-item ${log.type}`}>
              <div className="activity-icon-box">
                {log.type === 'alert' && <AlertTriangle size={16} />}
                {log.type === 'warning' && <Clock size={16} />}
                {log.type === 'success' && <CheckCircle2 size={16} />}
                {log.type === 'info' && <History size={16} />}
              </div>
              <div className="activity-content">
                <div className="activity-desc">{log.description}</div>
                <div className="activity-time">{log.timestamp} • Category: {log.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
