
import React, { useState } from 'react';
import { Check, Link, BarChart2, MoreVertical, BookOpen, WineOff, Footprints, Calendar as CalendarIcon, Filter, ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Plus, CheckCircle2, Circle, Trophy, Flag, Wine, Sparkles, Trash2, X, Flame, Star, Save } from 'lucide-react';

// --- Types ---
interface HabitDay {
  date: number;
  dayName: string;
  fullDate: string; // YYYY-MM-DD
}

interface Habit {
  id: string;
  title: string;
  frequency: string;
  icon: React.ReactNode;
  colorTheme: 'red' | 'purple' | 'green' | 'blue' | 'orange';
  streak: number;
  completionRate: number;
  completedDays: string[];
  history: number[]; 
}

interface ListItem {
  id: string;
  text: string;
  checked: boolean;
}

interface ShoppingList {
  id: string;
  title: string;
  date: string;
  category: 'shopping' | 'work' | 'goals';
  items: ListItem[];
  color: string;
}

interface ChallengeTask {
  day: number;
  title: string;
  description: string;
  completed: boolean;
}

interface Challenge {
  id: string;
  title: string;
  category: string;
  currentDay: number;
  totalDays: number;
  image: string;
  status: 'active' | 'available' | 'completed';
  tasks: ChallengeTask[]; // Lista de tarefas por dia
}

