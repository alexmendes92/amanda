
import React, { useState } from 'react';
import { UserRole, AppTab } from './types';
import Navigation from './components/Navigation'; // Importação adicionada
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
import { UserCircle2, ListTodo, Dumbbell, Moon, Pill, CalendarHeart, Music, Image, Tv, BookOpen, BarChart3, ChevronLeft, ArrowRight, Activity, Heart, Sparkles, Crown } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>('amanda');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  // Lógica de Navegação (Stack System)
  const getParentTab = (): AppTab => {
    // Nível 2 (Ferramentas) -> Nível 1 (Menus)
    if ([AppTab.FITNESS, AppTab.SLEEP, AppTab.HABITS, AppTab.SUPPLEMENTS, AppTab.INSIGHTS].includes(activeTab)) return AppTab.ROUTINE_MENU;
    if ([AppTab.DATES, AppTab.PLAYLIST, AppTab.GALLERY, AppTab.YOU_ARE_RIGHT].includes(activeTab)) return AppTab.LOVE_MENU;
    if ([AppTab.FANDOM, AppTab.DEVOTIONAL].includes(activeTab)) return AppTab.LEISURE_MENU;
    
    // Nível 1 (Menus) -> Nível 0 (Home)
    if ([AppTab.ROUTINE_MENU, AppTab.LOVE_MENU, AppTab.LEISURE_MENU].includes(activeTab)) return AppTab.HOME;
    
    return AppTab.HOME;
  };

  const showBackButton = activeTab !== AppTab.HOME;

  // Componente de Widget Reutilizável com UX Aprimorada
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
      className={`${bgClass} p-5 rounded-[2rem] border border-transparent text-left transition-all duration-300 active:scale-95 hover:shadow-md group shadow-sm w-full relative overflow-hidden`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className={`p-3.5 rounded-2xl bg-white ${colorClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="p-2 rounded-full bg-white/50 text-slate-400 group-hover:bg-white group-hover:text-slate-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-500 font-medium opacity-80">{subtitle}</p>
      </div>
    </button>
  );

  return (
    <div className="h-full bg-slate-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-white h-full relative shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header / Profile Switcher - Glassmorphism Style */}
        <div className="pt-safe sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/50 transition-all duration-300">
           <div className="px-6 py-4 flex justify-between items-center">
             <div className="flex items-center gap-2">
                {showBackButton && (
                  <button 
                    onClick={() => setActiveTab(getParentTab())}
                    className="mr-1 p-2 -ml-3 rounded-full hover:bg-slate-100 text-slate-800 transition-colors active:scale-90"
                    aria-label="Voltar"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                )}
                <div className={showBackButton ? "animate-in slide-in-from-left-2 duration-300" : ""}>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Nosso Mundo</h1>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Amanda & Alex</p>
                </div>
             </div>
             
             <button 
               onClick={() => setCurrentUser(prev => prev === 'alex' ? 'amanda' : 'alex')}
               className="flex items-center gap-2 bg-slate-100/80 py-1.5 pl-2 pr-3 rounded-full hover:bg-slate-200 transition-all active:scale-95 border border-slate-200/50"
             >
               <div className={`p-1 rounded-full ${currentUser === 'amanda' ? 'bg-pink-100' : 'bg-blue-100'}`}>
                 <UserCircle2 className={`w-4 h-4 ${currentUser === 'amanda' ? 'text-pink-600' : 'text-blue-600'}`} />
               </div>
               <span className="text-xs font-bold text-slate-700">
                 {currentUser === 'alex' ? 'Alex' : 'Amanda'}
               </span>
             </button>
           </div>
        </div>

        {/* Main Content Area - Native Scroll Feeling */}
        <main className="flex-1 px-6 pt-6 pb-safe overflow-y-auto no-scrollbar scroll-smooth">
          
          <div className="pb-32"> {/* Aumentado padding bottom para acomodar o Dock Flutuante */}
            
            {/* --- HOME DASHBOARD --- */}
            {activeTab === AppTab.HOME && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                
                {/* 1. Destaque */}
                <Countdown currentUser={currentUser} />
                
                {/* 2. Clima e Humor */}
                <div className="space-y-4">
                  <WeatherWidget />
                  <MoodWidget currentUser={currentUser} />
                </div>

                {/* 3. MENU PRINCIPAL (Widgets de Navegação) */}
                <div>
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1 flex items-center gap-2">
                      <Activity className="w-3 h-3" />
                      Menu Principal
                   </h3>
                   <div className="grid grid-cols-1 gap-4">
                      <MenuWidget 
                        onClick={() => setActiveTab(AppTab.ROUTINE_MENU)}
                        icon={Dumbbell}
                        title="Rotina & Saúde"
                        subtitle="Hábitos, Treino, Sono & Suplementos"
                        bgClass="bg-emerald-50"
                        colorClass="text-emerald-600"
                      />
                      <div className="grid grid-cols-2 gap-4">
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
                          icon={Sparkles}
                          title="Lazer"
                          subtitle="Séries & Fé"
                          bgClass="bg-amber-50"
                          colorClass="text-amber-600"
                        />
                      </div>
                   </div>
                </div>

                {/* Mensagem de Bom dia */}
                <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-200 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                   <p className="font-bold text-lg mb-1 relative z-10">
                     {currentUser === 'amanda' ? 'Bom dia, Princesa! 👑' : 'Fala, Guerreiro! 🛡️'}
                   </p>
                   <p className="text-slate-400 text-sm relative z-10">
                     {currentUser === 'amanda' 
                       ? 'Lembre-se: O Alex te ama mais que ontem.' 
                       : 'Hoje é um ótimo dia para fazer a Amanda sorrir.'}
                   </p>
                </div>
              </div>
            )}

            {/* --- HUB: ROTINA --- */}
            {activeTab === AppTab.ROUTINE_MENU && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Rotina</h2>
                  <p className="text-slate-500 text-sm font-medium">Cuide do corpo e da mente.</p>
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
                    subtitle="Checklist"
                    bgClass="bg-emerald-50"
                    colorClass="text-emerald-500"
                  />
                  
                  {/* DYNAMIC FITNESS WIDGET BASED ON USER */}
                  <MenuWidget 
                    onClick={() => setActiveTab(AppTab.FITNESS)}
                    icon={Dumbbell}
                    title={currentUser === 'amanda' ? "Musa Fitness" : "Shape"}
                    subtitle={currentUser === 'amanda' ? "Treino & Dieta" : "Treino & Macros"}
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
                    subtitle="Farmacinha"
                    bgClass="bg-teal-50"
                    colorClass="text-teal-500"
                  />
                </div>
              </div>
            )}

            {/* --- HUB: NÓS (LOVE) --- */}
            {activeTab === AppTab.LOVE_MENU && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Nós Dois</h2>
                  <p className="text-slate-500 text-sm font-medium">Memórias e planos a dois.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                   {/* NOVO: Botão Você tem Razão */}
                   <MenuWidget 
                    onClick={() => setActiveTab(AppTab.YOU_ARE_RIGHT)}
                    icon={Crown}
                    title="Você tem Razão"
                    subtitle="O Oráculo que confirma a verdade"
                    bgClass="bg-gradient-to-r from-amber-50 to-yellow-50"
                    colorClass="text-amber-500"
                  />

                   <MenuWidget 
                    onClick={() => setActiveTab(AppTab.DATES)}
                    icon={CalendarHeart}
                    title="Nossos Dates"
                    subtitle="Histórico & Planejador"
                    bgClass="bg-rose-50"
                    colorClass="text-rose-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
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

            {/* --- HUB: LAZER --- */}
            {activeTab === AppTab.LEISURE_MENU && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                <div className="px-1 mb-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lazer & Alma</h2>
                  <p className="text-slate-500 text-sm font-medium">Para relaxar e agradecer.</p>
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
            {/* Usando key para forçar remontagem da animação quando a tab muda */}
            <div key={activeTab} className="h-full">
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
            
          </div>
        </main>
        
        {/* Navigation Dock */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
