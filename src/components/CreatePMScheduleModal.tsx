import React, { useState } from 'react';
import type { Equipment } from '../types';
import { X, CalendarPlus, Search, Bell, Monitor, Mail, HelpCircle } from 'lucide-react';

interface CreatePMScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentList: Equipment[];
  onSave: (ruleData: any) => void;
}

export const CreatePMScheduleModal: React.FC<CreatePMScheduleModalProps> = ({ isOpen, onClose, equipmentList, onSave }) => {
  const [selectedEq, setSelectedEq] = useState('');
  const [category, setCategory] = useState('Preventive');
  const [triggerType, setTriggerType] = useState<'Calendar' | 'Hours' | 'Kilometers'>('Hours');
  const [interval, setInterval] = useState(500);
  const [leadTime, setLeadTime] = useState(50);
  const [channels, setChannels] = useState({ dashboard: true, email: false });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEq) return;

    const eq = equipmentList.find(e => e.id === selectedEq);
    
    onSave({
      id: `pm-${Date.now()}`,
      equipmentId: selectedEq,
      equipmentName: eq?.name || 'Unknown',
      category,
      triggerType,
      intervalValue: interval,
      lastServicedMetric: triggerType === 'Calendar' ? new Date().toISOString().split('T')[0] : 0,
      nextDueMetric: triggerType === 'Calendar' ? '2026-12-31' : interval,
      status: 'On Schedule',
      reminderDaysAhead: leadTime
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden slide-in-bottom my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CalendarPlus size={24} className="text-primary" />
              Create PM Schedule Rule
            </h2>
            <p className="text-sm text-slate-500 mt-1">Configure automated maintenance triggers for an asset</p>
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col gap-6">
            
            {/* Equipment Selection */}
            <div className="form-group">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Target Equipment</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select 
                  className="form-input pl-10 w-full font-medium"
                  value={selectedEq}
                  onChange={(e) => setSelectedEq(e.target.value)}
                  required
                >
                  <option value="" disabled>Search and select equipment...</option>
                  {equipmentList.map(eq => (
                    <option key={eq.id} value={eq.id}>
                      {eq.id} - {eq.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Maintenance Type */}
            <div className="form-group">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Maintenance Type</label>
              <select 
                className="form-input w-full"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Preventive">Preventive Maintenance (Routine)</option>
                <option value="Inspection">Visual / NDT Inspection</option>
                <option value="Overhaul">Major Overhaul</option>
                <option value="Calibration">Sensor / Gauge Calibration</option>
              </select>
            </div>

            {/* Trigger Metric */}
            <div className="form-group">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1">
                Trigger Metric <HelpCircle size={14} className="text-slate-400" />
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg border border-slate-200 dark:border-slate-700 w-full">
                {['Calendar', 'Hours', 'Kilometers'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${triggerType === type ? 'bg-white dark:bg-slate-700 shadow-sm text-primary border border-slate-200 dark:border-slate-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'}`}
                    onClick={() => setTriggerType(type as any)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Interval Input */}
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Interval Value</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-md">Every</span>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-input w-24 text-center font-bold"
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value))}
                    required
                  />
                  <span className="text-sm text-slate-500 font-medium">{triggerType === 'Calendar' ? 'Days' : triggerType === 'Hours' ? 'Op. Hours' : 'KM'}</span>
                </div>
              </div>

              {/* Advance Notification */}
              <div className="form-group">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Bell size={16} className="text-amber-500" /> Lead Time
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-md">Notify</span>
                  <input 
                    type="number" 
                    min="1" 
                    className="form-input w-24 text-center font-bold"
                    value={leadTime}
                    onChange={(e) => setLeadTime(Number(e.target.value))}
                    required
                  />
                  <span className="text-sm text-slate-500 font-medium">{triggerType === 'Calendar' ? 'Days' : triggerType === 'Hours' ? 'Hours' : 'KM'} Prior</span>
                </div>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="form-group pt-4 border-t border-slate-200 dark:border-slate-700">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 block">Alert Delivery Channels</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-1">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" 
                    checked={channels.dashboard}
                    onChange={e => setChannels(prev => ({ ...prev, dashboard: e.target.checked }))}
                  />
                  <Monitor size={18} className={channels.dashboard ? 'text-primary' : 'text-slate-400'} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Dashboard</span>
                </label>
                
                <label className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex-1">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary" 
                    checked={channels.email}
                    onChange={e => setChannels(prev => ({ ...prev, email: e.target.checked }))}
                  />
                  <Mail size={18} className={channels.email ? 'text-primary' : 'text-slate-400'} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Digest</span>
                </label>
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
              disabled={!selectedEq}
            >
              Save PM Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
