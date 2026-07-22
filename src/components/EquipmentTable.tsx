import React from 'react';
import type { Equipment } from '../types';
import { Eye, Wrench, QrCode } from 'lucide-react';

interface EquipmentTableProps {
  equipment: Equipment[];
  onViewProfile: (id: string) => void;
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipment, onViewProfile }) => {
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
    <div className="table-container fade-in">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Category & Type</th>
            <th>Manufacturer & Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Customer & Site</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id} className="clickable-row" onClick={() => onViewProfile(item.id)}>
              <td className="font-semibold text-slate-800 dark:text-slate-200">
                <div className="flex-align-center gap-3">
                  <div className="equipment-thumbnail">
                    {item.name.charAt(0)}
                  </div>
                  {item.id.toUpperCase()}
                </div>
              </td>
              <td>
                <div className="text-sm font-medium">{item.category}</div>
                <div className="text-xs text-slate-500">{item.name}</div>
              </td>
              <td>
                <div className="text-sm font-medium">{item.manufacturer}</div>
                <div className="text-xs text-slate-500">{item.model}</div>
              </td>
              <td className="text-sm font-mono text-slate-600 dark:text-slate-400">
                {item.serialNumber}
              </td>
              <td>
                <span className={`badge ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <div className="text-sm font-medium">{item.customer || 'Unknown'}</div>
                <div className="text-xs text-slate-500">{item.site}</div>
              </td>
              <td className="text-right">
                <div className="action-buttons" onClick={(e) => e.stopPropagation()}>
                  <button className="btn-icon-only" title="View Profile" onClick={() => onViewProfile(item.id)}>
                    <Eye size={18} />
                  </button>
                  <button className="btn-icon-only" title="Intake to Workshop">
                    <Wrench size={18} />
                  </button>
                  <button className="btn-icon-only" title="Print QR Code">
                    <QrCode size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {equipment.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-8 text-slate-500">
                No equipment found matching criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
