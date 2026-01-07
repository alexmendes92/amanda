import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

interface MapWidgetProps {
  lat: number;
  lng: number;
  label?: string;
}

const MapWidget: React.FC<MapWidgetProps> = ({ lat, lng, label }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        // Explicitly use the key provided in firebaseConfig which usually supports Maps
        // Removing process.env.API_KEY to avoid conflict with GenAI keys
        apiKey: 'AIzaSyDeiFzYLw8Z4Bo_BebAnJ_eYO_OGyBLdQU',
        version: "weekly",
      });

      try {
        const { Map } = await loader.importLibrary("maps") as any;
        const { Marker } = await loader.importLibrary("marker") as any;

        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: { lat, lng },
            zoom: 15,
            disableDefaultUI: true, // Clean look for the widget
            zoomControl: true,
            mapId: "DEMO_MAP_ID", // Required for AdvancedMarkerElement if needed, or standard map
          });

          new Marker({
            position: { lat, lng },
            map: map,
            title: label,
            animation: (window as any).google.maps.Animation.DROP
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [lat, lng, label]);

  return (
    <div className="w-full h-48 bg-slate-100 rounded-xl overflow-hidden relative shadow-inner">
      <div ref={mapRef} className="w-full h-full" />
      {/* Fallback/Loading state purely visual if JS takes a moment */}
      <div className="absolute inset-0 bg-slate-100 -z-10 flex items-center justify-center text-slate-400 text-xs">
        Carregando mapa...
      </div>
    </div>
  );
};

export default MapWidget;