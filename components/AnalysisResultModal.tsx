
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

const AnalysisResultModal: React.FC<AnalysisResultModalProps> = ({ result, onClose }) => {
  // Defensive values
  const summary = result["executive-summary"] || "Ringkasan tidak tersedia.";
  const analytics = result.analytics || { "environment-score": 0, "person-behaviour": "N/A", "danger-chat": "N/A" };
  const actions = result["recommended-action"] || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-surface-dark w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{result.title || "Laporan Analisa"}</h2>
              <p className="text-xs text-gray-500">Unity Friendship Intelligence Report</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Executive Summary */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Ringkasan Eksekutif</h3>
            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
                {summary}
              </p>
            </div>
          </section>

          {/* Analytics Overview */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Analisa Lingkungan & Perilaku</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Skor Lingkungan</p>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${analytics["environment-score"] > 70 ? 'text-green-500' : analytics["environment-score"] > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {analytics["environment-score"]}
                  </span>
                  <div className="w-2/3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${analytics["environment-score"] > 70 ? 'bg-green-500' : analytics["environment-score"] > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${analytics["environment-score"]}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Perilaku Personal</p>
                <div className="flex items-center space-x-2">
                  <span className={`material-symbols-outlined ${analytics["person-behaviour"].toLowerCase().includes('good') ? 'text-green-500' : 'text-red-500'}`}>
                    {analytics["person-behaviour"].toLowerCase().includes('good') ? 'check_circle' : 'warning'}
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{analytics["person-behaviour"]}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
              <div className="flex items-center space-x-2 mb-2 text-orange-600 dark:text-orange-400">
                <span className="material-symbols-outlined text-sm">security</span>
                <p className="text-[10px] uppercase font-bold tracking-widest">Analisa Bahaya (Danger Analysis)</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm italic whitespace-pre-wrap">
                "{analytics["danger-chat"]}"
              </p>
            </div>
          </section>

          {/* Recommendations */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Rekomendasi Tindakan</h3>
            <ul className="space-y-3">
              {actions.length > 0 ? actions.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined text-xs">bolt</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{item.action}</span>
                </li>
              )) : <li className="text-gray-500 text-sm">Tidak ada rekomendasi khusus.</li>}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-white/5">
          <button 
            onClick={onClose}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Tutup Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultModal;
