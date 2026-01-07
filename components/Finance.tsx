
import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Plane, PiggyBank } from 'lucide-react';
import { Transaction } from '../types';

const Finance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Depósito Mensal Alex', amount: 500, type: 'deposit', date: '01/10' },
    { id: '2', title: 'Depósito Mensal Amanda', amount: 500, type: 'deposit', date: '01/10' },
    { id: '3', title: 'Jantar Romântico', amount: 250, type: 'withdraw', date: '15/10' },
  ]);

  const total = transactions.reduce((acc, curr) => curr.type === 'deposit' ? acc + curr.amount : acc - curr.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right">
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><PiggyBank className="w-32 h-32" /></div>
        <div className="relative z-10">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Saldo Atual</p>
          <h2 className="text-4xl font-bold mb-4">
            {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h2>
          <div className="flex gap-2">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
              <ArrowDownLeft className="w-4 h-4" /> Depositar
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
              <ArrowUpRight className="w-4 h-4" /> Retirar
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-3 px-2">Histórico</h3>
        <div className="space-y-2">
          {transactions.map(t => (
            <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${t.type === 'deposit' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                   {t.type === 'deposit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{t.title}</p>
                  <p className="text-xs text-slate-400">{t.date}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${t.type === 'deposit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                {t.type === 'deposit' ? '+' : '-'} R$ {t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finance;
