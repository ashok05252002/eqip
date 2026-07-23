import React, { useState, useMemo } from 'react';
import type { Equipment } from '../types';
import { Search, Filter, Plus, List, Grid } from 'lucide-react';
import { EquipmentTable } from './EquipmentTable';
import { EquipmentGrid } from './EquipmentGrid';
import { RegisterEquipmentModal } from './RegisterEquipmentModal';
import { sitesList } from '../data/mockData';

interface EquipmentMasterViewProps {
  equipment: Equipment[];
  onViewProfile: (id: string) => void;
}

export const EquipmentMasterView: React.FC<EquipmentMasterViewProps> = ({ equipment, onViewProfile }) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [siteFilter, setSiteFilter] = useState('All');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      const matchesSearch = 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchesSite = siteFilter === 'All' || item.site === siteFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesSite;
    });
  }, [equipment, searchQuery, statusFilter, categoryFilter, siteFilter]);

  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <div>
          <h1 className="view-title">Equipment Master</h1>
          <p className="view-subtitle">Manage and track all registered assets across sites</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setIsRegisterModalOpen(true)}
        >
          <Plus size={20} />
          Register New Equipment
        </button>
      </div>

      <div className="controls-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by ID, Serial, or Name..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filters-wrapper">
          <div className="filter-group">
            <Filter size={16} className="text-slate-400" />
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Operational">Operational (At Customer Site)</option>
              <option value="In Workshop">In Workshop (Collected Queue)</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
          </div>

          <select 
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Well Control">Well Control</option>
            <option value="Hosting Systems">Hosting Systems</option>
            <option value="Mud Circulation">Mud Circulation</option>
            <option value="Power Systems">Power Systems</option>
            <option value="Well Intervention">Well Intervention</option>
            <option value="Flow Control">Flow Control</option>
            <option value="Wellhead Systems">Wellhead Systems</option>
            <option value="Drilling Systems">Drilling Systems</option>
          </select>

          <select 
            className="filter-select"
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
          >
            <option value="All">All Sites</option>
            {sitesList.map(site => (
              <option key={site} value={site}>{site}</option>
            ))}
          </select>
        </div>

        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Data Table View"
          >
            <List size={18} />
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Visual Card Grid View"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      <div className="content-area">
        {viewMode === 'table' ? (
          <EquipmentTable equipment={filteredEquipment} onViewProfile={onViewProfile} />
        ) : (
          <EquipmentGrid equipment={filteredEquipment} onViewProfile={onViewProfile} />
        )}
      </div>

      <RegisterEquipmentModal 
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};
