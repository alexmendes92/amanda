
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Heart, CheckCircle2, Plus, CalendarHeart, Navigation, Car, Building2, ArrowRight, Wand2, Sparkles, Cloud, Sun, Moon, Armchair, PartyPopper, Utensils } from 'lucide-react';
import { Loader } from "@googlemaps/js-api-loader";
import Countdown from './Countdown';
import WeatherWidget from './WeatherWidget';
import MapWidget from './MapWidget';
import ExploreMap from './ExploreMap';
import { getDateSuggestion } from '../services/geminiService';

declare var google: any;

interface DateEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  type: 'past' | 'future';
  photo?: string;
  notes?: string;
}

const Dates: React.FC = () => {
  const nextDate = new Date('2026-01-10T10:00:00');
  const nextLocationCoords = { lat: -23.0903, lng: -47.2181 };
  const mpspCoords = { lat: -23.5518, lng: -46.6342 };

  const [commute, setCommute] = useState({ distance: '...', duration: '...' });
  const [loadingCommute, setLoadingCommute] = useState(true);
  
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedWeather, setSelectedWeather] = useState<string>('Clima agradável');
  const [dateSuggestion, setDateSuggestion] = useState<string>('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const [bucketList, setBucketList] = useState([
    { id: 1, text: 'Jantar no Terraço Itália', done: false },
    { id: 2, text: 'Acampar em São Francisco Xavier', done: false },
    { id: 3, text: 'Cinema Drive-in', done: true },
  ]);

  useEffect(() => {
    const calculateCommute = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM',
        version: "weekly",
      });

      try {
        await (loader as any).load();
        const service = new google.maps.DistanceMatrixService();
        
        service.getDistanceMatrix(
          {
            origins: [{ lat: nextLocationCoords.lat, lng: nextLocationCoords.lng }],
            destinations: [{ lat: mpspCoords.lat, lng: mpspCoords.lng }],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
          },
          (response: any, status: any) => {
            if (status === 'OK' && response) {
              const element = response.rows[0].elements[0];
              if (element.status === 'OK') {
                setCommute({
                  distance: element.distance.text,
                  duration: element.duration.text
                });
              }
            }
            setLoadingCommute(false);
          }
        );
      } catch (error) {
        setLoadingCommute(false);
        setCommute({ distance: '98 km', duration: '1h 20min' });
      }
    };

    calculateCommute();
  }, []);

  const handleGenerateDate = async () => {
    if (!selectedMood) return;
    setLoadingSuggestion(true);
    const suggestion = await getDateSuggestion(selectedWeather, selectedMood);
    setDateSuggestion(suggestion);
    setLoadingSuggestion(false);
  };

  const toggleBucketItem = (id: number) => {
    setBucketList(bucketList.map(item => 
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${nextLocationCoords.lat},${nextLocationCoords.lng}`;
    window.open(url, '_blank');
  };

  const handleOpenMPSPRoute = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${nextLocationCoords.lat},${nextLocationCoords.lng}&destination=${mpspCoords.lat},${mpspCoords.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. MAPA DE EXPLORAÇÃO (Agora Hero Section) */}
      <section className="-mx-2">
         <div className="px-2 mb-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <Navigation className="w-5 h-5 text-indigo-500" />
               Mapa de Aventuras
            </h2>
         </div>
         <ExploreMap />
      </section>

      {/* 2. PLANEJADOR DE DATES COM IA */}
      <section>
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
           {/* Decor */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
           
           <h2 className="text-lg font-bold flex items-center gap-2 mb-4 relative z-10">
             <Wand2 className="w-5 h-5 text-yellow-300" />
             Planejador Mágico
           </h2>

           <div className="space-y-4 relative z-10">
             <div>
               <p className="text-xs text-indigo-200 mb-2 font-medium">Como está o tempo?</p>
               <div className="flex gap-2">
                  {['Ensolarado', 'Chuvoso', 'Frio'].map(w => (
                    <button 
                      key={w}
                      onClick={() => setSelectedWeather(w)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedWeather === w ? 'bg-white text-indigo-600 shadow-md transform scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      {w === 'Ensolarado' && <Sun className="w-3 h-3 inline mr-1" />}
                      {w === 'Chuvoso' && <Cloud className="w-3 h-3 inline mr-1" />}
                      {w === 'Frio' && <Moon className="w-3 h-3 inline mr-1" />}
                      {w}
                    </button>
                  ))}
               </div>
             </div>

             <div>
               <p className="text-xs text-indigo-200 mb-2 font-medium">Qual a vibe?</p>
               <div className="grid grid-cols-2 gap-2">
                 {[
                   { id: 'relax', label: 'Relax / Preguiça', icon: <Armchair className="w-4 h-4" /> },
                   { id: 'romantic', label: 'Romântico', icon: <Heart className="w-4 h-4" /> },
                   { id: 'fun', label: 'Animado', icon: <PartyPopper className="w-4 h-4" /> },
                   { id: 'food', label: 'Fome', icon: <Utensils className="w-4 h-4" /> }
                 ].map(m => (
                   <button
                     key={m.id}
                     onClick={() => setSelectedMood(m.label)}
                     className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                       selectedMood === m.label 
                         ? 'bg-white text-indigo-600 border-white shadow-lg transform scale-[1.02]' 
                         : 'bg-indigo-800/30 text-indigo-100 border-indigo-500/30 hover:bg-indigo-700/50'
                     }`}
                   >
                     {m.icon} {m.label}
                   </button>
                 ))}
               </div>
             </div>

             {!dateSuggestion && (
               <button 
                 onClick={handleGenerateDate}
                 disabled={!selectedMood || loadingSuggestion}
                 className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-3.5 rounded-xl shadow-lg mt-2 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
               >
                 {loadingSuggestion ? (
                   <div className="w-5 h-5 border-2 border-yellow-900 border-t-transparent rounded-full animate-spin"></div>
                 ) : (
                   <>
                     <Sparkles className="w-4 h-4" />
                     Sugerir Date Perfeito
                   </>
                 )}
               </button>
             )}

             {dateSuggestion && (
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mt-4 border border-white/20 animate-in fade-in slide-in-from-bottom-2">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-yellow-300 text-sm flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Sugestão da IA
                    </h3>
                    <button onClick={() => setDateSuggestion('')} className="text-[10px] bg-white/10 px-2 py-1 rounded text-white hover:bg-white/20">Gerar Outra</button>
                 </div>
                 <p className="text-sm whitespace-pre-line leading-relaxed text-indigo-50 font-medium">
                   {dateSuggestion}
                 </p>
               </div>
             )}
           </div>
        </div>
      </section>

      {/* 3. CARD DESTAQUE PRÓXIMO ENCONTRO */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <CalendarHeart className="w-6 h-6 text-rose-500" />
          Próximo Encontro
        </h2>
        
        <div className="bg-white rounded-[2rem] p-1 shadow-lg shadow-rose-100 border border-rose-100 relative overflow-hidden">
          <div className="bg-rose-500 text-white p-6 rounded-t-[1.7rem] relative z-10">
             <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Indaiatuba</h3>
                  <p className="text-rose-100 flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" /> Casa da Amanda
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                   <Clock className="w-6 h-6 text-white" />
                </div>
             </div>
             <Countdown targetDate={nextDate} minimal={true} />
          </div>
          
          <div className="p-5 bg-white space-y-4">
             <div>
                <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wide">Clima Previsto</p>
                <div className="transform scale-95 origin-top-left w-[105%]">
                   <WeatherWidget /> 
                </div>
             </div>
             
             <button 
                onClick={handleOpenMaps}
                className="w-full py-3.5 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100 active:scale-95"
             >
                <Navigation className="w-4 h-4" />
                Abrir Rota no Maps
             </button>
          </div>
        </div>
      </section>

      {/* 4. CARD DESLOCAMENTO MPSP */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
           <Car className="w-6 h-6 text-slate-600" />
           Deslocamento Trabalho
        </h2>
        
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2rem] p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">De: Indaiatuba</span>
                <span className="text-lg font-bold">Casa</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500" />
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Para: São Paulo</span>
                <span className="text-lg font-bold flex items-center gap-2 justify-end">
                  MPSP
                  <Building2 className="w-4 h-4 text-slate-400" />
                </span>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm border border-white/5">
              <div className="flex flex-col">
                 <span className="text-xs text-slate-300 mb-1">Tempo Estimado</span>
                 {loadingCommute ? (
                   <span className="h-6 w-20 bg-white/20 animate-pulse rounded"></span>
                 ) : (
                   <span className="text-3xl font-bold text-white tracking-tight">{commute.duration}</span>
                 )}
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex flex-col items-end justify-center">
                 <span className="text-xs text-slate-300 mb-1">Distância</span>
                 {loadingCommute ? (
                   <span className="h-6 w-16 bg-white/20 animate-pulse rounded"></span>
                 ) : (
                   <span className="text-xl font-medium text-white">{commute.distance}</span>
                 )}
              </div>
            </div>

            <button 
              onClick={handleOpenMPSPRoute}
              className="w-full mt-4 bg-white text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors active:scale-95 shadow-md"
            >
              <Navigation className="w-4 h-4" />
              Iniciar Waze
            </button>
          </div>
        </div>
      </section>

      {/* 5. POTE DOS SONHOS (Bucket List) */}
      <section className="pb-8">
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold text-slate-800">Pote dos Sonhos</h2>
           <button className="p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors shadow-sm">
             <Plus className="w-5 h-5" />
           </button>
        </div>
        
        <div className="grid gap-3">
          {bucketList.map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleBucketItem(item.id)}
              className={`p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all active:scale-[0.98] ${
                item.done ? 'bg-green-50 border border-green-100 opacity-80' : 'bg-white border border-slate-100 shadow-sm'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                item.done ? 'bg-green-500 border-green-500' : 'border-slate-300'
              }`}>
                {item.done && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <span className={`font-medium text-sm ${item.done ? 'text-green-700 line-through' : 'text-slate-700'}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dates;
