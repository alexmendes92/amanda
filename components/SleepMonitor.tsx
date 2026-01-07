
import React, { useState, useEffect } from 'react';
import { Battery, BatteryCharging, BatteryWarning, Moon, Info } from 'lucide-react';
import { SleepRecord, UserRole } from '../types';
import { getSleepAdvice } from '../services/geminiService';

interface SleepMonitorProps {
  currentUser: UserRole;
  record: SleepRecord;
  onRecordChange: (newRecord: SleepRecord) => void;
}

const SleepMonitor: React.FC<SleepMonitorProps> = ({ currentUser, record, onRecordChange }) => {
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Calculate "Battery Level" logic
  const calculateBattery = () => {
    let base = (record.hours / 8) * 100;
    if (record.tookMelatonin) base += 5;
    if (record.usedGanchinho) base += 5;
    return Math.min(Math.max(base, 0), 100);
  };

  const batteryLevel = calculateBattery();

  const handleSave = async () => {
    setIsSaved(true);
    // O estado já está sendo atualizado em tempo real no componente pai (App.tsx).
    // Este botão agora serve como uma confirmação visual para o usuário.
  };

  useEffect(() => {
    // Se for a Amanda vendo um relatório de sono ruim do Alex, gera uma sugestão.
    if (currentUser === 'amanda' && record.hours < 6) {
      setLoadingAi(true);
      getSleepAdvice(record.hours).then((suggestion) => {
        setAiSuggestion(suggestion);
        setLoadingAi(false);
      });
    } else {
      setAiSuggestion(null);
    }
  }, [currentUser, record.hours]);

  return (
    <div className="space-y-6">
      <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-indigo-700 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>

        <h2 className="text-2xl font-bold flex items-center gap-2 relative z-10">
          <Moon className="w-6 h-6 text-yellow-300" />
          Boletim do Benzinho
        </h2>
        <p className="text-indigo-200 text-sm relative z-10">Monitoramento de descanso</p>

        <div className="mt-8 flex items-center justify-between relative z-10">
          <div>
            <span className="text-4xl font-bold">{Math.round(batteryLevel)}%</span>
            <span className="text-sm text-indigo-300 ml-2">Bateria Social/Física</span>
          </div>
          {batteryLevel > 70 ? (
            <BatteryCharging className="w-12 h-12 text-green-400" />
          ) : batteryLevel > 40 ? (
            <Battery className="w-12 h-12 text-yellow-400" />
          ) : (
            <BatteryWarning className="w-12 h-12 text-red-400 animate-pulse" />
          )}
        </div>

        {/* Visual Bar */}
        <div className="w-full bg-indigo-950/50 h-3 rounded-full mt-4 relative z-10 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              batteryLevel > 70 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
              batteryLevel > 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-pink-600'
            }`}
            style={{ width: `${batteryLevel}%` }}
          ></div>
        </div>
      </div>

      {currentUser === 'alex' ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Relatório Matinal</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Horas de Sono</label>
              <input 
                type="range" 
                min="0" 
                max="12" 
                step="0.5"
                value={record.hours}
                onChange={(e) => onRecordChange({...record, hours: Number(e.target.value)})}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="text-right text-indigo-600 font-bold mt-1">{record.hours}h</div>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="melatonin"
                checked={record.tookMelatonin}
                onChange={(e) => onRecordChange({...record, tookMelatonin: e.target.checked})}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="melatonin" className="text-slate-700">Tomei Melatonina</label>
            </div>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="ganchinho"
                checked={record.usedGanchinho}
                onChange={(e) => onRecordChange({...record, usedGanchinho: e.target.checked})}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="ganchinho" className="text-slate-700">Usei o Ganchinho</label>
            </div>

            <button 
              onClick={handleSave}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                isSaved ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              disabled={isSaved}
            >
              {isSaved ? 'Enviado para Amanda! ✅' : 'Enviar Status'}
            </button>
          </div>
        </div>
      ) : (
        /* Amanda's View */
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              Relatório do Sono (Alex)
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Horas dormidas</span>
                <span className="font-medium text-slate-900">{record.hours}h</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Melatonina</span>
                <span className="font-medium text-slate-900">{record.tookMelatonin ? 'Sim' : 'Não'}</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Ganchinho</span>
                <span className="font-medium text-slate-900">{record.usedGanchinho ? 'Sim' : 'Não'}</span>
              </li>
            </ul>
          </div>

          {record.hours < 6 && (
             <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h4 className="font-bold text-rose-800 mb-2">💡 O Pulo do Gato</h4>
                <p className="text-rose-700 text-sm mb-3">
                  O Benzin dormiu pouco hoje ({record.hours}h). Que tal mandar um áudio especial?
                </p>
                {loadingAi ? (
                  <div className="text-rose-400 text-xs italic">A IA está pensando em uma sugestão...</div>
                ) : (
                  <div className="bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                    <p className="text-slate-600 text-sm italic">"{aiSuggestion}"</p>
                  </div>
                )}
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SleepMonitor;