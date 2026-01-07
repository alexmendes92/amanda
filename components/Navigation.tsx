
import React from 'react';
import { Home, Moon, BookOpen, Image, Dumbbell, CalendarHeart, Tv } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-4 flex justify-between items-center z-50 pb-8 md:pb-4 shadow-[0_-5px_10px_rgba(0,0,0,0.02)] overflow-x-auto no-scrollbar">
      <button 
        onClick={() => onTabChange(AppTab.HOME)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.HOME ? 'text-indigo-600' : 'text-slate-300'}`}
      >
        <Home className={`w-5 h-5 ${activeTab === AppTab.HOME ? 'fill-indigo-100' : ''}`} />
        <span className="text-[9px] font-medium">Início</span>
      </button>

      <button 
        onClick={() => onTabChange(AppTab.SLEEP)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.SLEEP ? 'text-indigo-600' : 'text-slate-300'}`}
      >
        <Moon className={`w-5 h-5 ${activeTab === AppTab.SLEEP ? 'fill-indigo-100' : ''}`} />
        <span className="text-[9px] font-medium">Sono</span>
      </button>

      <button 
        onClick={() => onTabChange(AppTab.FITNESS)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.FITNESS ? 'text-indigo-600' : 'text-slate-300'}`}
      >
        <Dumbbell className={`w-5 h-5 ${activeTab === AppTab.FITNESS ? 'fill-indigo-100' : ''}`} />
        <span className="text-[9px] font-medium">Musa</span>
      </button>

      <button 
        onClick={() => onTabChange(AppTab.DATES)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.DATES ? 'text-rose-500' : 'text-slate-300'}`}
      >
        <CalendarHeart className={`w-5 h-5 ${activeTab === AppTab.DATES ? 'fill-rose-100' : ''}`} />
        <span className="text-[9px] font-medium">Dates</span>
      </button>

      {/* New Series Tab */}
      <button 
        onClick={() => onTabChange(AppTab.FANDOM)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.FANDOM ? 'text-purple-600' : 'text-slate-300'}`}
      >
        <Tv className={`w-5 h-5 ${activeTab === AppTab.FANDOM ? 'fill-purple-100' : ''}`} />
        <span className="text-[9px] font-medium">Séries</span>
      </button>

      <button 
        onClick={() => onTabChange(AppTab.DEVOTIONAL)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.DEVOTIONAL ? 'text-indigo-600' : 'text-slate-300'}`}
      >
        <BookOpen className={`w-5 h-5 ${activeTab === AppTab.DEVOTIONAL ? 'fill-indigo-100' : ''}`} />
        <span className="text-[9px] font-medium">Fé</span>
      </button>

      <button 
        onClick={() => onTabChange(AppTab.GALLERY)}
        className={`flex flex-col items-center gap-1 min-w-[50px] ${activeTab === AppTab.GALLERY ? 'text-indigo-600' : 'text-slate-300'}`}
      >
        <Image className={`w-5 h-5 ${activeTab === AppTab.GALLERY ? 'fill-indigo-100' : ''}`} />
        <span className="text-[9px] font-medium">Galeria</span>
      </button>
    </div>
  );
};

export default Navigation;
