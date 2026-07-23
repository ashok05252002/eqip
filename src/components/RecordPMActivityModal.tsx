import React, { useState } from 'react';
import type { PMScheduleRule } from '../types';
import { X, CheckCircle2, Calendar, Clock, Gauge, User, FileText } from 'lucide-react';
import { engineersList } from '../data/mockData';

interface RecordPMActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: PMScheduleRule;
  onRecordCompletion: (scheduleId: string, newMetricValue: number | string, notes: string, engineer: string) => void;
}

export const RecordPMActivityModal: React.FC<RecordPMActivityModalProps> = ({
  isOpen,
  onClose,
  schedule,
  onRecordCompletion
}) => {
  const [completionDate, setCompletionDate] = useState(new Date().toISOString().split('T')[0]);
  const [metricReading, setMetricReading] = useState<string | number>(
    schedule.triggerType === 'Calendar' 
      ? new Date().toISOString().split('T')[0]
      : (typeof schedule.nextDueMetric === 'number' ? schedule.nextDueMetric : 500)
  );
  const [engineer, setEngineer] = useState(engineersList[0] || 'Senior Maintenance Engineer');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordCompletion(
      schedule.id,
      metricReading,
      notes || `Routine PM servicing completed on ${completionDate}. All checks passed.`,
      engineer
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in overflow-y-auto" onClick={onClose}>
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 flex flex-col my-auto border border-slate-200 dark:border-slate-800 overflow-hidden slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Record Completed PM Servicing</h2>
              <p className="text-xs text-slate-500">{schedule.equipmentName} ({schedule.equipmentId})</p>
            </div>
          </div>
          <button className="btn-icon-only text-slate-400 hover:text-slate-600" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Rule Context Card */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">PM Category</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{schedule.category}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Interval</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Every {schedule.intervalValue} {schedule.triggerType}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Current Status</span>
              <span className={`badge text-[10px] ${
                schedule.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                schedule.status === 'Upcoming Due' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {schedule.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Calendar size={14} /> Completion Date
              </label>
              <input 
                type="date" 
                className="form-input text-sm w-full"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                {schedule.triggerType === 'Hours' && <Clock size={14} />}
                {schedule.triggerType === 'Kilometers' && <Gauge size={14} />}
                {schedule.triggerType === 'Calendar' && <Calendar size={14} />}
                {schedule.triggerType === 'Calendar' ? 'New Target Date' : `Current ${schedule.triggerType} Reading`}
              </label>
              {schedule.triggerType === 'Calendar' ? (
                <input 
                  type="date" 
                  className="form-input text-sm w-full"
                  value={String(metricReading)}
                  onChange={(e) => setMetricReading(e.target.value)}
                  required
                />
              ) : (
                <input 
                  type="number" 
                  className="form-input text-sm w-full font-mono"
                  placeholder={`e.g. ${schedule.nextDueMetric}`}
                  value={metricReading}
                  onChange={(e) => setMetricReading(Number(e.target.value))}
                  required
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <User size={14} /> Performing Engineer / Technician
            </label>
            <select 
              className="form-input text-sm w-full"
              value={engineer}
              onChange={(e) => setEngineer(e.target.value)}
            >
              {engineersList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <FileText size={14} /> Servicing Notes & Inspection Remarks
            </label>
            <textarea 
              className="form-input text-sm w-full min-h-[80px] resize-y"
              placeholder="Describe maintenance actions taken, fluids changed, or inspection results..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2" style={{ backgroundColor: '#10B981', borderColor: '#10B981', color: 'white' }}>
              <CheckCircle2 size={16} /> Record Service & Reset PM Counter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
