
import React, { useState } from 'react';
import { Crown, Sparkles, CheckCircle2, Gavel, PartyPopper, ThumbsUp, Star, Heart } from 'lucide-react';
import { UserRole } from '../types';

interface YouAreRightProps {
  currentUser: UserRole;
}

const YouAreRight: React.FC<YouAreRightProps> = ({ currentUser }) => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string>("Clique para consultar o universo...");
  const [animate, setAnimate] = useState(false);

  // Mensagens exclusivas para a Amanda
  const affirmations = [
    "Sim, com toda a certeza absoluta!",
    "O Alex está errado (como sempre).",
    "A ciência confirma: Você venceu o argumento.",
    "Sua intuição nunca falha, princesa.",
    "Contra fatos não há argumentos: Ponto para Amanda!",
    "Eu consultei as estrelas e elas disseram: 'A Amanda sabe'.",
    "Oficialmente declarada a dona da razão.",
    "Lógica impecável. Alex, peça desculpas.",
    "Não é teimosia, é convicção fundamentada.",
    "Estatísticamente, você está certa 110% das vezes.",
    "O júri decidiu a seu favor por unanimidade.",
    "Se você disse, está dito. Lei marcial.",
    "Até o ChatGPT concorda com você nessa."
  ];

  // Mensagens "Troll" caso o Alex tente usar
  const alexMessages = [
    "Desculpe, sistema exclusivo para quem tem razão (Amanda).",
    "Erro 404: Razão não encontrada para este usuário.",
    "Tentando validar... Falha. A Amanda provavelmente está certa.",
    "Você deve concordar com a Amanda para prosseguir.",
    "Acesse o menu 'Pedir Desculpas' para continuar."
  ];

  const handleConsult = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); // Reset animation

    if (currentUser === 'alex') {
      const randomMsg = alexMessages[Math.floor(Math.random() * alexMessages.length)];
      setCurrentMessage(randomMsg);
    } else {
      const randomMsg = affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentMessage(randomMsg);
      setClickCount(prev => prev + 1);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between pb-20 animate-in fade-in duration-500 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
         {animate && currentUser === 'amanda' && (
           <>
             <div className="absolute top-1/4 left-1/4 animate-bounce text-yellow-400"><Star className="w-6 h-6" /></div>
             <div className="absolute top-1/3 right-1/4 animate-bounce delay-100 text-pink-400"><Heart className="w-6 h-6" /></div>
             <div className="absolute bottom-1/3 left-1/2 animate-bounce delay-200 text-purple-400"><PartyPopper className="w-6 h-6" /></div>
           </>
         )}
      </div>

      {/* Header */}
      <div className="text-center pt-4 z-10">
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-200 shadow-sm mb-4">
          <Crown className="w-5 h-5 text-yellow-600 fill-yellow-600" />
          <span className="text-xs font-bold text-yellow-800 uppercase tracking-widest">Oráculo da Verdade</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 leading-tight">
          Quem tem razão<br /><span className="text-pink-500">hoje?</span>
        </h2>
      </div>

      {/* Main Card */}
      <div className="w-full px-6 z-10">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 text-center relative overflow-hidden min-h-[300px] flex flex-col justify-center items-center">
          
          {/* Confetti Background in Card */}
          {animate && currentUser === 'amanda' && (
             <div className="absolute inset-0 bg-pink-50/50 transition-colors duration-300"></div>
          )}

          <div className={`mb-6 p-6 rounded-full transition-all duration-300 transform ${animate ? 'scale-110 bg-pink-100' : 'bg-slate-50'}`}>
            {currentUser === 'amanda' ? (
              <Crown className={`w-16 h-16 ${animate ? 'text-pink-500' : 'text-slate-300'}`} />
            ) : (
              <Gavel className="w-16 h-16 text-slate-400" />
            )}
          </div>

          <p className={`text-xl font-bold transition-all duration-300 ${animate ? 'scale-105 text-pink-600' : 'text-slate-600'}`}>
            "{currentMessage}"
          </p>

          {currentUser === 'amanda' && clickCount > 0 && (
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Validado {clickCount} vezes hoje
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full px-6 z-10">
        <button
          onClick={handleConsult}
          className={`w-full py-5 rounded-2xl font-black text-lg shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-3 ${
             currentUser === 'amanda' 
             ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200 hover:shadow-pink-300' 
             : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          {currentUser === 'amanda' ? (
            <>
              <Sparkles className={`w-6 h-6 ${animate ? 'animate-spin' : ''}`} />
              CONSULTAR UNIVERSO
            </>
          ) : (
            <>
              <Gavel className="w-6 h-6" />
              TENTAR A SORTE
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
          Certificado de Autenticidade Garantido
        </p>
      </div>
    </div>
  );
};

export default YouAreRight;
