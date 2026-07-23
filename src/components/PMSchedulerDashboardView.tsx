import React, { useState } from 'react';
import type { PMScheduleRule } from '../types';
import { 
  CalendarDays, 
  List as ListIcon, 
  AlertTriangle, 
  Activity,
  Plus,
  Calendar,
  Clock,
  Gauge,
  CheckCircle2
} from 'lucide-react';
import { RecordPMActivityModal } from './RecordPMActivityModal';

interface PMSchedulerDashboardViewProps {
  schedules: PMScheduleRule[];
  onCreateNew: () => void;
  onRecordCompletion?: (scheduleId: string, newMetricValue: number | string, notes: string, engineer: string) => void;
}

export const PMSchedulerDashboardView: React.FC<PMSchedulerDashboardViewProps> = ({ schedules, onCreateNew, onRecordCompletion }) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedScheduleForRecord, setSelectedScheduleForRecord] = useState<PMScheduleRule | null>(null);

  const activeCount = schedules.length;
  const upcomingCount = schedules.filter(s => s.status === 'Upcoming Due').length;
  const overdueCount = schedules.filter(s => s.status === 'Overdue').length;

  return (
    <div className="view-container fade-in flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      
      {/* Header & Controls */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CalendarDays size={24} className="text-primary" />
              PM Scheduler & Alerts
            </h1>
            <p className="text-sm text-slate-500">Automated Preventive Maintenance Tracking</p>
          </div>
          <button 
            className="btn-primary shadow-md hover:shadow-lg transition-all flex items-center gap-2" 
            style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
            onClick={onCreateNew}
          >
            <Plus size={16} /> Create PM Schedule Rule
          </button>
        </div>

        {/* Executive Metrics Grid */}
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Active PM Rules</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{activeCount}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming PMs (30 Days)</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{upcomingCount}</p>
                {upcomingCount > 0 && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">Action Needed</span>}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow border-l-4 border-l-red-500">
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Overdue Maintenance</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{overdueCount}</p>
                {overdueCount > 0 && <span className="text-[10px] font-bold text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-300 px-2 py-0.5 rounded-full border border-red-200 dark:border-red-800 uppercase tracking-wider">Critical</span>}
              </div>
            </div>
          </div>
        </div>

        {/* View Toggles & Filters */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-md p-1">
            <button 
              className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon size={16} /> List View
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-all ${viewMode === 'calendar' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              onClick={() => setViewMode('calendar')}
            >
              <CalendarDays size={16} /> Calendar View
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <select className="form-input text-sm py-1.5 h-auto">
              <option>All Equipment</option>
              <option>Top Drives</option>
              <option>Mud Pumps</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col slide-in-bottom">
        {viewMode === 'list' ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-1 flex flex-col shadow-sm">
            <div className="overflow-auto flex-1">
              <table className="custom-table w-full">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 shadow-sm">
                  <tr>
                    <th>Equipment</th>
                    <th>Maintenance Rule</th>
                    <th>Trigger Metric</th>
                    <th>Next Due / Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map(schedule => (
                    <tr key={schedule.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{schedule.equipmentName}</div>
                        <div className="text-xs text-slate-500 font-mono">{schedule.equipmentId}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="badge text-[10px] px-2 bg-indigo-100 text-indigo-700 border-indigo-200">{schedule.category}</span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Every {schedule.intervalValue} {schedule.triggerType === 'Calendar' ? 'Days' : schedule.triggerType}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                          {schedule.triggerType === 'Hours' && <Clock size={16} className="text-slate-400" />}
                          {schedule.triggerType === 'Kilometers' && <Gauge size={16} className="text-slate-400" />}
                          {schedule.triggerType === 'Calendar' && <Calendar size={16} className="text-slate-400" />}
                          {schedule.triggerType}
                        </div>
                      </td>
                      <td>
                        <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{schedule.nextDueMetric}</div>
                        <span className={`badge text-[10px] ${
                          schedule.status === 'Overdue' ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300' :
                          schedule.status === 'Upcoming Due' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300' :
                          'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300'
                        }`}>
                          {schedule.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end items-center gap-2">
                          <button 
                            className="btn-primary text-xs py-1 px-3 flex items-center gap-1.5 shadow-sm"
                            style={{ backgroundColor: '#10B981', borderColor: '#10B981', color: 'white' }}
                            onClick={() => setSelectedScheduleForRecord(schedule)}
                          >
                            <CheckCircle2 size={13} /> Record Service
                          </button>
                          <button className="btn-secondary text-xs py-1">View Log</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex-1 flex flex-col p-8 items-center justify-center text-center fade-in">
            <CalendarDays size={64} className="text-slate-200 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">Calendar View Ready</h3>
            <p className="text-slate-500 max-w-md mt-2">The interactive visual monthly grid goes here, allowing you to drag-and-drop PM schedules directly on the timeline.</p>
          </div>
        )}
      </div>

      {selectedScheduleForRecord && (
        <RecordPMActivityModal
          isOpen={!!selectedScheduleForRecord}
          onClose={() => setSelectedScheduleForRecord(null)}
          schedule={selectedScheduleForRecord}
          onRecordCompletion={(id, metricVal, notes, engineer) => {
            if (onRecordCompletion) {
              onRecordCompletion(id, metricVal, notes, engineer);
            }
          }}
        />
      )}
    </div>
  );
};
