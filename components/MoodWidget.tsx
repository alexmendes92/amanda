import React, { useState } from 'react';
import { CloudLightning, Sun, Heart, Zap, Coffee, Frown, AlertTriangle } from 'lucide-react';
import { UserRole } from '../types';

interface MoodOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string; // Tailwind class for text/bg
  bgGradient: string;
}

interface MoodWidgetProps {
  currentUser: UserRole;
}

const MoodWidget: React.FC<MoodWidgetProps> = ({ currentUser }) => {
  // Configurações de Humor para cada um
  const alexMoods: MoodOption[] = [
    { 
      id: 'stressed', 
      label: 'Estressado', 
      icon: <CloudLightning className="w-5 h-5" />, 
      color: 'text-red-600',
      bgGradient: 'from-red-50 to-red-100 border-red-200'
    },
    { 
      id: 'calm', 
      label: 'Tranquilo', 
      icon: <Coffee className="w-5 h-5" />, 
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 border-blue-200'
    },
    { 
      id: 'missing', 
      label: 'Com Saudade', 
      icon: <Heart className="w-5 h-5" />, 
      color: 'text-rose-600',
      bgGradient: 'from-rose-50 to-rose-100 border-rose-200'
    }
  ];

  const amandaMoods: MoodOption[] = [
    { 
      id: 'tpm', 
      label: 'TPM (Cuidado)', 
      icon: <Zap className="w-5 h-5" />, 
      color: 'text-purple-700',
      bgGradient: 'from-purple-50 to-purple-100 border-purple-300'
    },
    { 
      id: 'happy', 
      label: 'Feliz', 
      icon: <Sun className="w-5 h-5" />, 
      color: 'text-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100 border-yellow-200'
    },
    { 
      id: 'needy', 
      label: 'Carente', 
      icon: <Frown className="w-5 h-5" />, 
      color: 'text-pink-600',
      bgGradient: 'from-pink-50 to-pink-100 border-pink-200'
    }
  ];

  // State para o humor do usuário atual
  const [myMood, setMyMood] = useState<string | null>(null);

  // Simulando o humor do parceiro (normalmente viria do backend)
  // Se sou Alex, vejo o humor da Amanda. Se sou Amanda, vejo o do Alex.
  const partnerName = currentUser === 'alex' ? 'Amanda' : 'Alex';
  
  // Simulação: Amanda está 'Feliz', Alex está 'Estressado'
  const partnerSimulatedMoodId = currentUser === 'alex' ? 'happy' : 'stressed'; 
  const partnerOptions = currentUser === 'alex' ? amandaMoods : alexMoods;
  const partnerCurrentMood = partnerOptions.find(m => m.id === partnerSimulatedMoodId);

  const myOptions = currentUser === 'alex' ? alexMoods : amandaMoods;

  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
        <Heart className="w-3 h-3" />
        Clima Emocional
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lado Esquerdo: Como EU estou */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-sm font-bold text-slate-700 mb-3">Como você está agora?</p>
          <div className="space-y-2">
            {myOptions.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setMyMood(mood.id)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl border transition-all duration-300 ${
                  myMood === mood.id 
                    ? `bg-gradient-to-r ${mood.bgGradient} border-transparent shadow-sm scale-[1.02]` 
                    : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className={`${mood.color} ${myMood === mood.id ? 'scale-110' : ''} transition-transform`}>
                  {mood.icon}
                </div>
                <span className={`text-sm font-medium ${myMood === mood.id ? 'text-slate-800' : ''}`}>
                  {mood.label}
                </span>
                {myMood === mood.id && <div className="ml-auto w-2 h-2 rounded-full bg-slate-400 animate-pulse"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* Lado Direito: Como O PARCEIRO está */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-center relative overflow-hidden">
           {/* Background Decorative */}
           <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12">
             {partnerCurrentMood?.icon}
           </div>

           <p className="text-xs font-bold text-slate-400 uppercase mb-2">Status d{currentUser === 'alex' ? 'ela' : 'ele'}</p>
           
           <div className="flex items-center gap-4 mt-1">
             <div className={`p-4 rounded-full bg-white shadow-sm border border-slate-100 ${partnerCurrentMood?.color}`}>
                {/* Ícone grande */}
                {partnerCurrentMood?.icon && React.cloneElement(partnerCurrentMood.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
             </div>
             
             <div>
               <p className="text-lg font-bold text-slate-800 leading-tight">
                 {partnerCurrentMood?.label}
               </p>
               <p className="text-xs text-slate-500 mt-1">
                 Atualizado há 10 min
               </p>
             </div>
           </div>

           {/* Dica de Contexto baseada no humor do parceiro */}
           <div className="mt-4 bg-white/60 p-2 rounded-lg text-[10px] text-slate-600 border border-slate-100 italic">
              {partnerCurrentMood?.id === 'tpm' && "⚠️ Dica: Chocolate e paciência. Não pergunte se ela está brava."}
              {partnerCurrentMood?.id === 'stressed' && "💆‍♂️ Dica: Pergunte se ele quer desabafar ou só jogar videogame."}
              {partnerCurrentMood?.id === 'happy' && "✨ Dica: Momento perfeito para propor aquele passeio!"}
              {partnerCurrentMood?.id === 'calm' && "🍃 Dica: Tudo em paz. Aproveite a leveza."}
              {partnerCurrentMood?.id === 'missing' && "💌 Dica: Mande uma foto sua agora mesmo!"}
              {partnerCurrentMood?.id === 'needy' && "🧸 Dica: Muita atenção e carinho hoje."}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MoodWidget;