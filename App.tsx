
import React, { useState, useRef, useEffect } from 'react';
import { UserRole, AppTab } from './types';
import Navigation from './components/Navigation';
import SleepMonitor from './components/SleepMonitor';
import Devotional from './components/Devotional';
import Gallery from './components/Gallery';
import Countdown from './components/Countdown';
import FitnessTracker from './components/FitnessTracker';
import WeatherWidget from './components/WeatherWidget';
import MoodWidget from './components/MoodWidget';
import Dates from './components/Dates';
import Fandom from './components/Fandom';
import Supplements from './components/Supplements';
import Playlist from './components/Playlist';
import Habits from './components/Habits';
import Insights from './components/Insights';
import YouAreRight from './components/YouAreRight';
import { UserCircle2, ListTodo, Dumbbell, Moon, Pill, CalendarHeart, Music, Image, Tv, BookOpen, BarChart3, ChevronLeft, ArrowRight, Activity, Heart, Sparkles, Crown, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>('amanda');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const mainViewportRef = useRef<HTMLElement>(null);

  // Auto-scroll para o topo ao mudar de aba ou usuário
  useEffect(() => {
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeTab, currentUser]);

  // Lógica de Navegação (Stack System)
  const getParentTab = (): AppTab => {
    if ([AppTab.FITNESS, AppTab.SLEEP, AppTab.HABITS, AppTab.SUPPLEMENTS, AppTab.INSIGHTS].includes(activeTab)) return AppTab.ROUTINE_MENU;
    if ([AppTab.DATES, AppTab.PLAYLIST, AppTab.GALLERY, AppTab.YOU_ARE_RIGHT].includes(activeTab)) return AppTab.LOVE_MENU;
    if ([AppTab.FANDOM, AppTab.DEVOTIONAL].includes(activeTab)) return AppTab.LEISURE_MENU;
    if ([AppTab.ROUTINE_MENU, AppTab.LOVE_MENU, AppTab.LEISURE_MENU].includes(activeTab)) return AppTab.HOME;
    return AppTab.HOME;
  };

  const showBackButton = activeTab !== AppTab.HOME;

  // Definição de Tema
  const theme = currentUser === 'amanda' 
    ? { appBg: 'bg-rose-50', accentColor: 'text-rose-600', buttonBg: 'bg-rose-100', iconColor: 'text-rose-600' }
    : { appBg: 'bg-slate-100', accentColor: 'text-blue-600', buttonBg: 'bg-blue-100', iconColor: 'text-blue-600' };

  // Componente de Widget Reutilizável
  const MenuWidget = ({ onClick, icon: Icon, title, subtitle, colorClass, bgClass }: any) => (
    <button 
      onClick={onClick}
      className={`${bgClass} p-4 rounded-[1.5rem] border border-transparent text-left transition-all duration-300 active:scale-95 hover:shadow-md group shadow-sm w-full relative overflow-hidden h-full flex flex-col justify-between min-h-[140px]`}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <div className={`p-3 rounded-2xl bg-white ${colorClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="p-1.5 rounded-full bg-white/50 text-slate-400 group-hover:bg-white group-hover:text-slate-600 transition-colors">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base leading-tight mb-1 tracking-tight">{title}</h3>
          <p className="text-[11px] text-slate-500 font-medium opacity-80 line-clamp-2">{subtitle}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className={`h-[100dvh] w-full flex justify-center transition-colors duration-700 ease-in-out ${theme.appBg} overflow-hidden`}>
      <div className="w-full max-w-lg bg-white h-full relative shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Sticky */}
        <div className="pt-safe sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 transition-all duration-300">
           <div className="px-4 py-3 flex justify-between items-center">
             <div className="flex items-center gap-2 overflow-hidden">
                {showBackButton && (
                  <button 
                    onClick={() => setActiveTab(getParentTab())}
                    className="mr-1 p-2 -ml-3 rounded-full hover:bg-slate-100 text-slate-800 transition-colors active:scale-90"
                    aria-label="Voltar"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                <div className={`${showBackButton ? "animate-in slide-in-from-left-2 duration-300" : ""} flex flex-col`}>
                  <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none truncate">Nosso Mundo</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 truncate">Amanda & Alex</p>
                </div>
             </div>
             
             <button 
               onClick={() => setCurrentUser(prev => prev === 'alex' ? 'amanda' : 'alex')}
               className={`flex items-center gap-2 py-1.5 pl-2 pr-3 rounded-full hover:opacity-80 transition-all active:scale-95 border border-slate-200/50 ${theme.buttonBg} bg-opacity-50 flex-shrink-0`}
             >
               <div className={`p-1 rounded-full bg-white`}>
                 <UserCircle2 className={`w-3.5 h-3.5 ${theme.iconColor}`} />
               </div>
               <span className="text-xs font-bold text-slate-700">
                 {currentUser === 'alex' ? 'Alex' : 'Amanda'}
               </span>
             </button>
           </div>
        </div>

        {/* Main Content - PX-4 para mobile */}
        <main 
          key={currentUser}
          ref={mainViewportRef}
          className="flex-1 px-4 pt-4 pb-safe overflow-y-auto no-scrollbar scroll-smooth relative animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          
          <div className="pb-24 space-y-6"> 
            
            {/* --- HOME DASHBOARD --- */}
            {activeTab === AppTab.HOME && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 delay-100">
                
                {/* 1. HEADER */}
                <div className={`p-5 rounded-[2rem] text-white shadow-lg shadow-slate-200/50 relative overflow-hidden transition-colors duration-500 ${currentUser === 'amanda' ? 'bg-gradient-to-br from-rose-500 to-pink-600' : 'bg-slate-900'}`}>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                   
                   <div className="relative z-10">
                     <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">
                            {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
                          </p>
                          <p className="font-bold text-xl leading-tight">
                            {currentUser === 'amanda' ? 'Bom dia, Princesa! 👑' : 'Fala, Guerreiro! 🛡️'}
                          </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-xl">
                          <Sun className="w-5 h-5 text-white" />
                        </div>
                     </div>
                     <p className="text-white/90 text-xs font-medium leading-relaxed bg-black/10 p-3 rounded-xl border border-white/5">
                       {currentUser === 'amanda' ? 'Lembre-se: O Alex te ama mais que ontem.' : 'Hoje é um ótimo dia para fazer a Amanda sorrir.'}
                     </p>
                   </div>
                </div>
                
                {/* 2. DESTAQUE */}
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" />
                      Destaque
                   </h3>
                   <Countdown currentUser={currentUser} />
                </div>

                {/* 3. NAVEGAÇÃO */}
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      Acesso Rápido
                   </h3>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2">
                        <MenuWidget 
                          onClick={() => setActiveTab(AppTab.ROUTINE_MENU)}
                          icon={Dumbbell}
                          title="Rotina & Saúde"
                          subtitle="Hábitos, Treino, Sono"
                          bgClass="bg-emerald-50"
                          colorClass="text-emerald-600"
                        />
                      </div>
                      <MenuWidget 
                        onClick={() => setActiveTab(AppTab.LOVE_MENU)}
                        icon={Heart}
                        title="Nós Dois"
                        subtitle="Dates & Fotos"
                        bgClass="bg-rose-50"
                        colorClass="text-rose-500"
                      />
                      <MenuWidget 
                        onClick={() => setActiveTab(AppTab.LEISURE_MENU)}
                        icon={Tv}
                        title="Lazer"
                        subtitle="Séries & Fé"
                        bgClass="bg-amber-50"
                        colorClass="text-amber-600"
                      />
                   </div>
                </div>

                {/* 4. STATUS */}
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                      <BarChart3 className="w-3 h-3" />
                      Status do Dia
                   </h3>
                   <div className="space-y-4">
                      <WeatherWidget />
                      <MoodWidget currentUser={currentUser} />
                   </div>
                </div>
              </div>
            )}

            {/* --- MENUS SECUNDÁRIOS --- */}
            {activeTab === AppTab.ROUTINE_MENU && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rotina</h2>
                  <p className="text-slate-500 text-xs font-medium">Cuide do corpo e da mente.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-2">
                    <MenuWidget 
                      onClick={() => setActiveTab(AppTab.INSIGHTS)}
                      icon={BarChart3}
                      title="Resumo Geral"
                      subtitle="Semáforo, Batalha & Love Coins"
                      bgClass="bg-slate-100"
                      colorClass="text-slate-600"
                    />
                  </div>
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.HABITS)}
                    icon={ListTodo}
                    title="Hábitos"
                    subtitle="Checklist"
                    bgClass="bg-emerald-50"
                    colorClass="text-emerald-500"
                  />
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.FITNESS)}
                    icon={Dumbbell}
                    title={currentUser === 'amanda' ? "Musa" : "Shape"}
                    subtitle="Treino & Dieta"
                    bgClass={currentUser === 'amanda' ? "bg-rose-50" : "bg-slate-100"}
                    colorClass={currentUser === 'amanda' ? "text-rose-500" : "text-slate-700"}
                  />
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.SLEEP)}
                    icon={Moon}
                    title="Sono"
                    subtitle="Monitor"
                    bgClass="bg-indigo-50"
                    colorClass="text-indigo-500"
                  />
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.SUPPLEMENTS)}
                    icon={Pill}
                    title="Suples"
                    subtitle="Fármacos"
                    bgClass="bg-teal-50"
                    colorClass="text-teal-500"
                  />
                </div>
              </div>
            )}

            {activeTab === AppTab.LOVE_MENU && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nós Dois</h2>
                  <p className="text-slate-500 text-xs font-medium">Memórias e planos a dois.</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                   <MenuWidget 
                    onClick={() => setActiveTab(AppTab.YOU_ARE_RIGHT)}
                    icon={Crown}
                    title="Você tem Razão"
                    subtitle="O Oráculo"
                    bgClass="bg-gradient-to-r from-amber-50 to-yellow-50"
                    colorClass="text-amber-500"
                  />
                   <MenuWidget 
                    onClick={() => setActiveTab(AppTab.DATES)}
                    icon={CalendarHeart}
                    title="Nossos Dates"
                    subtitle="Histórico"
                    bgClass="bg-rose-50"
                    colorClass="text-rose-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <MenuWidget 
                      onClick={() => setActiveTab(AppTab.GALLERY)}
                      icon={Image}
                      title="Galeria"
                      subtitle="Privada"
                      bgClass="bg-slate-100"
                      colorClass="text-slate-600"
                    />
                    <MenuWidget 
                      onClick={() => setActiveTab(AppTab.PLAYLIST)}
                      icon={Music}
                      title="Rádio"
                      subtitle="Playlist IA"
                      bgClass="bg-blue-50"
                      colorClass="text-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === AppTab.LEISURE_MENU && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lazer</h2>
                  <p className="text-slate-500 text-xs font-medium">Para relaxar e agradecer.</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <MenuWidget 
                      onClick={() => setActiveTab(AppTab.DEVOTIONAL)}
                      icon={BookOpen}
                      title="Devocional"
                      subtitle="Palavra & Orações"
                      bgClass="bg-amber-50"
                      colorClass="text-amber-600"
                    />
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.FANDOM)}
                    icon={Tv}
                    title="Fandom"
                    subtitle="Quiz & Curiosidades"
                    bgClass="bg-purple-50"
                    colorClass="text-purple-600"
                  />
                </div>
              </div>
            )}

            {/* --- CONTENT RENDERERS --- */}
            {activeTab === AppTab.SLEEP && <SleepMonitor currentUser={currentUser} />}
            {activeTab === AppTab.FITNESS && <FitnessTracker currentUser={currentUser} />}
            {activeTab === AppTab.SUPPLEMENTS && <Supplements />}
            {activeTab === AppTab.HABITS && <Habits />}
            {activeTab === AppTab.INSIGHTS && <Insights currentUser={currentUser} />}
            {activeTab === AppTab.PLAYLIST && <Playlist currentUser={currentUser} />}
            {activeTab === AppTab.DATES && <Dates />}
            {activeTab === AppTab.DEVOTIONAL && <Devotional currentUser={currentUser} />}
            {activeTab === AppTab.FANDOM && <Fandom currentUser={currentUser} />}
            {activeTab === AppTab.GALLERY && <Gallery currentUser={currentUser} />}
            {activeTab === AppTab.YOU_ARE_RIGHT && <YouAreRight currentUser={currentUser} />}
            
          </div>
        </main>
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
