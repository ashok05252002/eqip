import React, { useState } from 'react';
import type { MaintenanceJob } from '../types';
import { Plus, Search, Filter, LayoutGrid, List, Clock, CheckCircle2 } from 'lucide-react';

interface MaintenanceJobHubViewProps {
  jobs: MaintenanceJob[];
  setJobs: React.Dispatch<React.SetStateAction<MaintenanceJob[]>>;
  onViewJobDetail: (jobId: string) => void;
}

type ViewMode = 'kanban' | 'table';
type JobStatus = MaintenanceJob['status'];

const KANBAN_COLUMNS: JobStatus[] = ['Open', 'Under Inspection', 'Waiting for Parts', 'In Progress', 'Completed'];

export const MaintenanceJobHubView: React.FC<MaintenanceJobHubViewProps> = ({ jobs, setJobs, onViewJobDetail }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'High': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'Medium': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Breakdown': return 'badge-red';
      case 'Preventive': return 'badge-green';
      case 'Corrective': return 'badge-amber';
      case 'Inspection': return 'badge-blue';
      default: return 'badge-gray';
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, jobId: string) => {
    e.dataTransfer.setData('jobId', jobId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: JobStatus) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData('jobId');
    if (jobId) {
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    }
  };

  return (
    <div className="view-container fade-in flex flex-col h-full">
      {/* Header Bar */}
      <div className="controls-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Maintenance Job Control Center</h1>
          <p className="text-sm text-slate-500">Manage and track active service orders</p>
        </div>

        <div className="flex-align-center gap-3 ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="form-input pl-9 w-64"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="btn-secondary">
            <Filter size={16} /> Filters
          </button>

          <div className="flex border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-800">
            <button 
              className={`p-2 ${viewMode === 'kanban' ? 'bg-slate-100 dark:bg-slate-700 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              onClick={() => setViewMode('kanban')}
              title="Kanban Board"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'table' ? 'bg-slate-100 dark:bg-slate-700 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              onClick={() => setViewMode('table')}
              title="Data Table"
            >
              <List size={18} />
            </button>
          </div>

          <button className="btn-primary">
            <Plus size={16} /> Create Maintenance Job
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, minHeight: 0, marginTop: '16px' }}>
        {viewMode === 'kanban' ? (
          <div className="kanban-board">
            {KANBAN_COLUMNS.map(columnStatus => (
              <div 
                key={columnStatus}
                className="kanban-column"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, columnStatus)}
              >
                <div className="kanban-col-header">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{columnStatus}</h3>
                  <span className="badge badge-gray font-bold">
                    {filteredJobs.filter(j => j.status === columnStatus).length}
                  </span>
                </div>
                <div className="kanban-col-content">
                  {filteredJobs.filter(job => job.status === columnStatus).map(job => (
                    <div 
                      key={job.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, job.id)}
                      onClick={() => onViewJobDetail(job.id)}
                      className="kanban-card group"
                    >
                      <div className="kanban-card-header">
                        <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-primary transition-colors">{job.id.toUpperCase()}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                      </div>
                      <h4 className="kanban-card-title">{job.title}</h4>
                      <p className="kanban-card-subtitle">{job.equipmentName}</p>
                      
                      <div className="kanban-card-meta">
                        <span className={`badge text-[10px] px-2 py-0.5 ${getTypeColor(job.type)}`}>
                          {job.type}
                        </span>
                        <div className="flex-align-center gap-1 text-slate-400 text-xs">
                          <Clock size={12} /> {job.createdAt}
                        </div>
                      </div>

                      <div className="kanban-card-footer">
                        <div className="kanban-card-assignee">
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {job.assigneeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{job.assigneeName}</span>
                        </div>
                        {job.status === 'Completed' ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono font-bold text-emerald-600">100%</span>
                            <CheckCircle2 size={16} className="text-emerald-500" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">{job.progress || 0}%</span>
                            <div style={{ width: '48px', height: '6px', backgroundColor: 'var(--slate-200)', borderRadius: '999px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', backgroundColor: '#10B981', width: `${job.progress || 0}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="content-area overflow-hidden flex flex-col h-full slide-in-bottom">
            <div className="table-container flex-1 overflow-auto">
              <table className="custom-table w-full">
                <thead className="sticky top-0 bg-white dark:bg-slate-800 z-10">
                  <tr>
                    <th>Job Ref #</th>
                    <th>Equipment Details</th>
                    <th>Type & Priority</th>
                    <th>Date Created</th>
                    <th>Technician</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map(job => (
                    <tr key={job.id} className="clickable-row" onClick={() => onViewJobDetail(job.id)}>
                      <td className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {job.id.toUpperCase()}
                      </td>
                      <td>
                        <div className="font-medium text-slate-800 dark:text-slate-200">{job.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{job.equipmentName} ({job.equipmentSerial})</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={`badge ${getTypeColor(job.type)}`}>{job.type}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex-align-center gap-1 text-slate-600 dark:text-slate-400">
                          <Clock size={14} />
                          <span className="text-sm whitespace-nowrap">{job.createdAt}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex-align-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                            {job.assigneeName.charAt(0)}
                          </div>
                          <div className="text-sm text-slate-700 dark:text-slate-300">{job.assigneeName}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          job.status === 'Completed' ? 'badge-green' :
                          job.status === 'In Progress' ? 'badge-blue' :
                          job.status === 'Waiting for Parts' ? 'badge-amber' : 'badge-gray'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
