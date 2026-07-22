import React, { useState } from 'react';
import type { MaintenanceType } from '../types';
import { Search, Plus, Settings, CheckCircle2, XCircle } from 'lucide-react';

interface MaintenanceTypeMasterViewProps {
  maintenanceTypes: MaintenanceType[];
}

export const MaintenanceTypeMasterView: React.FC<MaintenanceTypeMasterViewProps> = ({ maintenanceTypes }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = maintenanceTypes.filter(type => 
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-container fade-in flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Settings size={28} className="text-primary" />
            Maintenance Type Master
          </h1>
          <p className="text-sm text-slate-500 mt-1">Configure maintenance categories and standard descriptions.</p>
        </div>
        <button className="btn-primary py-2 px-4 flex items-center gap-2 font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Plus size={18} /> Add New Type
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6 flex gap-4">
        <div className="relative w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search maintenance types..." 
            className="pl-9 pr-4 py-2 w-full border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-slate-50 dark:bg-slate-900 focus:outline-none focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex-1 flex flex-col shadow-sm">
        <div className="overflow-auto flex-1">
          <table className="custom-table w-full">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTypes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-slate-500">No maintenance types found.</td>
                </tr>
              ) : (
                filteredTypes.map(type => (
                  <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700">
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">{type.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{type.description}</td>
                    <td className="px-4 py-3">
                      {type.active ? (
                        <span className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded w-fit">
                          <CheckCircle2 size={14} /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded w-fit">
                          <XCircle size={14} /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-sm font-medium text-primary hover:text-emerald-700 transition-colors">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
