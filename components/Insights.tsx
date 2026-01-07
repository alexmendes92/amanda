
import React, { useState } from 'react';
import { TrendingUp, Activity, Moon, Droplets, Zap, UserCircle2, Sparkles, Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { UserRole } from '../types';

interface InsightsProps {
  currentUser: UserRole;
}

const Insights: React.FC<InsightsProps> = ({ currentUser }) => {
  
  // --- MOCK DATA FOR VISUALIZATION ---
  
  // 1. SEMÁFORO (Rings Data)
  const rings = [
    { label: 'Energia (Sono)', percent: 75, color: 'text-indigo-500', stroke: 'stroke-indigo-500', icon: <Moon className="w-4 h-4" /> },
    { label: 'Foco (Hábitos)', percent: 90, color: 'text-emerald-500', stroke: 'stroke-emerald-500', icon: <Activity className="w-4 h-4" /> },
    { label: 'Corpo (Treino)', percent: 60, color: 'text-rose-500', stroke: 'stroke-rose-500', icon: <Zap className="w-4 h-4" /> },
  ];

  // 2. BATALHA DO CASAL (Comparison)
  const stats = [
    { label: 'Treinos', amanda: 4, alex: 3, unit: 'x' },
    { label: 'Água (Média)', amanda: 2.1, alex: 1.5, unit: 'L' },
    { label: 'Sono (Média)', amanda: 6.5, alex: 5.8, unit: 'h' },
  ];

  // 3. HEATMAP (Last 28 days)
  // Generating fake consistency data
  const generateHeatmap = () => {
    const days = [];
    for (let i = 0; i < 28; i++) {
      const random = Math.random();
      let status = 'empty';
      if (random > 0.8) status = 'perfect'; // Gold
      else if (random > 0.4) status = 'good'; // Green
      else if (random > 0.2) status = 'ok'; // Light Green
      days.push(status);
    }
    return days;
  };
  const [heatmap] = useState(generateHeatmap());

  // 4. LOVE COINS HISTORY
  const transactions = [
    { id: 1, desc: 'Treino Pago', amount: 100, type: 'credit', date: 'Hoje' },
    { id: 2, desc: 'Bbeu 3L Água', amount: 50, type: 'credit', date: 'Hoje' },
    { id: 3, desc: 'Massagem Pés', amount: -300, type: 'debit', date: 'Ontem' },
    { id: 4, desc: 'Semana Perfeita', amount: 500, type: 'credit', date: '24/02' },
    { id: 5, desc: 'Lavar Louça', amount: -500, type: 'debit', date: '22/02' },
  ];

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="px-2">
        <h2 className="text-2xl font-bold text-slate-900">Raio-X do Casal</h2>
        <p className="text-slate-500 text-sm">Nossa evolução lado a lado.</p>
      </div>

      {/* 1. O NOSSO SEMÁFORO (Rings) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden">
         <div className="space-y-4 relative z-10 w-1/2">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Activity className="w-5 h-5 text-slate-400" />
               Semáforo
            </h3>
            <div className="space-y-2">
               {rings.map((ring, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${ring.color.replace('text-', 'bg-')}`}></div>
                    <span className="text-xs font-medium text-slate-600">{ring.label}</span>
                    <span className={`text-xs font-bold ${ring.color}`}>{ring.percent}%</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Concentric Rings Visualization */}
         <div className="relative w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
               {rings.map((ring, index) => {
                  const radius = 40 - (index * 12);
                  const circumference = 2 * Math.PI * radius;
                  const offset = circumference - (ring.percent / 100) * circumference;
                  
                  return (
                    <React.Fragment key={index}>
                       {/* Track */}
                       <circle 
                         cx="50" cy="50" r={radius} 
                         stroke="currentColor" strokeWidth="8" fill="transparent" 
                         className="text-slate-100" 
                       />
                       {/* Progress */}
                       <circle 
                         cx="50" cy="50" r={radius} 
                         stroke="currentColor" strokeWidth="8" fill="transparent"
                         strokeDasharray={circumference}
                         strokeDashoffset={offset}
                         strokeLinecap="round"
                         className={`${ring.stroke} transition-all duration-1000 ease-out`}
                       />
                    </React.Fragment>
                  );
               })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
               <TrendingUp className="w-6 h-6 text-slate-300" />
            </div>
         </div>
      </div>

      {/* 2. HEATMAP (Consistency) */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2">
               <Calendar className="w-5 h-5 text-emerald-400" />
               Consistência
            </h3>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">Últimos 28 dias</span>
         </div>
         
         <div className="grid grid-cols-7 gap-2">
            {heatmap.map((status, i) => (
               <div 
                 key={i} 
                 className={`aspect-square rounded-md transition-all duration-500 hover:scale-110 ${
                    status === 'perfect' ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                    status === 'good' ? 'bg-emerald-500' :
                    status === 'ok' ? 'bg-emerald-900/40' :
                    'bg-slate-800'
                 }`}
                 title={`Dia ${i+1}`}
               ></div>
            ))}
         </div>
         <div className="mt-4 flex justify-between items-center text-[10px] text-slate-400">
            <span>Menos</span>
            <div className="flex gap-1">
               <div className="w-3 h-3 rounded bg-slate-800"></div>
               <div className="w-3 h-3 rounded bg-emerald-900/40"></div>
               <div className="w-3 h-3 rounded bg-emerald-500"></div>
               <div className="w-3 h-3 rounded bg-amber-400"></div>
            </div>
            <span>Mais</span>
         </div>
      </div>

      {/* 3. BATALHA DO CASAL (Comparison) */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
         <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <UserCircle2 className="w-5 h-5 text-blue-500" />
            Comparativo da Semana
         </h3>
         
         <div className="space-y-6">
            <div className="flex justify-between text-xs font-bold uppercase text-slate-400 px-2 mb-2">
               <span className="text-pink-500">Amanda</span>
               <span className="text-blue-500">Alex</span>
            </div>
            
            {stats.map((stat, i) => (
               <div key={i} className="relative">
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1 px-2 relative z-10">
                     <span>{stat.amanda}{stat.unit}</span>
                     <span>{stat.alex}{stat.unit}</span>
                  </div>
                  
                  {/* Label Centered */}
                  <div className="absolute inset-0 flex items-center justify-center -top-6">
                     <span className="bg-white px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>

                  <div className="flex h-3 rounded-full overflow-hidden bg-slate-100">
                     {/* Amanda Bar (Left) */}
                     <div 
                        className="bg-pink-400 h-full transition-all duration-1000" 
                        style={{ width: `${(stat.amanda / (stat.amanda + stat.alex)) * 100}%` }}
                     ></div>
                     {/* Divider */}
                     <div className="w-1 bg-white h-full z-10"></div>
                     {/* Alex Bar (Right - implicit via flex, but colored via container background if needed, or explicitly styled) */}
                     <div className="flex-1 bg-blue-400 h-full"></div> 
                  </div>
               </div>
            ))}
         </div>

         <div className="mt-6 bg-indigo-50 p-3 rounded-xl text-center">
            <p className="text-xs text-indigo-800">
               🏆 <strong>Placar Geral:</strong> Amanda está vencendo por pouco!
            </p>
         </div>
      </div>

      {/* 4. EXTRATO LOVE COINS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Sparkles className="w-5 h-5 text-amber-500" />
               Extrato Love Coins
            </h3>
            <span className="text-xs font-bold text-slate-400">Recentes</span>
         </div>

         <div className="space-y-0 divide-y divide-slate-50">
            {transactions.map((tx) => (
               <div key={tx.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                        {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-slate-700">{tx.desc}</p>
                        <p className="text-[10px] text-slate-400">{tx.date}</p>
                     </div>
                  </div>
                  <span className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-400'}`}>
                     {tx.type === 'credit' ? '+' : '-'}{Math.abs(tx.amount)}
                  </span>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default Insights;
