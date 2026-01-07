
import React, { useState } from 'react';
import { Brain, Disc3, Loader, RefreshCw, ArrowLeft, ScrollText } from 'lucide-react';
import { getMotivationQuote } from '../services/geminiService';

type MotivationType = 'classic' | 'funk';

const Motivation: React.FC = () => {
  const [choice, setChoice] = useState<MotivationType | null>(null);
  const [quote, setQuote] = useState<{ quote: string, author: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0); // Para re-trigger da animação

  const handleChoice = async (type: MotivationType) => {
    setChoice(type);
    setLoading(true);
    setQuote(null); // Limpa a citação anterior
    const result = await getMotivationQuote(type);
    setQuote(result);
    setLoading(false);
    setKey(prev => prev + 1); // Muda a key para forçar re-render e re-animação
  };

  const handleReset = () => {
    setChoice(null);
    setQuote(null);
  };

  const handleRefresh = () => {
    if (choice) {
      handleChoice(choice);
    }
  };

  if (!choice) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-4 space-y-8 animate-in fade-in duration-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Fonte da Sabedoria</h2>
          <p className="text-slate-500 mt-1">De quem você quer o conselho hoje?</p>
        </div>
        <div className="w-full max-w-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Classic Choice */}
          <button
            onClick={() => handleChoice('classic')}
            className="group p-6 rounded-3xl bg-slate-100 border-2 border-slate-200 text-slate-800 text-left space-y-12 hover:border-slate-400 hover:bg-white transition-all duration-300"
          >
            <div className="bg-white p-4 rounded-full w-fit shadow-md group-hover:scale-110 transition-transform">
              <ScrollText className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Sábios Clássicos</h3>
              <p className="text-xs text-slate-500">Sêneca, Platão, Aristóteles</p>
            </div>
          </button>
          
          {/* Funk Choice */}
          <button
            onClick={() => handleChoice('funk')}
            className="group p-6 rounded-3xl bg-slate-900 border-2 border-slate-700 text-white text-left space-y-12 hover:border-pink-500 transition-all duration-300"
          >
            <div className="bg-slate-800 p-4 rounded-full w-fit shadow-lg group-hover:scale-110 transition-transform">
              <Disc3 className="w-8 h-8 text-pink-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Poetas da Pista</h3>
              <p className="text-xs text-slate-400">MC Hariel, MC Ryan SP, Kayblack</p>
            </div>
          </button>

        </div>
      </div>
    );
  }

  // Loading or Result View
  return (
    <div key={key} className={`h-full flex flex-col justify-between p-6 transition-colors duration-500 ${
      choice === 'classic' ? 'bg-slate-50' : 'bg-black'
    }`}>
      {/* Back Button */}
      <div>
        <button onClick={handleReset} className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          choice === 'classic' ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-white'
        }`}>
          <ArrowLeft className="w-4 h-4" />
          Mudar de Fonte
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        {loading && (
           <div className={`animate-spin ${choice === 'classic' ? 'text-slate-400' : 'text-pink-500'}`}>
             <Loader className="w-12 h-12" />
           </div>
        )}
        {quote && (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            {choice === 'classic' ? (
              <>
                <p className="font-serif text-3xl md:text-4xl text-slate-700 italic leading-tight">
                  "{quote.quote}"
                </p>
                <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  — {quote.author}
                </p>
              </>
            ) : (
              <>
                <p className="font-sans text-3xl md:text-4xl text-white font-black uppercase" style={{ textShadow: '0 0 15px rgba(236, 72, 153, 0.7)' }}>
                  "{quote.quote}"
                </p>
                <p className="mt-6 text-sm font-bold text-pink-500 uppercase tracking-widest">
                  — {quote.author}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className={`w-full max-w-sm mx-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 ${
            choice === 'classic' 
            ? 'bg-slate-800 text-white' 
            : 'bg-pink-500 text-white'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Pensando...' : 'Pedir Outro Conselho'}
        </button>
      </div>
    </div>
  );
};

export default Motivation;
