
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
import { UserCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>('amanda');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header / Profile Switcher */}
        <div className="pt-12 pb-6 px-6 flex justify-between items-center bg-white sticky top-0 z-40">
           <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Nosso Mundo</h1>
              <p className="text-xs text-slate-500">Amanda & Alex</p>
           </div>
           
           <button 
             onClick={() => setCurrentUser(prev => prev === 'alex' ? 'amanda' : 'alex')}
             className="flex items-center gap-2 bg-slate-100 py-1.5 px-3 rounded-full hover:bg-slate-200 transition-colors"
           >
             <UserCircle2 className={`w-4 h-4 ${currentUser === 'amanda' ? 'text-pink-500' : 'text-blue-500'}`} />
             <span className="text-xs font-medium text-slate-700">
               Ver como: {currentUser === 'alex' ? 'Alex' : 'Amanda'}
             </span>
           </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 px-6 pb-24 overflow-y-auto no-scrollbar">
          
          {activeTab === AppTab.HOME && (
            <div className="space-y-2 animate-in fade-in zoom-in-95 duration-500">
              <Countdown currentUser={currentUser} />
              
              {/* Weather Widgets */}
              <div className="space-y-6">
                <WeatherWidget />
                <MoodWidget currentUser={currentUser} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setActiveTab(AppTab.SLEEP)} className="p-4 bg-indigo-50 rounded-2xl text-left hover:bg-indigo-100 transition-colors">
                    <span className="block text-2xl mb-1">💤</span>
                    <span className="font-bold text-indigo-900 text-sm">Boletim</span>
                    <p className="text-xs text-indigo-600/70">Como o benzin dormiu?</p>
                 </button>
                 <button onClick={() => setActiveTab(AppTab.FITNESS)} className="p-4 bg-rose-50 rounded-2xl text-left hover:bg-rose-100 transition-colors">
                    <span className="block text-2xl mb-1">🍑</span>
                    <span className="font-bold text-rose-900 text-sm">Projeto Musa</span>
                    <p className="text-xs text-rose-600/70">Treino, Dieta & Shape</p>
                 </button>
                 <button onClick={() => setActiveTab(AppTab.SUPPLEMENTS)} className="p-4 bg-teal-50 rounded-2xl text-left hover:bg-teal-100 transition-colors">
                    <span className="block text-2xl mb-1">💊</span>
                    <span className="font-bold text-teal-900 text-sm">Suplementos</span>
                    <p className="text-xs text-teal-600/70">Rotina & Detalhes</p>
                 </button>
                 <button onClick={() => setActiveTab(AppTab.PLAYLIST)} className="p-4 bg-slate-800 rounded-2xl text-left hover:bg-slate-700 transition-colors text-white shadow-lg">
                    <span className="block text-2xl mb-1">🎸</span>
                    <span className="font-bold text-white text-sm">Rádio Nossa</span>
                    <p className="text-xs text-slate-300">Rock & Boyce Avenue</p>
                 </button>
                 <button onClick={() => setActiveTab(AppTab.DATES)} className="col-span-2 p-4 bg-rose-500 rounded-2xl text-left hover:bg-rose-600 transition-colors text-white shadow-lg shadow-rose-200">
                    <span className="block text-2xl mb-1">📅</span>
                    <span className="font-bold text-white text-sm">Encontros & História</span>
                    <p className="text-xs text-rose-100">Próximo Date: Ilhabela</p>
                 </button>
                 <button onClick={() => setActiveTab(AppTab.DEVOTIONAL)} className="col-span-2 p-4 bg-amber-50 rounded-2xl text-left hover:bg-amber-100 transition-colors">
                      <span className="block text-2xl mb-1">🙏</span>
                      <span className="font-bold text-amber-900 text-sm">Devocional</span>
                      <p className="text-xs text-amber-600/70">Fé Compartilhada</p>
                 </button>
              </div>

              {/* Banner de Séries / Fandom */}
              <button 
                onClick={() => setActiveTab(AppTab.FANDOM)}
                className={`w-full mt-4 p-5 rounded-2xl shadow-lg transition-all duration-300 bg-cover bg-center relative overflow-hidden group ${currentUser === 'alex' ? 'bg-slate-900' : 'bg-slate-800'}`}
                style={{ 
                  backgroundImage: currentUser === 'alex' 
                    ? 'url("https://images.unsplash.com/photo-1626278664285-f796b96180af?q=80&w=2000&auto=format&fit=crop")' // Magic/Dark
                    : 'url("https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2000&auto=format&fit=crop")' // Forest/Fog
                }}
              >
                 <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors"></div>
                 <div className="relative z-10 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
                        {currentUser === 'alex' ? 'Mundo Bruxo' : 'Saga Crepúsculo'}
                      </p>
                      <h3 className="text-lg font-serif font-bold">
                        {currentUser === 'alex' ? 'Acesse Hogwarts ⚡' : 'Ir para Forks 🌲'}
                      </h3>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                      <span className="text-xl">📺</span>
                    </div>
                 </div>
              </button>
              
              <div className="mt-6 p-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white shadow-lg shadow-pink-200">
                 <p className="font-medium text-lg mb-1">
                   {currentUser === 'amanda' ? 'Bom dia, Princesa!' : 'Bom dia, Guerreiro!'}
                 </p>
                 <p className="text-pink-100 text-sm opacity-90">
                   {currentUser === 'amanda' 
                     ? 'Já bebeu água hoje? O Alex quer ver você hidratada!' 
                     : 'Não esqueça de elogiar o foco da Amanda hoje.'}
                 </p>
              </div>
            </div>
          )}

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
