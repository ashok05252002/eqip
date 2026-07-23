import React, { useState } from 'react';
import type { IntakeRecord, DeploymentRecord, Equipment } from '../types';
import { Plus, ClipboardCheck, Clock, FileText, Image, Hammer, Send } from 'lucide-react';
import { ReceivingWizardModal } from './ReceivingWizardModal';
import { DispatchEquipmentModal } from './DispatchEquipmentModal';
import { initialEquipment } from '../data/mockData';

interface ReceivingHubViewProps {
  intakeRecords: IntakeRecord[];
  onGenerateReceipt: (jobRef: string) => void;
  onDispatchEquipment?: (equipmentId: string, customer: string, site: string, location: string, record: DeploymentRecord) => void;
}

export const ReceivingHubView: React.FC<ReceivingHubViewProps> = ({ intakeRecords, onGenerateReceipt, onDispatchEquipment }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedEquipmentForDispatch, setSelectedEquipmentForDispatch] = useState<Equipment | null>(null);

  const handleOpenDispatch = (equipmentId: string) => {
    const eq = initialEquipment.find(e => e.id === equipmentId) || {
      id: equipmentId,
      assetNumber: `AST-${equipmentId.toUpperCase()}`,
      name: `Equipment ${equipmentId}`,
      serialNumber: `SN-${equipmentId}`,
      category: 'Oilfield Machinery',
      type: 'Drilling System',
      status: 'In Workshop',
      site: 'Central Workshop',
      currentLocation: 'Workshop Storage Bay',
      lastInspection: new Date().toISOString().split('T')[0],
      nextPM: '2026-09-01',
      healthScore: 85,
      model: 'Standard Model',
      manufacturer: 'NOV'
    };
    setSelectedEquipmentForDispatch(eq);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Inspected': return 'badge-green';
      case 'Pending Diagnostic': return 'badge-amber';
      case 'Assigned to Job': return 'badge-blue';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="view-container fade-in">
      {/* Header Bar */}
      <div className="controls-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        <div className="flex-align-center gap-3">
          <div className="stat-icon-wrapper" style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: 40, height: 40 }}>
            <ClipboardCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Equipment Receiving / Intake Terminal</h1>
            <p className="text-sm text-slate-500">Log and triage incoming assets</p>
          </div>
        </div>

        <div className="flex-align-center gap-4">
          <div className="stat-box" style={{ padding: '8px 16px', gap: '12px' }}>
            <span className="stat-box-label">Today's Intake</span>
            <span className="stat-box-value" style={{ fontSize: '18px' }}>5 Units</span>
          </div>
          <div className="stat-box" style={{ padding: '8px 16px', gap: '12px' }}>
            <span className="stat-box-label">Pending</span>
            <span className="stat-box-value" style={{ fontSize: '18px', color: '#d97706' }}>3 Units</span>
          </div>
          <div className="stat-box" style={{ padding: '8px 16px', gap: '12px' }}>
            <span className="stat-box-label">Avg. Time</span>
            <span className="stat-box-value" style={{ fontSize: '18px' }}>18 mins</span>
          </div>
        </div>

        <button className="btn-primary" onClick={() => setIsWizardOpen(true)}>
          <Plus size={18} /> Record New Equipment Intake
        </button>
      </div>

      {/* Intake Log Summary Table */}
      <div className="content-area">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Recent Receiving Records</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Job Ref #</th>
                <th>Date & Time</th>
                <th>Equipment Details</th>
                <th>Customer & Site</th>
                <th>Meter / Fault</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {intakeRecords.map(record => (
                <tr key={record.id} className="clickable-row">
                  <td className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {record.jobRef}
                  </td>
                  <td>
                    <div className="flex-align-center gap-1 text-slate-600 dark:text-slate-400">
                      <Clock size={14} />
                      <span className="text-sm whitespace-nowrap">{record.dateReceived}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{record.timeReceived}</div>
                  </td>
                  <td>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{record.equipmentName}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1">ID: {record.equipmentId}</div>
                  </td>
                  <td>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{record.customer}</div>
                    <div className="text-xs text-slate-500 mt-1">{record.site}</div>
                  </td>
                  <td>
                    <div className="text-sm text-slate-700 dark:text-slate-300">{record.meterReading.toLocaleString()} hrs</div>
                    <div className="text-xs text-amber-600 truncate max-w-[150px] mt-1" title={record.reportedFault}>
                      {record.reportedFault}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="action-buttons">
                      <button 
                        className="btn-icon-only text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30" 
                        title="Dispatch / Reassign to Customer" 
                        onClick={() => handleOpenDispatch(record.equipmentId)}
                      >
                        <Send size={16} />
                      </button>
                      <button className="btn-icon-only" title="View Intake Receipt" onClick={() => onGenerateReceipt(record.jobRef)}>
                        <FileText size={16} />
                      </button>
                      <button className="btn-icon-only" title="Attach Photos">
                        <Image size={16} />
                      </button>
                      <button className="btn-icon-only text-primary" title="Create Maintenance Job">
                        <Hammer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receiving Wizard Modal */}
      {isWizardOpen && (
        <ReceivingWizardModal 
          onClose={() => setIsWizardOpen(false)} 
          onSubmit={(jobRef) => {
            setIsWizardOpen(false);
            onGenerateReceipt(jobRef);
          }}
        />
      )}

      {selectedEquipmentForDispatch && (
        <DispatchEquipmentModal 
          isOpen={!!selectedEquipmentForDispatch}
          onClose={() => setSelectedEquipmentForDispatch(null)}
          equipment={selectedEquipmentForDispatch}
          onDispatch={(id, cust, site, loc, record) => {
            if (onDispatchEquipment) {
              onDispatchEquipment(id, cust, site, loc, record);
            }
          }}
        />
      )}
    </div>
  );
};
