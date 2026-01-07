
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Heart, CheckCircle2, Plus, CalendarHeart, Navigation, Car, Building2, ArrowRight, Wand2, Sparkles, Cloud, Sun, Moon, Armchair, PartyPopper, Utensils } from 'lucide-react';
import { Loader } from "@googlemaps/js-api-loader";
import Countdown from './Countdown';
import WeatherWidget from './WeatherWidget';
import MapWidget from './MapWidget';
import { getDateSuggestion } from '../services/geminiService';

declare var google: any;

interface DateEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  type: 'past' | 'future';
  photo?: string; // URL da foto
  notes?: string;
}

const Dates: React.FC = () => {
  // Define next date for the countdown (Ilhabela - based on history context)
  const nextDate = new Date('2026-01-10T10:00:00');
  
  // Coordinates
  const nextLocationCoords = { lat: -23.0903, lng: -47.2181 }; // Casa da Amanda (Indaiatuba)
  const mpspCoords = { lat: -23.5518, lng: -46.6342 }; // MPSP Sede (Rua Riachuelo, SP)

  // Commute State
  const [commute, setCommute] = useState({ distance: '...', duration: '...' });
  const [loadingCommute, setLoadingCommute] = useState(true);
  
  // AI Date Planner State
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedWeather, setSelectedWeather] = useState<string>('Clima agradável');
  const [dateSuggestion, setDateSuggestion] = useState<string>('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const [bucketList, setBucketList] = useState([
    { id: 1, text: 'Jantar no Terraço Itália', done: false },
    { id: 2, text: 'Acampar em São Francisco Xavier', done: false },
    { id: 3, text: 'Cinema Drive-in', done: true },
  ]);

  // Histórico baseado nas conversas
  const timeline: DateEvent[] = [
    {
      id: 14,
      title: 'Uma Chance para o Amor',
      date: '22 Dez',
      location: 'São Paulo',
      type: 'past',
      notes: 'Plantão + Paulista + Sushi + Baccio + Parque com conversas difíceis + "Jugo igual" + Alex ama Amanda 🥰 + Música ao vivo + "Não quero te deixar ir..."'
    },
    {
      id: 13,
      title: 'Picolé Misterioso',
      date: '09 Dez',
      location: 'São Paulo/Indaiá',
      type: 'past',
      notes: 'Chegar atrasados no trabalho juntos + Constrangimento 🫠 + Picolé misterioso + Dormir juntin'
    },
    {
      id: 12,
      title: 'Viagem Monte Green',
      date: '06-08 Dez',
      location: 'Monte Green',
      type: 'past',
      photo: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop',
      notes: 'Moto + Filme de terror + Fondue com vinho + Amanda louquinha e Alex putinho + Amorzinho + Rock + Cavalos'
    },
    {
      id: 11,
      title: 'Lingerie & Viagem',
      date: '05 Dez',
      location: 'Indaiatuba',
      type: 'past',
      notes: 'Lingerie 🤭 + Alex em Indaiá para viajarmos'
    },
    {
      id: 10,
      title: 'Conhecendo o Sogro',
      date: '02 Dez',
      location: 'São Paulo',
      type: 'past',
      notes: 'Conhecer pai do Alex de surpresa 🫣 + Restaurante árabe + Dormir braçadin'
    },
    {
      id: 9,
      title: 'Preguiça & Missa',
      date: '30 Nov',
      location: 'Indaiatuba',
      type: 'past',
      notes: 'Dia da preguiça + Gov + Missa com tia e prima'
    },
    {
      id: 8,
      title: 'Jantinha no Deck',
      date: '29 Nov',
      location: 'Indaiatuba',
      type: 'past',
      notes: 'Jantinha na casa da esfirra + Conversas no deck até tarde'
    },
    {
      id: 7,
      title: 'Rolê em SP',
      date: '26 Nov',
      location: 'São Paulo',
      type: 'past',
      notes: 'Atacadão + Shopping + Olive Garden + Rodoviária'
    },
    {
      id: 6,
      title: 'Corrida & Primeira Noite',
      date: '24 Nov',
      location: 'Indaiatuba',
      type: 'past',
      notes: 'Corrida + Piquenique + Mirim + Restaurante da Valéria + Primeira vez na Igreja + Pastel + Dormirmos Juntos'
    },
    {
      id: 5,
      title: 'Rolê Gastronômico',
      date: '23 Nov',
      location: 'Indaiatuba',
      type: 'past',
      notes: 'Kit da corrida + Almoçamos + Boteco do Andre + Cupido Sqn + Dogão'
    },
    {
      id: 4,
      title: 'A Moto Power Rangers',
      date: '20 Nov',
      location: 'Ibirapuera, SP',
      type: 'past',
      photo: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1000&auto=format&fit=crop',
      notes: 'Boteco do Senador + Ibirapuera + Primeira vez de moto (Capacete Power Rangers)'
    },
    {
      id: 3,
      title: 'Presencial Juntos',
      date: '19 Nov',
      location: 'São Paulo',
      type: 'past',
      notes: 'Carícias + Almoço + Beach Tênis + Airbnb + Doidinho'
    },
    {
      id: 2,
      title: 'Luzes e Macarrão',
      date: '15 Nov',
      location: 'Parque Ecológico',
      type: 'past',
      notes: 'Clube das Mulheres + Parque Ecológico Luzes + Macarrão'
    },
    {
      id: 1,
      title: 'O Início',
      date: '08-09 Nov',
      location: 'Indaiatuba',
      type: 'past',
      notes: 'Pagode + Beijo + Rock + Felicidade + Sono + Mirim + Conversas + Ordem e Caos'
    }
  ];

  useEffect(() => {
    const calculateCommute = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM',
        version: "weekly",
      });

      try {
        await loader.load();
        const service = new google.maps.DistanceMatrixService();
        
        service.getDistanceMatrix(
          {
            origins: [{ lat: nextLocationCoords.lat, lng: nextLocationCoords.lng }], // Indaiatuba
            destinations: [{ lat: mpspCoords.lat, lng: mpspCoords.lng }], // MPSP SP
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
        console.error("Error calculating distance:", error);
        setLoadingCommute(false);
        setCommute({ distance: '98 km', duration: '1h 20min' }); // Fallback visual
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
    <div className="space-y-8 pb-24 animate-in fade-in duration-500">
      
      {/* 1. CARTÃO DE DESTAQUE: PRÓXIMO ENCONTRO */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <CalendarHeart className="w-6 h-6 text-rose-500" />
          Próximo Encontro
        </h2>
        
        <div className="bg-white rounded-3xl p-1 shadow-lg shadow-rose-100 border border-rose-100 relative overflow-hidden">
          <div className="bg-rose-500 text-white p-6 rounded-t-2xl relative z-10">
             <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Indaiatuba</h3>
                  <p className="text-rose-100 flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" /> Casa da Amanda
                  </p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                   <Clock className="w-6 h-6 text-white" />
                </div>
             </div>
             <Countdown targetDate={nextDate} minimal={true} />
          </div>
          
          <div className="p-4 bg-white space-y-4">
             <div>
                <p className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wide">Previsão do Tempo</p>
                <WeatherWidget /> 
             </div>

             <div>
                <p className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-wide">Localização</p>
                <MapWidget lat={nextLocationCoords.lat} lng={nextLocationCoords.lng} label="Casa da Amanda" />
             </div>
             
             <button 
                onClick={handleOpenMaps}
                className="w-full py-3 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors border border-indigo-100"
             >
                <Navigation className="w-4 h-4" />
                Abrir Rota no Google Maps
             </button>
          </div>
        </div>
      </section>

      {/* 2. NOVO: PLANEJADOR DE DATES COM IA */}
      <section>
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
           {/* Decor */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
           
           <h2 className="text-lg font-bold flex items-center gap-2 mb-4 relative z-10">
             <Wand2 className="w-5 h-5 text-yellow-300" />
             Planejador Mágico de Dates
           </h2>

           <div className="space-y-4 relative z-10">
             {/* Weather Selector */}
             <div>
               <p className="text-xs text-indigo-200 mb-2 font-medium">Como está o tempo?</p>
               <div className="flex gap-2">
                  {['Ensolarado', 'Chuvoso', 'Frio'].map(w => (
                    <button 
                      key={w}
                      onClick={() => setSelectedWeather(w)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedWeather === w ? 'bg-white text-indigo-600' : 'bg-white/20 text-white hover:bg-white/30'}`}
                    >
                      {w === 'Ensolarado' && <Sun className="w-3 h-3 inline mr-1" />}
                      {w === 'Chuvoso' && <Cloud className="w-3 h-3 inline mr-1" />}
                      {w === 'Frio' && <Moon className="w-3 h-3 inline mr-1" />}
                      {w}
                    </button>
                  ))}
               </div>
             </div>

             {/* Mood Selector */}
             <div>
               <p className="text-xs text-indigo-200 mb-2 font-medium">Qual a vibe de hoje?</p>
               <div className="grid grid-cols-2 gap-2">
                 {[
                   { id: 'relax', label: 'Relax / Preguiça', icon: <Armchair className="w-4 h-4" /> },
                   { id: 'romantic', label: 'Romântico', icon: <Heart className="w-4 h-4" /> },
                   { id: 'fun', label: 'Animado / Sair', icon: <PartyPopper className="w-4 h-4" /> },
                   { id: 'food', label: 'Fome de algo bom', icon: <Utensils className="w-4 h-4" /> }
                 ].map(m => (
                   <button
                     key={m.id}
                     onClick={() => setSelectedMood(m.label)}
                     className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                       selectedMood === m.label 
                         ? 'bg-white text-indigo-600 border-white' 
                         : 'bg-indigo-800/50 text-indigo-100 border-indigo-500/30 hover:bg-indigo-700'
                     }`}
                   >
                     {m.icon} {m.label}
                   </button>
                 ))}
               </div>
             </div>

             {/* Action & Result */}
             {!dateSuggestion && (
               <button 
                 onClick={handleGenerateDate}
                 disabled={!selectedMood || loadingSuggestion}
                 className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-3 rounded-xl shadow-lg mt-2 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {loadingSuggestion ? (
                   <div className="w-5 h-5 border-2 border-yellow-900 border-t-transparent rounded-full animate-spin"></div>
                 ) : (
                   <>
                     <Sparkles className="w-4 h-4" />
                     Sugerir o Date Perfeito
                   </>
                 )}
               </button>
             )}

             {dateSuggestion && (
               <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mt-4 border border-white/20 animate-in fade-in slide-in-from-bottom-2">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-yellow-300 text-sm">Sugestão do Oráculo:</h3>
                    <button onClick={() => setDateSuggestion('')} className="text-xs text-indigo-200 hover:text-white underline">Tentar outro</button>
                 </div>
                 <p className="text-sm whitespace-pre-line leading-relaxed text-indigo-50">
                   {dateSuggestion}
                 </p>
               </div>
             )}
           </div>
        </div>
      </section>

      {/* 3. CARD DESLOCAMENTO MPSP */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
           <Car className="w-6 h-6 text-slate-600" />
           Deslocamento Trabalho
        </h2>
        
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-400 font-bold uppercase">De: Indaiatuba</span>
                <span className="text-lg font-bold">Casa</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-500" />
              <div className="flex flex-col gap-1 text-right">
                <span className="text-xs text-slate-400 font-bold uppercase">Para: São Paulo</span>
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
                   <span className="text-2xl font-bold text-white">{commute.duration}</span>
                 )}
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex flex-col items-end">
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
              className="w-full mt-4 bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Iniciar Rota Waze/Maps
            </button>
          </div>
        </div>
      </section>

      {/* 4. LINHA DO TEMPO (Timeline) */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
           <Heart className="w-6 h-6 text-rose-500" />
           Nossa História
        </h2>
        
        <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
          {timeline.map((event) => (
            <div key={event.id} className="ml-6 relative">
              {/* Bolinha na linha do tempo */}
              <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-sm"></div>
              
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <span className="text-xs font-bold text-rose-500 uppercase">{event.date}</span>
                <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {event.location}
                </p>
                
                {event.photo && (
                  <div className="rounded-xl overflow-hidden h-32 w-full mb-3">
                    <img src={event.photo} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                {event.notes && (
                  <p className="text-slate-600 text-sm italic bg-slate-50 p-3 rounded-lg border-l-2 border-rose-200">
                    "{event.notes}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. POTE DOS SONHOS (Bucket List) */}
      <section>
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-bold text-slate-800">Pote dos Sonhos</h2>
           <button className="p-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors">
             <Plus className="w-5 h-5" />
           </button>
        </div>
        
        <div className="grid gap-3">
          {bucketList.map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleBucketItem(item.id)}
              className={`p-4 rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                item.done ? 'bg-green-50 border border-green-100' : 'bg-white border border-slate-100 shadow-sm'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                item.done ? 'bg-green-500 border-green-500' : 'border-slate-300'
              }`}>
                {item.done && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <span className={`font-medium ${item.done ? 'text-green-700 line-through' : 'text-slate-700'}`}>
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
