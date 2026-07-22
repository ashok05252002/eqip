import React, { useState } from 'react';
import type { Customer } from '../types';
import { Search, Plus, Building2, Mail, Phone, MapPin } from 'lucide-react';

interface CustomerMasterViewProps {
  customers: Customer[];
}

export const CustomerMasterView: React.FC<CustomerMasterViewProps> = ({ customers }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="view-container fade-in flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Building2 size={28} className="text-primary" />
            Customer Master
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage client profiles, codes, and corporate contact details.</p>
        </div>
        <button className="btn-primary py-2 px-4 flex items-center gap-2 font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
          <Plus size={18} /> Add New Customer
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6 flex gap-4">
        <div className="relative w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search customers..." 
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Contact</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Site Locations</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">No customers found.</td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700">
                    <td className="px-4 py-3 text-sm font-mono text-slate-600 dark:text-slate-400">{customer.code}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">{customer.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">{customer.contactName}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Mail size={14} className="text-slate-400" /> {customer.contactEmail}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" /> {customer.contactPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded w-fit">
                        <MapPin size={14} /> {customer.siteLocations}
                      </span>
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
