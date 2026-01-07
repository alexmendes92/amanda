
import React, { useEffect, useState } from 'react';
import { TrendingUp, Sun, Quote, Plane, AlertCircle } from 'lucide-react';
import { getBitcoinPrice, getDailyQuote } from '../services/externalServices';

// Widget 1: Fundo de Viagem (CoinGecko)
export const FinanceWidget: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const savings = 0.005; // Exemplo: Casal tem 0.005 BTC guardado

  useEffect(() => {
    getBitcoinPrice().then(setBtcPrice);
  }, []);

  const totalValue = btcPrice ? (btcPrice * savings).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'R$ ...';

  return (
    <div className="bg-emerald-900 rounded-3xl p-5 text-emerald-50 relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 p-3 opacity-10">
        <Plane className="w-16 h-16" />
      </div>
      <div className="relative z-10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> Fundo Maldivas
        </h3>
        <p className="text-2xl font-bold text-white">{totalValue}</p>
        <p className="text-[10px] text-emerald-400 mt-1">
          Baseado em {savings} BTC (Cotação atual)
        </p>
      </div>
    </div>
  );
};

// Widget 2: Skincare Alert (UV Index Simulado)
export const SkincareWidget: React.FC = () => {
  // Simulação baseada na hora do dia
  const hour = new Date().getHours();
  const uvIndex = hour > 10 && hour < 16 ? 8 : 2;
  const isHigh = uvIndex > 5;

  return (
    <div className={`rounded-3xl p-5 relative overflow-hidden shadow-sm border ${isHigh ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${isHigh ? 'text-orange-600' : 'text-blue-600'}`}>
            <Sun className="w-3 h-3" /> Índice UV: {uvIndex}
          </h3>
          <p className={`text-sm font-bold leading-tight ${isHigh ? 'text-orange-800' : 'text-blue-800'}`}>
            {isHigh ? 'Passe protetor solar agora!' : 'Pode sair tranquila.'}
          </p>
        </div>
        {isHigh && <AlertCircle className="w-6 h-6 text-orange-500 animate-pulse" />}
      </div>
    </div>
  );
};

// Widget 3: Daily Quote
export const QuoteWidget: React.FC = () => {
  const [quote, setQuote] = useState({ content: 'Carregando...', author: '' });

  useEffect(() => {
    getDailyQuote().then(setQuote);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative">
      <Quote className="w-6 h-6 text-slate-200 absolute top-4 left-4" />
      <div className="pl-6 relative z-10">
        <p className="text-xs text-slate-600 italic font-serif leading-relaxed">
          "{quote.content}"
        </p>
        <p className="text-[10px] text-slate-400 mt-2 text-right font-bold uppercase">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};
