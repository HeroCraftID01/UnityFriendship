
import React, { useState } from 'react';
import { HistoryItem, AnalysisType } from '../types';

interface HistoryPageProps {
  history: HistoryItem[];
  onViewItem: (item: HistoryItem) => void;
  isLoading?: boolean;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onViewItem, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('Semua');

  const filteredHistory = history.filter(item => {
    const title = item.title || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'Semua' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getIconForType = (type: AnalysisType) => {
    switch (type) {
      case AnalysisType.SENTIMENT: return 'sentiment_satisfied';
      case AnalysisType.PERFORMANCE: return 'speed';
      case AnalysisType.CONFLICT: return 'warning';
      default: return 'analytics';
    }
  };

  const getBadgeColor = (type: AnalysisType) => {
    switch (type) {
      case AnalysisType.SENTIMENT: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case AnalysisType.PERFORMANCE: return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case AnalysisType.CONFLICT: return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto p-6 md:p-10 max-w-6xl mx-auto w-full animate-in fade-in duration-500">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-gradient">Riwayat Analisa</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Pusat laporan intelijen percakapan dari database MetroStudio.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input 
              type="text" 
              placeholder="Cari laporan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 animate-pulse">Menghubungkan ke Supabase...</p>
        </div>
      ) : filteredHistory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => {
            // Fix: Avoid widening to {} type by using the item's result directly with a type assertion to any 
            // to support defensive property access on dynamic DB data.
            const result = item.result as any;
            const summary = result["executive-summary"] || "Tidak ada ringkasan tersedia.";
            const score = result.analytics?.["environment-score"] || 0;
            const behaviour = result.analytics?.["person-behaviour"] || "N/A";

            return (
              <div 
                key={item.id}
                onClick={() => onViewItem(item)}
                className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full border-b-4 border-b-primary/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${getBadgeColor(item.type)}`}>
                    <span className="material-symbols-outlined">{getIconForType(item.type)}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                  {summary}
                </p>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl mb-4 flex items-center justify-between border border-gray-100 dark:border-gray-800">
                  <div className="text-center">
                    <p className="text-[8px] uppercase text-gray-400 font-bold mb-0.5">Score</p>
                    <p className={`font-bold ${score > 70 ? 'text-green-500' : 'text-primary'}`}>{score}</p>
                  </div>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                  <div className="text-center">
                    <p className="text-[8px] uppercase text-gray-400 font-bold mb-0.5">Behaviour</p>
                    <p className="font-bold text-gray-700 dark:text-gray-200">{behaviour}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800 mt-auto">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-blue-400"></div>
                    <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-purple-400"></div>
                  </div>
                  <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-gray-400">history_off</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Database Kosong</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">Tidak ada data di tabel "conversations". Pastikan RLS di Supabase sudah dimatikan atau diizinkan untuk 'anon'.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
