
import React from 'react';
import { Home, Activity, Heart, Sparkles } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  
  // Lógica para identificar qual "Hub" está ativo
  const isRoutineActive = [
    AppTab.ROUTINE_MENU, 
    AppTab.FITNESS, 
    AppTab.SLEEP, 
    AppTab.LISTS, 
    AppTab.SUPPLEMENTS, 
    AppTab.INSIGHTS
  ].includes(activeTab);

  const isLoveActive = [
    AppTab.LOVE_MENU, 
    AppTab.DATES, 
    AppTab.PLAYLIST, 
    AppTab.GALLERY,
    AppTab.YOU_ARE_RIGHT,
    AppTab.LOVE_BANK,
    AppTab.CINEMA,
    AppTab.CYCLE,
    AppTab.SOS
  ].includes(activeTab);

  const isLeisureActive = [
    AppTab.LEISURE_MENU, 
    AppTab.FANDOM, 
    AppTab.DEVOTIONAL,
    AppTab.MOTIVATION
  ].includes(activeTab);

  const isHomeActive = activeTab === AppTab.HOME;

  const navItems = [
    {
      id: AppTab.HOME,
      label: 'Início',
      icon: Home,
      isActive: isHomeActive,
      activeClass: 'bg-blue-100 text-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      id: AppTab.ROUTINE_MENU,
      label: 'Rotina',
      icon: Activity,
      isActive: isRoutineActive,
      activeClass: 'bg-emerald-100 text-emerald-600',
      iconColor: 'text-emerald-600'
    },
    {
      id: AppTab.LOVE_MENU,
      label: 'Nós',
      icon: Heart,
      isActive: isLoveActive,
      activeClass: 'bg-rose-100 text-rose-600',
      iconColor: 'text-rose-600'
    },
    {
      id: AppTab.LEISURE_MENU,
      label: 'Lazer',
      icon: Sparkles,
      isActive: isLeisureActive,
      activeClass: 'bg-amber-100 text-amber-600',
      iconColor: 'text-amber-600'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-200/60 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <nav className="flex items-center justify-around px-2 pt-2 pb-1 h-[70px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 active:scale-95 group`}
            >
              <div 
                className={`flex items-center justify-center p-1.5 px-5 rounded-full transition-all duration-300 ${
                  item.isActive 
                    ? item.activeClass 
                    : 'bg-transparent text-slate-400 group-hover:bg-slate-50'
                }`}
              >
                <Icon 
                  className={`w-6 h-6 transition-transform duration-300 ${item.isActive ? 'scale-110' : ''}`} 
                  fill={item.isActive && item.id !== AppTab.ROUTINE_MENU && item.id !== AppTab.LEISURE_MENU ? "currentColor" : "none"}
                  strokeWidth={item.isActive ? 2.5 : 2}
                />
              </div>
              
              <span 
                className={`text-[10px] font-bold mt-1 transition-all duration-300 ${
                  item.isActive 
                    ? 'text-slate-800 translate-y-0 opacity-100' 
                    : 'text-slate-400 translate-y-1 opacity-0 hidden'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;