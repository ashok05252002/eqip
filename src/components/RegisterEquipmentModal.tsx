import React, { useState } from 'react';
import { X, UploadCloud, FileText, Image as ImageIcon } from 'lucide-react';

interface RegisterEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterEquipmentModal: React.FC<RegisterEquipmentModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade-in" onClick={onClose} />
      <div className={`slide-over-modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-header">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Register New Equipment</h2>
            <p className="text-sm text-slate-500">Enter details to add an asset to the master registry.</p>
          </div>
          <button className="btn-icon-only" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            1. Basic Info
          </button>
          <button 
            className={`tab-btn ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            2. Ownership
          </button>
          <button 
            className={`tab-btn ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            3. Media
          </button>
        </div>

        <div className="modal-body custom-scrollbar">
          {activeTab === 1 && (
            <div className="form-grid fade-in">
              <div className="form-group col-span-2">
                <label>Equipment ID / Asset #</label>
                <input type="text" placeholder="e.g. EQ-DRL-8842" className="form-input" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-input">
                  <option>Drilling Systems</option>
                  <option>Well Control</option>
                  <option>Power Systems</option>
                  <option>Mud Circulation</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <input type="text" placeholder="e.g. Top Drive System" className="form-input" />
              </div>
              <div className="form-group">
                <label>Manufacturer</label>
                <input type="text" placeholder="e.g. NOV" className="form-input" />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input type="text" placeholder="e.g. TDS-11SA" className="form-input" />
              </div>
              <div className="form-group">
                <label>Serial Number</label>
                <input type="text" placeholder="Enter Serial #" className="form-input" />
              </div>
              <div className="form-group">
                <label>Engine / Chassis #</label>
                <input type="text" placeholder="Enter Engine/Chassis #" className="form-input" />
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="form-grid fade-in">
              <div className="form-group">
                <label>Manufacturing Year</label>
                <input type="number" placeholder="YYYY" className="form-input" />
              </div>
              <div className="form-group">
                <label>Purchase Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Warranty Expiry Date</label>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <label>Assigned Customer</label>
                <select className="form-input">
                  <option>Unassigned</option>
                  <option>Aramco</option>
                  <option>ExxonMobil</option>
                  <option>Chevron</option>
                  <option>BP</option>
                </select>
              </div>
              <div className="form-group col-span-2">
                <label>Assigned Site Location</label>
                <select className="form-input">
                  <option>Central Warehouse</option>
                  <option>Offshore Platform B</option>
                  <option>Permian Basin Rig 4</option>
                  <option>Bakken Field Rig 2</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="form-grid fade-in">
              <div className="form-group col-span-2">
                <label>Equipment Image</label>
                <div className="drag-drop-zone">
                  <ImageIcon size={32} className="text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600">Drag and drop an image, or <span className="text-primary font-semibold cursor-pointer">browse</span></p>
                  <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                </div>
              </div>
              <div className="form-group col-span-2">
                <label>Supporting Documents (Specs, Warranty, Certs)</label>
                <div className="drag-drop-zone">
                  <UploadCloud size={32} className="text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600">Drag and drop PDF files, or <span className="text-primary font-semibold cursor-pointer">browse</span></p>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF (Max 15MB)</p>
                </div>
              </div>
              <div className="col-span-2 mt-4 space-y-2">
                <div className="flex-align-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50">
                   <div className="flex-align-center gap-2">
                     <FileText size={18} className="text-slate-400" />
                     <span className="text-sm font-medium text-slate-700">calibration_cert.pdf</span>
                   </div>
                   <button className="text-slate-400 hover:text-red-500"><X size={16}/></button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <div className="flex gap-2">
            {activeTab > 1 && (
              <button className="btn-secondary" onClick={() => setActiveTab(prev => prev - 1)}>Back</button>
            )}
            {activeTab < 3 ? (
              <button className="btn-primary" onClick={() => setActiveTab(prev => prev + 1)}>Next</button>
            ) : (
              <button className="btn-primary" onClick={onClose}>Register Equipment</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
