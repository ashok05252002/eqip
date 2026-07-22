import React from 'react';
import { CheckCircle, Printer, Hammer, ArrowLeft, Barcode, Calendar, User } from 'lucide-react';

interface ReceivingReceiptViewProps {
  jobRef: string;
  onBackToHub: () => void;
}

export const ReceivingReceiptView: React.FC<ReceivingReceiptViewProps> = ({ jobRef, onBackToHub }) => {
  return (
    <div className="view-container fade-in flex items-center justify-center bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-64px)] p-6">
      <div className="w-full max-w-2xl">
        
        {/* Success Message */}
        <div className="text-center mb-8 fade-in">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Intake Successfully Recorded!</h1>
          <p className="text-slate-500 mt-2">The equipment has been successfully logged into the workshop receiving queue.</p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden slide-in-bottom">
          <div className="bg-slate-800 text-white p-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-widest text-xs">Workshop Receiving Ticket</h2>
              <div className="text-3xl font-bold font-mono mt-1">{jobRef}</div>
            </div>
            <div className="text-right flex flex-col items-end">
              <Barcode size={48} className="opacity-80" strokeWidth={1} />
              <div className="text-[10px] font-mono tracking-[0.2em] mt-1 opacity-70">*{jobRef}*</div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Equipment Details</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">NOV 3000HP Drawworks</div>
              <div className="font-mono text-sm text-slate-500">ID: eq-2 | S/N: NOV-DW-4410</div>
            </div>
            
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Customer & Origin</div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">ExxonMobil</div>
              <div className="text-sm text-slate-500">Gulf Coast Central Workshop</div>
            </div>

            <div className="col-span-2 border-t border-slate-100 dark:border-slate-700 my-2"></div>

            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-slate-400 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time Received</div>
                <div className="font-medium text-slate-800 dark:text-slate-200">{new Date().toISOString().split('T')[0]} at 08:00 AM</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User size={18} className="text-slate-400 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Receiving Engineer</div>
                <div className="font-medium text-slate-800 dark:text-slate-200">Marcus Vance</div>
              </div>
            </div>

            <div className="col-span-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-500">Meter Reading</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">14,500 hrs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">Initial Status</span>
                <span className="badge badge-amber text-xs">Pending Diagnostic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4 fade-in" style={{ animationDelay: '0.2s' }}>
          <button className="btn-secondary" onClick={onBackToHub}>
            <ArrowLeft size={18} /> Return to Hub
          </button>
          <button className="btn-secondary text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
            <Printer size={18} /> Print Intake Tag
          </button>
          <button className="btn-primary">
            <Hammer size={18} /> Create Maintenance Job
          </button>
        </div>
      </div>
    </div>
  );
};
