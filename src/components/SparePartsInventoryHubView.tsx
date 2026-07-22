import React, { useState } from 'react';
import type { SparePart } from '../types';
import { Search, Filter, Plus, PackageOpen, AlertTriangle, TrendingDown, Clock, Settings, PackageMinus } from 'lucide-react';

interface SparePartsInventoryHubViewProps {
  parts: SparePart[];
}

export const SparePartsInventoryHubView: React.FC<SparePartsInventoryHubViewProps> = ({ parts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');

  const filteredParts = parts.filter(part => {
    const matchesSearch = 
      part.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.warehouseLocation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = locationFilter === 'All Locations' || part.warehouseLocation.includes(locationFilter);

    return matchesSearch && matchesLocation;
  });

  const lowStockParts = parts.filter(p => p.stockQty <= p.reorderPoint);

  return (
    <div className="view-container fade-in flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <div className="controls-bar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Header Section */}
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <PackageOpen size={24} className="text-primary" />
              Spare Parts Inventory
            </h1>
            <p className="text-sm text-slate-500">Manage stock levels and track usage across all facilities</p>
          </div>
          <button className="btn-primary shadow-md hover:shadow-lg transition-all" style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}>
            <Plus size={16} /> Add New Spare Part
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <PackageOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Active SKUs</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{parts.length}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Low Stock Alerts</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{lowStockParts.length}</p>
                {lowStockParts.length > 0 && <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Requires Attention</span>}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <TrendingDown size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Monthly Consumed Units</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">142</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between w-full bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search part #, description, location..." 
                className="form-input pl-9 w-80 text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="form-input text-sm"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            >
              <option value="All Locations">All Locations</option>
              <option value="Aisle A">Aisle A</option>
              <option value="Aisle B">Aisle B</option>
              <option value="Aisle C">Aisle C</option>
              <option value="Aisle D">Aisle D</option>
              <option value="Aisle E">Aisle E</option>
            </select>
          </div>
          <button className="btn-secondary text-sm">
            <Filter size={14} /> Advanced Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="content-area overflow-hidden flex flex-col h-full mt-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm slide-in-bottom">
        <div className="table-container flex-1 overflow-auto rounded-xl">
          <table className="custom-table w-full">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 z-10 shadow-sm">
              <tr>
                <th className="font-semibold text-slate-600">Part Number</th>
                <th className="font-semibold text-slate-600">Description & Mfg</th>
                <th className="font-semibold text-slate-600">Stock Qty</th>
                <th className="font-semibold text-slate-600">Location</th>
                <th className="font-semibold text-slate-600">Unit Cost</th>
                <th className="font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map(part => {
                const isLowStock = part.stockQty <= part.reorderPoint;
                return (
                  <tr key={part.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                    <td>
                      <div className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {part.partNumber}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Batch: {part.batchNumber}</div>
                    </td>
                    <td>
                      <div className="font-medium text-slate-800 dark:text-slate-200">{part.description}</div>
                      <div className="text-xs text-slate-500 mt-1">{part.manufacturer}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isLowStock ? 'text-amber-600' : 'text-slate-700 dark:text-slate-300'}`}>
                          {part.stockQty} <span className="text-xs font-normal text-slate-500">{part.uom}</span>
                        </span>
                        {isLowStock && (
                          <span className="badge bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 text-[10px] py-0 px-1.5">
                            Low Stock
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Reorder at: {part.reorderPoint}</div>
                    </td>
                    <td>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{part.warehouseLocation}</div>
                    </td>
                    <td>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        OMR {part.unitCost.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button className="btn-secondary text-xs px-2 py-1 flex items-center gap-1 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-colors">
                          <PackageMinus size={14} /> Consume
                        </button>
                        <button className="btn-secondary text-xs px-2 py-1 flex items-center gap-1">
                          <Settings size={14} /> Adjust
                        </button>
                        <button className="btn-icon-only text-slate-400 hover:text-primary" title="View History">
                          <Clock size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
