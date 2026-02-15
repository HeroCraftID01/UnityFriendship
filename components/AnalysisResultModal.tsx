
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

const AnalysisResultModal: React.FC<AnalysisResultModalProps> = ({ result, onClose }) => {
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{result.title}</h2>
              <p className="text-xs text-gray-500">Laporan Analisa Cerdas Unity</p>
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
          {/* Summary */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Ringkasan Eksekutif</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {result.summary}
            </p>
          </section>

          {/* Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {result.metrics.map((metric, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</span>
                  <span className={`material-symbols-outlined text-sm ${
                    metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {metric.trend === 'up' ? 'trending_up' : metric.trend === 'down' ? 'trending_down' : 'trending_flat'}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* Recommendations */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Rekomendasi Tindakan</h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm group">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                    <span className="material-symbols-outlined text-xs">done</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{rec}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-white/5">
          <button 
            onClick={onClose}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Selesai & Simpan Hasil
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultModal;
