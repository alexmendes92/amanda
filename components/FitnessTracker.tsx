
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Check, Lock, Camera, Utensils, Droplets, Trophy, Edit2, AlertCircle, Sparkles, Send, ThumbsUp, Heart, ShoppingBag, Dumbbell, Beef, Flame, ChevronRight, BicepsFlexed, Crown, Zap, CheckCircle2, Timer, Footprints, Medal, Share2, BellRing } from 'lucide-react';
import { PhotoPost, Reward, UserRole, AmandaFitnessData } from '../types';

interface FitnessTrackerProps {
  currentUser: UserRole;
  amandaData: AmandaFitnessData;
  onAmandaDataChange: (data: AmandaFitnessData) => void;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ currentUser, amandaData, onAmandaDataChange }) => {
  // --- States that can remain local ---
  const [userPoints, setUserPoints] = useState(1250);
  const [showCelebration, setShowCelebration] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  
  // --- Alex's local states ---
  const [alexWorkoutType, setAlexWorkoutType] = useState<string | null>(null);
  const [proteinIntake, setProteinIntake] = useState(0);
  const proteinGoal = 160;
  const [alexWaterCount, setAlexWaterCount] = useState(0);
  
  // --- Shared Data (can be local as it's not cross-user dependent in this version) ---
  const [supplements, setSupplements] = useState([
    { id: 'creatina', name: 'Creatina', icon: '⚡', subtitle: 'Todo dia sem falhar', taken: false },
    { id: 'whey', name: 'Whey', icon: '🥛', subtitle: 'Pós-treino', taken: false },
  ]);
  const [shapePhotos, setShapePhotos] = useState<PhotoPost[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', title: 'Massagem Pés (15min)', cost: 300, icon: '🦶', redeemed: false },
    { id: '2', title: 'Alex lava a louça', cost: 500, icon: '🍽️', redeemed: false },
    { id: '3', title: 'Jantar Surpresa', cost: 1000, icon: '🍷', redeemed: false },
  ]);

  // --- Calculations ---
  // Alex's score is calculated locally
  const alexScore = Math.round(
    (Math.min(proteinIntake / proteinGoal, 1) * 30) +
    (alexWorkoutType ? 30 : 0) +
    ((Math.min(alexWaterCount, 8) / 8) * 20) +
    ((supplements.filter(s => s.taken).length / supplements.length) * 20)
  );
  
  const score = currentUser === 'amanda' ? amandaData.score : alexScore;

  // --- Effects ---
  useEffect(() => {
    if (amandaData.score === 100 && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
    const newBadges = [...unlockedBadges];
    if (amandaData.waterCount >= 8 && !newBadges.includes('hydro')) newBadges.push('hydro');
    if (amandaData.workoutDone && !newBadges.includes('workout')) newBadges.push('workout');
    if (Object.values(amandaData.meals).every(Boolean) && !newBadges.includes('nutrition')) newBadges.push('nutrition');
    if (newBadges.length !== unlockedBadges.length) setUnlockedBadges(newBadges);
  }, [amandaData.score, amandaData.waterCount, amandaData.workoutDone, amandaData.meals, showCelebration, unlockedBadges]);

  // --- Handlers for Amanda ---
  const handleWorkoutComplete = () => {
    if (!amandaData.workoutType) return;
    onAmandaDataChange({ ...amandaData, workoutDone: true });
  };
  const toggleMeal = (meal: keyof AmandaFitnessData['meals']) => {
    const newMeals = { ...amandaData.meals, [meal]: !amandaData.meals[meal] };
    onAmandaDataChange({ ...amandaData, meals: newMeals });
  };
  const setAmandaWaterCount = (count: number) => {
    onAmandaDataChange({ ...amandaData, waterCount: Math.max(0, Math.min(8, count)) });
  };
  const setAmandaWorkoutType = (type: AmandaFitnessData['workoutType']) => {
    onAmandaDataChange({ ...amandaData, workoutType: type });
  };

  // --- General Handlers ---
  const handleSendReport = () => {
    const countMeals = Object.values(amandaData.meals).filter(Boolean).length;
    const finalScore = Math.round(
      ((amandaData.workoutDone ? 1 : 0) * 40) +
      ((countMeals / 4) * 30) +
      ((Math.min(amandaData.waterCount, 8) / 8) * 30)
    );

    onAmandaDataChange({ ...amandaData, reportStatus: 'sent', score: finalScore });

    if (finalScore === 100) {
      setUserPoints(prev => prev + 100);
      alert("Dia Perfeito! +100 Love Coins! 👑");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSupplement = (id: string) => setSupplements(prev => prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s));
  const handleUploadShape = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const handleRedeem = (rewardId: string, cost: number) => { /* ... */ };

  // 1. AMANDA'S VIEW (MUSA FITNESS)
  if (currentUser === 'amanda') {
    return (
      <div className="pb-24 space-y-8 relative">
        {/* CSS for Wave Animation */}
        <style>{`@keyframes wave{0%{background-position-x:0}100%{background-position-x:1000px}}.wave-bg{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E");background-size:200% 100%;animation:wave 10s linear infinite}`}</style>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
             <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-500"></div>
             <div className="relative z-10 text-center animate-in zoom-in duration-500"><Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-4 drop-shadow-2xl filter" /><h2 className="text-4xl font-black text-white drop-shadow-md">DIA PERFEITO!</h2><p className="text-white/90 text-lg font-bold">Você é incrível, Musa! 💖</p></div>
          </div>
        )}
        <div className="relative">
           <div className="flex justify-between items-center mb-6"><div><h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">Projeto Musa <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" /></h2><p className="text-slate-500 font-medium text-sm">Construindo o shape dos sonhos.</p></div><div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center"><span className="text-[10px] font-bold uppercase text-slate-400">Streak</span><div className="flex items-center gap-1 text-orange-500 font-black text-xl leading-none"><Flame className="w-4 h-4 fill-orange-500" /> 12</div></div></div>
           <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[2.5rem] p-6 text-white shadow-xl shadow-rose-200 relative overflow-hidden"><div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div><div className="flex items-center justify-between relative z-10"><div><p className="text-rose-100 font-bold text-xs uppercase tracking-widest mb-1">Performance Diária</p><span className="text-5xl font-black">{amandaData.score}%</span><p className="text-rose-100 text-sm mt-2 max-w-[150px] leading-tight">{score === 100 ? "Meta batida! Você arrasou! 🎉" : "Falta pouco para brilhar! ✨"}</p></div><div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20"><p className="text-[10px] text-rose-100 font-bold uppercase mb-2 text-center">Conquistas Hoje</p><div className="flex gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${unlockedBadges.includes('nutrition')?'bg-green-400 border-white text-white':'bg-black/20 border-white/10 text-white/30'}`}><Utensils className="w-4 h-4" /></div><div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${unlockedBadges.includes('hydro')?'bg-blue-400 border-white text-white':'bg-black/20 border-white/10 text-white/30'}`}><Droplets className="w-4 h-4" /></div><div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${unlockedBadges.includes('workout')?'bg-orange-400 border-white text-white':'bg-black/20 border-white/10 text-white/30'}`}><BicepsFlexed className="w-4 h-4" /></div></div></div></div></div>
        </div>
        <div><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Utensils className="w-5 h-5 text-green-500" /> Nutrição</h3><div className="grid grid-cols-2 gap-3">{Object.entries(amandaData.meals).map(([key, val])=>(<button key={key} onClick={()=>toggleMeal(key as any)} className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${val?'bg-green-50 border-green-200':'bg-white border-slate-100 hover:border-slate-200'}`}><div className="flex justify-between items-start relative z-10"><span className="capitalize font-bold text-slate-700">{key}</span><div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${val?'bg-green-500 text-white':'bg-slate-100 text-slate-300'}`}><Check className="w-3 h-3"/></div></div><div className={`absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-500 ${val?'w-full':'w-0'}`}></div></button>))}</div></div>
        <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm relative overflow-hidden"><div className="flex justify-between items-start mb-6 relative z-10"><div><h3 className="font-bold text-slate-800 flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500"/> Hidratação</h3><p className="text-xs text-slate-500 mt-1">Meta: 2.0 Litros</p></div><div className="text-3xl font-black text-blue-500">{amandaData.waterCount * 250}<span className="text-sm font-bold text-blue-300">ml</span></div></div><div className="relative h-40 bg-blue-50 rounded-2xl border-4 border-white shadow-inner overflow-hidden mb-6 mx-4"><div className="absolute bottom-0 left-0 w-full bg-blue-400 transition-all duration-700 ease-in-out wave-bg" style={{height:`${(amandaData.waterCount/8)*100}%`}}><div className="w-full h-full opacity-50 bg-blue-500 wave-bg" style={{animationDuration:'7s'}}></div></div><div className="absolute inset-0 flex flex-col justify-between py-2 px-4 pointer-events-none"><div className="w-full border-b border-blue-200/50 text-[9px] text-blue-300 text-right">2L</div><div className="w-full border-b border-blue-200/50 text-[9px] text-blue-300 text-right">1.5L</div><div className="w-full border-b border-blue-200/50 text-[9px] text-blue-300 text-right">1L</div><div className="w-full border-b border-blue-200/50 text-[9px] text-blue-300 text-right">0.5L</div></div></div><div className="flex justify-center gap-4 relative z-10"><button onClick={()=>setAmandaWaterCount(amandaData.waterCount-1)} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 active:scale-90 transition-transform"><Minus className="w-5 h-5"/></button><button onClick={()=>setAmandaWaterCount(amandaData.waterCount+1)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2"><Plus className="w-5 h-5"/> Beber 250ml</button></div></div>
        <div><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Dumbbell className="w-5 h-5 text-orange-500"/> Treino do Dia</h3>{!amandaData.workoutDone?(<div className="space-y-4"><div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">{[{id:'leg',label:'Glúteo/Perna',icon:'🍑'},{id:'upper',label:'Superiores',icon:'💪'},{id:'cardio',label:'Cardio',icon:'🏃‍♀️'},{id:'yoga',label:'Yoga/Stretching',icon:'🧘‍♀️'}].map(t=>(<button key={t.id} onClick={()=>setAmandaWorkoutType(t.id as any)} className={`flex-shrink-0 px-4 py-3 rounded-2xl border-2 transition-all ${amandaData.workoutType===t.id?'border-orange-500 bg-orange-50 text-orange-700':'border-slate-100 bg-white text-slate-500 grayscale'}`}><div className="text-2xl mb-1">{t.icon}</div><span className="text-xs font-bold">{t.label}</span></button>))}</div>{amandaData.workoutType&&(<div className="animate-in fade-in slide-in-from-bottom-4"><button onClick={handleWorkoutComplete} className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-200 active:scale-95 transition-transform flex items-center justify-center gap-2"><CheckCircle2 className="w-6 h-6"/> CONCLUIR TREINO</button></div>)}</div>):(<div className="bg-orange-50 border border-orange-100 rounded-[2rem] p-6 text-center animate-in zoom-in"><div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3"><Trophy className="w-8 h-8 text-orange-500"/></div><h3 className="text-xl font-black text-orange-600 mb-1">TREINO PAGO!</h3><p className="text-orange-400 text-sm font-medium">Você é imparável. O shape vem! 💪</p></div>)}</div>
        <div className="pt-4 border-t border-slate-100"><button onClick={handleSendReport} disabled={amandaData.reportStatus === 'sent'} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${amandaData.reportStatus==='sent'?'bg-green-100 text-green-700 cursor-default':'bg-slate-900 text-white shadow-xl hover:bg-slate-800 active:scale-95'}`}>{amandaData.reportStatus==='sent'?(<>Relatório Enviado <CheckCircle2 className="w-5 h-5"/></>):(<>Enviar Relatório para o Alex <Send className="w-4 h-4"/></>)}</button></div>
      </div>
    );
  }

  // 2. ALEX'S VIEW (Projeto Shape)
  return (
    <div className="space-y-6">
      
      {/* CARD DE NOTIFICAÇÃO DO RELATÓRIO DA AMANDA */}
      {amandaData.reportStatus === 'sent' && (
        <div className="bg-rose-50 border-2 border-rose-200 p-5 rounded-2xl animate-in fade-in slide-in-from-top-4 shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-rose-800 flex items-center gap-2 text-base">
              <BellRing className="w-5 h-5 animate-wiggle" />
              Relatório da Musa Chegou!
            </h3>
            <span className="text-sm font-black text-rose-500 bg-white px-2 py-1 rounded-lg shadow-sm">{amandaData.score}%</span>
          </div>
          <ul className="text-sm text-rose-700 mt-3 space-y-1 pl-2">
            <li><strong>Refeições:</strong> {Object.values(amandaData.meals).filter(Boolean).length}/4</li>
            <li><strong>Hidratação:</strong> {amandaData.waterCount * 250}ml</li>
            <li><strong>Treino:</strong> {amandaData.workoutDone ? `Sim (${amandaData.workoutType})` : 'Não'}</li>
          </ul>
          <button 
            onClick={() => onAmandaDataChange({...amandaData, reportStatus: 'approved'})}
            className="w-full mt-4 bg-rose-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-rose-600 transition-colors"
          >
            Marcar como visto ✅
          </button>
        </div>
      )}

      {/* Alex Header */}
      <div className="bg-slate-900 rounded-[1.5rem] p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Dumbbell className="w-24 h-24" /></div><div className="relative z-10"><div className="flex justify-between items-start mb-3"><div><h2 className="text-xl font-bold italic">PROJETO SHAPE</h2><p className="text-slate-400 text-[10px] uppercase tracking-widest">Em busca do monstro</p></div><div className="bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10"><span className="font-bold text-emerald-400 text-sm">{score}%</span></div></div><div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{width:`${score}%`}}></div></div></div>
      </div>
      <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100"><div className="flex justify-between items-center mb-3"><h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm"><Dumbbell className="w-4 h-4 text-indigo-600"/>Treino do Dia</h3>{alexWorkoutType&&<span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Pago ✅</span>}</div><div className="grid grid-cols-2 gap-2">{[{id:'push',label:'Push',sub:'Peito/Ombro/Tri'},{id:'pull',label:'Pull',sub:'Costas/Bíceps'},{id:'legs',label:'Legs',sub:'Pernas Completas'},{id:'cardio',label:'Cardio',sub:'Corrida/Abs'}].map(workout=>(<button key={workout.id} onClick={()=>setAlexWorkoutType(alexWorkoutType===workout.id?null:workout.id)} className={`p-3 rounded-xl text-left border transition-all active:scale-95 ${alexWorkoutType===workout.id?'bg-slate-800 border-slate-800 text-white shadow-md':'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}><p className="font-bold text-sm mb-0.5">{workout.label}</p><p className={`text-[9px] ${alexWorkoutType===workout.id?'text-slate-400':'text-slate-400'}`}>{workout.sub}</p></button>))}</div></div>
      <div className="bg-indigo-50 rounded-[1.5rem] p-5 border border-indigo-100"><div className="flex justify-between items-center mb-3"><h3 className="font-bold text-indigo-900 flex items-center gap-2 text-sm"><Beef className="w-4 h-4 text-indigo-600"/>Macros (Proteína)</h3><span className="text-[10px] font-bold text-indigo-400">Meta: {proteinGoal}g</span></div><div className="flex items-end gap-2 mb-3"><span className="text-3xl font-bold text-indigo-900 leading-none">{proteinIntake}</span><span className="text-xs font-medium text-indigo-500 mb-0.5">/ {proteinGoal}g</span></div><div className="w-full h-2 bg-white rounded-full overflow-hidden mb-4 border border-indigo-100"><div className={`h-full rounded-full transition-all ${proteinIntake>=proteinGoal?'bg-green-500':'bg-indigo-500'}`} style={{width:`${Math.min((proteinIntake/proteinGoal)*100,100)}%`}}></div></div><div className="flex gap-2 justify-between"><button onClick={()=>setProteinIntake(Math.max(0,proteinIntake-10))} className="w-10 h-10 flex items-center justify-center bg-white text-indigo-300 rounded-xl active:scale-90 transition-transform"><Minus className="w-4 h-4"/></button><div className="flex gap-2"><button onClick={()=>setProteinIntake(proteinIntake+20)} className="px-3 py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-sm border border-indigo-100 active:scale-95 transition-transform">+20g</button><button onClick={()=>setProteinIntake(proteinIntake+30)} className="px-3 py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow-sm border border-indigo-100 active:scale-95 transition-transform">+30g</button></div></div></div>
      <div className="grid grid-cols-2 gap-3"><div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col justify-between"><div className="flex items-center gap-2 text-blue-500 mb-1"><Droplets className="w-4 h-4"/><span className="font-bold text-xs">Água</span></div><div className="text-center my-1"><span className="text-2xl font-bold text-slate-800">{alexWaterCount}</span><span className="text-[10px] text-slate-400"> / 8 copos</span></div><button onClick={()=>setAlexWaterCount(Math.min(8,alexWaterCount+1))} className="w-full bg-blue-500 text-white py-1.5 rounded-lg font-bold text-xs active:scale-95 transition-transform">+1 Copo</button></div><div className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex flex-col justify-between"><div className="flex items-center gap-2 text-yellow-500 mb-1"><Flame className="w-4 h-4"/><span className="font-bold text-xs">Creatina</span></div><div className="text-center my-1">{supplements.find(s=>s.id==='creatina')?.taken?(<Check className="w-7 h-7 text-green-500 mx-auto"/>):(<span className="text-[10px] text-slate-400 italic">Pendente</span>)}</div><button onClick={()=>toggleSupplement('creatina')} className={`w-full py-1.5 rounded-lg font-bold text-xs active:scale-95 transition-transform ${supplements.find(s=>s.id==='creatina')?.taken?'bg-green-100 text-green-700':'bg-slate-900 text-white'}`}>{supplements.find(s=>s.id==='creatina')?.taken?'Tomado':'Tomar'}</button></div></div>
      <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100"><div className="flex justify-between items-center mb-3"><h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm"><ShoppingBag className="w-4 h-4 text-indigo-500"/>Loja (Love Coins)</h3><span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1"><Sparkles className="w-3 h-3"/>{userPoints}</span></div><div className="space-y-2">{rewards.map(reward=>(<button key={reward.id} disabled={userPoints<reward.cost||reward.redeemed} onClick={()=>handleRedeem(reward.id,reward.cost)} className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all active:scale-[0.98] ${reward.redeemed?'bg-gray-50 opacity-60':'bg-white hover:bg-slate-50'}`}><div className="flex items-center gap-3"><span className="text-lg">{reward.icon}</span><span className="text-xs font-medium text-slate-700 text-left">{reward.title}</span></div><span className="text-xs font-bold text-amber-500">{reward.cost}</span></button>))}</div></div>
    </div>
  );
};

export default FitnessTracker;