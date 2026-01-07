
import React, { useState } from 'react';
import { Ticket, Heart, Clock } from 'lucide-react';
import { Coupon } from '../types';

const LoveBank: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', title: 'Massagem Relaxante', description: '30 min de massagem sem reclamar', emoji: '💆‍♀️', quantity: 2 },
    { id: '2', title: 'Jantar sem Celular', description: 'Foco total em nós dois', emoji: '📵', quantity: 1 },
    { id: '3', title: 'Vale Cinema', description: 'Escolha do filme é sua', emoji: '🎬', quantity: 3 },
    { id: '4', title: 'Café na Cama', description: 'Serviço de quarto premium', emoji: '☕', quantity: 1 },
  ]);

  const useCoupon = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id && c.quantity > 0 ? { ...c, quantity: c.quantity - 1 } : c));
    alert("Cupom resgatado! Tire um print e mande pro Alex.");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right">
       <div className="bg-rose-50 p-6 rounded-3xl text-center border border-rose-100">
         <h2 className="text-2xl font-bold text-rose-600 mb-1">Banco do Amor</h2>
         <p className="text-rose-400 text-xs">Seus cupons disponíveis para uso.</p>
       </div>

       <div className="grid grid-cols-1 gap-4">
         {coupons.map(coupon => (
           <div key={coupon.id} className={`bg-white rounded-2xl p-5 border shadow-sm relative overflow-hidden transition-all ${coupon.quantity === 0 ? 'opacity-50 grayscale' : 'border-rose-100 hover:border-rose-300'}`}>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-4">
                  <div className="text-4xl bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                    {coupon.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{coupon.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[150px]">{coupon.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600">
                      <Ticket className="w-3 h-3" /> RESTAM: {coupon.quantity}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ticket Visuals */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-50 rounded-full border border-slate-200"></div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-slate-50 rounded-full border border-slate-200"></div>

              {coupon.quantity > 0 && (
                <button 
                  onClick={() => useCoupon(coupon.id)}
                  className="mt-4 w-full py-2 bg-rose-500 text-white rounded-xl font-bold text-sm active:scale-95 transition-transform"
                >
                  USAR CUPOM
                </button>
              )}
           </div>
         ))}
       </div>
    </div>
  );
};

export default LoveBank;
