
import React from 'react';
import { Home, Activity, Heart, Sparkles, LayoutGrid } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  
  // Lógica para identificar qual "Hub" está ativo, mesmo se estiver em uma sub-ferramenta
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
    AppTab.GALLERY,
    AppTab.YOU_ARE_RIGHT
  ].includes(activeTab);

  const isLeisureActive = [
    AppTab.LEISURE_MENU, 
    AppTab.FANDOM, 
    AppTab.DEVOTIONAL
  ].includes(activeTab);

  const isHomeActive = activeTab === AppTab.HOME;

  const navItems = [
    {
      id: AppTab.HOME,
      label: 'Início',
      icon: Home,
      isActive: isHomeActive,
      activeColor: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      id: AppTab.ROUTINE_MENU,
      label: 'Rotina',
      icon: Activity,
      isActive: isRoutineActive,
      activeColor: 'bg-emerald-500',
      textColor: 'text-emerald-500'
    },
    {
      id: AppTab.LOVE_MENU,
      label: 'Nós',
      icon: Heart,
      isActive: isLoveActive,
      activeColor: 'bg-rose-500',
      textColor: 'text-rose-500'
    },
    {
      id: AppTab.LEISURE_MENU,
      label: 'Lazer',
      icon: Sparkles,
      isActive: isLeisureActive,
      activeColor: 'bg-amber-500',
      textColor: 'text-amber-500'
    }
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
      <nav className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl pointer-events-auto flex items-center gap-1 mx-4 max-w-sm w-full justify-between sm:justify-center sm:gap-4 transition-all duration-300 animate-in slide-in-from-bottom-10">
        
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative group flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                item.isActive 
                  ? 'bg-white/10 shadow-inner' 
                  : 'hover:bg-white/5'
              }`}
            >
              {/* Active Indicator Dot */}
              {item.isActive && (
                <span className={`absolute top-2 w-1 h-1 rounded-full ${item.activeColor} shadow-[0_0_8px_currentColor]`} />
              )}

              <div className={`transition-transform duration-300 ${item.isActive ? 'scale-110 -translate-y-0.5' : 'scale-100 group-hover:scale-105 group-active:scale-95'}`}>
                <Icon 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    item.isActive 
                      ? item.textColor 
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`} 
                  // Preencher ícone se ativo (exceto Activity/Sparkles que ficam melhor outline ou com stroke específico)
                  fill={item.isActive && item.id !== AppTab.ROUTINE_MENU && item.id !== AppTab.LEISURE_MENU ? "currentColor" : "none"}
                />
              </div>
              
              {/* Label (Opcional, visível apenas se houver espaço ou preferência por icons only) */}
              {item.isActive && (
                <span className="text-[9px] font-bold text-white/90 absolute bottom-2 opacity-0 animate-in fade-in zoom-in duration-300" style={{ opacity: 1 }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
