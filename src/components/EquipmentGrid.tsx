import React from 'react';
import type { Equipment } from '../types';
import { Eye, Wrench, MapPin } from 'lucide-react';

interface EquipmentGridProps {
  equipment: Equipment[];
  onViewProfile: (id: string) => void;
}

export const EquipmentGrid: React.FC<EquipmentGridProps> = ({ equipment, onViewProfile }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'badge-green';
      case 'In Workshop':
        return 'badge-amber';
      case 'Under Maintenance':
        return 'badge-blue';
      case 'Decommissioned':
        return 'badge-gray';
      default:
        return 'badge-gray';
    }
  };

  return (
    <div className="equipment-grid fade-in">
      {equipment.map((item) => (
        <div 
          key={item.id} 
          className="equipment-card hover-lift"
          onClick={() => onViewProfile(item.id)}
        >
          <div className="equipment-card-header">
            <div className="equipment-card-title-group">
              <h3 className="equipment-card-title">{item.name}</h3>
              <p className="equipment-card-subtitle">{item.manufacturer} • {item.model}</p>
            </div>
            <div className="equipment-card-thumbnail-large">
              {item.name.charAt(0)}
            </div>
          </div>
          
          <div className="equipment-card-body">
            <div className="equipment-card-stat">
              <span className="stat-label">ID / Serial</span>
              <span className="stat-value font-mono">{item.id.toUpperCase()} • {item.serialNumber}</span>
            </div>
            <div className="equipment-card-stat">
              <span className="stat-label">Category</span>
              <span className="stat-value">{item.category}</span>
            </div>
          </div>
          
          <div className="equipment-card-footer">
            <span className={`badge ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
            <div className="flex-align-center text-xs text-slate-500 gap-1">
              <MapPin size={14} />
              {item.site}
            </div>
          </div>
          
          <div className="equipment-card-actions" onClick={(e) => e.stopPropagation()}>
             <button className="btn-secondary w-full justify-center gap-2" onClick={() => onViewProfile(item.id)}>
               <Eye size={16} /> View Profile
             </button>
             <button className="btn-icon-only" title="Intake to Workshop">
               <Wrench size={18} />
             </button>
          </div>
        </div>
      ))}
      {equipment.length === 0 && (
        <div className="col-span-full text-center py-12 text-slate-500">
          No equipment found matching criteria.
        </div>
      )}
    </div>
  );
};
