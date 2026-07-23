import React, { useState } from 'react';
import type { MaintenanceJob, SparePart, ProgressLogEntry } from '../types';
import { 
  ArrowLeft, 
  Clock, 
  Package, 
  FileText, 
  Printer,
  ChevronDown,
  List,
  Calendar,
  UploadCloud,
  Activity,
  CheckCircle2 as CheckCircle
} from 'lucide-react';
import { SparePartsConsumptionModal } from './SparePartsConsumptionModal';
import { UpdateJobProgressModal } from './UpdateJobProgressModal';

interface MaintenanceJobDetailViewProps {
  job: MaintenanceJob;
  parts: SparePart[];
  onBack: () => void;
  onUpdateStatus: (jobId: string, status: MaintenanceJob['status']) => void;
  onConsumePart: (partId: string, quantity: number, details: any) => void;
  onSaveProgress?: (jobId: string, progress: number, status: MaintenanceJob['status'], log: ProgressLogEntry) => void;
}

export const MaintenanceJobDetailView: React.FC<MaintenanceJobDetailViewProps> = ({ 
  job, 
  parts,
  onBack, 
  onUpdateStatus,
  onConsumePart,
  onSaveProgress
}) => {
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const [localProgress, setLocalProgress] = useState(job.progress || 35);
  const [localStatus, setLocalStatus] = useState(job.status);
  const [progressLogs, setProgressLogs] = useState<ProgressLogEntry[]>(job.progressLogs || [
    {
      id: 'log-1',
      timestamp: `${job.createdAt} 09:30`,
      progress: 15,
      status: 'Open',
      stage: '1. Intake & Initial Assessment',
      notes: 'Initial workshop receiving complete. Disassembly initiated.',
      engineerName: job.assigneeName
    },
    {
      id: 'log-2',
      timestamp: `${job.createdAt} 14:15`,
      progress: 35,
      status: 'Under Inspection',
      stage: '2. Diagnostic Inspection',
      notes: 'Pressure test executed. Diagnostic revealed worn primary elastomer seal.',
      engineerName: job.assigneeName
    }
  ]);

  const handleSaveProgress = (jobId: string, newProgress: number, newStatus: MaintenanceJob['status'], newLog: ProgressLogEntry) => {
    setLocalProgress(newProgress);
    setLocalStatus(newStatus);
    setProgressLogs(prev => [newLog, ...prev]);
    onUpdateStatus(jobId, newStatus);
    if (onSaveProgress) {
      onSaveProgress(jobId, newProgress, newStatus, newLog);
    }
  };

  return (
    <div className="view-container fade-in flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-y-auto pb-24">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <button className="btn-icon-only" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{job.title}</h1>
              <span className={`badge ${
                localStatus === 'Completed' ? 'badge-green' :
                localStatus === 'In Progress' ? 'badge-blue' :
                localStatus === 'Waiting for Parts' ? 'badge-amber' : 'badge-gray'
              }`}>
                {localStatus}
              </span>
              <span className="badge badge-gray text-xs font-mono">{job.id.toUpperCase()}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {job.equipmentName} (S/N: {job.equipmentSerial}) • Assigned to: {job.assigneeName}
            </p>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Job Progress</span>
                <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">{localProgress}%</span>
              </div>
              <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${localProgress}%` }} />
              </div>
            </div>

            <button 
              className="btn-primary flex items-center gap-2 shadow-sm"
              style={{ backgroundColor: '#10B981', borderColor: '#10B981', color: 'white' }}
              onClick={() => setIsProgressModalOpen(true)}
            >
              <Activity size={16} /> Update Progress
            </button>

            <button 
              className="btn-secondary flex items-center gap-2"
              onClick={() => setIsPartsModalOpen(true)}
            >
              <Package size={16} /> Request Spare Parts
            </button>
            <div className="relative group">
              <button className="btn-secondary">
                Change Status <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                {['Open', 'Under Inspection', 'Waiting for Parts', 'In Progress', 'Completed'].map(status => (
                  <button 
                    key={status}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => onUpdateStatus(job.id, status as MaintenanceJob['status'])}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="p-6 grid grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column: Diagnostics & Repair */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-bottom">
            <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900/50">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Diagnostic & Repair Logs
              </h2>
            </div>
            
            <div className="p-5 flex flex-col gap-5">
              <div className="form-group">
                <label>Complaint Description (Intake Log)</label>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {job.description}
                </div>
              </div>

              <div className="form-group">
                <label>Root Cause Analysis</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <select className="form-input col-span-1">
                    <option>Mechanical Wear</option>
                    <option>Electrical Failure</option>
                    <option>Seal/Elastomer Degradation</option>
                    <option>Operator Error</option>
                    <option>Other</option>
                  </select>
                  <input type="text" className="form-input col-span-2" placeholder="e.g. Seal failure due to thermal degradation..." />
                </div>
              </div>

              <div className="form-group">
                <label>Diagnostic Findings & Inspection Results</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  {['Pressure Test Failed', 'Vibration Detected', 'Fluid Contamination', 'Visual Cracks'].map((finding, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary" defaultChecked={idx === 0} />
                      <span className="text-sm font-medium">{finding}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Work Performed Log</label>
                <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 p-2 flex gap-2">
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded"><b>B</b></button>
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded"><i>I</i></button>
                    <div className="w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded"><List size={16}/></button>
                  </div>
                  <textarea 
                    className="w-full p-3 bg-white dark:bg-slate-800 outline-none text-sm min-h-[150px] resize-y text-slate-700 dark:text-slate-300"
                    placeholder="Document step-by-step repair actions taken..."
                    defaultValue="1. Disassembled main housing.&#10;2. Removed damaged primary seal.&#10;3. Cleaned sealing surfaces with solvent.&#10;4. Installed new elastomer seal kit."
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="form-group">
                  <label><Calendar size={14} className="inline mr-1"/> Start Date/Time</label>
                  <input type="datetime-local" className="form-input text-sm" defaultValue={`${job.createdAt}T08:00`} />
                </div>
                <div className="form-group">
                  <label><Calendar size={14} className="inline mr-1"/> Completion Date/Time</label>
                  <input type="datetime-local" className="form-input text-sm" />
                </div>
                <div className="form-group">
                  <label><Clock size={14} className="inline mr-1"/> Total Labor Hours</label>
                  <input type="number" className="form-input text-sm" placeholder="e.g. 14.5" defaultValue="14.5" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Document Uploader */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-right" style={{ animationDelay: '0.1s' }}>
            <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900/50">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <UploadCloud size={18} className="text-primary" />
                Document Uploader
              </h2>
            </div>
            <div className="p-5">
              <div className="drag-drop-zone p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer mb-4">
                <UploadCloud size={32} className="text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Drag & Drop files here</p>
                <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 50MB</p>
              </div>
              <div className="form-group">
                <label>Document Tag</label>
                <select className="form-input w-full text-sm">
                  <option>Service Report</option>
                  <option>Inspection Certificate</option>
                  <option>Calibration Certificate</option>
                  <option>Photo Evidence</option>
                </select>
              </div>
              <button className="btn-secondary w-full mt-4 justify-center">Upload File</button>
            </div>
          </div>

          {/* Diagnostic Progress History Timeline Card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Activity size={18} className="text-emerald-500" />
                Progress & Diagnostic Timeline
              </h2>
              <button className="text-xs font-semibold text-primary hover:underline" onClick={() => setIsProgressModalOpen(true)}>+ Add Log</button>
            </div>
            <div className="p-4 flex flex-col gap-4 max-h-[350px] overflow-y-auto">
              {progressLogs.map((log) => (
                <div key={log.id} className="p-3 border-l-2 border-emerald-500 bg-slate-50 dark:bg-slate-900/60 rounded-r-lg text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{log.stage}</span>
                    <span className="font-mono text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200">{log.progress}%</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">{log.notes}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                    <span>By: {log.engineerName}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-40 slide-in-bottom border border-slate-700">
        <button 
          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors border-r border-slate-700 pr-6 text-emerald-400"
          onClick={() => setIsProgressModalOpen(true)}
        >
          <Activity size={16} /> Update Progress & Diagnostic
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors border-r border-slate-700 pr-6"
          onClick={() => setIsPartsModalOpen(true)}
        >
          <Package size={16} className="text-amber-400" /> Request Spare Parts
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors border-r border-slate-700 pr-6" onClick={() => window.print()}>
          <Printer size={16} className="text-blue-400" /> Print Job Card
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-green-600 bg-green-500 rounded-full text-sm font-bold transition-colors ml-2 shadow-lg shadow-green-500/20" onClick={() => handleSaveProgress(job.id, 100, 'Completed', { id: `log-${Date.now()}`, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), progress: 100, status: 'Completed', stage: '6. Fully Completed & Signed Off', notes: 'Job marked completed & signed off.', engineerName: job.assigneeName })}>
          <CheckCircle size={18} /> Mark Job Completed
        </button>
      </div>

      <SparePartsConsumptionModal 
        isOpen={isPartsModalOpen}
        onClose={() => setIsPartsModalOpen(false)}
        parts={parts}
        jobId={job.id}
        onConsume={onConsumePart}
      />

      <UpdateJobProgressModal 
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        job={{ ...job, progress: localProgress, status: localStatus }}
        onSaveProgress={handleSaveProgress}
      />
    </div>
  );
};
