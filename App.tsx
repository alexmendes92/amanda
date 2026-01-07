

import React, { useState, useRef, useEffect } from 'react';
import { UserRole, AppTab, SleepRecord, AmandaFitnessData } from './types';
import Navigation from './components/Navigation';
import SleepMonitor from './components/SleepMonitor';
import Devotional from './components/Devotional';
import Gallery from './components/Gallery';
import FitnessTracker from './components/FitnessTracker';
import WeatherWidget from './components/WeatherWidget';
import MoodWidget from './components/MoodWidget';
import Dates from './components/Dates';
import Fandom from './components/Fandom';
import Supplements from './components/Supplements';
import Playlist from './components/Playlist';
import Lists from './components/Habits';
import Insights from './components/Insights';
import YouAreRight from './components/YouAreRight';
import Cinema from './components/Cinema';
import LoveBank from './components/LoveBank';
import Cycle from './components/Cycle';
import SOS from './components/SOS';
import Motivation from './components/Motivation';
import { QuoteWidget } from './components/DashboardWidgets';

import { UserCircle2, ListTodo, Dumbbell, Moon, Pill, CalendarHeart, Music, Image, Tv, BookOpen, BarChart3, ChevronLeft, ArrowRight, Activity, Heart, Sparkles, Crown, Sun, Wallet, Ticket, ShoppingCart, Lock, BrainCircuit, MessageCircle, AlertTriangle, BellRing, CheckCircle2, Flame, Target, Lightbulb } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>('amanda');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const mainViewportRef = useRef<HTMLElement>(null);

  // --- SHARED STATE ---
  const [sleepRecord, setSleepRecord] = useState<SleepRecord>({
    date: new Date().toLocaleDateString(),
    hours: 7,
    tookMelatonin: false,
    usedGanchinho: false,
    quality: 'ok'
  });

  const [amandaFitnessData, setAmandaFitnessData] = useState<AmandaFitnessData>({
    meals: { cafe: false, almoco: false, lanche: false, jantar: false },
    waterCount: 0,
    workoutDone: false,
    workoutType: null,
    reportStatus: 'idle',
    score: 0,
  });

  useEffect(() => {
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [activeTab, currentUser]);

  const getParentTab = (): AppTab => {
    if ([AppTab.FITNESS, AppTab.SLEEP, AppTab.LISTS, AppTab.SUPPLEMENTS, AppTab.INSIGHTS, AppTab.MARKET].includes(activeTab)) return AppTab.ROUTINE_MENU;
    if ([AppTab.DATES, AppTab.PLAYLIST, AppTab.GALLERY, AppTab.YOU_ARE_RIGHT, AppTab.LOVE_BANK, AppTab.CINEMA, AppTab.SOS, AppTab.CYCLE].includes(activeTab)) return AppTab.LOVE_MENU;
    if ([AppTab.FANDOM, AppTab.DEVOTIONAL, AppTab.CAPSULE, AppTab.QUIZ, AppTab.AI_COACH, AppTab.MOTIVATION].includes(activeTab)) return AppTab.LEISURE_MENU;
    if ([AppTab.ROUTINE_MENU, AppTab.LOVE_MENU, AppTab.LEISURE_MENU].includes(activeTab)) return AppTab.HOME;
    return AppTab.HOME;
  };

  const showBackButton = activeTab !== AppTab.HOME;

  const theme = currentUser === 'amanda' 
    ? { appBg: 'bg-rose-50', accentColor: 'text-rose-600', buttonBg: 'bg-rose-100', iconColor: 'text-rose-600' }
    : { appBg: 'bg-slate-100', accentColor: 'text-blue-600', buttonBg: 'bg-blue-100', iconColor: 'text-blue-600' };

  const MenuWidget = ({ onClick, icon: Icon, title, subtitle, colorClass, bgClass, size = 'normal' }: any) => (
    <button 
      onClick={onClick}
      className={`${bgClass} p-4 rounded-[1.5rem] border border-transparent text-left transition-all duration-300 active:scale-95 hover:shadow-md group shadow-sm w-full relative overflow-hidden flex flex-col justify-between ${size === 'large' ? 'min-h-[160px]' : 'min-h-[120px]'}`}
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
          <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 tracking-tight">{title}</h3>
          <p className="text-[10px] text-slate-500 font-medium opacity-80 line-clamp-1">{subtitle}</p>
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
             
             <div className="flex gap-2">
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
        </div>

        <main 
          key={currentUser}
          ref={mainViewportRef}
          className="flex-1 px-4 pt-4 pb-safe overflow-y-auto no-scrollbar scroll-smooth relative animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          
          <div className="pb-24 space-y-6"> 
            
            {/* --- HOME DASHBOARD --- */}
            {activeTab === AppTab.HOME && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 delay-100">
                
                {/* 1. HERO - Personalizado por Usuário */}
                <div className={`p-6 rounded-[2rem] text-white shadow-xl shadow-slate-200/50 relative overflow-hidden transition-colors duration-500 ${currentUser === 'amanda' ? 'bg-gradient-to-br from-rose-500 to-pink-600' : 'bg-gradient-to-br from-slate-800 to-slate-900'}`}>
                   {/* Background Decor */}
                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-12 -mt-12 blur-3xl"></div>
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>

                   <div className="relative z-10">
                     <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">
                            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' })}
                          </p>
                          <h2 className="font-black text-2xl leading-none">
                            {currentUser === 'amanda' ? 'Bom dia, Musa! ✨' : 'Foco total, Alex! 🦁'}
                          </h2>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/10">
                          {currentUser === 'amanda' ? <Crown className="w-6 h-6 text-white" /> : <Dumbbell className="w-6 h-6 text-white" />}
                        </div>
                     </div>

                     {/* PROGRESSO DO DIA (RESUMO INDIVIDUAL) */}
                     <div className="bg-black/20 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-white/90 uppercase tracking-wide">
                             {currentUser === 'amanda' ? 'Meta do Dia' : 'Meta do Shape'}
                           </span>
                           <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">{amandaFitnessData.score}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3">
                           <div className="bg-white h-full rounded-full" style={{ width: `${amandaFitnessData.score}%` }}></div>
                        </div>
                        <div className="flex gap-2">
                           <div className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-2 py-1 rounded-lg">
                              <CheckCircle2 className="w-3 h-3" />
                              {currentUser === 'amanda' ? 'Hidratação' : 'Proteína'}
                           </div>
                           <div className="flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-2 py-1 rounded-lg">
                              <Flame className="w-3 h-3" />
                              {currentUser === 'amanda' ? 'Treino' : 'Cardio'}
                           </div>
                        </div>
                     </div>
                   </div>
                </div>

                {/* 2. ÁREA DE FOCO PESSOAL (PRIORIDADE) */}
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                      <Target className="w-3 h-3" />
                      Meu Foco
                   </h3>
                   <div className="grid grid-cols-1 gap-2">
                      {/* Botão Gigante de Rotina */}
                      <button 
                        onClick={() => setActiveTab(AppTab.ROUTINE_MENU)}
                        className={`w-full p-5 rounded-[2rem] text-left transition-all active:scale-[0.98] relative overflow-hidden group shadow-sm hover:shadow-md ${currentUser === 'amanda' ? 'bg-emerald-50' : 'bg-indigo-50'}`}
                      >
                         <div className="flex justify-between items-start relative z-10">
                            <div className="flex gap-4 items-center">
                               <div className={`p-4 rounded-2xl bg-white shadow-sm ${currentUser === 'amanda' ? 'text-emerald-500' : 'text-indigo-500'}`}>
                                  <Activity className="w-8 h-8" />
                               </div>
                               <div>
                                  <h3 className={`text-xl font-bold ${currentUser === 'amanda' ? 'text-emerald-900' : 'text-indigo-900'}`}>Minha Rotina</h3>
                                  <p className={`text-xs font-medium ${currentUser === 'amanda' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                     {currentUser === 'amanda' ? 'Sono, Skincare, Treino' : 'Treino, Dieta, Estudos'}
                                  </p>
                               </div>
                            </div>
                            <div className="bg-white/50 p-2 rounded-full">
                               <ArrowRight className={`w-5 h-5 ${currentUser === 'amanda' ? 'text-emerald-700' : 'text-indigo-700'}`} />
                            </div>
                         </div>
                      </button>
                   </div>
                </div>

                {/* 3. ÁREA DO CASAL & LAZER (SECUNDÁRIO) */}
                <div>
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
                      <Heart className="w-3 h-3" />
                      Extras
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                      <MenuWidget 
                        onClick={() => setActiveTab(AppTab.LOVE_MENU)}
                        icon={Heart}
                        title="Nós Dois"
                        subtitle="Conexão"
                        bgClass="bg-rose-50"
                        colorClass="text-rose-500"
                      />
                      <MenuWidget 
                        onClick={() => setActiveTab(AppTab.LEISURE_MENU)}
                        icon={Sparkles}
                        title="Lazer"
                        subtitle="Diversão"
                        bgClass="bg-amber-50"
                        colorClass="text-amber-600"
                      />
                   </div>
                </div>

                {/* 4. RODAPÉ INSPIRACIONAL */}
                <div className="pt-2">
                   <QuoteWidget />
                </div>
                
                {/* 5. STATUS GERAL */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                   <WeatherWidget />
                   <MoodWidget currentUser={currentUser} />
                </div>
              </div>
            )}

            {/* --- HUB ROTINA --- */}
            {activeTab === AppTab.ROUTINE_MENU && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Rotina</h2>
                  <p className="text-slate-500 text-xs font-medium">Cuide do corpo e da mente.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MenuWidget onClick={() => setActiveTab(AppTab.INSIGHTS)} icon={BarChart3} title="Resumo" subtitle="Stats" bgClass="bg-slate-100" colorClass="text-slate-600" />
                  <MenuWidget onClick={() => setActiveTab(AppTab.LISTS)} icon={ListTodo} title="Listas" subtitle="Checklist" bgClass="bg-emerald-50" colorClass="text-emerald-500" />
                  <MenuWidget onClick={() => setActiveTab(AppTab.FITNESS)} icon={Dumbbell} title="Fitness" subtitle="Treino" bgClass="bg-orange-50" colorClass="text-orange-500" />
                  <MenuWidget onClick={() => setActiveTab(AppTab.SLEEP)} icon={Moon} title="Sono" subtitle="Monitor" bgClass="bg-indigo-50" colorClass="text-indigo-500" />
                  <MenuWidget onClick={() => setActiveTab(AppTab.SUPPLEMENTS)} icon={Pill} title="Suples" subtitle="Fármacos" bgClass="bg-teal-50" colorClass="text-teal-500" />
                  <MenuWidget onClick={() => alert('Em breve: Lista de Mercado!')} icon={ShoppingCart} title="Mercado" subtitle="Lista" bgClass="bg-blue-50" colorClass="text-blue-500" />
                </div>
              </div>
            )}

            {/* --- HUB NÓS DOIS --- */}
            {activeTab === AppTab.LOVE_MENU && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nós Dois</h2>
                  <p className="text-slate-500 text-xs font-medium">Memórias e planos a dois.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <MenuWidget onClick={() => setActiveTab(AppTab.YOU_ARE_RIGHT)} icon={Crown} title="Razão" subtitle="Oráculo" bgClass="bg-yellow-50" colorClass="text-yellow-600" />
                   <MenuWidget onClick={() => setActiveTab(AppTab.LOVE_BANK)} icon={Ticket} title="Love Bank" subtitle="Cupons" bgClass="bg-rose-50" colorClass="text-rose-500" />
                   
                   <MenuWidget onClick={() => setActiveTab(AppTab.DATES)} icon={CalendarHeart} title="Dates" subtitle="Histórico" bgClass="bg-pink-50" colorClass="text-pink-500" />
                   <MenuWidget onClick={() => setActiveTab(AppTab.CINEMA)} icon={Tv} title="Cine" subtitle="Filmes" bgClass="bg-purple-50" colorClass="text-purple-500" />
                   
                   <MenuWidget onClick={() => setActiveTab(AppTab.CYCLE)} icon={Moon} title="Ciclo" subtitle="Sincronia" bgClass="bg-indigo-50" colorClass="text-indigo-500" />
                   <MenuWidget onClick={() => setActiveTab(AppTab.SOS)} icon={AlertTriangle} title="SOS" subtitle="Pânico" bgClass="bg-red-50" colorClass="text-red-500" />
                   
                   <MenuWidget onClick={() => setActiveTab(AppTab.GALLERY)} icon={Image} title="Fotos" subtitle="Galeria" bgClass="bg-slate-100" colorClass="text-slate-500" />
                   <MenuWidget onClick={() => setActiveTab(AppTab.PLAYLIST)} icon={Music} title="Rádio" subtitle="Playlist" bgClass="bg-blue-50" colorClass="text-blue-500" />
                </div>
              </div>
            )}

            {/* --- HUB LAZER --- */}
            {activeTab === AppTab.LEISURE_MENU && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lazer</h2>
                  <p className="text-slate-500 text-xs font-medium">Diversão e Conexão.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MenuWidget onClick={() => setActiveTab(AppTab.MOTIVATION)} icon={Lightbulb} title="Motivação" subtitle="Inspiração" bgClass="bg-yellow-50" colorClass="text-yellow-600" />
                  <MenuWidget onClick={() => setActiveTab(AppTab.DEVOTIONAL)} icon={BookOpen} title="Fé" subtitle="Devocional" bgClass="bg-amber-50" colorClass="text-amber-600" />
                  <MenuWidget onClick={() => setActiveTab(AppTab.FANDOM)} icon={Sparkles} title="Fandom" subtitle="Quiz" bgClass="bg-purple-50" colorClass="text-purple-600" />
                  <MenuWidget onClick={() => alert('Em breve: Quiz Diário')} icon={BrainCircuit} title="Quiz" subtitle="Trivia" bgClass="bg-orange-50" colorClass="text-orange-600" />
                </div>
              </div>
            )}

            {/* --- RENDERIZAÇÃO DAS TELAS --- */}
            {activeTab === AppTab.SLEEP && <SleepMonitor currentUser={currentUser} record={sleepRecord} onRecordChange={setSleepRecord} />}
            {activeTab === AppTab.FITNESS && <FitnessTracker currentUser={currentUser} amandaData={amandaFitnessData} onAmandaDataChange={setAmandaFitnessData} />}
            {activeTab === AppTab.SUPPLEMENTS && <Supplements />}
            {activeTab === AppTab.LISTS && <Lists />}
            {activeTab === AppTab.INSIGHTS && <Insights currentUser={currentUser} />}
            {activeTab === AppTab.PLAYLIST && <Playlist currentUser={currentUser} />}
            {activeTab === AppTab.DATES && <Dates />}
            {activeTab === AppTab.DEVOTIONAL && <Devotional currentUser={currentUser} />}
            {activeTab === AppTab.FANDOM && <Fandom currentUser={currentUser} />}
            {activeTab === AppTab.GALLERY && <Gallery currentUser={currentUser} />}
            {activeTab === AppTab.YOU_ARE_RIGHT && <YouAreRight currentUser={currentUser} />}
            
            {/* Novas Telas */}
            {activeTab === AppTab.CINEMA && <Cinema />}
            {activeTab === AppTab.LOVE_BANK && <LoveBank />}
            {activeTab === AppTab.CYCLE && <Cycle />}
            {activeTab === AppTab.SOS && <SOS />}
            {activeTab === AppTab.MOTIVATION && <Motivation />}
            
          </div>
        </main>
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;