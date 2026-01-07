import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, CheckCircle2, Plus } from 'lucide-react';
import { PrayerRequest, StudyStatus, UserRole } from '../types';
import { getDailyDevotional } from '../services/geminiService';

interface DevotionalProps {
  currentUser: UserRole;
}

const Devotional: React.FC<DevotionalProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'verse' | 'prayers' | 'study'>('verse');
  const [prayers, setPrayers] = useState<PrayerRequest[]>([
    { id: '1', text: 'Pela saúde da minha mãe', author: 'amanda', answered: false, createdAt: '2023-10-27' },
    { id: '2', text: 'Pela nossa viagem em breve', author: 'alex', answered: false, createdAt: '2023-10-28' },
  ]);
  const [newPrayer, setNewPrayer] = useState('');
  
  const [dailyContent, setDailyContent] = useState<{verse: string, reflection: string} | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(false);

  const [studyStatus, setStudyStatus] = useState<StudyStatus>({
    lastWatchedLesson: 'Aula 12: Virtudes Cardeais',
    completed: false,
    lastUpdated: 'Ontem'
  });

  useEffect(() => {
    // Initial load of daily verse (simulated cache)
    if (!dailyContent) {
      setLoadingDaily(true);
      getDailyDevotional().then(data => {
        setDailyContent(data);
        setLoadingDaily(false);
      });
    }
  }, [dailyContent]);

  const addPrayer = () => {
    if (!newPrayer.trim()) return;
    const prayer: PrayerRequest = {
      id: Date.now().toString(),
      text: newPrayer,
      author: currentUser,
      answered: false,
      createdAt: new Date().toLocaleDateString()
    };
    setPrayers([prayer, ...prayers]);
    setNewPrayer('');
  };

  const toggleAnswered = (id: string) => {
    setPrayers(prayers.map(p => p.id === id ? { ...p, answered: !p.answered } : p));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-amber-50 p-6 rounded-2xl mb-6 text-center border border-amber-100">
        <h2 className="text-amber-900 font-serif text-xl font-bold mb-1">Devocional do Casal</h2>
        <p className="text-amber-700 text-xs uppercase tracking-widest">Fé & União</p>
      </div>

      <div className="flex border-b border-slate-100 mb-6">
        <button 
          onClick={() => setActiveTab('verse')}
          className={`flex-1 pb-3 text-sm font-medium ${activeTab === 'verse' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400'}`}
        >
          Palavra
        </button>
        <button 
          onClick={() => setActiveTab('prayers')}
          className={`flex-1 pb-3 text-sm font-medium ${activeTab === 'prayers' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400'}`}
        >
          Orações
        </button>
        <button 
          onClick={() => setActiveTab('study')}
          className={`flex-1 pb-3 text-sm font-medium ${activeTab === 'study' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-400'}`}
        >
          Curso
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {activeTab === 'verse' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            {loadingDaily ? (
               <div className="space-y-3 p-4">
                 <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                 <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                 <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
               </div>
            ) : dailyContent ? (
              <>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-400">
                  <BookOpen className="w-6 h-6 text-amber-500 mb-3" />
                  <p className="text-lg font-serif text-slate-800 italic leading-relaxed">
                    "{dailyContent.verse}"
                  </p>
                </div>
                <div className="bg-amber-100/50 p-5 rounded-xl">
                  <h4 className="font-bold text-amber-900 mb-2 text-sm">Reflexão para nós</h4>
                  <p className="text-slate-700 text-sm">{dailyContent.reflection}</p>
                </div>
              </>
            ) : null}
            
            <button 
              onClick={() => { setLoadingDaily(true); getDailyDevotional().then(data => { setDailyContent(data); setLoadingDaily(false); }); }}
              className="w-full py-2 text-amber-600 text-sm hover:bg-amber-50 rounded-lg transition-colors"
            >
              Gerar nova palavra com IA
            </button>
          </div>
        )}

        {activeTab === 'prayers' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newPrayer}
                onChange={(e) => setNewPrayer(e.target.value)}
                placeholder="Novo pedido de oração..."
                className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button onClick={addPrayer} className="bg-amber-500 text-white p-2 rounded-lg">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {prayers.map(prayer => (
                <div key={prayer.id} className={`p-4 rounded-xl border ${prayer.answered ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 shadow-sm'} flex items-start gap-3`}>
                  <button onClick={() => toggleAnswered(prayer.id)} className={`mt-0.5 ${prayer.answered ? 'text-green-500' : 'text-slate-300 hover:text-green-500'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <p className={`text-slate-800 ${prayer.answered ? 'line-through' : ''}`}>{prayer.text}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-slate-400">{prayer.createdAt}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${prayer.author === 'amanda' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
                        {prayer.author === 'amanda' ? 'Amanda' : 'Alex'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-1">Curso Pe. Paulo Ricardo</h3>
              <p className="text-sm text-slate-500 mb-4">Progresso Atual</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-serif font-bold text-slate-400">
                  A
                </div>
                <div>
                  <p className="font-medium text-slate-900">{studyStatus.lastWatchedLesson}</p>
                  <p className="text-xs text-slate-500">Última atualização: {studyStatus.lastUpdated}</p>
                </div>
              </div>

              {currentUser === 'amanda' ? (
                <div className="space-y-3">
                   <p className="text-sm text-slate-600 mb-2">Já assistiu à aula de hoje?</p>
                   <button 
                     onClick={() => setStudyStatus({...studyStatus, completed: !studyStatus.completed})}
                     className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 transition-all ${studyStatus.completed ? 'bg-green-50 border-green-200 text-green-700' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}
                   >
                     {studyStatus.completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 border-2 border-current rounded-full"></div>}
                     {studyStatus.completed ? 'Aula Concluída' : 'Marcar como Assistido'}
                   </button>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-600">
                    Amanda {studyStatus.completed ? 'já assistiu' : 'ainda não assistiu'} à aula de hoje.
                  </p>
                  {!studyStatus.completed && (
                    <button className="mt-2 text-xs text-indigo-600 font-medium hover:underline">
                      Enviar incentivo
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Devotional;
