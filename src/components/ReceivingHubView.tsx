import React, { useState } from 'react';
import type { IntakeRecord } from '../types';
import { Plus, ClipboardCheck, Clock, FileText, Image, Hammer } from 'lucide-react';
import { ReceivingWizardModal } from './ReceivingWizardModal';

interface ReceivingHubViewProps {
  intakeRecords: IntakeRecord[];
  onGenerateReceipt: (jobRef: string) => void;
}

export const ReceivingHubView: React.FC<ReceivingHubViewProps> = ({ intakeRecords, onGenerateReceipt }) => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

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
    </div>
  );
};
