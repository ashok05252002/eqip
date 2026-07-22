import React, { useState } from 'react';
import type { MaintenanceJob, SparePart } from '../types';
import { 
  ArrowLeft, 
  Clock, 
  Package, 
  FileText, 
  Download, 
  Printer,
  ChevronDown,
  List,
  Image as ImageIcon,
  Calendar,
  UploadCloud,
  CheckCircle2 as CheckCircle
} from 'lucide-react';
import { SparePartsConsumptionModal } from './SparePartsConsumptionModal';

interface MaintenanceJobDetailViewProps {
  job: MaintenanceJob;
  parts: SparePart[];
  onBack: () => void;
  onUpdateStatus: (jobId: string, status: MaintenanceJob['status']) => void;
  onConsumePart: (partId: string, quantity: number, details: any) => void;
}

export const MaintenanceJobDetailView: React.FC<MaintenanceJobDetailViewProps> = ({ 
  job, 
  parts,
  onBack, 
  onUpdateStatus,
  onConsumePart
}) => {
  const [isPartsModalOpen, setIsPartsModalOpen] = useState(false);

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
                job.status === 'Completed' ? 'badge-green' :
                job.status === 'In Progress' ? 'badge-blue' :
                job.status === 'Waiting for Parts' ? 'badge-amber' : 'badge-gray'
              }`}>
                {job.status}
              </span>
              <span className="badge badge-gray text-xs font-mono">{job.id.toUpperCase()}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {job.equipmentName} (S/N: {job.equipmentSerial}) • Assigned to: {job.assigneeName}
            </p>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Timed Duration</div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono">14h 30m</div>
            </div>
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

        {/* Right Column: Documents & Vault */}
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

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900/50">
              <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Document Vault
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {[
                { name: 'Initial Inspection Photos.zip', type: 'Photo Evidence', icon: <ImageIcon size={20} className="text-blue-500" /> },
                { name: 'Pressure Test Graph.pdf', type: 'Inspection Certificate', icon: <FileText size={20} className="text-red-500" /> },
                { name: 'Signed Service Report.pdf', type: 'Service Report', icon: <FileText size={20} className="text-green-500" /> }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-primary/50 transition-colors group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg shrink-0">
                      {doc.icon}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.type}</p>
                    </div>
                  </div>
                  <button className="btn-icon-only opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 z-40 slide-in-bottom border border-slate-700">
        <button 
          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors border-r border-slate-700 pr-6"
          onClick={() => setIsPartsModalOpen(true)}
        >
          <Package size={16} className="text-amber-400" /> Request Spare Parts
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors border-r border-slate-700 pr-6" onClick={() => window.print()}>
          <Printer size={16} className="text-blue-400" /> Print Job Card
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-green-600 bg-green-500 rounded-full text-sm font-bold transition-colors ml-2 shadow-lg shadow-green-500/20" onClick={() => onUpdateStatus(job.id, 'Completed')}>
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
    </div>
  );
};
