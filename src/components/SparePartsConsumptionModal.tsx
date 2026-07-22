import React, { useState } from 'react';
import type { SparePart } from '../types';
import { X, Search, QrCode, Calendar, MapPin, PackageMinus } from 'lucide-react';

interface SparePartsConsumptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: SparePart[];
  jobId: string;
  onConsume: (partId: string, quantity: number, details: any) => void;
}

export const SparePartsConsumptionModal: React.FC<SparePartsConsumptionModalProps> = ({ isOpen, onClose, parts, jobId, onConsume }) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [installedSerial, setInstalledSerial] = useState<string>('');
  const [removedSerial, setRemovedSerial] = useState<string>('');
  const [installDate, setInstallDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [location] = useState<string>('');

  if (!isOpen) return null;

  const selectedPart = parts.find(p => p.id === selectedPartId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPart) return;

    onConsume(selectedPart.id, quantity, {
      installedSerial,
      removedSerial,
      installDate,
      location
    });
    
    // Reset form
    setSelectedPartId('');
    setQuantity(1);
    setInstalledSerial('');
    setRemovedSerial('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-bottom">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <PackageMinus size={24} className="text-primary" />
              Log Part Consumption
            </h2>
            <p className="text-sm text-slate-500 mt-1">Attaching to Job: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{jobId}</span></p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col gap-6">
            
            {/* Part Lookup */}
            <div className="form-group">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Part Lookup</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  className="form-input pl-10 w-full font-medium"
                  value={selectedPartId}
                  onChange={(e) => setSelectedPartId(e.target.value)}
                  required
                >
                  <option value="" disabled>Search and select a part to consume...</option>
                  {parts.map(p => (
                    <option key={p.id} value={p.id} disabled={p.stockQty <= 0}>
                      {p.partNumber} - {p.description} ({p.stockQty} {p.uom} available)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedPart && (
              <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="form-group">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Quantity Used</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      min="1" 
                      max={selectedPart.stockQty}
                      className="form-input w-24 text-center font-bold"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      required
                    />
                    <span className="text-sm text-slate-500 font-medium bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-md">{selectedPart.uom}</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                    <MapPin size={16} className="text-slate-400" /> Bin Location
                  </label>
                  <input 
                    type="text" 
                    className="form-input w-full bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                    value={selectedPart.warehouseLocation}
                    readOnly
                  />
                </div>
              </div>
            )}

            {/* Serial Traceability Section */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 pb-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                Serial Number Traceability <span className="text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider">Crucial</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Installed Part Serial #</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="form-input w-full font-mono text-indigo-600 dark:text-indigo-400 font-semibold focus:ring-indigo-500 pr-10"
                      placeholder="Scan or enter new S/N"
                      value={installedSerial}
                      onChange={e => setInstalledSerial(e.target.value)}
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors">
                      <QrCode size={18} />
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Removed Part Serial # (Defective)</label>
                  <input 
                    type="text" 
                    className="form-input w-full font-mono text-slate-600 dark:text-slate-400"
                    placeholder="Enter old S/N for tracking"
                    value={removedSerial}
                    onChange={e => setRemovedSerial(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar size={14} /> Installation Date & Time
                  </label>
                  <input 
                    type="datetime-local" 
                    className="form-input w-full text-sm"
                    value={installDate}
                    onChange={e => setInstallDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
              disabled={!selectedPart}
            >
              Record & Attach to Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
