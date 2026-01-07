import React, { useState } from 'react';
import { Plus, Minus, Check, Lock, Camera, Utensils, Droplets, Trophy, Edit2, AlertCircle, Sparkles, Send, ThumbsUp, Heart } from 'lucide-react';
import { PhotoPost, UserRole } from '../types';

interface FitnessTrackerProps {
  currentUser: UserRole;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ currentUser }) => {
  // --- States ---
  const [peachClicked, setPeachClicked] = useState(false);
  const [workoutDone, setWorkoutDone] = useState(false); // New explicit workout toggle
  const [peachMessage, setPeachMessage] = useState("Bumbum na nuca vindo aí! 🔥");
  const [isEditingPeach, setIsEditingPeach] = useState(false);

  const [waterCount, setWaterCount] = useState(0); 
  const [meals, setMeals] = useState({
    cafe: true,
    almoco: true,
    lanche: false,
    jantar: false
  });
  
  const [supplements, setSupplements] = useState([
    { id: 'creatina', name: 'Creatina', icon: '⚡', subtitle: 'Todo dia sem falhar', taken: false },
    { id: 'whey', name: 'Whey Protein', icon: '🥛', subtitle: 'Pós-treino', taken: false },
    { id: 'omega3', name: 'Ômega 3', icon: '🐟', subtitle: 'Almoço', taken: false },
    { id: 'multi', name: 'Multivitamínico', icon: '💊', subtitle: 'Pela manhã', taken: false },
    { id: 'colageno', name: 'Colágeno', icon: '✨', subtitle: 'Antes de dormir', taken: false },
  ]);

  const [shapePhotos, setShapePhotos] = useState<PhotoPost[]>([
    { id: 's1', url: 'https://picsum.photos/400/600?grayscale', caption: 'Evolução Costas', likes: 1, likedByPartner: true, createdAt: '1 semana atrás' }
  ]);

  // Status do Relatório: 'idle' (não enviado), 'sent' (amanda enviou), 'approved' (alex validou)
  const [reportStatus, setReportStatus] = useState<'idle' | 'sent' | 'approved'>('idle');

  // --- Calculations ---
  const countMeals = Object.values(meals).filter(Boolean).length;
  const totalMeals = 4;
  
  const countSupplements = supplements.filter(s => s.taken).length;
  const totalSupplements = supplements.length;
  
  const waterGoal = 8;
  const waterProgress = Math.min(waterCount, waterGoal);
  
  // Score Logic (0 to 100)
  // Pesos: Treino (30%), Dieta (30%), Água (20%), Suplementos (20%)
  const score = Math.round(
    ((workoutDone ? 1 : 0) * 30) +
    ((countMeals / totalMeals) * 30) +
    ((waterProgress / waterGoal) * 20) +
    ((countSupplements / totalSupplements) * 20)
  );

  // --- Handlers ---

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
    // Here you would trigger an API call to notify Alex
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApproveReport = () => {
    setReportStatus('approved');
  };

  // Water reminder logic
  const hour = new Date().getHours();
  const showWaterReminder = hour >= 13 && waterCount === 0;
  const allSuppsTaken = supplements.every(s => s.taken);

  return (
    <div className="space-y-8 pb-24">
      
      {/* --- DASHBOARD DE PRESTAÇÃO DE CONTAS (Topo) --- */}
      
      {/* Visão do Alex: Painel de Aprovação */}
      {currentUser === 'alex' && (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Relatório da Musa
            </h2>

            <div className="flex items-end gap-2 mb-6">
              <span className="text-5xl font-bold">{score}%</span>
              <span className="text-sm text-slate-300 mb-2">de dedicação hoje</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-slate-400 text-xs">Treino</p>
                <p className="font-bold">{workoutDone ? 'Pago ✅' : 'Pendente ⏳'}</p>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-slate-400 text-xs">Dieta</p>
                <p className="font-bold">{countMeals}/{totalMeals} Refs</p>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-slate-400 text-xs">Água</p>
                <p className="font-bold">{waterCount}/{waterGoal} Copos</p>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <p className="text-slate-400 text-xs">Suplementos</p>
                <p className="font-bold">{countSupplements}/{totalSupplements} OK</p>
              </div>
            </div>

            {reportStatus === 'approved' ? (
              <div className="bg-green-500/20 border border-green-500/50 p-3 rounded-xl flex items-center gap-2 text-green-200">
                <Check className="w-5 h-5" />
                <span>Você validou o dia dela! ❤️</span>
              </div>
            ) : (
              <button 
                onClick={handleApproveReport}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ThumbsUp className="w-5 h-5" />
                Validar e Mandar Parabéns
              </button>
            )}
          </div>
        </div>
      )}

      {/* Visão da Amanda: Header Simples */}
      {currentUser === 'amanda' && (
        <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 text-center relative">
           {/* Barra de Progresso Circular ou Linear Discreta */}
           <div className="absolute top-0 left-0 h-1 bg-rose-200 w-full rounded-t-2xl overflow-hidden">
              <div className="h-full bg-rose-500 transition-all duration-1000" style={{ width: `${score}%` }}></div>
           </div>
           
           <h2 className="text-2xl font-bold text-rose-900 flex justify-center items-center gap-2 mt-2">
            Projeto Musa
          </h2>
          <p className="text-rose-600 text-xs font-medium mt-1">
            {score}% concluído hoje. Vamos buscar o 100%!
          </p>
          {reportStatus === 'approved' && (
             <div className="mt-3 bg-white p-2 rounded-lg shadow-sm flex items-center justify-center gap-2 animate-bounce">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-xs font-bold text-rose-800">O Alex viu e amou seu esforço!</span>
             </div>
          )}
        </div>
      )}

      {/* 🍑 Treino */}
      <div className={`bg-white rounded-3xl shadow-sm border transition-all ${workoutDone ? 'border-green-200 bg-green-50/30' : 'border-slate-100'}`}>
        <div className="p-6 text-center">
          <div className="flex justify-between items-start mb-2">
             <h3 className="font-bold text-slate-800">Treino do Dia</h3>
             <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">Já treinou?</span>
                <input 
                  type="checkbox" 
                  checked={workoutDone} 
                  onChange={(e) => setWorkoutDone(e.target.checked)}
                  className="w-5 h-5 accent-green-500 rounded cursor-pointer"
                />
             </label>
          </div>
          
          <div className="relative overflow-hidden py-4">
            <button
              onClick={handlePeachClick}
              className={`group relative inline-flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
                peachClicked 
                  ? 'bg-orange-100 scale-110 shadow-[0_0_30px_rgba(251,146,60,0.6)]' 
                  : 'bg-slate-50 hover:bg-orange-50'
              }`}
            >
              <span className={`text-5xl transition-transform duration-500 ${peachClicked ? 'animate-bounce' : 'grayscale group-hover:grayscale-0'}`}>
                🍑
              </span>
            </button>

            <div className={`mt-4 transition-all duration-500 ${peachClicked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-orange-600 font-bold text-lg">"{peachMessage}"</p>
              <p className="text-slate-400 text-xs mt-2">Continue firme, amor!</p>
            </div>
          </div>

          {/* Edit Interface for Alex */}
          {currentUser === 'alex' && !peachClicked && (
            <div className="mt-2 border-t border-slate-100 pt-4">
               {isEditingPeach ? (
                 <div className="flex gap-2 items-center">
                   <input 
                     type="text" 
                     value={peachMessage}
                     onChange={(e) => setPeachMessage(e.target.value)}
                     className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-200 outline-none"
                     placeholder="Sua mensagem..."
                   />
                   <button onClick={() => setIsEditingPeach(false)} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">OK</button>
                 </div>
               ) : (
                 <button onClick={() => setIsEditingPeach(true)} className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-orange-500 mx-auto">
                   <Edit2 className="w-3 h-3" /> Editar incentivo
                 </button>
               )}
            </div>
          )}
        </div>
      </div>

      {/* 🥗 Check-in das Marmitas */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-slate-800">Check-in das Marmitas</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'cafe', label: 'Café da Manhã' },
            { key: 'almoco', label: 'Almoço' },
            { key: 'lanche', label: 'Lanche Tarde' },
            { key: 'jantar', label: 'Jantar' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggleMeal(item.key as keyof typeof meals)}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                meals[item.key as keyof typeof meals]
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-white border-slate-100 text-slate-400 hover:border-green-200'
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              {meals[item.key as keyof typeof meals] && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* 💊 Farmacinha */}
      <div className={`rounded-3xl p-6 border transition-all duration-500 ${allSuppsTaken ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-100 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-5 h-5 ${allSuppsTaken ? 'text-purple-500' : 'text-slate-400'}`} />
            <h3 className={`font-bold ${allSuppsTaken ? 'text-purple-900' : 'text-slate-800'}`}>Farmacinha</h3>
          </div>
          {allSuppsTaken && <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full animate-pulse">Completo! ✨</span>}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {supplements.map(s => (
            <button
              key={s.id}
              onClick={() => toggleSupplement(s.id)}
              className={`relative p-3 rounded-2xl border flex items-center gap-3 transition-all overflow-hidden text-left ${
                s.taken 
                ? 'bg-purple-500 border-purple-500 text-white shadow-md shadow-purple-200 scale-[1.02]' 
                : 'bg-white border-slate-100 hover:border-purple-200 text-slate-600 hover:bg-purple-50/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm transition-colors ${s.taken ? 'bg-white/20' : 'bg-slate-50'}`}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`block text-sm font-bold leading-tight truncate ${s.taken ? 'text-white' : 'text-slate-700'}`}>{s.name}</span>
                <span className={`text-[10px] truncate ${s.taken ? 'text-purple-100' : 'text-slate-400'}`}>{s.subtitle}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 💧 Hidratação */}
      <div className={`rounded-3xl p-6 border transition-all duration-500 ${showWaterReminder ? 'bg-amber-50 border-amber-200 shadow-md' : 'bg-blue-50/50 border-blue-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Droplets className={`w-5 h-5 ${showWaterReminder ? 'text-amber-500' : 'text-blue-500'}`} />
            <h3 className={`font-bold ${showWaterReminder ? 'text-amber-900' : 'text-blue-900'}`}>Hidratação</h3>
          </div>
          <span className={`text-2xl font-bold ${showWaterReminder ? 'text-amber-600' : 'text-blue-600'}`}>{waterCount * 250}ml</span>
        </div>
        
        {showWaterReminder && (
          <div className="mb-4 bg-white/60 p-3 rounded-xl flex items-center gap-2 text-amber-700 text-xs font-bold animate-pulse border border-amber-100">
             <AlertCircle className="w-4 h-4" />
             Hora de beber água, amor!
          </div>
        )}
        
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => setWaterCount(Math.max(0, waterCount - 1))}
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform ${showWaterReminder ? 'text-amber-400' : 'text-blue-400'}`}
          >
            <Minus className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1">
             {Array.from({ length: 8 }).map((_, i) => (
               <div 
                 key={i} 
                 className={`w-3 h-8 rounded-full transition-all duration-500 ${
                   i < waterCount 
                     ? (showWaterReminder ? 'bg-amber-400 scale-100 opacity-100' : 'bg-blue-400 scale-100 opacity-100')
                     : (showWaterReminder ? 'bg-amber-200/30 scale-90 opacity-50' : 'bg-blue-200/30 scale-90 opacity-50')
                 }`}
               />
             ))}
          </div>

          <button 
            onClick={() => setWaterCount(Math.min(8, waterCount + 1))}
            className={`w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform hover:scale-105 ${showWaterReminder ? 'bg-amber-500 shadow-amber-200' : 'bg-blue-500 shadow-blue-200'}`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 🔒 Galeria do Shape */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold flex items-center gap-2 text-lg">
              Galeria do Shape
              <Lock className="w-4 h-4 text-slate-500" />
            </h3>
            <p className="text-slate-400 text-xs mt-1">Fotos privadas de evolução</p>
          </div>
          {currentUser === 'amanda' && (
            <label className="bg-slate-800 p-2 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
              <Camera className="w-5 h-5 text-rose-400" />
              <input type="file" className="hidden" accept="image/*" onChange={handleUploadShape} />
            </label>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {shapePhotos.map(photo => (
             <div key={photo.id} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-800">
               <img src={photo.url} alt="Shape" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          ))}
          {shapePhotos.length === 0 && (
            <div className="col-span-2 py-8 text-center border-2 border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-500 text-sm">Nenhuma foto ainda.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- AÇÃO FINAL: PRESTAR CONTAS (Visível só para Amanda no fim da tela) --- */}
      {currentUser === 'amanda' && (
        <div className="fixed bottom-24 left-6 right-6 z-30">
          {reportStatus === 'sent' ? (
             <div className="bg-green-600 text-white p-4 rounded-2xl shadow-xl shadow-green-200 animate-in slide-in-from-bottom-5 flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span className="font-bold">Relatório enviado para o Benzin!</span>
             </div>
          ) : reportStatus === 'approved' ? null : (
            <button 
              onClick={handleSendReport}
              className="w-full bg-slate-900 text-white p-4 rounded-2xl shadow-xl shadow-slate-300 flex items-center justify-between group hover:scale-[1.02] transition-transform"
            >
              <div className="text-left">
                <p className="text-xs text-slate-400 font-medium">Finalizar Dia</p>
                <p className="font-bold text-lg">Prestar Contas 📝</p>
              </div>
              <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                 <Send className="w-6 h-6 text-rose-300" />
              </div>
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default FitnessTracker;
