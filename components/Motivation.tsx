
import React, { useState } from 'react';
import { Brain, Disc3, Loader, RefreshCw, ArrowLeft, ScrollText } from 'lucide-react';
import { getMotivationQuote } from '../services/geminiService';

type MotivationType = 'classic' | 'funk';

const Motivation: React.FC = () => {
  const [choice, setChoice] = useState<MotivationType | null>(null);
  const [quote, setQuote] = useState<{ quote: string, author: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFunkQuote, setShowFunkQuote] = useState(false);
  const [key, setKey] = useState(0);

  const handleChoice = async (type: MotivationType) => {
    setChoice(type);
    setLoading(true);
    setQuote(null);
    setShowFunkQuote(false);
    const result = await getMotivationQuote(type);
    setQuote(result);
    setLoading(false);
    setKey(prev => prev + 1);
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

  const Equalizer = () => (
    <div className="flex justify-center items-end gap-1 h-12 w-24">
      <div className="w-2 bg-pink-500 animate-equalizer" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 bg-pink-500 animate-equalizer" style={{ animationDelay: '100ms' }}></div>
      <div className="w-2 bg-pink-500 animate-equalizer" style={{ animationDelay: '200ms' }}></div>
      <div className="w-2 bg-pink-500 animate-equalizer" style={{ animationDelay: '300ms' }}></div>
      <div className="w-2 bg-pink-500 animate-equalizer" style={{ animationDelay: '400ms' }}></div>
    </div>
  );

  if (!choice) {
    return (
      <div className="h-full flex flex-col justify-center items-center p-4 space-y-8 animate-in fade-in duration-700">
        <style>{`
          @keyframes equalizer { 0%, 100% { height: 0.25rem; } 50% { height: 3rem; } }
          .animate-equalizer { animation: equalizer 1.5s ease-in-out infinite; }
        `}</style>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">Fonte da Sabedoria</h2>
          <p className="text-slate-500 mt-1">De quem você quer o conselho hoje?</p>
        </div>
        <div className="w-full max-w-sm grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => handleChoice('classic')} className="group p-6 rounded-3xl bg-slate-100 border-2 border-slate-200 text-slate-800 text-left space-y-12 hover:border-slate-400 hover:bg-white transition-all duration-300"><div className="bg-white p-4 rounded-full w-fit shadow-md group-hover:scale-110 transition-transform"><ScrollText className="w-8 h-8 text-slate-600" /></div><div><h3 className="font-bold text-lg">Sábios Clássicos</h3><p className="text-xs text-slate-500">Sêneca, Platão, Aristóteles</p></div></button>
          <button onClick={() => handleChoice('funk')} className="group p-6 rounded-3xl bg-slate-900 border-2 border-slate-700 text-white text-left space-y-12 hover:border-pink-500 transition-all duration-300"><div className="bg-slate-800 p-4 rounded-full w-fit shadow-lg group-hover:scale-110 transition-transform"><Disc3 className="w-8 h-8 text-pink-500" /></div><div><h3 className="font-bold text-lg">Sábios Contemporâneos</h3><p className="text-xs text-slate-400">A visão dos poetas da rua</p></div></button>
        </div>
      </div>
    );
  }

  // Classic View
  if (choice === 'classic') {
    return (
      <div key={key} className="h-full flex flex-col justify-between p-6 bg-slate-50">
        <div><button onClick={handleReset} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800"><ArrowLeft className="w-4 h-4" /> Mudar de Fonte</button></div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          {loading ? <div className="animate-spin text-slate-400"><Loader className="w-12 h-12" /></div> : quote && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="font-serif text-3xl md:text-4xl text-slate-700 italic leading-tight">"{quote.quote}"</p>
              <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">— {quote.author}</p>
            </div>
          )}
        </div>
        <div><button onClick={handleRefresh} disabled={loading} className="w-full max-w-sm mx-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 bg-slate-800 text-white"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />{loading ? 'Pensando...' : 'Pedir Outro Conselho'}</button></div>
      </div>
    );
  }

  // Funk View
  if (choice === 'funk') {
    return (
      <div key={key} className="h-full flex flex-col justify-between p-6 bg-black">
        <div><button onClick={handleReset} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"><ArrowLeft className="w-4 h-4" /> Mudar de Fonte</button></div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          {loading ? <div className="animate-spin text-pink-500"><Loader className="w-12 h-12" /></div> : quote && !showFunkQuote && (
            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-90 duration-500">
              <div className="relative w-48 h-48 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-pink-500/50 border-2 border-pink-500 animate-ping absolute"></div>
                <div className="w-16 h-16 rounded-full bg-pink-600 border-4 border-slate-800 shadow-lg flex items-center justify-center">
                   <Disc3 className="w-8 h-8 text-white" />
                </div>
              </div>
              <button onClick={() => setShowFunkQuote(true)} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95 transition-transform">
                Solta o Beat
              </button>
            </div>
          )}
          {quote && showFunkQuote && (
            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-105 duration-500">
              <p className="font-sans text-3xl md:text-4xl text-white font-black uppercase" style={{ textShadow: '0 0 15px rgba(236, 72, 153, 0.7)' }}>"{quote.quote}"</p>
              <p className="text-sm font-bold text-pink-500 uppercase tracking-widest">— {quote.author}</p>
              <Equalizer />
            </div>
          )}
        </div>
        <div><button onClick={handleRefresh} disabled={loading} className="w-full max-w-sm mx-auto py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 bg-pink-500 text-white"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />{loading ? 'Buscando a braba...' : 'Manda Outra Visão'}</button></div>
      </div>
    );
  }

  return null;
};

export default Motivation;
