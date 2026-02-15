
import React from 'react';
import { User, ViewType } from '../types';

interface SidebarProps {
  user: User;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, currentView, onNavigate }) => {
  return (
    <aside className="w-64 bg-sidebar-light dark:bg-sidebar-dark flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800 h-full transition-colors">
      {/* Logo Section */}
      <div className="p-6 flex flex-col items-center">
        <div className="w-16 h-10 mb-3 flex items-center justify-center cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <img src="./img/logo.png" alt="" width="200px" height="100px"/>
        </div>
        {/* Fixed: changed 'class' to 'className' */}
        <h1 className="text-xs font-bold tracking-[0.2em] text-gray-700 dark:text-gray-200 mt-1 uppercase">Unity Friendship</h1>
        <h1 className="text-xs font-bold tracking-[0.2em] text-amber-600 dark:text-amber-300 mt-1 uppercase">(DEMO MODE)</h1>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-2 mt-4">
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentView === 'dashboard' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-lg">dashboard</span>
          <span>Dashboard</span>
        </button>
        
        <button 
          onClick={() => onNavigate('history')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentView === 'history' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'
          }`}
        >
          <span className="material-symbols-outlined text-lg">history</span>
          <span>Riwayat Analisa</span>
        </button>

        <div className="pt-6">
          <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-3 px-3">Lainnya</h3>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm transition-colors">
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Pengaturan</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm transition-colors">
            <span className="material-symbols-outlined text-lg">help</span>
            <span>Bantuan</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-xl transition-colors group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {user.avatarLetter}
          </div>
          <div className="text-xs truncate">
            <p className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">{user.name}</p>
            <p className="text-gray-500 dark:text-gray-500">{user.plan}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
