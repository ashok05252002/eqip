import React, { useState } from 'react';
import type { PMAlert } from '../types';
import { 
  Bell, 
  X, 
  Search,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Wrench
} from 'lucide-react';

interface PMAlertsNotificationCenterProps {
  alerts: PMAlert[];
  isOpen: boolean;
  onClose: () => void;
  onGenerateJob: (alert: PMAlert) => void;
  onSnooze: (alertId: string) => void;
  onMarkRead: (alertId: string) => void;
}

export const PMAlertsNotificationCenter: React.FC<PMAlertsNotificationCenterProps> = ({ 
  alerts, 
  isOpen, 
  onClose,
  onGenerateJob,
  onSnooze,
  onMarkRead
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Overdue' | 'Upcoming'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredAlerts = alerts
    .filter(a => activeTab === 'All' || a.alertType === activeTab)
    .filter(a => a.message.toLowerCase().includes(searchQuery.toLowerCase()) || a.equipmentId.toLowerCase().includes(searchQuery.toLowerCase()));

  const unreadCount = alerts.filter(a => !a.readStatus).length;

  return (
    <div className="absolute top-16 right-4 w-96 max-h-[80vh] bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col z-50 slide-in-right">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="text-slate-800 dark:text-slate-200" size={20} />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Alerts Center</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadCount} New</span>
          )}
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <X size={20} />
        </button>
      </div>

      {/* Filters & Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search alerts..." 
            className="form-input pl-8 py-1.5 text-sm w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['All', 'Overdue', 'Upcoming'].map(tab => (
            <button
              key={tab}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${activeTab === tab ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'}`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <CheckCircle2 size={32} className="mx-auto text-emerald-400 mb-2 opacity-50" />
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-xl border transition-all ${alert.readStatus ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-75' : 'bg-white dark:bg-slate-800 border-l-4 shadow-sm ' + (alert.alertType === 'Overdue' ? 'border-l-red-500 border-slate-200 dark:border-slate-700' : 'border-l-amber-500 border-slate-200 dark:border-slate-700')}`}>
                
                <div className="flex gap-3">
                  <div className="pt-0.5">
                    {alert.alertType === 'Overdue' ? (
                      <div className="relative">
                        <AlertTriangle size={18} className="text-red-500" />
                        {!alert.readStatus && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>}
                      </div>
                    ) : (
                      <Clock size={18} className="text-amber-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`text-sm font-medium leading-tight mb-1 ${!alert.readStatus ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] text-slate-400 font-mono">{alert.equipmentId}</span>
                      <span className="text-[10px] text-slate-400">•</span>
                      <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        className="btn-primary text-xs py-1 px-3 w-full flex justify-center items-center gap-1"
                        style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
                        onClick={() => onGenerateJob(alert)}
                      >
                        <Wrench size={12} /> Generate Job
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 justify-between">
                      <button 
                        className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                        onClick={() => onSnooze(alert.id)}
                      >
                        Snooze
                      </button>
                      {!alert.readStatus && (
                        <button 
                          className="text-xs text-slate-500 hover:text-primary font-medium"
                          onClick={() => onMarkRead(alert.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
