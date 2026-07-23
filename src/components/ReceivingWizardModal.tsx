import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Search, UploadCloud, CheckCircle2, Image as ImageIcon, Plus } from 'lucide-react';
import { initialEquipment, engineersList } from '../data/mockData';

interface ReceivingWizardModalProps {
  onClose: () => void;
  onSubmit: (jobRef: string) => void;
}

export const ReceivingWizardModal: React.FC<ReceivingWizardModalProps> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedEqId, setSelectedEqId] = useState('');
  
  // Computed eq details
  const equipment = initialEquipment.find(eq => eq.id === selectedEqId);

  const handleNext = () => setStep(prev => Math.min(3, prev + 1));
  const handleBack = () => setStep(prev => Math.max(1, prev - 1));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJobRef = `JOB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    onSubmit(newJobRef);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in overflow-y-auto" onClick={onClose}>
      <div 
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl z-50 flex flex-col my-auto" 
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900 rounded-t-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Record New Equipment Intake</h2>
            <p className="text-sm text-slate-500 mt-1">Complete the receiving diagnostic process</p>
          </div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex gap-2">
          {[1, 2, 3].map(num => (
            <div key={num} className="flex-1 flex flex-col gap-2">
              <div 
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ background: step >= num ? 'var(--primary)' : 'var(--slate-200)' }}
              />
              <span className={`text-xs font-semibold ${step >= num ? 'text-primary' : 'text-slate-400'}`}>
                {num === 1 ? '1. Equipment Selection' : num === 2 ? '2. Diagnostics' : '3. Photo Uploads'}
              </span>
            </div>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto" style={{ flex: 1 }}>
          <form id="intake-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="flex flex-col gap-6 slide-in-right">
                <div className="form-group">
                  <label>Select Incoming Equipment</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select 
                      className="form-input w-full pl-10" 
                      value={selectedEqId}
                      onChange={(e) => setSelectedEqId(e.target.value)}
                      required
                    >
                      <option value="" disabled>Search or select equipment by ID/Name...</option>
                      {initialEquipment.map(eq => (
                        <option key={eq.id} value={eq.id}>{eq.id} - {eq.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {equipment && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-xs text-slate-500 block">Customer</span>
                      <span className="font-semibold text-sm">{equipment.customer}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Current Site</span>
                      <span className="font-semibold text-sm">{equipment.site}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Category</span>
                      <span className="font-semibold text-sm">{equipment.category}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Serial Number</span>
                      <span className="font-mono text-sm">{equipment.serialNumber}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Date Received</label>
                    <input type="date" className="form-input" defaultValue={new Date().toISOString().split('T')[0]} required />
                  </div>
                  <div className="form-group">
                    <label>Time Received</label>
                    <input type="time" className="form-input" defaultValue="08:00" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Receiving Engineer</label>
                  <select className="form-input w-full" required>
                    <option value="" disabled selected>Select Engineer...</option>
                    {engineersList.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6 slide-in-right">
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label>Current Meter Reading (Hours)</label>
                    <div className="flex gap-2 items-center">
                      <input type="number" className="form-input w-full" placeholder="e.g. 14500" required />
                      {equipment && (
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          Last: {equipment.operatingHours} hrs
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Reported Fault / Reason for Return</label>
                  <textarea 
                    className="form-input w-full" 
                    rows={3} 
                    placeholder="Describe the customer complaint or reason for maintenance intake..."
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label>Overall Condition upon Arrival</label>
                    <select className="form-input w-full" defaultValue="Minor Damage">
                      <option>Operational / Good</option>
                      <option>Minor Damage</option>
                      <option>Severe Breakdown</option>
                      <option>Non-Operational / Scrap</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Arrival Physical Checklist</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {['External Damage', 'Fluid Leaks', 'Missing Components', 'Normal Wear'].map(condition => (
                        <label key={condition} className="flex items-center gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium">
                          <input type="checkbox" className="w-3.5 h-3.5 text-primary rounded border-slate-300 focus:ring-primary" />
                          <span>{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Field Notes / Remarks</label>
                  <textarea 
                    className="form-input w-full" 
                    rows={2} 
                    placeholder="Any additional notes on arrival condition..."
                  ></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6 slide-in-right">
                <div className="form-group">
                  <label>Upload Arrival Photos (Optional)</label>
                  <div className="drag-drop-zone mt-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                      <UploadCloud size={32} />
                    </div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">Drag & Drop photos here</h3>
                    <p className="text-sm text-slate-500 mt-2 text-center max-w-sm">
                      Upload photos of machine exterior, damaged components, serial plate tags, or hour meter.
                    </p>
                    <button type="button" className="btn-secondary mt-6">Browse Files</button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[
                    { id: 1, label: 'Front View' },
                    { id: 2, label: 'Hour Meter' },
                    { id: 3, label: 'Engine Bay' }
                  ].map(img => (
                    <div key={img.id} className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 aspect-square flex flex-col items-center justify-center">
                      <ImageIcon size={24} className="text-slate-300" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2">
                        <p className="text-[10px] text-white font-medium truncate text-center">{img.label}</p>
                      </div>
                      <div className="absolute top-1 right-1">
                        <CheckCircle2 size={16} className="text-primary bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center aspect-square hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <Plus size={24} className="text-slate-400" />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900 rounded-b-xl">
          <button 
            className="btn-secondary" 
            onClick={handleBack} 
            disabled={step === 1}
            style={{ opacity: step === 1 ? 0 : 1 }}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          {step < 3 ? (
            <button className="btn-primary" onClick={handleNext} disabled={step === 1 && !selectedEqId}>
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button form="intake-form" type="submit" className="btn-primary" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              Submit Intake
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
