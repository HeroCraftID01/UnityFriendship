
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import HistoryPage from './components/HistoryPage';
import AnalysisResultModal from './components/AnalysisResultModal';
import { AnalysisType, User, AnalysisResult, ViewType, HistoryItem } from './types';
import { startAnalysis } from './services/geminiService';
import { saveAnalysisToDB, fetchHistoryFromDB } from './services/supabaseService';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('Pilih salah satu analisa...');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const currentUser: User = {
    name: 'Budi Santoso',
    plan: 'Free Plan',
    avatarLetter: 'B'
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const loadHistory = async () => {
      setIsLoadingHistory(true);
      try {
        const data = await fetchHistoryFromDB();
        setHistory(data);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setIsLoadingHistory(false);
      }
    };
    loadHistory();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleStartAnalysis = async () => {
    if (selectedAnalysis === 'Pilih salah satu analisa...') {
      alert('Silakan pilih jenis analisa terlebih dahulu.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await startAnalysis(selectedAnalysis as AnalysisType);
      
      // Creating a descriptive title like the one in user's screenshot
      const dbTitle = `${selectedAnalysis} grup MetroStudio`;
      
      await saveAnalysisToDB(dbTitle, selectedAnalysis as AnalysisType, result);
      
      setAnalysisResult({ ...result, title: dbTitle });
      
      const updatedHistory = await fetchHistoryFromDB();
      setHistory(updatedHistory);
      
    } catch (error) {
      console.error('Analysis or Save failed:', error);
      alert('Gagal memproses analisa. Pastikan tabel "conversations" tersedia di Supabase.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewHistoryItem = (item: HistoryItem) => {
    setAnalysisResult({ ...item.result, title: item.title });
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark transition-colors duration-300">
      <Sidebar 
        user={currentUser} 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />
      
      <div className="flex-1 relative flex flex-col overflow-hidden">
        <div className="absolute top-4 right-4 z-50 flex space-x-2">
          <button 
            onClick={toggleDarkMode}
            className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:white transition-colors shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <span className="material-symbols-outlined text-xl">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>

        {currentView === 'dashboard' ? (
          <MainContent 
            userName={currentUser.name}
            selectedAnalysis={selectedAnalysis}
            setSelectedAnalysis={setSelectedAnalysis}
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <HistoryPage 
            history={history} 
            onViewItem={handleViewHistoryItem}
            isLoading={isLoadingHistory}
          />
        )}
      </div>

      {analysisResult && (
        <AnalysisResultModal 
          result={analysisResult} 
          onClose={() => setAnalysisResult(null)} 
        />
      )}
    </div>
  );
};

export default App;
