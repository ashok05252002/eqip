import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Settings, 
  Package, 
  AlertCircle,
  ShieldCheck,
  Calendar,
  Wrench,
  Send,
  Building,
  History
} from 'lucide-react';
import type { DeploymentRecord } from '../types';
import { initialEquipment, mockServiceHistory, mockPartUsageRecords } from '../data/mockData';
import { DispatchEquipmentModal } from './DispatchEquipmentModal';

interface EquipmentProfileViewProps {
  equipmentId: string;
  onBack: () => void;
  onOpenReceivingModal?: (equipmentId?: string) => void;
  onDispatchEquipment?: (equipmentId: string, customer: string, site: string, location: string, record: DeploymentRecord) => void;
}

export const EquipmentProfileView: React.FC<EquipmentProfileViewProps> = ({ 
  equipmentId, 
  onBack,
  onOpenReceivingModal,
  onDispatchEquipment
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'service' | 'parts' | 'history'>('specs');
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  
  // Find the equipment details
  const equipment = initialEquipment.find(eq => eq.id === equipmentId);

  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentRecord[]>(
    equipment?.deploymentHistory || [
      {
        id: 'dep-init',
        type: 'Dispatch to Customer Site',
        date: equipment?.purchaseDate || '2024-01-15',
        customer: equipment?.customer || 'Aramco',
        site: equipment?.site || 'Offshore Rig 4',
        location: equipment?.currentLocation || 'Rig Platform A',
        meterReading: equipment?.operatingHours || 14500,
        recordedBy: 'Senior Logistics Engineer',
        notes: 'Initial commissioning and site deployment.'
      }
    ]
  );

  if (!equipment) {
    return (
      <div className="view-container flex-center">
        <p className="text-slate-500">Equipment not found.</p>
        <button className="btn-secondary mt-4" onClick={onBack}>Go Back</button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational': return 'badge-green';
      case 'In Workshop': return 'badge-amber';
      case 'Under Maintenance': return 'badge-blue';
      case 'Decommissioned': return 'badge-gray';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="view-container fade-in">
      <div className="mb-4">
        <button className="btn-secondary gap-2" onClick={onBack}>
          <ArrowLeft size={16} /> Back to Master Registry
        </button>
      </div>

      {/* Top Header Banner */}
      <div className="profile-banner">
        <div className="profile-banner-left">
          {equipment.imageUrl ? (
            <img src={equipment.imageUrl} alt={equipment.name} className="w-20 h-20 rounded-xl object-cover shadow-sm border border-slate-200 bg-white" />
          ) : (
            <div className="profile-image-placeholder">
              {equipment.name.charAt(0)}
            </div>
          )}
          <div className="profile-title-group">
            <h1 className="profile-title">{equipment.manufacturer} {equipment.model} {equipment.name.split(' ').slice(2).join(' ')}</h1>
            <div className="profile-tags">
              <span className={`badge ${getStatusColor(equipment.status)}`}>
                {equipment.status}
              </span>
              <span className="profile-location">
                <MapPin size={16} className="text-slate-400" />
                {equipment.site}
              </span>
              <span className="profile-id-tag">ID: {equipment.id.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="profile-banner-right flex items-center gap-3">
          <button 
            className="btn-primary flex items-center gap-2" 
            style={{ backgroundColor: '#10B981', color: 'white', borderColor: '#10B981' }}
            onClick={() => onOpenReceivingModal ? onOpenReceivingModal(equipment.id) : alert('Open Workshop Receiving')}
          >
            <Wrench size={16} /> Receive at Workshop
          </button>
          <button 
            className="btn-primary flex items-center gap-2" 
            style={{ backgroundColor: '#2563EB', color: 'white', borderColor: '#2563EB' }}
            onClick={() => setIsDispatchModalOpen(true)}
          >
            <Send size={16} /> Dispatch to Customer Site
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="profile-stats-bar">
        <div className="stat-box">
          <div className="stat-icon-wrapper text-blue-500 bg-blue-50">
            <Clock size={24} />
          </div>
          <div>
            <p className="stat-box-label">Total Operating Hrs</p>
            <p className="stat-box-value">{equipment.operatingHours?.toLocaleString() || 'N/A'}</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon-wrapper text-amber-500 bg-amber-50">
            <Calendar size={24} />
          </div>
          <div>
            <p className="stat-box-label">Days Since Last Service</p>
            <p className="stat-box-value">{equipment.daysSinceService || 'N/A'}</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon-wrapper text-emerald-500 bg-emerald-50">
            <Wrench size={24} />
          </div>
          <div>
            <p className="stat-box-label">Active Jobs Count</p>
            <p className="stat-box-value">{equipment.activeJobsCount || '0'}</p>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon-wrapper text-purple-500 bg-purple-50">
            <Package size={24} />
          </div>
          <div>
            <p className="stat-box-label">Lifetime Parts Replaced</p>
            <p className="stat-box-value">{equipment.lifetimePartsReplaced || '0'}</p>
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="profile-tabs-container">
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            <Settings size={18} /> Technical Specs
          </button>
          <button 
            className={`profile-tab ${activeTab === 'service' ? 'active' : ''}`}
            onClick={() => setActiveTab('service')}
          >
            <Wrench size={18} /> Service History
          </button>
          <button 
            className={`profile-tab ${activeTab === 'parts' ? 'active' : ''}`}
            onClick={() => setActiveTab('parts')}
          >
            <Package size={18} /> Spare Parts History
          </button>
          <button 
            className={`profile-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <MapPin size={18} /> Deployment & Site History
          </button>

        </div>

        <div className="profile-tab-content">
          {activeTab === 'specs' && (
            <div className="specs-grid fade-in">
              <div className="spec-card">
                <span className="spec-label">Asset Number</span>
                <span className="spec-value font-mono text-indigo-600">{equipment.assetNumber}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Equipment Type</span>
                <span className="spec-value">{equipment.type}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Current Location</span>
                <span className="spec-value">{equipment.currentLocation}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Manufacturer</span>
                <span className="spec-value">{equipment.manufacturer}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Model</span>
                <span className="spec-value">{equipment.model}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Serial Number</span>
                <span className="spec-value font-mono">{equipment.serialNumber}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Engine Number</span>
                <span className="spec-value font-mono">{equipment.engineNumber}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Chassis Number</span>
                <span className="spec-value font-mono">{equipment.chassisNumber}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Manufacturing Year</span>
                <span className="spec-value">{equipment.manufacturingYear}</span>
              </div>
              <div className="spec-card">
                <span className="spec-label">Purchase Date</span>
                <span className="spec-value">{equipment.purchaseDate}</span>
              </div>
              
              <div className="spec-card col-span-2 md:col-span-1 border-emerald-200 bg-emerald-50/50">
                <span className="spec-label flex-align-center gap-2">
                  <AlertCircle size={16} className="text-emerald-500"/> Warranty Status
                </span>
                <div className="mt-2">
                  <span className="spec-value text-emerald-700">Active until {equipment.warrantyExpiry}</span>
                  {equipment.warrantyDetails && <p className="text-xs text-emerald-600 mt-1">{equipment.warrantyDetails}</p>}
                  <div className="warranty-progress-bar mt-2">
                    <div className="warranty-progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'service' && (
            <div className="timeline-container fade-in">
              {mockServiceHistory.map((record, idx) => (
                <div key={record.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  {idx !== mockServiceHistory.length - 1 && <div className="timeline-connector"></div>}
                  <div className="timeline-content">
                    <div className="flex-align-center justify-between mb-1">
                      <h4 className="font-semibold text-slate-800">{record.description}</h4>
                      <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{record.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{record.notes}</p>
                    <div className="flex-align-center gap-2 text-xs text-slate-500">
                      <span className="font-medium bg-slate-100 px-2 py-0.5 rounded-full">Eng: {record.engineer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'parts' && (
            <div className="table-container fade-in">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-indigo-500" />
                  Component Traceability & Audit Log
                </h3>
              </div>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Date Installed</th>
                    <th>Job Ref #</th>
                    <th>Part # & Description</th>
                    <th>Serial Numbers (In/Out)</th>
                    <th>Technician</th>
                    <th>Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPartUsageRecords.filter(r => r.equipmentId === equipment.id).map(record => {
                    const isWarrantyActive = new Date(record.warrantyExpiryDate) >= new Date();
                    return (
                      <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="whitespace-nowrap">
                          <div className="font-medium text-slate-800 dark:text-slate-200">{record.installedDate}</div>
                        </td>
                        <td className="font-mono text-sm font-semibold text-slate-600 dark:text-slate-400">
                          {record.jobId}
                        </td>
                        <td>
                          <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">{record.partNumber}</div>
                          <div className="text-xs text-slate-500">{record.description}</div>
                        </td>
                        <td>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1 text-[11px] font-mono">
                              <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">IN</span> 
                              {record.installedSerialNo}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">OUT</span> 
                              <span className="line-through">{record.removedSerialNo}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex-align-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                              {record.installedBy.charAt(0)}
                            </div>
                            <div className="text-sm text-slate-700 dark:text-slate-300">{record.installedBy}</div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${isWarrantyActive ? 'badge-green' : 'badge-gray'} text-[10px]`}>
                            {isWarrantyActive ? 'Active' : 'Expired'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {mockPartUsageRecords.filter(r => r.equipmentId === equipment.id).length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        No component replacements recorded for this equipment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}


          {activeTab === 'history' && (
            <div className="history-timeline-container p-6 fade-in flex flex-col gap-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2">
                    <History size={20} className="text-blue-500" />
                    Custody & Movement Journey
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Historical log of customer deployments, site transfers, and workshop intakes.</p>
                </div>
                <button 
                  className="btn-secondary text-xs flex items-center gap-2"
                  onClick={() => setIsDispatchModalOpen(true)}
                >
                  <Send size={14} /> New Site Dispatch
                </button>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {deploymentHistory.map((rec) => (
                  <div key={rec.id} className="relative group">
                    <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900 group-hover:scale-125 transition-transform" />
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <span className={`badge text-xs font-semibold ${
                            rec.type === 'Dispatch to Customer Site' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300' :
                            rec.type === 'Intake to Workshop' ? 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300' :
                            'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300'
                          }`}>
                            {rec.type}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1">
                            <Building size={14} className="text-slate-400" /> {rec.customer}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{rec.date}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block">Site Location</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-red-400" /> {rec.site} ({rec.location})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Meter Reading</span>
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-300 mt-0.5 block">{rec.meterReading?.toLocaleString()} hrs</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                        {rec.notes}
                      </p>

                      <div className="text-[10px] text-slate-400 text-right pt-1">
                        Authorized by: <span className="font-semibold text-slate-500">{rec.recordedBy}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <DispatchEquipmentModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        equipment={equipment}
        onDispatch={(id, cust, site, loc, record) => {
          setDeploymentHistory(prev => [record, ...prev]);
          if (onDispatchEquipment) {
            onDispatchEquipment(id, cust, site, loc, record);
          }
        }}
      />
    </div>
  );
};
