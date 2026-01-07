
import React, { useState } from 'react';
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
import { UserCircle2, ListTodo, Dumbbell, Moon, Pill, CalendarHeart, Music, Image, Tv, BookOpen, BarChart3, ChevronLeft, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>('amanda');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  // Define qual "Menu Pai" o usuário deve voltar ao clicar em "Voltar"
  const getParentTab = (): AppTab => {
    if ([AppTab.FITNESS, AppTab.SLEEP, AppTab.HABITS, AppTab.SUPPLEMENTS, AppTab.INSIGHTS].includes(activeTab)) return AppTab.ROUTINE_MENU;
    if ([AppTab.DATES, AppTab.PLAYLIST, AppTab.GALLERY].includes(activeTab)) return AppTab.LOVE_MENU;
    if ([AppTab.FANDOM, AppTab.DEVOTIONAL].includes(activeTab)) return AppTab.LEISURE_MENU;
    return AppTab.HOME;
  };

  const isSubPage = getParentTab() !== AppTab.HOME && ![AppTab.ROUTINE_MENU, AppTab.LOVE_MENU, AppTab.LEISURE_MENU, AppTab.HOME].includes(activeTab);

  // Componente de Widget do Menu
  const MenuWidget = ({ 
    onClick, 
    icon: Icon, 
    title, 
    subtitle, 
    colorClass, 
    bgClass 
  }: { 
    onClick: () => void, 
    icon: any, 
    title: string, 
    subtitle: string, 
    colorClass: string, 
    bgClass: string 
  }) => (
    <button 
      onClick={onClick}
      className={`${bgClass} p-5 rounded-[2rem] border border-transparent hover:border-black/5 text-left transition-all duration-300 active:scale-95 group shadow-sm`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-3 rounded-2xl bg-white ${colorClass} shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="p-2 rounded-full bg-white/50 text-slate-400 group-hover:bg-white group-hover:text-slate-600 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
      <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{title}</h3>
      <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header / Profile Switcher */}
        <div className="pt-12 pb-4 px-6 flex justify-between items-center bg-white sticky top-0 z-40 border-b border-slate-50">
           <div className="flex items-center gap-2">
              {isSubPage && (
                <button 
                  onClick={() => setActiveTab(getParentTab())}
                  className="mr-1 p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nosso Mundo</h1>
                <p className="text-xs text-slate-500">Amanda & Alex</p>
              </div>
           </div>
           
           <button 
             onClick={() => setCurrentUser(prev => prev === 'alex' ? 'amanda' : 'alex')}
             className="flex items-center gap-2 bg-slate-100 py-1.5 px-3 rounded-full hover:bg-slate-200 transition-colors"
           >
             <UserCircle2 className={`w-4 h-4 ${currentUser === 'amanda' ? 'text-pink-500' : 'text-blue-500'}`} />
             <span className="text-xs font-medium text-slate-700">
               {currentUser === 'alex' ? 'Alex' : 'Amanda'}
             </span>
           </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 px-6 pt-4 pb-24 overflow-y-auto no-scrollbar">
          
          {/* --- HOME TAB --- */}
          {activeTab === AppTab.HOME && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <Countdown currentUser={currentUser} />
              
              <div className="space-y-4">
                <WeatherWidget />
                <MoodWidget currentUser={currentUser} />
              </div>

              {/* Atalhos Rápidos Home */}
              <div>
                 <h3 className="text-sm font-bold text-slate-800 mb-3 px-1">Acesso Rápido</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setActiveTab(AppTab.HABITS)} className="bg-emerald-50 p-4 rounded-2xl text-left border border-emerald-100">
                       <ListTodo className="w-5 h-5 text-emerald-600 mb-2" />
                       <span className="font-bold text-emerald-900 text-sm">Meus Hábitos</span>
                    </button>
                    <button onClick={() => setActiveTab(AppTab.SLEEP)} className="bg-indigo-50 p-4 rounded-2xl text-left border border-indigo-100">
                       <Moon className="w-5 h-5 text-indigo-600 mb-2" />
                       <span className="font-bold text-indigo-900 text-sm">Meu Sono</span>
                    </button>
                 </div>
              </div>

              <div className="mt-4 p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white shadow-lg shadow-slate-200">
                 <p className="font-medium text-lg mb-1">
                   {currentUser === 'amanda' ? 'Bom dia, Princesa!' : 'Bom dia, Guerreiro!'}
                 </p>
                 <p className="text-slate-300 text-sm opacity-90">
                   {currentUser === 'amanda' 
                     ? 'Lembre-se: O Alex te ama mais que ontem.' 
                     : 'Hoje é um ótimo dia para fazer a Amanda sorrir.'}
                 </p>
              </div>
            </div>
          )}

          {/* --- ROUTINE HUB (Menu) --- */}
          {activeTab === AppTab.ROUTINE_MENU && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="px-1">
                <h2 className="text-2xl font-bold text-slate-900">Hub de Rotina</h2>
                <p className="text-slate-500 text-sm">Cuide do corpo e da mente.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  subtitle="Checklist Diário"
                  bgClass="bg-emerald-50"
                  colorClass="text-emerald-500"
                />
                <MenuWidget 
                  onClick={() => setActiveTab(AppTab.FITNESS)}
                  icon={Dumbbell}
                  title="Musa Fitness"
                  subtitle="Treino & Dieta"
                  bgClass="bg-rose-50"
                  colorClass="text-rose-500"
                />
                <MenuWidget 
                  onClick={() => setActiveTab(AppTab.SLEEP)}
                  icon={Moon}
                  title="Sono"
                  subtitle="Monitoramento"
                  bgClass="bg-indigo-50"
                  colorClass="text-indigo-500"
                />
                <MenuWidget 
                  onClick={() => setActiveTab(AppTab.SUPPLEMENTS)}
                  icon={Pill}
                  title="Suples"
                  subtitle="Farmacinha"
                  bgClass="bg-teal-50"
                  colorClass="text-teal-500"
                />
              </div>
            </div>
          )}

          {/* --- LOVE HUB (Menu) --- */}
          {activeTab === AppTab.LOVE_MENU && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="px-1">
                <h2 className="text-2xl font-bold text-slate-900">Espaço Nós</h2>
                <p className="text-slate-500 text-sm">Memórias e planos a dois.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 <MenuWidget 
                  onClick={() => setActiveTab(AppTab.DATES)}
                  icon={CalendarHeart}
                  title="Nossos Dates"
                  subtitle="Histórico, Planejador & Contagem"
                  bgClass="bg-rose-50"
                  colorClass="text-rose-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.GALLERY)}
                    icon={Image}
                    title="Galeria"
                    subtitle="Fotos Privadas"
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

          {/* --- LEISURE HUB (Menu) --- */}
          {activeTab === AppTab.LEISURE_MENU && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="px-1">
                <h2 className="text-2xl font-bold text-slate-900">Lazer & Alma</h2>
                <p className="text-slate-500 text-sm">Para relaxar e agradecer.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <MenuWidget 
                    onClick={() => setActiveTab(AppTab.DEVOTIONAL)}
                    icon={BookOpen}
                    title="Devocional"
                    subtitle="Palavra do dia & Orações"
                    bgClass="bg-amber-50"
                    colorClass="text-amber-600"
                  />
                <MenuWidget 
                  onClick={() => setActiveTab(AppTab.FANDOM)}
                  icon={Tv}
                  title="Fandom"
                  subtitle="Séries, Quiz & Curiosidades"
                  bgClass="bg-purple-50"
                  colorClass="text-purple-600"
                />
              </div>
            </div>
          )}

          {/* --- CONTENT RENDERERS --- */}

          {activeTab === AppTab.SLEEP && (
            <div className="animate-in slide-in-from-right duration-300">
              <SleepMonitor currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.FITNESS && (
            <div className="animate-in slide-in-from-right duration-300">
              <FitnessTracker currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.SUPPLEMENTS && (
            <div className="animate-in slide-in-from-right duration-300">
              <Supplements />
            </div>
          )}

          {activeTab === AppTab.HABITS && (
            <div className="animate-in slide-in-from-right duration-300">
              <Habits />
            </div>
          )}
          
          {activeTab === AppTab.INSIGHTS && (
            <div className="animate-in slide-in-from-right duration-300">
              <Insights currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.PLAYLIST && (
            <div className="animate-in slide-in-from-right duration-300">
              <Playlist currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.DATES && (
             <div className="animate-in slide-in-from-right duration-300">
                <Dates />
             </div>
          )}

          {activeTab === AppTab.DEVOTIONAL && (
            <div className="h-full animate-in slide-in-from-right duration-300">
              <Devotional currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.FANDOM && (
            <div className="h-full animate-in slide-in-from-right duration-300">
              <Fandom currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.GALLERY && (
            <div className="h-full animate-in slide-in-from-right duration-300">
              <Gallery currentUser={currentUser} />
            </div>
          )}
          
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
