
import React, { useState } from 'react';
import { Crown, Sparkles, CheckCircle2, Gavel } from 'lucide-react';
import { UserRole } from '../types';

interface YouAreRightProps {
  currentUser: UserRole;
}

const YouAreRight: React.FC<YouAreRightProps> = ({ currentUser }) => {
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string>("Clique para consultar o universo...");
  const [animate, setAnimate] = useState(false);

  const affirmations = [
    "Sim, com toda a certeza absoluta!",
    "O Alex está errado (como sempre).",
    "A ciência confirma: Você venceu o argumento.",
    "Sua intuição nunca falha, princesa.",
    "Contra fatos não há argumentos: Ponto para Amanda!",
    "Consultei as estrelas e elas disseram: 'A Amanda sabe'.",
    "Oficialmente declarada a dona da razão.",
    "Lógica impecável. Alex, peça desculpas.",
    "Não é teimosia, é convicção fundamentada.",
    "Estatísticamente, você está certa 110% das vezes.",
    "O júri decidiu a seu favor por unanimidade.",
    "Se você disse, está dito. Lei marcial.",
    "Até o ChatGPT concorda com você nessa."
  ];

  const alexMessages = [
    "Desculpe, sistema exclusivo para quem tem razão (Amanda).",
    "Erro 404: Razão não encontrada para este usuário.",
    "Tentando validar... Falha. A Amanda provavelmente está certa.",
    "Você deve concordar com a Amanda para prosseguir.",
    "Acesse o menu 'Pedir Desculpas' para continuar."
  ];

  const handleConsult = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000); // Animation duration

    if (currentUser === 'alex') {
      const randomMsg = alexMessages[Math.floor(Math.random() * alexMessages.length)];
      setCurrentMessage(randomMsg);
    } else {
      const randomMsg = affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentMessage(randomMsg);
      setClickCount(prev => prev + 1);
    }
  };
  
  const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none z-50">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 rounded-full animate-confetti opacity-0"
          style={{
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100 - 100}%`,
            '--r': `${Math.random() * 360}deg`,
            'animationDelay': `${Math.random() * 0.5}s`,
            background: ['#fecaca', '#fde68a', '#a7f3d0'][i % 3],
          } as React.CSSProperties}
        />
      ))}
    </div>
  );

  return (
    <div className={`h-full flex flex-col items-center justify-between p-4 animate-in fade-in duration-500 relative overflow-hidden bg-gradient-to-b ${
      currentUser === 'amanda' ? 'from-rose-50 to-amber-50' : 'from-slate-100 to-slate-200'
    }`}>
      {/* CSS for Confetti Animation */}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(var(--r)); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 2s ease-out forwards;
          top: var(--y);
          left: var(--x);
        }
      `}</style>

      {animate && currentUser === 'amanda' && <Confetti />}

      {/* Header */}
      <div className="text-center pt-4 z-10">
        <h2 className="text-3xl font-black text-slate-800 leading-tight">
          O Oráculo da <span className="text-rose-500">Verdade</span>
        </h2>
        <p className="text-slate-500 text-sm">O veredito final do universo.</p>
      </div>

      {/* Main Card */}
      <div className="w-full px-2 z-10 flex flex-col items-center">
        <div className={`relative mb-6 p-6 rounded-full transition-all duration-500 transform ${animate && currentUser === 'amanda' ? 'scale-110 bg-white shadow-xl' : 'bg-white/50'}`}>
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${animate && currentUser === 'amanda' ? 'bg-amber-300 animate-ping' : ''}`}></div>
          <Crown className={`relative z-10 w-16 h-16 transition-colors duration-300 ${currentUser === 'amanda' ? 'text-amber-500' : 'text-slate-400'}`} />
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center min-h-[100px] flex items-center justify-center">
          <p className={`text-lg font-bold transition-all duration-300 ${currentUser === 'amanda' ? 'text-rose-600' : 'text-slate-600'}`}>
            "{currentMessage}"
          </p>
        </div>
        
        {currentUser === 'amanda' && clickCount > 0 && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400 bg-white/70 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            Validado {clickCount} vezes hoje
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="w-full px-2 pb-4 z-10">
        <button
          onClick={handleConsult}
          className={`w-full py-5 rounded-2xl font-black text-lg shadow-lg transform transition-all active:scale-95 active:shadow-inner flex items-center justify-center gap-3 ${
             currentUser === 'amanda' 
             ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-rose-200' 
             : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          {currentUser === 'amanda' ? (
            <>
              <Sparkles className={`w-6 h-6 ${animate ? 'animate-spin' : ''}`} />
              CONFIRMAR MINHA RAZÃO
            </>
          ) : (
            <>
              <Gavel className="w-6 h-6" />
              TENTAR A SORTE
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default YouAreRight;