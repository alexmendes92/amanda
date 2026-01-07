
import React, { useState, useRef, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { Search, MapPin, Navigation, Star } from 'lucide-react';
import { getExploreSuggestions } from '../services/geminiService';

const ExploreMap: React.FC = () => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Inicializa o Mapa (Vazio ou com default)
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM',
        version: "weekly",
      });

      try {
        const { Map } = await loader.importLibrary("maps") as any;
        
        if (mapRef.current && !mapInstanceRef.current) {
          mapInstanceRef.current = new Map(mapRef.current, {
            center: { lat: -23.5505, lng: -46.6333 }, // Default SP
            zoom: 10,
            disableDefaultUI: true,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
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
    
    // Limpar markers antigos
    markersRef.current.forEach((marker: any) => marker.setMap(null));
    markersRef.current = [];

    // 1. Buscar sugestões na IA
    const suggestions = await getExploreSuggestions(query);
    setPlaces(suggestions);
    setLoading(false);

    // 2. Plotar no Mapa
    if (mapInstanceRef.current && suggestions.length > 0) {
      const loader = new Loader({
        apiKey: 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM', 
        version: "weekly",
      });
      const { Marker } = await loader.importLibrary("marker") as any;
      const { LatLngBounds } = await loader.importLibrary("core") as any;

      const bounds = new LatLngBounds();

      suggestions.forEach((place, index) => {
        const marker = new Marker({
          position: { lat: place.lat, lng: place.lng },
          map: mapInstanceRef.current,
          title: place.name,
          label: {
             text: (index + 1).toString(),
             color: "white",
             fontSize: "12px",
             fontWeight: "bold"
          },
          animation: (window as any).google.maps.Animation.DROP
        });
        
        markersRef.current.push(marker);
        bounds.extend({ lat: place.lat, lng: place.lng });
      });

      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-indigo-500" />
          Mapa de Aventuras
        </h3>
        <p className="text-xs text-slate-500 mb-4">Digite uma cidade e veja o que fazer!</p>
        
        <form onSubmit={handleSearch} className="relative mb-4">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: Campos do Jordão, Monte Verde..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bg-indigo-600 text-white p-1.5 rounded-lg text-xs font-bold disabled:opacity-50"
          >
            {loading ? '...' : 'Ir'}
          </button>
        </form>

        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-100 mb-4 shadow-inner">
           <div ref={mapRef} className="w-full h-full" />
           {loading && (
             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
               <div className="flex flex-col items-center">
                 <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                 <span className="text-xs font-bold text-indigo-600">Consultando o Guia...</span>
               </div>
             </div>
           )}
        </div>

        {places.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sugestões</p>
            {places.map((place, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{place.name}</h4>
                  <p className="text-xs text-slate-500 leading-tight">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreMap;
