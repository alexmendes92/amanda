
import React, { useState } from 'react';
import { Pill, Zap, Milk, Fish, Sparkles, Clock, Info, CheckCircle2, FlaskConical } from 'lucide-react';

interface SupplementDetail {
  id: string;
  name: string;
  icon: React.ReactNode;
  benefits: string;
  dosage: string;
  bestTime: string;
  color: string;
  taken: boolean;
}

const Supplements: React.FC = () => {
  const [supplements, setSupplements] = useState<SupplementDetail[]>([
    {
      id: 'creatina',
      name: 'Creatina Monohidratada',
      icon: <Zap className="w-6 h-6" />,
      benefits: 'Aumenta a força muscular, melhora a recuperação entre séries e auxilia na função cognitiva. Essencial para o ganho de massa magra.',
      dosage: '3g a 5g diariamente (sem falhar, mesmo sem treino).',
      bestTime: 'Qualquer horário (efeito crônico).',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      taken: false
    },
    {
      id: 'whey',
      name: 'Whey Protein',
      icon: <Milk className="w-6 h-6" />,
      benefits: 'Fonte rápida de proteínas de alto valor biológico. Ajuda na reconstrução muscular pós-treino e na saciedade.',
      dosage: '1 scoop (30g) diluído em água ou leite.',
      bestTime: 'Pós-treino ou lanches intermediários.',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      taken: false
    },
    {
      id: 'omega3',
      name: 'Ômega 3',
      icon: <Fish className="w-6 h-6" />,
      benefits: 'Potente anti-inflamatório natural. Melhora a saúde cardiovascular, cerebral e ajuda na recuperação muscular.',
      dosage: '2 cápsulas (verificar concentração de EPA/DHA).',
      bestTime: 'Junto com almoço ou jantar (gordura ajuda na absorção).',
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      taken: false
    },
    {
      id: 'multi',
      name: 'Multivitamínico',
      icon: <Pill className="w-6 h-6" />,
      benefits: 'Garante o aporte de micronutrientes essenciais que podem faltar na dieta, melhorando imunidade e energia.',
      dosage: '1 cápsula ao dia.',
      bestTime: 'Pela manhã, junto com o café.',
      color: 'bg-green-100 text-green-700 border-green-200',
      taken: false
    },
    {
      id: 'colageno',
      name: 'Colágeno Verisol',
      icon: <Sparkles className="w-6 h-6" />,
      benefits: 'Melhora a elasticidade da pele, fortalece unhas e cabelos. Focado na estética e saúde dermatológica.',
      dosage: '2,5g a 5g (sachê ou cápsulas).',
      bestTime: 'Antes de dormir ou longe de grandes refeições.',
      color: 'bg-pink-100 text-pink-700 border-pink-200',
      taken: false
    }
  ]);

  const toggleTaken = (id: string) => {
    setSupplements(prev => prev.map(s => s.id === id ? { ...s, taken: !s.taken } : s));
  };

  const progress = Math.round((supplements.filter(s => s.taken).length / supplements.length) * 100);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      
      {/* Header com Progresso */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-0 z-10">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-teal-500" />
              Rotina de Suplementos
            </h2>
            <p className="text-xs text-slate-500">Nutrição de alta performance</p>
          </div>
          <span className="text-3xl font-bold text-teal-500">{progress}%</span>
        </div>
        
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Lista de Cards */}
      <div className="space-y-4">
        {supplements.map((item) => (
          <div 
            key={item.id} 
            className={`rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
              item.taken 
                ? 'bg-teal-50/50 border-teal-200 shadow-none' 
                : 'bg-white border-slate-100 shadow-sm'
            }`}
          >
            {/* Header do Card */}
            <div className="p-5 flex items-start gap-4">
              <div className={`p-3 rounded-xl ${item.color} shadow-sm`}>
                {item.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-bold text-lg ${item.taken ? 'text-teal-900 line-through decoration-teal-500/30' : 'text-slate-800'}`}>
                    {item.name}
                  </h3>
                  <button 
                    onClick={() => toggleTaken(item.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      item.taken 
                        ? 'bg-teal-500 text-white shadow-lg shadow-teal-200' 
                        : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Benefícios */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Info className="w-3 h-3 text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Benefícios</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.benefits}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Dosagem */}
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                       <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase">Dosagem</p>
                       <p className="text-xs font-medium text-slate-700">{item.dosage}</p>
                    </div>
                    
                    {/* Horário */}
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col justify-center">
                       <div className="flex items-center gap-1 mb-1">
                         <Clock className="w-3 h-3 text-slate-400" />
                         <span className="text-[10px] text-slate-400 font-bold uppercase">Melhor Hora</span>
                       </div>
                       <p className="text-xs font-medium text-slate-700">{item.bestTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
        <p className="text-xs text-blue-800">
          ⚠️ Lembrete: A constância é o segredo dos resultados. Tente tomar nos mesmos horários todos os dias!
        </p>
      </div>
    </div>
  );
};

export default Supplements;
