import React, { useState } from 'react';
import { Calendar, MapPin, Edit2 } from 'lucide-react';
import { UserRole } from '../types';

interface CountdownProps {
  currentUser: UserRole;
}

const Countdown: React.FC<CountdownProps> = ({ currentUser }) => {
  const [nextMeeting, setNextMeeting] = useState('2024-06-15');
  const [isEditing, setIsEditing] = useState(false);

  const calculateDays = () => {
    const today = new Date();
    const target = new Date(nextMeeting);
    const diffTime = Math.abs(target.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };

  const daysLeft = calculateDays();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl mb-8">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://picsum.photos/600/300?grayscale" 
          alt="Couple Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 p-8 text-center">
        <h3 className="text-indigo-200 text-sm font-medium tracking-widest uppercase mb-2">Próximo Encontro</h3>
        
        {isEditing && currentUser === 'alex' ? (
          <div className="flex items-center justify-center gap-2 mb-4">
             <input 
               type="date" 
               value={nextMeeting} 
               onChange={(e) => setNextMeeting(e.target.value)}
               className="text-slate-900 px-3 py-1 rounded text-lg"
             />
             <button onClick={() => setIsEditing(false)} className="text-sm bg-indigo-600 px-3 py-2 rounded">Salvar</button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-6xl font-bold">{daysLeft}</span>
            <span className="text-xl font-light text-indigo-200 mt-4">dias</span>
            {currentUser === 'alex' && (
              <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-6 mt-4 text-sm text-indigo-100/80">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>São Paulo</span>
          </div>
          <div className="h-0.5 w-8 bg-indigo-500/50"></div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Indaiatuba</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
