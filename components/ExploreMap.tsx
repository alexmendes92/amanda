
import React, { useState, useRef, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { Search, MapPin, Navigation, Star, Utensils, TreePine, PartyPopper, Camera, ArrowRight } from 'lucide-react';
import { getExploreSuggestions } from '../services/geminiService';

const ExploreMap: React.FC = () => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePlaceIndex, setActivePlaceIndex] = useState<number | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Ícones por categoria
  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'food': return <Utensils className="w-3 h-3" />;
      case 'nature': return <TreePine className="w-3 h-3" />;
      case 'fun': return <PartyPopper className="w-3 h-3" />;
      default: return <Camera className="w-3 h-3" />;
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'food': return 'bg-orange-100 text-orange-600';
      case 'nature': return 'bg-emerald-100 text-emerald-600';
      case 'fun': return 'bg-purple-100 text-purple-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM',
        version: "weekly",
      });

      try {
        await (loader as any).load();
        const Map = google.maps.Map;
        
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new Map(mapRef.current, {
            center: { lat: -23.5505, lng: -46.6333 }, // Default SP
            zoom: 12,
            disableDefaultUI: true, // Clean look
            styles: [
              {
                featureType: "poi",
                stylers: [{ visibility: "off" }],
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setPlaces([]);
    setActivePlaceIndex(null);
    
    // Limpar markers antigos
    markersRef.current.forEach((marker: any) => marker.setMap(null));
    markersRef.current = [];

    const suggestions = await getExploreSuggestions(query);
    setPlaces(suggestions);
    setLoading(false);

    if (mapInstanceRef.current && suggestions.length > 0) {
      const loader = new Loader({
        apiKey: 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM', 
        version: "weekly",
      });
      
      await (loader as any).load();
      const Marker = google.maps.Marker;
      const LatLngBounds = google.maps.LatLngBounds;

      const bounds = new LatLngBounds();

      suggestions.forEach((place, index) => {
        const marker = new Marker({
          position: { lat: place.lat, lng: place.lng },
          map: mapInstanceRef.current,
          title: place.name,
          label: {
             text: (index + 1).toString(),
             color: "white",
             fontSize: "14px",
             fontWeight: "bold"
          },
          animation: (window as any).google.maps.Animation.DROP
        });
        
        // Adicionar listener de clique no marker
        marker.addListener("click", () => {
          setActivePlaceIndex(index);
          mapInstanceRef.current.panTo({ lat: place.lat, lng: place.lng });
          mapInstanceRef.current.setZoom(15);
        });
        
        markersRef.current.push(marker);
        bounds.extend({ lat: place.lat, lng: place.lng });
      });

      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  const focusOnPlace = (index: number) => {
    setActivePlaceIndex(index);
    const place = places[index];
    if (mapInstanceRef.current && place) {
      mapInstanceRef.current.panTo({ lat: place.lat, lng: place.lng });
      mapInstanceRef.current.setZoom(15);
      
      // Animate marker bounce
      const marker = markersRef.current[index];
      if (marker) {
        marker.setAnimation((window as any).google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1400);
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] shadow-xl bg-slate-50 border border-slate-100 h-[500px]">
      
      {/* 1. MAPA (Fundo) */}
      <div className="absolute inset-0 z-0">
         <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* 2. SEARCH BAR FLUTUANTE (Topo) */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <form onSubmit={handleSearch} className="relative shadow-lg rounded-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-12 py-3.5 bg-white/95 backdrop-blur-md border-none text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl text-sm font-medium shadow-sm"
            placeholder="Para onde vamos, amor?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute inset-y-1 right-1 flex items-center justify-center px-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-md"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

      {/* 3. LOADING OVERLAY */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in">
          <div className="bg-white p-4 rounded-full shadow-2xl mb-3">
             <Navigation className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
          <p className="text-sm font-bold text-slate-600 bg-white/80 px-3 py-1 rounded-full">Procurando lugares mágicos...</p>
        </div>
      )}

      {/* 4. CARDS DE SUGESTÃO (Carrossel Inferior) */}
      {places.length > 0 && !loading && (
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar snap-x snap-mandatory">
            {places.map((place, idx) => (
              <button
                key={idx}
                onClick={() => focusOnPlace(idx)}
                className={`snap-center flex-shrink-0 w-[240px] bg-white p-3 rounded-2xl shadow-lg border transition-all duration-300 text-left relative overflow-hidden group ${
                  activePlaceIndex === idx 
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 scale-100' 
                    : 'border-white/50 opacity-90 scale-95'
                }`}
              >
                {/* Badge Number */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
                  {idx + 1}
                </div>

                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide mb-2 ${getCategoryColor(place.type)}`}>
                      {getCategoryIcon(place.type)}
                      {place.type || 'Geral'}
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2">
                      {place.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-medium text-indigo-600">
                     <MapPin className="w-3 h-3" />
                     Ver no mapa
                  </div>
                </div>
              </button>
            ))}
            {/* Spacer para garantir que o último item seja visível */}
            <div className="w-2 flex-shrink-0"></div>
          </div>
        </div>
      )}
      
      {/* Estado vazio bonito */}
      {places.length === 0 && !loading && (
         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white via-white/80 to-transparent flex flex-col justify-end p-6 pointer-events-none">
            <div className="flex items-center gap-3 opacity-60 mb-2">
               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center"><Utensils className="w-4 h-4 text-orange-500" /></div>
               <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"><TreePine className="w-4 h-4 text-emerald-500" /></div>
               <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center"><PartyPopper className="w-4 h-4 text-purple-500" /></div>
            </div>
            <p className="text-slate-500 text-xs font-medium max-w-[200px]">
              Digite uma cidade (ex: "Campos do Jordão") e descubra roteiros perfeitos para casais.
            </p>
         </div>
      )}

    </div>
  );
};

export default ExploreMap;
