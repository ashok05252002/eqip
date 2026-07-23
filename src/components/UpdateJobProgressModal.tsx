import React, { useState } from 'react';
import type { MaintenanceJob, ProgressLogEntry } from '../types';
import { X, Activity, CheckCircle2, Sliders, FileText } from 'lucide-react';

interface UpdateJobProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: MaintenanceJob;
  onSaveProgress: (jobId: string, progress: number, status: MaintenanceJob['status'], log: ProgressLogEntry) => void;
}

export const UpdateJobProgressModal: React.FC<UpdateJobProgressModalProps> = ({
  isOpen,
  onClose,
  job,
  onSaveProgress
}) => {
  const [progress, setProgress] = useState<number>(job.progress || 0);
  const [status, setStatus] = useState<MaintenanceJob['status']>(job.status);
  const [stage, setStage] = useState<string>('2. Diagnostic Inspection');
  const [notes, setNotes] = useState<string>('');
  const [engineerName, setEngineerName] = useState<string>(job.assigneeName || 'Senior Engineer');

  if (!isOpen) return null;

  const handleProgressChange = (val: number) => {
    setProgress(val);
    if (val === 100) {
      setStatus('Completed');
      setStage('6. Fully Completed & Signed Off');
    } else if (val >= 75) {
      if (status !== 'Completed') setStatus('In Progress');
      setStage('4. Active Servicing & Repair');
    } else if (val >= 35) {
      if (status !== 'Completed') setStatus('Under Inspection');
      setStage('2. Diagnostic Inspection');
    }
  };

  const handleStatusChange = (newStatus: MaintenanceJob['status']) => {
    setStatus(newStatus);
    if (newStatus === 'Completed') {
      setProgress(100);
      setStage('6. Fully Completed & Signed Off');
    } else if (newStatus === 'Under Inspection' && progress < 25) {
      setProgress(25);
    } else if (newStatus === 'In Progress' && progress < 50) {
      setProgress(50);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: ProgressLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      progress,
      status,
      stage,
      notes: notes || `Progress updated to ${progress}% (${stage})`,
      engineerName
    };
    onSaveProgress(job.id, progress, status, newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in overflow-y-auto" onClick={onClose}>
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 flex flex-col my-auto border border-slate-200 dark:border-slate-800 overflow-hidden slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Activity size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Update Job Progress & Diagnostics</h2>
              <p className="text-xs text-slate-500">{job.id.toUpperCase()} • {job.equipmentName}</p>
            </div>
          </div>
          <button className="btn-icon-only text-slate-400 hover:text-slate-600" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* Progress Bar Preview & Slider */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Sliders size={14} /> Completion Progress Percentage
              </label>
              <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{progress}%</span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Slider Controls */}
            <input 
              type="range" 
              min={0} 
              max={100} 
              step={5}
              value={progress}
              onChange={(e) => handleProgressChange(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer mb-3"
            />

            {/* Quick Preset Buttons */}
            <div className="flex justify-between gap-2">
              {[15, 35, 50, 75, 100].map(val => (
                <button
                  key={val}
                  type="button"
                  className={`flex-1 py-1 text-xs font-semibold rounded border transition-all ${progress === val ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100'}`}
                  onClick={() => handleProgressChange(val)}
                >
                  {val === 100 ? '100% (Done)' : `${val}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostic Stage & Status Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Diagnostic Milestone Stage</label>
              <select 
                className="form-input text-sm w-full"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="1. Intake & Initial Assessment">1. Intake & Initial Assessment</option>
                <option value="2. Diagnostic Inspection">2. Diagnostic Inspection</option>
                <option value="3. Spare Parts Requested">3. Spare Parts Requested</option>
                <option value="4. Active Servicing & Repair">4. Active Servicing & Repair</option>
                <option value="5. Testing & Calibration">5. Testing & Calibration</option>
                <option value="6. Fully Completed & Signed Off">6. Fully Completed & Signed Off</option>
              </select>
            </div>

            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Job Lifecycle Status</label>
              <select 
                className="form-input text-sm w-full font-semibold"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as MaintenanceJob['status'])}
              >
                <option value="Open">Open</option>
                <option value="Under Inspection">Under Inspection</option>
                <option value="Waiting for Parts">Waiting for Parts</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Engineer & Notes */}
          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Reporting Engineer</label>
            <input 
              type="text" 
              className="form-input text-sm w-full"
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <FileText size={14} /> Diagnostic Findings & Progress Remarks
            </label>
            <textarea 
              className="form-input text-sm w-full min-h-[90px] resize-y"
              placeholder="e.g. Completed pressure manifold disassembly. Primary seal replacement in progress..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2" style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}>
              <CheckCircle2 size={16} /> Save Progress & Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