const Habits: React.FC = () => {
  // --- State Management ---
  const [viewMode, setViewMode] = useState<'habits' | 'lists' | 'challenges'>('habits');
  
  // Habit States
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<'stats' | 'calendar' | 'edit'>('stats');
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ title: '', frequency: 'Todos os dias', color: 'blue' as const });
  
  // List States
  const [activeListId, setActiveListId] = useState<string>('l1'); // Lista expandida atualmente
  const [newItemText, setNewItemText] = useState('');

  // Challenge States
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);

  // --- Data Generation Helpers ---
  const generateWeekDays = (): HabitDay[] => {
    const days: HabitDay[] = [];
    const curr = new Date(); 
    const first = curr.getDate() - curr.getDay() + 1; 
    
    for (let i = 0; i < 7; i++) {
      const next = new Date(curr.setDate(first + i));
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      days.push({
        date: next.getDate(),
        dayName: dayNames[next.getDay()],
        fullDate: next.toISOString().split('T')[0]
      });
    }
    return days;
  };

  const weekDays = generateWeekDays();
  const todayStr = new Date().toISOString().split('T')[0];

  // --- Mock Data ---
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Não beber álcool',
      frequency: 'Todos os dias',
      icon: <WineOff className="w-6 h-6 text-white" />,
      colorTheme: 'red',
      streak: 12,
      completionRate: 100,
      completedDays: [weekDays[0].fullDate, weekDays[1].fullDate, weekDays[2].fullDate, weekDays[3].fullDate],
      history: [40, 60, 30, 80, 100, 90, 70, 80, 50, 40, 100, 100, 90, 80, 60, 70, 80, 90, 100, 50, 40, 60, 80, 90, 100, 100, 80, 70, 60, 50]
    },
    {
      id: '2',
      title: 'Ler um livro',
      frequency: 'Dom - Seg - Qua - Qui',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      colorTheme: 'purple',
      streak: 3,
      completionRate: 70,
      completedDays: [weekDays[1].fullDate, weekDays[3].fullDate],
      history: [20, 30, 100, 40, 50, 10, 80, 90, 100, 20, 30, 40, 50, 60, 100, 80, 90, 20, 30, 40, 50, 60, 70, 80, 90, 100, 20, 30, 40, 50]
    },
    {
      id: '3',
      title: 'Correr / Caminhar',
      frequency: 'Dom - Ter - Qua - Sáb',
      icon: <Footprints className="w-6 h-6 text-white" />,
      colorTheme: 'blue',
      streak: 4,
      completionRate: 83,
      completedDays: [weekDays[2].fullDate],
      history: [50, 50, 50, 60, 70, 80, 90, 100, 100, 100, 40, 30, 20, 50, 60, 70, 80, 90, 100, 60, 50, 40, 30, 20, 100, 90, 80, 70, 60, 50]
    },
    {
      id: '4',
      title: 'Skincare',
      frequency: 'Todos os dias',
      icon: <Sparkles className="w-6 h-6 text-white" />,
      colorTheme: 'orange',
      streak: 25,
      completionRate: 98,
      completedDays: weekDays.map(d => d.fullDate),
      history: [100, 100, 100, 90, 100, 100, 100, 100, 90, 100, 100, 100, 100, 100, 90, 100, 100, 100, 100, 100, 90, 100, 100, 100, 100, 100, 90, 100, 100, 100]
    }
  ]);

  const [lists, setLists] = useState<ShoppingList[]>([
    {
      id: 'l1',
      title: 'Lista de compras',
      date: '24/09/2023',
      category: 'shopping',
      color: 'bg-orange-500',
      items: [
        { id: 'i1', text: 'Maçãs', checked: true },
        { id: 'i2', text: 'Pão', checked: true },
        { id: 'i3', text: 'Cereal', checked: false },
        { id: 'i4', text: 'Queijo', checked: true },
      ]
    },
    {
      id: 'l2',
      title: 'Malas Viagem Ilhabela',
      date: '25/09/2023',
      category: 'goals',
      color: 'bg-blue-500',
      items: [
        { id: 'i1', text: 'Protetor Solar', checked: false },
        { id: 'i2', text: 'Roupas de banho', checked: false },
        { id: 'i3', text: 'Carregadores', checked: false },
      ]
    }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'c1',
      title: 'Impulsionador da autoconfiança',
      category: 'JORNADA',
      currentDay: 3,
      totalDays: 30,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop',
      status: 'active',
      tasks: Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        title: `Dia ${i + 1}: Foco em Você`,
        description: i === 2 ? 'Escreva 3 qualidades que você admira em si mesma e leia em voz alta.' : 'Tarefa do dia...',
        completed: i < 2
      }))
    },
    {
      id: 'c2',
      title: 'Rotina matinal para aumentar a energia',
      category: 'JORNADA',
      currentDay: 0,
      totalDays: 30,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop',
      status: 'available',
      tasks: Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        title: `Dia ${i + 1}: Manhã Poderosa`,
        description: 'Beba 500ml de água assim que acordar.',
        completed: false
      }))
    },
    {
      id: 'c3',
      title: 'Caminhe todos os dias para o bem de sua saúde',
      category: 'FITNESS',
      currentDay: 0,
      totalDays: 30,
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop',
      status: 'available',
      tasks: Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        title: `Dia ${i + 1}: Caminhada`,
        description: 'Caminhe por 20 minutos hoje.',
        completed: false
      }))
    }
  ]);

  // --- Actions ---

  // Habits Logic
  const toggleHabit = (habitId: string, dateStr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(dateStr);
        let newCompletedDays;
        
        if (isCompleted) {
          newCompletedDays = habit.completedDays.filter(d => d !== dateStr);
        } else {
          newCompletedDays = [...habit.completedDays, dateStr];
        }

        return { ...habit, completedDays: newCompletedDays };
      }
      return habit;
    }));
  };

  const createHabit = () => {
    if (!newHabit.title) return;
    const habit: Habit = {
      id: Date.now().toString(),
      title: newHabit.title,
      frequency: newHabit.frequency,
      colorTheme: newHabit.color as any,
      icon: <Star className="w-6 h-6 text-white" />,
      streak: 0,
      completionRate: 0,
      completedDays: [],
      history: []
    };
    setHabits([...habits, habit]);
    setShowAddHabit(false);
    setNewHabit({ title: '', frequency: 'Todos os dias', color: 'blue' });
  };

  const deleteHabit = (id: string) => {
    if (confirm("Tem certeza que deseja apagar este hábito?")) {
      setHabits(prev => prev.filter(h => h.id !== id));
      setSelectedHabitId(null);
    }
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  // Lists Logic
  const toggleListItem = (listId: string, itemId: string) => {
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item)
        };
      }
      return list;
    }));
  };

  const handleAddItem = (listId: string) => {
    if (!newItemText.trim()) return;
    setLists(prev => prev.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: [...list.items, { id: Date.now().toString(), text: newItemText, checked: false }]
        };
      }
      return list;
    }));
    setNewItemText('');
  };

  const deleteList = (listId: string) => {
    if (confirm("Tem certeza que deseja apagar esta lista?")) {
      setLists(prev => prev.filter(l => l.id !== listId));
    }
  };

  const createNewList = () => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      title: 'Nova Lista',
      date: new Date().toLocaleDateString(),
      category: 'goals',
      color: 'bg-purple-500',
      items: []
    };
    setLists([...lists, newList]);
    setActiveListId(newList.id);
  };

  // Challenges Logic
  const startChallenge = (id: string) => {
     setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'active', currentDay: 1 } : c));
     setActiveChallengeId(id);
  };

  const openChallengeModal = (id: string) => {
    setActiveChallengeId(id);
  };

  const completeChallengeDay = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId && c.currentDay < c.totalDays) {
        const updatedTasks = c.tasks.map(t => t.day === c.currentDay ? { ...t, completed: true } : t);
        
        return { 
          ...c, 
          currentDay: c.currentDay + 1, 
          status: c.currentDay + 1 > c.totalDays ? 'completed' : 'active',
          tasks: updatedTasks
        };
      }
      return c;
    }));
    setActiveChallengeId(null);
  };

  // --- Styles Helper ---
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'red': return { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-50', border: 'border-red-200' };
      case 'purple': return { bg: 'bg-purple-500', text: 'text-purple-500', light: 'bg-purple-50', border: 'border-purple-200' };
      case 'blue': return { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50', border: 'border-blue-200' };
      case 'green': return { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-50', border: 'border-green-200' };
      case 'orange': return { bg: 'bg-orange-500', text: 'text-orange-500', light: 'bg-orange-50', border: 'border-orange-200' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-500', light: 'bg-slate-50', border: 'border-slate-200' };
    }
  };

  // --- VIEWS ---

  // 1. DETAIL VIEW (Analytics & Edit)
  if (selectedHabitId) {
    const habit = habits.find(h => h.id === selectedHabitId);
    if (!habit) return null;
    const theme = getThemeStyles(habit.colorTheme);

    return (
      <div className="bg-slate-50 min-h-full animate-in fade-in slide-in-from-right">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button onClick={() => { setSelectedHabitId(null); setDetailTab('stats'); }} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h2 className="text-lg font-bold text-slate-800">{habit.title}</h2>
          <div className={`${theme.text}`}>
            {habit.icon}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex border-b border-slate-200">
             <button 
                onClick={() => setDetailTab('stats')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${detailTab === 'stats' ? `${theme.text} border-current` : 'text-slate-400 border-transparent'}`}
             >
                Estatísticas
             </button>
             <button 
                onClick={() => setDetailTab('edit')}
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${detailTab === 'edit' ? `${theme.text} border-current` : 'text-slate-400 border-transparent'}`}
             >
                Editar
             </button>
          </div>

          {detailTab === 'stats' && (
             <div className="space-y-6 animate-in fade-in">
               {/* Circular Score */}
               <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center relative">
                  <div className="absolute top-4 left-4">
                    <Trophy className={`w-5 h-5 ${theme.text}`} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 bg-slate-100 px-3 py-1 rounded-full">Pontuação</span>
                  
                  <div className="relative w-40 h-40">
                     <svg className="w-full h-full transform -rotate-90">
                       <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                       <circle 
                         cx="80" cy="80" r="70" 
                         stroke="currentColor" 
                         strokeWidth="12" 
                         fill="transparent" 
                         strokeDasharray={440}
                         strokeDashoffset={440 - (440 * habit.completionRate) / 100}
                         className={`${theme.text} transition-all duration-1000 ease-out`} 
                         strokeLinecap="round"
                       />
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-slate-800">
                       {habit.completionRate}
                     </div>
                  </div>
               </div>

               {/* Bar Chart */}
               <div className="bg-white rounded-3xl p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-800">Histórico Recente</h3>
                 </div>
                 <div className="h-48 flex items-end justify-between gap-1">
                   {habit.history.slice(0, 15).map((value, idx) => (
                     <div key={idx} className="w-full flex flex-col items-center gap-1 group">
                        <div 
                          className={`w-full rounded-t-sm transition-all duration-500 ${value === 100 ? theme.bg : 'bg-slate-200'} hover:opacity-80`}
                          style={{ height: `${value}%` }}
                        ></div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
          )}

          {detailTab === 'edit' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Hábito</label>
                <input 
                  type="text" 
                  value={habit.title}
                  onChange={(e) => updateHabit(habit.id, { title: e.target.value })}
                  className="w-full p-3 bg-white text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-2">Frequência</label>
                <select 
                   value={habit.frequency}
                   onChange={(e) => updateHabit(habit.id, { frequency: e.target.value })}
                   className="w-full p-3 bg-white text-slate-900 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Todos os dias">Todos os dias</option>
                  <option value="Dias da semana">Dias da semana</option>
                  <option value="Fins de semana">Fins de semana</option>
                </select>
              </div>

              <button 
                onClick={() => deleteHabit(habit.id)}
                className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Excluir Hábito
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- NEW HABIT MODAL ---
  if (showAddHabit) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-slate-800">Novo Hábito</h3>
             <button onClick={() => setShowAddHabit(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
               <X className="w-5 h-5" />
             </button>
           </div>
           
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-slate-600 mb-1">O que você quer fazer?</label>
               <input 
                 type="text" 
                 placeholder="Ex: Beber 2L de água" 
                 value={newHabit.title}
                 onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                 className="w-full p-3 bg-white text-slate-900 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
               />
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-600 mb-1">Com que frequência?</label>
               <select 
                 value={newHabit.frequency}
                 onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                 className="w-full p-3 bg-white text-slate-900 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
               >
                 <option>Todos os dias</option>
                 <option>Dias da semana</option>
                 <option>3x na semana</option>
               </select>
             </div>

             <div>
               <label className="block text-sm font-medium text-slate-600 mb-2">Cor do Tema</label>
               <div className="flex gap-3">
                 {['blue', 'purple', 'green', 'red', 'orange'].map((color) => (
                   <button 
                     key={color}
                     onClick={() => setNewHabit({ ...newHabit, color: color as any })}
                     className={`w-10 h-10 rounded-full border-4 transition-all ${newHabit.color === color ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                     style={{ backgroundColor: `var(--color-${color}-500, ${color})` }}
                   >
                     <div className={`w-full h-full rounded-full bg-${color}-500`}></div>
                   </button>
                 ))}
               </div>
             </div>

             <button 
               onClick={createHabit}
               disabled={!newHabit.title}
               className="w-full py-4 mt-4 bg-slate-900 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50"
             >
               <Save className="w-5 h-5" />
               Criar Hábito
             </button>
           </div>
        </div>
      </div>
    );
  }

  // --- CHALLENGE MODAL ---
  const activeChallenge = challenges.find(c => c.id === activeChallengeId);
  if (activeChallengeId && activeChallenge) {
    const currentTask = activeChallenge.tasks.find(t => t.day === activeChallenge.currentDay);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="relative h-48">
            <img src={activeChallenge.image} alt={activeChallenge.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <button 
              onClick={() => setActiveChallengeId(null)}
              className="absolute top-4 right-4 bg-black/30 p-2 rounded-full text-white backdrop-blur-sm hover:bg-black/50"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">{activeChallenge.category}</p>
              <h3 className="text-xl font-bold leading-tight w-3/4">{activeChallenge.title}</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-pulse" />
                 <div>
                   <p className="font-bold text-slate-800 text-lg">Dia {activeChallenge.currentDay}</p>
                   <p className="text-xs text-slate-500">Mantenha a ofensiva!</p>
                 </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase">Faltam</p>
                <p className="font-bold text-slate-800">{activeChallenge.totalDays - activeChallenge.currentDay} dias</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl mb-6">
              <h4 className="font-bold text-blue-900 mb-2">{currentTask?.title || "Tarefa do Dia"}</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                {currentTask?.description || "Complete a tarefa de hoje para avançar!"}
              </p>
            </div>

            <button 
              onClick={() => completeChallengeDay(activeChallenge.id)}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <CheckCircle2 className="w-6 h-6" />
              Marcar como Concluído
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN VIEW (Tabs: Habits | Lists | Challenges)
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      
      {/* Header Tabs Switcher */}
      <div className="px-6 pt-4">
        <div className="bg-slate-100 p-1 rounded-2xl flex relative">
           <button 
             onClick={() => setViewMode('habits')}
             className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all relative z-10 ${viewMode === 'habits' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
           >
             Hábitos
           </button>
           <button 
             onClick={() => setViewMode('lists')}
             className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all relative z-10 ${viewMode === 'lists' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
           >
             Listas
           </button>
           <button 
             onClick={() => setViewMode('challenges')}
             className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all relative z-10 ${viewMode === 'challenges' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
           >
             Desafios
           </button>
        </div>
      </div>

      {/* --- HABITS LIST MODE --- */}
      {viewMode === 'habits' && (
        <div className="space-y-4 px-2">
          {/* Header Actions */}
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-800">Seus Hábitos</h2>
            </div>
            <button 
              onClick={() => setShowAddHabit(true)}
              className="p-2 bg-slate-900 text-white hover:bg-slate-800 rounded-full transition-colors shadow-lg shadow-slate-300/50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {habits.map(habit => {
            const styles = getThemeStyles(habit.colorTheme);
            
            return (
              <div 
                key={habit.id} 
                onClick={() => setSelectedHabitId(habit.id)}
                className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{habit.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${styles.light} ${styles.text}`}>
                      {habit.frequency}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${styles.bg}`}>
                    {habit.icon}
                  </div>
                </div>

                {/* Days Grid */}
                <div className="flex justify-between items-center mb-6">
                  {weekDays.map((day) => {
                    const isCompleted = habit.completedDays.includes(day.fullDate);
                    const isToday = day.fullDate === todayStr;

                    return (
                      <div key={day.fullDate} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium">{day.dayName}</span>
                        <button
                          onClick={(e) => toggleHabit(habit.id, day.fullDate, e)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            isCompleted 
                              ? `${styles.bg} text-white shadow-md scale-105` 
                              : `bg-transparent border ${isToday ? 'border-slate-800 text-slate-800' : 'border-slate-200 text-slate-400'} hover:bg-slate-50`
                          }`}
                        >
                          {day.date}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- LISTS MODE --- */}
      {viewMode === 'lists' && (
        <div className="space-y-6 px-4">
           {/* Active List (Expanded) */}
           {lists.map(list => {
             if (list.id !== activeListId) return null;
             return (
              <div key={list.id} className={`${list.color} rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden transition-all duration-500`}>
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <ShoppingCart className="w-24 h-24" />
                </div>
                
                <div className="flex justify-between items-center mb-6 relative z-10">
                   <div>
                      <h2 className="text-2xl font-bold w-3/4">{list.title}</h2>
                      <p className="text-white/80 text-sm">{list.items.filter(i => i.checked).length}/{list.items.length} concluídos</p>
                   </div>
                   <button onClick={() => deleteList(list.id)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 text-white">
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>

                <div className="bg-white text-slate-800 rounded-2xl p-4 shadow-xl relative z-10">
                   <div className="space-y-3 max-h-60 overflow-y-auto pr-2 no-scrollbar">
                      {list.items.map(item => (
                        <div 
                          key={item.id} 
                          onClick={() => toggleListItem(list.id, item.id)}
                          className="flex items-center justify-between cursor-pointer group hover:bg-slate-50 p-2 rounded-lg transition-colors"
                        >
                           <div className="flex items-center gap-3">
                              {item.checked ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300" />
                              )}
                              <span className={`text-sm font-medium ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                {item.text}
                              </span>
                           </div>
                        </div>
                      ))}
                      {list.items.length === 0 && (
                        <p className="text-center text-slate-400 text-sm py-4 italic">Lista vazia. Adicione itens abaixo!</p>
                      )}
                   </div>

                   {/* Add Item Input */}
                   <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                      <input 
                        type="text" 
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        placeholder="Adicionar novo item..."
                        className="flex-1 bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none placeholder:text-slate-400"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddItem(list.id)}
                      />
                      <button 
                        onClick={() => handleAddItem(list.id)}
                        className="bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </div>
             );
           })}

           {/* Other Lists (Collapsed) */}
           <div className="space-y-2">
              <h3 className="font-bold text-slate-800 px-2 mt-6">Minhas Listas</h3>
              {lists.map(list => {
                if (list.id === activeListId) return null;
                return (
                  <div 
                    key={list.id} 
                    onClick={() => setActiveListId(list.id)}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors"
                  >
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${list.color}`}>
                           <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{list.title}</h4>
                          <p className="text-xs text-slate-400">{list.items.filter(i => i.checked).length}/{list.items.length} itens</p>
                        </div>
                     </div>
                     <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                );
              })}
              
              <button 
                onClick={createNewList}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Criar Nova Lista
              </button>
           </div>
        </div>
      )}

      {/* --- CHALLENGES MODE --- */}
      {viewMode === 'challenges' && (
        <div className="space-y-6 px-4">
           <div className="px-2">
             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Desafio de <br/><span className="text-blue-600">30 Dias</span></h2>
             <p className="text-sm text-slate-400 font-medium mt-1">Transforme-se em um mês.</p>
           </div>

           <div className="space-y-4">
              {challenges.map(challenge => (
                 <div key={challenge.id} className="relative h-64 w-full rounded-[2rem] overflow-hidden shadow-xl group">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                       <img src={challenge.image} alt={challenge.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
                    </div>

                    <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                       <div>
                          <p className="text-xs font-bold text-white/80 uppercase tracking-widest mb-2">{challenge.category}</p>
                          <h3 className="text-2xl font-bold text-white leading-tight">{challenge.title}</h3>
                       </div>

                       <div>
                          {challenge.status === 'active' ? (
                             <div className="mb-4">
                                <p className="text-xs font-bold text-white/90 mb-1 uppercase">Dia {challenge.currentDay}/{challenge.totalDays}</p>
                                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                                   <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(challenge.currentDay / challenge.totalDays) * 100}%` }}></div>
                                </div>
                             </div>
                          ) : (
                             <p className="text-sm font-bold text-white/90 mb-4 uppercase flex items-center gap-2">
                                <Flag className="w-4 h-4" />
                                {challenge.totalDays} Dias
                             </p>
                          )}

                          <button 
                            onClick={() => challenge.status === 'available' ? startChallenge(challenge.id) : openChallengeModal(challenge.id)}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                              challenge.status === 'active' 
                               ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/50' 
                               : challenge.status === 'completed'
                               ? 'bg-green-500 text-white cursor-default'
                               : 'bg-white text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            {challenge.status === 'active' ? 'CONTINUAR' : challenge.status === 'completed' ? 'CONCLUÍDO! 🏆' : 'DESAFIAR'}
                          </button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

    </div>
  );
};

export default Habits;
