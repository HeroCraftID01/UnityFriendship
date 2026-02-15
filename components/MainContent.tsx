
import React from 'react';
import { AnalysisType } from '../types';

interface MainContentProps {
  userName: string;
  selectedAnalysis: string;
  setSelectedAnalysis: (value: string) => void;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ 
  userName, 
  selectedAnalysis, 
  setSelectedAnalysis, 
  onStartAnalysis,
  isAnalyzing
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 max-w-4xl mx-auto w-full">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Halo, {userName.split(' ')[0]}. Apa yang ingin Anda analisa hari ini?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
          Silakan pilih jenis pemeriksaan analisa dari daftar di bawah.
        </p>
      </div>

      {/* Selection Box */}
      <div className="w-full max-w-lg mb-16 space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest" htmlFor="analysis-type">
            Pilih Analisa Pemeriksaan
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <select 
              id="analysis-type"
              value={selectedAnalysis}
              onChange={(e) => setSelectedAnalysis(e.target.value)}
              disabled={isAnalyzing}
              className="block w-full pl-10 pr-10 py-3 text-sm bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option disabled>Pilih salah satu analisa...</option>
              {Object.values(AnalysisType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400">expand_more</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onStartAnalysis}
          disabled={isAnalyzing || selectedAnalysis === 'Pilih salah satu analisa...'}
          className="w-full bg-primary hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2 relative overflow-hidden group"
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sedang Menganalisa...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">play_arrow</span>
              <span>Mulai Analisa</span>
            </>
          )}
        </button>
      </div>

      {/* Stats Summary */}
      <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-300">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500 font-bold mb-5 text-center">
          Ringkasan Status Terakhir
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatusCard 
            icon="trending_up" 
            label="Performa" 
            value="Optimal" 
            colorClass="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
          />
          <StatusCard 
            icon="verified" 
            label="Validitas Data" 
            value="100%" 
            colorClass="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          />
          <StatusCard 
            icon="schedule" 
            label="Terakhir Cek" 
            value="2 Jam Lalu" 
            colorClass="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
          />
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{ icon: string; label: string; value: string; colorClass: string }> = ({ icon, label, value, colorClass }) => (
  <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow cursor-default group">
    <div className={`p-2.5 rounded-lg transition-transform group-hover:scale-110 ${colorClass}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default MainContent;
