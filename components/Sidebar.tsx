
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
          <svg fill="none" height="40" viewBox="0 0 100 60" width="64" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="infinity_gradient" x1="0" x2="100" y1="30" y2="30">
                {/* Changed stop-color to stopColor for React compatibility */}
                <stop offset="0%" stopColor="#A855F7"></stop>
                <stop offset="100%" stopColor="#EC4899"></stop>
              </linearGradient>
            </defs>
            {/* Changed clip-rule and fill-rule to camelCase for React compatibility */}
            <path clipRule="evenodd" d="M29.5 14C20.9396 14 14 20.9396 14 29.5C14 38.0604 20.9396 45 29.5 45C34.9808 45 39.8248 42.1528 42.668 37.828C43.5855 36.4357 44.6983 35.1912 46.0028 34.092C48.0673 32.352 51.9327 32.352 53.9972 34.092C55.3017 35.1912 56.4145 36.4357 57.332 37.828C60.1752 42.1528 65.0192 45 70.5 45C79.0604 45 86 38.0604 86 29.5C86 20.9396 79.0604 14 70.5 14C65.0192 14 60.1752 16.8472 57.332 21.172C56.4145 22.5643 55.3017 23.8088 53.9972 24.908C51.9327 26.648 48.0673 26.648 46.0028 24.908C44.6983 23.8088 43.5855 22.5643 42.668 21.172C39.8248 16.8472 34.9808 14 29.5 14ZM6 29.5C6 16.5213 16.5213 6 29.5 6C37.8488 6 45.1633 10.3346 49.5 16.9246C53.8367 10.3346 61.1512 6 69.5 6C82.4787 6 93 16.5213 93 29.5C93 42.4787 82.4787 53 69.5 53C61.1512 53 53.8367 48.6654 49.5 42.0754C45.1633 48.6654 37.8488 53 29.5 53C16.5213 53 6 42.4787 6 29.5Z" fill="url(#infinity_gradient)" fillRule="evenodd"></path>
          </svg>
        </div>
        {/* Fixed: changed 'class' to 'className' */}
        <h1 className="text-xs font-bold tracking-[0.2em] text-gray-700 dark:text-gray-200 mt-1 uppercase">Unity Friendship</h1>
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
