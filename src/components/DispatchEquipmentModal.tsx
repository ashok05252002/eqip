import React, { useState } from 'react';
import type { Equipment, DeploymentRecord } from '../types';
import { X, Send, MapPin, Building, Calendar, Gauge, User, FileText } from 'lucide-react';
import { mockCustomers, mockSites, engineersList } from '../data/mockData';

interface DispatchEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment;
  onDispatch: (
    equipmentId: string,
    customer: string,
    site: string,
    location: string,
    record: DeploymentRecord
  ) => void;
}

export const DispatchEquipmentModal: React.FC<DispatchEquipmentModalProps> = ({
  isOpen,
  onClose,
  equipment,
  onDispatch
}) => {
  const [targetCustomer, setTargetCustomer] = useState<string>(equipment.customer || mockCustomers[0]?.name || 'Aramco');
  const [targetSite, setTargetSite] = useState<string>(mockSites[0]?.name || 'Offshore Platform B');
  const [location, setLocation] = useState<string>(mockSites[0]?.location || 'Offshore Platform B - Rig Deck 4');
  const [dispatchDate, setDispatchDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [meterReading, setMeterReading] = useState<number>(equipment.operatingHours || 14500);
  const [dispatchRef, setDispatchRef] = useState<string>(`DSP-${Math.floor(100000 + Math.random() * 900000)}`);
  const [authorizedBy, setAuthorizedBy] = useState<string>(engineersList[0] || 'Senior Logistics Officer');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: DeploymentRecord = {
      id: `dep-${Date.now()}`,
      type: 'Dispatch to Customer Site',
      date: dispatchDate,
      customer: targetCustomer,
      site: targetSite,
      location,
      meterReading,
      recordedBy: authorizedBy,
      notes: notes || `Dispatched to ${targetCustomer} (${targetSite}) under Waybill ${dispatchRef}.`
    };

    onDispatch(equipment.id, targetCustomer, targetSite, location, newRecord);
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
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg">
              <Send size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Dispatch / Transfer Equipment to Customer</h2>
              <p className="text-xs text-slate-500">{equipment.id.toUpperCase()} • {equipment.manufacturer} {equipment.model}</p>
            </div>
          </div>
          <button className="btn-icon-only text-slate-400 hover:text-slate-600" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Current Custody Context */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block">Current Status</span>
              <span className="badge badge-amber text-[10px] mt-0.5">{equipment.status}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Current Location</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{equipment.currentLocation || 'Central Workshop'}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Meter Reading</span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{equipment.operatingHours || 'N/A'} hrs</span>
            </div>
          </div>

          {/* Target Customer & Site Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Building size={14} /> Destination Customer
              </label>
              <select 
                className="form-input text-sm w-full font-semibold"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
                required
              >
                {mockCustomers.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <MapPin size={14} /> Destination Site
              </label>
              <select 
                className="form-input text-sm w-full"
                value={targetSite}
                onChange={(e) => {
                  setTargetSite(e.target.value);
                  const selected = mockSites.find(s => s.name === e.target.value);
                  if (selected) setLocation(`${selected.name} - ${selected.location}`);
                }}
                required
              >
                {mockSites.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.customerName})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Exact Rig / Site Location Address</label>
            <input 
              type="text" 
              className="form-input text-sm w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Permian Basin Rig 4 - Pad A"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Calendar size={14} /> Dispatch Date
              </label>
              <input 
                type="date" 
                className="form-input text-sm w-full"
                value={dispatchDate}
                onChange={(e) => setDispatchDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <Gauge size={14} /> Meter (Hrs)
              </label>
              <input 
                type="number" 
                className="form-input text-sm w-full font-mono"
                value={meterReading}
                onChange={(e) => setMeterReading(Number(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Waybill / Ref #</label>
              <input 
                type="text" 
                className="form-input text-sm w-full font-mono"
                value={dispatchRef}
                onChange={(e) => setDispatchRef(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <User size={14} /> Authorizing Logistics Officer / Engineer
            </label>
            <select 
              className="form-input text-sm w-full"
              value={authorizedBy}
              onChange={(e) => setAuthorizedBy(e.target.value)}
            >
              {engineersList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <FileText size={14} /> Transfer Remarks & Dispatch Instructions
            </label>
            <textarea 
              className="form-input text-sm w-full min-h-[75px] resize-y"
              placeholder="Enter transport details, driver contacts, or site delivery instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2" style={{ backgroundColor: '#2563EB', borderColor: '#2563EB', color: 'white' }}>
              <Send size={16} /> Dispatch Equipment & Update Custody
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
