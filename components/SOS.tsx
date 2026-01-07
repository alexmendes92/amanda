
import React, { useState } from 'react';
import { Send, AlertTriangle, Coffee, HeartCrack, Utensils } from 'lucide-react';

const SOS: React.FC = () => {
  const [sent, setSent] = useState<string | null>(null);

  const options = [
    { id: 'sad', label: 'Tô tristinha', icon: <HeartCrack className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'hungry', label: 'Tô com fome', icon: <Utensils className="w-6 h-6" />, color: 'bg-orange-500' },
    { id: 'anxious', label: 'Tô ansiosa', icon: <AlertTriangle className="w-6 h-6" />, color: 'bg-purple-500' },
    { id: 'attention', label: 'Quero atenção', icon: <Coffee className="w-6 h-6" />, color: 'bg-pink-500' },
  ];

  const handleSend = (label: string) => {
    setSent(label);
    setTimeout(() => setSent(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-800">Botão de Pânico</h2>
        <p className="text-slate-500 text-sm">Comunicação de emergência para o Alex.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt) => (
           <button
             key={opt.id}
             onClick={() => handleSend(opt.label)}
             className={`${opt.color} text-white p-6 rounded-3xl shadow-lg active:scale-95 transition-transform flex flex-col items-center gap-3`}
           >
             <div className="bg-white/20 p-3 rounded-full">{opt.icon}</div>
             <span className="font-bold">{opt.label}</span>
           </button>
        ))}
      </div>

      {sent && (
        <div className="fixed bottom-24 left-4 right-4 bg-slate-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-center gap-2 animate-in slide-in-from-bottom-5">
           <Send className="w-4 h-4 text-green-400" />
           <span className="font-bold text-sm">Notificação "{sent}" enviada!</span>
        </div>
      )}
    </div>
  );
};

export default SOS;
