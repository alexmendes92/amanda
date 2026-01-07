import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Moon, CloudLightning, Wind, MapPin } from 'lucide-react';
import { getWeather, getWeatherDescription, getTrainingAdvice } from '../services/weatherService';
import { WeatherData } from '../types';

const WeatherWidget: React.FC = () => {
  const [dataIndaiatuba, setDataIndaiatuba] = useState<WeatherData | null>(null);
  const [dataSP, setDataSP] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        const [indaia, sp] = await Promise.all([
          getWeather('indaiatuba'),
          getWeather('saopaulo')
        ]);
        setDataIndaiatuba(indaia);
        setDataSP(sp);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeather();
  }, []);

  const getWeatherIcon = (code: number, isDay: boolean) => {
    // Rain
    if (code >= 51 || code >= 80) return <CloudRain className="w-8 h-8 text-blue-400" />;
    // Thunder
    if (code >= 95) return <CloudLightning className="w-8 h-8 text-purple-500" />;
    // Clouds
    if (code >= 1 && code <= 3) return <Cloud className="w-8 h-8 text-slate-400" />;
    
    // Clear
    return isDay ? <Sun className="w-8 h-8 text-yellow-500" /> : <Moon className="w-8 h-8 text-indigo-300" />;
  };

  if (loading) return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {/* Amanda's Card (Indaiatuba) */}
      <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10">
           <MapPin className="w-12 h-12" />
        </div>
        
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Você (Indaiatuba)</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{dataIndaiatuba?.temp}°</span>
            {dataIndaiatuba && getWeatherIcon(dataIndaiatuba.conditionCode, dataIndaiatuba.isDay)}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {dataIndaiatuba && getWeatherDescription(dataIndaiatuba.conditionCode)}
          </p>
          
          {/* Advice Badge */}
          <div className="mt-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 border border-blue-50">
             <p className="text-[10px] text-slate-600 leading-tight">
               {dataIndaiatuba && getTrainingAdvice(dataIndaiatuba.conditionCode, dataIndaiatuba.temp)}
             </p>
          </div>
        </div>
      </div>

      {/* Alex's Card (SP) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ele (São Paulo)</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-700">{dataSP?.temp}°</span>
            {dataSP && getWeatherIcon(dataSP.conditionCode, dataSP.isDay)}
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {dataSP && getWeatherDescription(dataSP.conditionCode)}
          </p>
          <div className="mt-3 h-8 flex items-end">
             <p className="text-[10px] text-slate-400">
               {dataSP?.conditionCode && (dataSP.conditionCode >= 51 || dataSP.conditionCode >= 80) 
                 ? "Vai chover lá ☔" 
                 : "Tá tranquilo lá 👍"}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
