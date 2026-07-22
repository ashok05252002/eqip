import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Settings, 
  FileText, 
  Package, 
  Download,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Wrench
} from 'lucide-react';
import { initialEquipment, mockServiceHistory, mockPartUsageRecords, mockDocuments } from '../data/mockData';

interface EquipmentProfileViewProps {
  equipmentId: string;
  onBack: () => void;
}

export const EquipmentProfileView: React.FC<EquipmentProfileViewProps> = ({ equipmentId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'service' | 'parts' | 'docs'>('specs');
  
  // Find the equipment details
  const equipment = initialEquipment.find(eq => eq.id === equipmentId);

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
        <div className="profile-banner-right">
          <button className="btn-primary" style={{ backgroundColor: '#10B981', color: 'white' }}>
            Receive at Workshop
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
            className={`profile-tab ${activeTab === 'docs' ? 'active' : ''}`}
            onClick={() => setActiveTab('docs')}
          >
            <FileText size={18} /> Document Vault
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

          {activeTab === 'docs' && (
            <div className="docs-grid fade-in">
              {mockDocuments.map(doc => (
                <div key={doc.id} className="doc-card">
                  <div className="doc-icon-area">
                    {doc.type === 'PDF' && <FileText size={32} className="text-red-400" />}
                    {doc.type === 'Image' && <FileText size={32} className="text-blue-400" />}
                    {doc.type === 'Certificate' && <FileText size={32} className="text-emerald-400" />}
                  </div>
                  <div className="doc-info-area">
                    <h4 className="doc-title">{doc.title}</h4>
                    <p className="doc-meta">{doc.type} • Added {doc.dateAdded}</p>
                  </div>
                  <button className="doc-download-btn">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
