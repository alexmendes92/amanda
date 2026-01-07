
import React, { useState } from 'react';
import { Plus, Minus, Check, Lock, Camera, Utensils, Droplets, Trophy, Edit2, AlertCircle, Sparkles, Send, ThumbsUp, Heart, ShoppingBag, Dumbbell, Beef, Flame, ChevronRight, BicepsFlexed } from 'lucide-react';
import { PhotoPost, Reward, UserRole } from '../types';

interface FitnessTrackerProps {
  currentUser: UserRole;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ currentUser }) => {
  // --- Shared States ---
  const [waterCount, setWaterCount] = useState(0); 
  const [reportStatus, setReportStatus] = useState<'idle' | 'sent' | 'approved'>('idle');
  const [userPoints, setUserPoints] = useState(1250);

  // --- Amanda States (Musa Fitness) ---
  const [peachClicked, setPeachClicked] = useState(false);
  const [peachMessage, setPeachMessage] = useState("Bumbum na nuca vindo aí! 🔥");
  const [meals, setMeals] = useState({ cafe: true, almoco: true, lanche: false, jantar: false });
  const [amandaWorkoutDone, setAmandaWorkoutDone] = useState(false);

  // --- Alex States (Projeto Shape) ---
  const [alexWorkoutType, setAlexWorkoutType] = useState<string | null>(null);
  const [proteinIntake, setProteinIntake] = useState(0);
  const proteinGoal = 160;
  
  // --- Shared Data ---
  const [supplements, setSupplements] = useState([
    { id: 'creatina', name: 'Creatina', icon: '⚡', subtitle: 'Todo dia sem falhar', taken: false },
    { id: 'whey', name: 'Whey', icon: '🥛', subtitle: 'Pós-treino', taken: false },
    { id: 'omega3', name: 'Ômega 3', icon: '🐟', subtitle: 'Almoço', taken: false },
    { id: 'multi', name: 'Multi', icon: '💊', subtitle: 'Manhã', taken: false },
    { id: 'colageno', name: 'Colágeno', icon: '✨', subtitle: 'Noite', taken: false },
  ]);

  const [shapePhotos, setShapePhotos] = useState<PhotoPost[]>([
    { id: 's1', url: 'https://picsum.photos/400/600?grayscale', caption: 'Evolução Costas', likes: 1, likedByPartner: true, createdAt: '1 semana atrás' }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', title: 'Massagem Pés (15min)', cost: 300, icon: '🦶', redeemed: false },
    { id: '2', title: 'Alex lava a louça', cost: 500, icon: '🍽️', redeemed: false },
    { id: '3', title: 'Jantar Surpresa', cost: 1000, icon: '🍷', redeemed: false },
    { id: '4', title: 'Vale "Você tem Razão"', cost: 5000, icon: '👑', redeemed: false },
  ]);

  // Calculations
  let score = 0;
  if (currentUser === 'amanda') {
     const countMeals = Object.values(meals).filter(Boolean).length;
     const countSupplements = supplements.filter(s => s.taken).length;
     score = Math.round(
      ((amandaWorkoutDone ? 1 : 0) * 30) +
      ((countMeals / 4) * 30) +
      ((Math.min(waterCount, 8) / 8) * 20) +
      ((countSupplements / supplements.length) * 20)
    );
  } else {
     const countSupplements = supplements.filter(s => s.taken).length;
     const proteinScore = Math.min(proteinIntake / proteinGoal, 1) * 30;
     const workoutScore = alexWorkoutType ? 30 : 0;
     const waterScore = (Math.min(waterCount, 8) / 8) * 20;
     const suppScore = (countSupplements / supplements.length) * 20;
     score = Math.round(proteinScore + workoutScore + waterScore + suppScore);
  }

  // Handlers
  const handlePeachClick = () => {
    setPeachClicked(true);
    setTimeout(() => setPeachClicked(false), 3000);
  };

  const toggleMeal = (meal: keyof typeof meals) => {
    setMeals(prev => ({ ...prev, [meal]: !prev[meal] }));
  };
  
  const toggleSupplement = (id: string) => {
    setSupplements(prev => prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s));
  };

  const handleUploadShape = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPost: PhotoPost = {
        id: Date.now().toString(),
        url: URL.createObjectURL(e.target.files[0]),
        caption: 'Check do Shape 💪',
        likes: 0,
        likedByPartner: false,
        createdAt: 'Hoje'
      };
      setShapePhotos([newPost, ...shapePhotos]);
    }
  };

  const handleSendReport = () => {
    setReportStatus('sent');
    if (score === 100) {
       setUserPoints(prev => prev + 100);
       alert("Dia Perfeito! +100 Love Coins!");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRedeem = (rewardId: string, cost: number) => {
    if (userPoints >= cost) {
      if (confirm(`Trocar ${cost} moedas?`)) {
        setUserPoints(prev => prev - cost);
        setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, redeemed: true } : r));
      }
    } else {
      alert("Moedas insuficientes! Treine mais! 💪");
    }
  };

  // 1. AMANDA'S VIEW
  if (currentUser === 'amanda') {
    return (
      <div className="space-y-6">
        {/* Header Compacto */}
        <div className="bg-rose-50 p-4 rounded-3xl border border-rose-100 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 h-1.5 bg-rose-200 w-full">
              <div className="h-full bg-rose-500 transition-all duration-1000" style={{ width: `${score}%` }}></div>
           </div>
           <h2 className="text-xl font-bold text-rose-900 flex justify-center items-center gap-2 mt-2">
            Projeto Musa
          </h2>
          <p className="text-rose-600 text-xs font-medium mt-1">
            {score}% concluído. Vamos lá!
          </p>
        </div>

        {/* 🍑 Treino Peach */}
        <div className={`bg-white rounded-[1.5rem] shadow-sm border transition-all ${amandaWorkoutDone ? 'border-green-200 bg-green-50/30' : 'border-slate-100'}`}>
          <div className="p-5 text-center">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-slate-800 text-sm">Treino do Dia</h3>
               <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm active:scale-95 transition-transform">
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Marcar Feito</span>
                  <input 
                    type="checkbox" 
                    checked={amandaWorkoutDone} 
                    onChange={(e) => setAmandaWorkoutDone(e.target.checked)}
                    className="w-4 h-4 accent-green-500 rounded cursor-pointer"
                  />
               </label>
            </div>
            
            <div className="relative overflow-hidden py-2">
              <button
                onClick={handlePeachClick}
                className={`group relative inline-flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
                  peachClicked 
                    ? 'bg-orange-100 scale-110 shadow-[0_0_20px_rgba(251,146,60,0.5)]' 
                    : 'bg-slate-50 hover:bg-orange-50'
                }`}
              >
                <span className={`text-4xl transition-transform duration-500 ${peachClicked ? 'animate-bounce' : 'grayscale group-hover:grayscale-0'}`}>
                  🍑
                </span>
              </button>
              <div className={`mt-3 h-6 transition-all duration-500 ${peachClicked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-orange-600 font-bold text-xs">"{peachMessage}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card Unificado: Alimentação + Hidratação */}
        <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
             <Utensils className="w-4 h-4 text-green-500" /> Alimentação
           </h3>
           <div className="grid grid-cols-2 gap-2 mb-6">
             {Object.entries(meals).map(([key, val]) => (
               <button key={key} onClick={() => toggleMeal(key as any)} className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all active:scale-95 ${val ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white text-slate-400 border-slate-100'}`}>
                 {key.charAt(0).toUpperCase() + key.slice(1)} {val && '✅'}
               </button>
             ))}
           </div>
           
           {/* REDESIGNED HYDRATION WIDGET (Compact) */}
           <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
             <div className="flex justify-between items-center mb-3">
               <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                 <Droplets className="w-4 h-4 text-blue-500" /> Hidratação
               </h3>
               <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-md">{waterCount}/8</span>
             </div>
             
             {/* Visual Progress Bar (Cups) */}
             <div className="flex justify-between gap-1 mb-4 px-0.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-6 w-full rounded transition-all duration-300 ${
                      i < waterCount 
                        ? 'bg-blue-400 shadow-sm shadow-blue-200' 
                        : 'bg-blue-100/50'
                    }`}
                  ></div>
                ))}
             </div>

             <div className="flex items-center justify-between gap-3">
                <button 
                  onClick={() => setWaterCount(Math.max(0, waterCount - 1))} 
                  className="w-10 h-10 bg-white text-blue-300 rounded-xl border border-blue-100 flex items-center justify-center active:scale-90 transition-all shadow-sm"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <div className="flex-1 text-center">
                   <p className="text-2xl font-black text-blue-500 tracking-tight leading-none">{waterCount * 250}</p>
                   <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">ml</p>
                </div>

                <button 
                  onClick={() => setWaterCount(Math.min(8, waterCount + 1))} 
                  className="w-10 h-10 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center active:scale-90 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
             </div>
           </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 pb-4">
          {reportStatus === 'sent' ? (
             <div className="bg-green-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 font-bold text-sm"><Check /> Relatório Enviado!</div>
          ) : (
            <button onClick={handleSendReport} className="w-full bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between hover:bg-slate-800 transition-colors active:scale-95">
              <div className="text-left"><p className="text-[10px] text-slate-400 uppercase">Finalizar Dia</p><p className="font-bold text-sm">Prestar Contas 📝</p></div>
              <Send className="w-5 h-5 text-rose-300" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2. ALEX'S VIEW (Projeto Shape)
  return (
    <div className="space-y-6">
      
      {/* Alex Header */}
      <div className="bg-slate-900 rounded-[1.5rem] p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <Dumbbell className="w-24 h-24" />
        </div>
        <div className="relative z-10">
           <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-xl font-bold italic">PROJETO SHAPE</h2>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest">Em busca do monstro</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">
                <span className="font-bold text-emerald-400 text-sm">{score}%</span>
              </div>
           </div>
           
           {/* Progress Bar */}
           <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{ width: `${score}%` }}></div>
           </div>
        </div>
      </div>

      {/* 1. SELETOR DE TREINO */}
      <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100">
         <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Dumbbell className="w-4 h-4 text-indigo-600" />
              Treino do Dia
            </h3>
            {alexWorkoutType && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Pago ✅</span>}
         </div>

         <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'push', label: 'Push', sub: 'Peito/Ombro/Tri' },
              { id: 'pull', label: 'Pull', sub: 'Costas/Bíceps' },
              { id: 'legs', label: 'Legs', sub: 'Pernas Completas' },
              { id: 'cardio', label: 'Cardio', sub: 'Corrida/Abs' }
            ].map((workout) => (
              <button
                key={workout.id}
                onClick={() => setAlexWorkoutType(alexWorkoutType === workout.id ? null : workout.id)}
                className={`p-3 rounded-xl text-left border transition-all active:scale-95 ${
                  alexWorkoutType === workout.id 
                    ? 'bg-slate-800 border-slate-800 text-white shadow-md' 
                    : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                 <p className="font-bold text-sm mb-0.5">{workout.label}</p>
                 <p className={`text-[9px] ${alexWorkoutType === workout.id ? 'text-slate-400' : 'text-slate-400'}`}>{workout.sub}</p>
              </button>
            ))}
         </div>
      </div>

      {/* 2. CONTADOR DE PROTEÍNA */}
      <div className="bg-indigo-50 rounded-[1.5rem] p-5 border border-indigo-100">
         <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-sm">
              <Beef className="w-4 h-4 text-indigo-600" />
              Macros (Proteína)
            </h3>
            <span className="text-[10px] font-bold text-indigo-400">Meta: {proteinGoal}g</span>
         </div>

         <div className="flex items-end gap-2 mb-3">
            <span className="text-3xl font-bold text-indigo-900 leading-none">{proteinIntake}</span>
            <span className="text-xs font-medium text-indigo-500 mb-0.5">/ {proteinGoal}g</span>
         </div>
         
         <div className="w-full h-2 bg-white rounded-full overflow-hidden mb-4 border border-indigo-100">
            <div 
              className={`h-full rounded-full transition-all ${proteinIntake >= proteinGoal ? 'bg-green-500' : 'bg-indigo-500'}`} 
              style={{ width: `${Math.min((proteinIntake/proteinGoal)*100, 100)}%` }}
            ></div>
         </div>

         <div className="flex gap-2 justify-between">
            <button onClick={() => setProteinIntake(Math.max(0, proteinIntake - 10))} className="w-10 h-10 flex items-center justify-center bg-white text-indigo-300 rounded-xl active:scale-90 transition-transform"><Minus className="w-4 h-4" /></button>
            <div className="flex gap-2">
               <button onClick={() => setProteinIntake(proteinIntake + 20)} className="px-3 py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-sm border border-indigo-100 active:scale-95 transition-transform">+20g</button>
               <button onClick={() => setProteinIntake(proteinIntake + 30)} className="px-3 py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-sm border border-indigo-100 active:scale-95 transition-transform">+30g</button>
            </div>
         </div>
      </div>

      {/* 3. CHECKLIST RÁPIDO */}
      <div className="grid grid-cols-2 gap-3">
         {/* Água */}
         <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-blue-500 mb-1">
               <Droplets className="w-4 h-4" />
               <span className="font-bold text-xs">Água</span>
            </div>
            <div className="text-center my-1">
               <span className="text-2xl font-bold text-slate-800">{waterCount}</span>
               <span className="text-[10px] text-slate-400"> / 8 copos</span>
            </div>
            <button 
              onClick={() => setWaterCount(Math.min(8, waterCount + 1))}
              className="w-full bg-blue-500 text-white py-1.5 rounded-lg font-bold text-xs active:scale-95 transition-transform"
            >
              +1 Copo
            </button>
         </div>

         {/* Creatina */}
         <div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-yellow-500 mb-1">
               <Flame className="w-4 h-4" />
               <span className="font-bold text-xs">Creatina</span>
            </div>
            <div className="text-center my-1">
               {supplements.find(s => s.id === 'creatina')?.taken ? (
                 <Check className="w-7 h-7 text-green-500 mx-auto" />
               ) : (
                 <span className="text-[10px] text-slate-400 italic">Pendente</span>
               )}
            </div>
            <button 
              onClick={() => toggleSupplement('creatina')}
              className={`w-full py-1.5 rounded-lg font-bold text-xs active:scale-95 transition-transform ${supplements.find(s => s.id === 'creatina')?.taken ? 'bg-green-100 text-green-700' : 'bg-slate-900 text-white'}`}
            >
              {supplements.find(s => s.id === 'creatina')?.taken ? 'Tomado' : 'Tomar'}
            </button>
         </div>
      </div>

      {/* 4. GALERIA SHAPE */}
      <div className="bg-slate-900 rounded-[1.5rem] p-5 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold flex items-center gap-2 text-sm">
              Galeria do Shape
              <Lock className="w-3 h-3 text-slate-500" />
            </h3>
            <p className="text-slate-400 text-[10px] mt-0.5">Fotos privadas</p>
          </div>
          <label className="bg-slate-800 p-2 rounded-lg cursor-pointer active:bg-slate-700 transition-colors">
            <Camera className="w-4 h-4 text-emerald-400" />
            <input type="file" className="hidden" accept="image/*" onChange={handleUploadShape} />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shapePhotos.map(photo => (
             <div key={photo.id} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
               <img src={photo.url} alt="Shape" className="w-full h-full object-cover opacity-90" />
               <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[9px] text-slate-300">{photo.caption}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 5. LOJA */}
      <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
            <ShoppingBag className="w-4 h-4 text-indigo-500" />
            Loja (Love Coins)
          </h3>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
             <Sparkles className="w-3 h-3" />
             {userPoints}
          </span>
        </div>
        <div className="space-y-2">
          {rewards.map(reward => (
            <button
              key={reward.id}
              disabled={userPoints < reward.cost || reward.redeemed}
              onClick={() => handleRedeem(reward.id, reward.cost)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all active:scale-[0.98] ${
                reward.redeemed ? 'bg-gray-50 opacity-60' : 'bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{reward.icon}</span>
                <span className="text-xs font-medium text-slate-700 text-left">{reward.title}</span>
              </div>
              <span className="text-xs font-bold text-amber-500">{reward.cost}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FitnessTracker;
