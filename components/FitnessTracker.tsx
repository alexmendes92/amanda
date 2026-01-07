import React, { useState } from 'react';
import { Plus, Minus, Check, Lock, Camera, Utensils, Droplets, Trophy, Edit2, AlertCircle } from 'lucide-react';
import { PhotoPost, UserRole } from '../types';

interface FitnessTrackerProps {
  currentUser: UserRole;
}

const FitnessTracker: React.FC<FitnessTrackerProps> = ({ currentUser }) => {
  // --- States ---
  const [peachClicked, setPeachClicked] = useState(false);
  const [peachMessage, setPeachMessage] = useState("Bumbum na nuca vindo aí! 🔥");
  const [isEditingPeach, setIsEditingPeach] = useState(false);

  const [waterCount, setWaterCount] = useState(0); // Default to 0 for reminder logic
  const [meals, setMeals] = useState({
    cafe: true,
    almoco: true,
    lanche: false,
    jantar: false
  });
  const [shapePhotos, setShapePhotos] = useState<PhotoPost[]>([
    { id: 's1', url: 'https://picsum.photos/400/600?grayscale', caption: 'Evolução Costas', likes: 1, likedByPartner: true, createdAt: '1 semana atrás' }
  ]);

  // --- Handlers ---

  const handlePeachClick = () => {
    setPeachClicked(true);
    // Reset animation after a few seconds
    setTimeout(() => setPeachClicked(false), 3000);
  };

  const toggleMeal = (meal: keyof typeof meals) => {
    setMeals(prev => ({ ...prev, [meal]: !prev[meal] }));
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

  // Water reminder logic
  // If current hour is >= 13 (1 PM) and water count is 0
  const hour = new Date().getHours();
  const showWaterReminder = hour >= 13 && waterCount === 0;

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 text-center">
        <h2 className="text-2xl font-bold text-rose-900 flex justify-center items-center gap-2">
          <Trophy className="w-6 h-6 text-rose-500" />
          Projeto Musa
        </h2>
        <p className="text-rose-700 text-xs uppercase tracking-widest mt-1">Saúde & Autoestima</p>
      </div>

      {/* 🍑 Desafio do Pêssego */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="p-6 text-center">
          <h3 className="font-bold text-slate-800 mb-4">Treino de Glúteo (Leg Day)</h3>
          
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
            {/* Custom Message */}
            <p className="text-orange-600 font-bold text-lg">"{peachMessage}"</p>
            {/* Secondary Message */}
            <p className="text-orange-500/80 text-sm font-medium mt-1">
              Continue firme! Seus glúteos estão ficando mais fortes!
            </p>
            <p className="text-slate-400 text-xs mt-2">O Alex tá orgulhoso da disciplina!</p>
          </div>

          {/* Edit Interface for Alex (Only visible when not animating) */}
          {currentUser === 'alex' && !peachClicked && (
            <div className="mt-6 border-t border-slate-100 pt-4">
               {isEditingPeach ? (
                 <div className="flex gap-2 items-center">
                   <input 
                     type="text" 
                     value={peachMessage}
                     onChange={(e) => setPeachMessage(e.target.value)}
                     className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-200 outline-none"
                     placeholder="Sua mensagem de incentivo..."
                   />
                   <button 
                    onClick={() => setIsEditingPeach(false)} 
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600"
                   >
                     OK
                   </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => setIsEditingPeach(true)}
                   className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-orange-500 mx-auto transition-colors"
                 >
                   <Edit2 className="w-3 h-3" />
                   Editar mensagem de incentivo
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
        <p className="text-xs text-slate-500 mb-4">Sem contar calorias, só comer limpo.</p>
        
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

      {/* 💧 Hidratação */}
      <div className={`rounded-3xl p-6 border transition-all duration-500 ${showWaterReminder ? 'bg-amber-50 border-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.15)]' : 'bg-blue-50/50 border-blue-100'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Droplets className={`w-5 h-5 ${showWaterReminder ? 'text-amber-500' : 'text-blue-500'}`} />
            <h3 className={`font-bold ${showWaterReminder ? 'text-amber-900' : 'text-blue-900'}`}>Hidratação do Amor</h3>
          </div>
          <span className={`text-2xl font-bold ${showWaterReminder ? 'text-amber-600' : 'text-blue-600'}`}>{waterCount * 250}ml</span>
        </div>
        
        {showWaterReminder && (
          <div className="mb-4 bg-white/60 p-3 rounded-xl flex items-center gap-2 text-amber-700 text-xs font-bold animate-pulse border border-amber-100">
             <AlertCircle className="w-4 h-4" />
             Ei, já passou da hora de beber água! Hidrate-se!
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
                     ? (showWaterReminder ? 'bg-amber-400 scale-100 opacity-100 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-blue-400 scale-100 opacity-100 shadow-[0_0_8px_rgba(59,130,246,0.5)]')
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
        <p className={`text-center text-xs mt-3 ${showWaterReminder ? 'text-amber-400' : 'text-blue-400'}`}>Meta: 8 copos (2 Litros)</p>
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
               <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                 <p className="text-[10px] text-white/90">{photo.createdAt}</p>
               </div>
             </div>
          ))}
          {/* Placeholder for empty state visual */}
          {shapePhotos.length === 0 && (
            <div className="col-span-2 py-8 text-center border-2 border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-500 text-sm">Nenhuma foto ainda.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default FitnessTracker;
