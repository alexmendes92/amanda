import React, { useState } from 'react';
import { UserRole, AppTab } from './types';
import Navigation from './components/Navigation';
import SleepMonitor from './components/SleepMonitor';
import Devotional from './components/Devotional';
import Gallery from './components/Gallery';
import Countdown from './components/Countdown';
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
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setActiveTab(AppTab.SLEEP)} className="p-4 bg-indigo-50 rounded-2xl text-left hover:bg-indigo-100 transition-colors">
                    <span className="block text-2xl mb-1">💤</span>
                    <span className="font-bold text-indigo-900 text-sm">Boletim</span>
                    <p className="text-xs text-indigo-600/70">Como o benzin dormiu?</p>
                 </button>
                 <button onClick={() => setActiveTab(AppTab.DEVOTIONAL)} className="p-4 bg-amber-50 rounded-2xl text-left hover:bg-amber-100 transition-colors">
                    <span className="block text-2xl mb-1">🙏</span>
                    <span className="font-bold text-amber-900 text-sm">Oração</span>
                    <p className="text-xs text-amber-600/70">Pedidos & Palavra</p>
                 </button>
              </div>
              
              <div className="mt-6 p-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white shadow-lg shadow-pink-200">
                 <p className="font-medium text-lg mb-1">
                   {currentUser === 'amanda' ? 'Bom dia, Princesa!' : 'Bom dia, Guerreiro!'}
                 </p>
                 <p className="text-pink-100 text-sm opacity-90">
                   {currentUser === 'amanda' 
                     ? 'Lembre-se de verificar se o Alex descansou bem hoje.' 
                     : 'Não esqueça de marcar seu sono para a Amanda não preocupar.'}
                 </p>
              </div>
            </div>
          )}

          {activeTab === AppTab.SLEEP && (
            <div className="animate-in slide-in-from-right duration-300">
              <SleepMonitor currentUser={currentUser} />
            </div>
          )}

          {activeTab === AppTab.DEVOTIONAL && (
            <div className="h-full animate-in slide-in-from-right duration-300">
              <Devotional currentUser={currentUser} />
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
