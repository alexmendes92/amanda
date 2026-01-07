
import React from 'react';
import { Moon, Calendar, Info } from 'lucide-react';

const Cycle: React.FC = () => {
  const currentDay = 14;
  const cycleLength = 28;
  const phase = 'Ovulação'; // Simulado

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right">
      <div className="bg-purple-900 rounded-3xl p-8 text-white text-center relative overflow-hidden shadow-xl">
         <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-75"></div>
         </div>
         
         <div className="relative z-10">
            <h2 className="text-sm font-bold text-purple-300 uppercase tracking-widest mb-4">Sincronia Lunar</h2>
            
            <div className="w-40 h-40 mx-auto rounded-full border-4 border-purple-400/30 flex items-center justify-center relative">
               <div className="text-center">
                  <span className="text-4xl font-bold block">{currentDay}</span>
                  <span className="text-xs text-purple-300">Dia do Ciclo</span>
               </div>
               {/* Progress Indicator */}
               <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="48%" stroke="white" strokeWidth="2" fill="none" strokeDasharray="300" strokeDashoffset="150" className="opacity-20" />
                  <circle cx="50%" cy="50%" r="48%" stroke="#d8b4fe" strokeWidth="4" fill="none" strokeDasharray="300" strokeDashoffset={300 - (currentDay/cycleLength)*300} strokeLinecap="round" />
               </svg>
            </div>

            <p className="mt-6 text-xl font-bold">{phase}</p>
            <p className="text-sm text-purple-200 mt-1">Alta energia e confiança ✨</p>
         </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
         <div className="flex gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Info className="w-5 h-5" /></div>
            <div>
               <h3 className="font-bold text-slate-800">Dica para o Alex</h3>
               <p className="text-xs text-slate-500">O que fazer nesta fase?</p>
            </div>
         </div>
         <p className="text-sm text-slate-700 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
           "Nesta fase ela está mais disposta e confiante. Ótimo momento para saírem, conversarem sobre planos e fazerem atividades juntos!"
         </p>
      </div>
    </div>
  );
};

export default Cycle;
