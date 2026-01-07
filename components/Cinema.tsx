
import React, { useState } from 'react';
import { Film, Star, Plus, Tv, CheckCircle2, Sparkles } from 'lucide-react';
import { Movie } from '../types';

const Cinema: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([
    { id: '1', title: 'Questão de Tempo', genre: 'Romance', platform: 'Netflix', watched: true, rating: 5 },
    { id: '2', title: 'Duna: Parte 2', genre: 'Sci-Fi', platform: 'Cinema', watched: false },
    { id: '3', title: 'Interestelar', genre: 'Sci-Fi', platform: 'Max', watched: true, rating: 5 },
  ]);

  const [activeTab, setActiveTab] = useState<'watch' | 'watched'>('watch');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right">
      <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-20"><Film className="w-32 h-32" /></div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2 relative z-10">
          <Tv className="w-6 h-6 text-purple-400" /> Cine Pipoca
        </h2>
        <p className="text-indigo-200 text-sm relative z-10">O que vamos assistir hoje?</p>
        
        <button className="mt-4 w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
           <Sparkles className="w-4 h-4 text-yellow-300" />
           Pedir Sugestão para IA
        </button>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button onClick={() => setActiveTab('watch')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'watch' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>Para Assistir</button>
        <button onClick={() => setActiveTab('watched')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'watched' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400'}`}>Já Vistos</button>
      </div>

      <div className="space-y-3">
        {movies.filter(m => activeTab === 'watch' ? !m.watched : m.watched).map(movie => (
          <div key={movie.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
             <div>
               <h3 className="font-bold text-slate-800 text-sm">{movie.title}</h3>
               <div className="flex gap-2 mt-1">
                 <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{movie.genre}</span>
                 <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">{movie.platform}</span>
               </div>
             </div>
             {movie.watched && movie.rating && (
               <div className="flex gap-0.5">
                 {Array.from({ length: movie.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
               </div>
             )}
             {!movie.watched && (
               <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-green-100 hover:text-green-600 transition-colors">
                 <CheckCircle2 className="w-5 h-5" />
               </button>
             )}
          </div>
        ))}
        {movies.filter(m => activeTab === 'watch' ? !m.watched : m.watched).length === 0 && (
          <div className="text-center py-8 text-slate-400 text-sm">Nenhum filme aqui ainda...</div>
        )}
      </div>
      
      <button className="fixed bottom-24 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-300 active:scale-90 transition-transform">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Cinema;
