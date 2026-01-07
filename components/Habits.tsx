
import React, { useState } from 'react';
import { Check, Link, BarChart2, MoreVertical, BookOpen, WineOff, Footprints, Calendar as CalendarIcon, Filter, ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Plus, CheckCircle2, Circle, Trophy, Flag, Wine, Sparkles, Trash2, X, Flame, Star, Save } from 'lucide-react';

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
  tasks: ChallengeTask[];
}

const Habits: React.FC = () => {
  const [viewMode, setViewMode] = useState<'habits' | 'lists' | 'challenges'>('habits');
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<'stats' | 'calendar' | 'edit'>('stats');
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({ title: '', frequency: 'Todos os dias', color: 'blue' as const });
  const [activeListId, setActiveListId] = useState<string>('l1');
  const [newItemText, setNewItemText] = useState('');
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);

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

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1', title: 'Não beber álcool', frequency: 'Todos os dias', icon: <WineOff className="w-5 h-5 text-white" />, colorTheme: 'red', streak: 12, completionRate: 100,
      completedDays: [weekDays[0].fullDate, weekDays[1].fullDate, weekDays[2].fullDate, weekDays[3].fullDate], history: []
    },
    {
      id: '2', title: 'Ler um livro', frequency: 'Semanal', icon: <BookOpen className="w-5 h-5 text-white" />, colorTheme: 'purple', streak: 3, completionRate: 70,
      completedDays: [weekDays[1].fullDate, weekDays[3].fullDate], history: []
    },
    {
      id: '3', title: 'Correr / Caminhar', frequency: '3x Semana', icon: <Footprints className="w-5 h-5 text-white" />, colorTheme: 'blue', streak: 4, completionRate: 83,
      completedDays: [weekDays[2].fullDate], history: []
    },
    {
      id: '4', title: 'Skincare', frequency: 'Todos os dias', icon: <Sparkles className="w-5 h-5 text-white" />, colorTheme: 'orange', streak: 25, completionRate: 98,
      completedDays: weekDays.map(d => d.fullDate), history: []
    }
  ]);

  const [lists, setLists] = useState<ShoppingList[]>([
    { id: 'l1', title: 'Compras', date: '24/09', category: 'shopping', color: 'bg-orange-500', items: [{ id: 'i1', text: 'Maçãs', checked: true }, { id: 'i2', text: 'Pão', checked: true }] }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'c1', title: 'Autoconfiança', category: 'JORNADA', currentDay: 3, totalDays: 30, image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400', status: 'active',
      tasks: Array.from({ length: 30 }, (_, i) => ({ day: i + 1, title: `Dia ${i + 1}`, description: 'Tarefa...', completed: i < 2 }))
    }
  ]);

  const toggleHabit = (habitId: string, dateStr: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(dateStr);
        const newCompletedDays = isCompleted ? habit.completedDays.filter(d => d !== dateStr) : [...habit.completedDays, dateStr];
        return { ...habit, completedDays: newCompletedDays };
      }
      return habit;
    }));
  };

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'red': return { bg: 'bg-red-500', text: 'text-red-500', light: 'bg-red-50' };
      case 'purple': return { bg: 'bg-purple-500', text: 'text-purple-500', light: 'bg-purple-50' };
      case 'blue': return { bg: 'bg-blue-500', text: 'text-blue-500', light: 'bg-blue-50' };
      case 'green': return { bg: 'bg-green-500', text: 'text-green-500', light: 'bg-green-50' };
      case 'orange': return { bg: 'bg-orange-500', text: 'text-orange-500', light: 'bg-orange-50' };
      default: return { bg: 'bg-slate-500', text: 'text-slate-500', light: 'bg-slate-50' };
    }
  };

  // --- VIEWS ---

  // 1. DETAIL VIEW
  if (selectedHabitId) {
    const habit = habits.find(h => h.id === selectedHabitId);
    if (!habit) return null;
    const theme = getThemeStyles(habit.colorTheme);

    return (
      <div className="bg-slate-50 min-h-full animate-in fade-in slide-in-from-right">
        <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <button onClick={() => { setSelectedHabitId(null); setDetailTab('stats'); }} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h2 className="text-base font-bold text-slate-800">{habit.title}</h2>
          <div className={`${theme.text}`}>{habit.icon}</div>
        </div>

        <div className="p-4 space-y-4">
           {/* Estatísticas Simplificadas */}
           <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 bg-slate-100 px-2 py-0.5 rounded-full">Pontuação</span>
               <div className="text-4xl font-bold text-slate-800">{habit.completionRate}%</div>
           </div>
        </div>
      </div>
    );
  }

  // 2. MAIN VIEW
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
      
      {/* Header Tabs */}
      <div className="px-2 pt-2">
        <div className="bg-slate-100 p-1 rounded-xl flex">
           {['habits', 'lists', 'challenges'].map(m => (
             <button 
               key={m}
               onClick={() => setViewMode(m as any)}
               className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${viewMode === m ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
             >
               {m === 'habits' ? 'Hábitos' : m === 'lists' ? 'Listas' : 'Desafios'}
             </button>
           ))}
        </div>
      </div>

      {viewMode === 'habits' && (
        <div className="space-y-3 px-1">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold text-slate-800">Seus Hábitos</h2>
            <button className="p-1.5 bg-slate-900 text-white rounded-full"><Plus className="w-4 h-4" /></button>
          </div>

          {habits.map(habit => {
            const styles = getThemeStyles(habit.colorTheme);
            return (
              <div 
                key={habit.id} 
                onClick={() => setSelectedHabitId(habit.id)}
                className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 relative active:scale-[0.99] transition-transform"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-800">{habit.title}</h3>
                    <span className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${styles.light} ${styles.text}`}>
                      {habit.frequency}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${styles.bg}`}>
                    {habit.icon}
                  </div>
                </div>

                {/* Compact Days Grid for Mobile */}
                <div className="flex justify-between items-center">
                  {weekDays.map((day) => {
                    const isCompleted = habit.completedDays.includes(day.fullDate);
                    return (
                      <div key={day.fullDate} className="flex flex-col items-center gap-1">
                        <span className="text-[9px] text-slate-400 font-medium">{day.dayName.charAt(0)}</span>
                        <button
                          onClick={(e) => toggleHabit(habit.id, day.fullDate, e)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                            isCompleted ? `${styles.bg} text-white` : `border border-slate-200 text-slate-400`
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

      {/* Simplified List & Challenge Views would follow similar compact logic */}
      {viewMode === 'lists' && (
        <div className="text-center py-10 text-slate-400 text-sm">Listas Otimizadas para Mobile</div>
      )}
      {viewMode === 'challenges' && (
        <div className="text-center py-10 text-slate-400 text-sm">Desafios Otimizados para Mobile</div>
      )}

    </div>
  );
};

export default Habits;
