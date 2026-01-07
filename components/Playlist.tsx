
import React, { useState } from 'react';
import { Music, Mic2, Play, ExternalLink, Disc3, Radio, Heart, Headphones } from 'lucide-react';
import { getPlaylistSuggestion } from '../services/geminiService';
import { SongRecommendation, UserRole } from '../types';

interface PlaylistProps {
  currentUser: UserRole;
}

const Playlist: React.FC<PlaylistProps> = ({ currentUser }) => {
  const [songs, setSongs] = useState<SongRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeVibe, setActiveVibe] = useState<string>('');

  const vibes = [
    { id: 'romantic', label: 'Jantar Romântico', icon: <Heart className="w-4 h-4" />, color: 'bg-rose-500' },
    { id: 'roadtrip', label: 'Viagem / Estrada', icon: <Radio className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'focus', label: 'Focar / Trabalhar', icon: <Headphones className="w-4 h-4" />, color: 'bg-indigo-500' },
    { id: 'nostalgia', label: 'Nostalgia Rock', icon: <Disc3 className="w-4 h-4" />, color: 'bg-amber-500' },
    { id: 'acoustic', label: 'Vibe Boyce Avenue', icon: <Mic2 className="w-4 h-4" />, color: 'bg-slate-700' },
  ];

  const handleGeneratePlaylist = async (vibeLabel: string) => {
    setActiveVibe(vibeLabel);
    setLoading(true);
    setSongs([]); // Clear previous
    
    const result = await getPlaylistSuggestion(vibeLabel);
    setSongs(result);
    setLoading(false);
  };

  const playOnYouTube = (title: string, artist: string) => {
    const query = encodeURIComponent(`${title} ${artist} lyrics`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
      
      {/* Header Visual */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        {/* Vinyl Animation Background */}
        <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full border-[10px] border-slate-800 bg-slate-950 flex items-center justify-center opacity-50 ${loading ? 'animate-spin' : ''}`}>
           <div className="w-16 h-16 rounded-full bg-rose-500 border-4 border-white"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
            <Music className="w-6 h-6 text-rose-400" />
            Rádio Nossa
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            O DJ conhece vocês: Rock & Boyce Avenue ❤️
          </p>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Escolha a Vibe de Agora</p>
            <div className="flex flex-wrap gap-2">
              {vibes.map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleGeneratePlaylist(v.label)}
                  disabled={loading}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                    activeVibe === v.label 
                      ? `${v.color} text-white shadow-lg scale-105` 
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {v.icon}
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Results */}
      <div className="space-y-3">
        {loading && (
          <div className="text-center py-12">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-500 text-sm">O DJ está escolhendo as melhores faixas...</p>
          </div>
        )}

        {!loading && songs.length > 0 && (
          <>
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-slate-800">Tocando agora: {activeVibe}</h3>
              <span className="text-xs text-rose-500 font-medium">5 músicas geradas</span>
            </div>
            
            {songs.map((song, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-rose-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm group-hover:bg-rose-100 group-hover:text-rose-500 transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{song.title}</h4>
                    <p className="text-xs text-slate-500">{song.artist}</p>
                    <p className="text-[10px] text-rose-400 mt-1 italic">"{song.reason}"</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => playOnYouTube(song.title, song.artist)}
                  className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            ))}
          </>
        )}

        {!loading && songs.length === 0 && (
          <div className="text-center py-10 opacity-50">
             <Music className="w-12 h-12 mx-auto text-slate-300 mb-2" />
             <p className="text-sm text-slate-400">Selecione uma vibe acima para gerar a playlist.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Playlist;
