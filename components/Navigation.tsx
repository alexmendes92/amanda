
import React from 'react';
import { Home, Activity, Heart, Sparkles } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  
  // Helper para verificar qual categoria está ativa (incluindo o Menu e as Ferramentas)
  const isRoutineActive = [
    AppTab.ROUTINE_MENU, 
    AppTab.FITNESS, 
    AppTab.SLEEP, 
    AppTab.HABITS, 
    AppTab.SUPPLEMENTS, 
    AppTab.INSIGHTS
  ].includes(activeTab);

  const isLoveActive = [
    AppTab.LOVE_MENU, 
    AppTab.DATES, 
    AppTab.PLAYLIST, 
    AppTab.GALLERY
  ].includes(activeTab);

  const isLeisureActive = [
    AppTab.LEISURE_MENU, 
    AppTab.FANDOM, 
    AppTab.DEVOTIONAL
  ].includes(activeTab);

  const isHomeActive = activeTab === AppTab.HOME;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 pb-8 md:pb-4 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
      
      {/* 1. INÍCIO */}
      <button 
        onClick={() => onTabChange(AppTab.HOME)}
        className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 ${isHomeActive ? 'text-indigo-600 -translate-y-1' : 'text-slate-400'}`}
      >
        <Home className={`w-6 h-6 ${isHomeActive ? 'fill-indigo-100 stroke-2' : 'stroke-[1.5]'}`} />
        <span className={`text-[10px] font-bold ${isHomeActive ? 'opacity-100' : 'opacity-70'}`}>Início</span>
      </button>

      {/* 2. ROTINA (Hub) */}
      <button 
        onClick={() => onTabChange(AppTab.ROUTINE_MENU)} 
        className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 ${isRoutineActive ? 'text-emerald-600 -translate-y-1' : 'text-slate-400'}`}
      >
        <Activity className={`w-6 h-6 ${isRoutineActive ? 'fill-emerald-100 stroke-2' : 'stroke-[1.5]'}`} />
        <span className={`text-[10px] font-bold ${isRoutineActive ? 'opacity-100' : 'opacity-70'}`}>Rotina</span>
      </button>

      {/* 3. NÓS (Hub) */}
      <button 
        onClick={() => onTabChange(AppTab.LOVE_MENU)} 
        className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 ${isLoveActive ? 'text-rose-500 -translate-y-1' : 'text-slate-400'}`}
      >
        <Heart className={`w-6 h-6 ${isLoveActive ? 'fill-rose-100 stroke-2' : 'stroke-[1.5]'}`} />
        <span className={`text-[10px] font-bold ${isLoveActive ? 'opacity-100' : 'opacity-70'}`}>Nós</span>
      </button>

      {/* 4. LAZER (Hub) */}
      <button 
        onClick={() => onTabChange(AppTab.LEISURE_MENU)} 
        className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 ${isLeisureActive ? 'text-amber-500 -translate-y-1' : 'text-slate-400'}`}
      >
        <Sparkles className={`w-6 h-6 ${isLeisureActive ? 'fill-amber-100 stroke-2' : 'stroke-[1.5]'}`} />
        <span className={`text-[10px] font-bold ${isLeisureActive ? 'opacity-100' : 'opacity-70'}`}>Lazer</span>
      </button>

    </div>
  );
};

export default Navigation;
