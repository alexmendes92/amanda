
import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Moon, CloudLightning, Wind, MapPin, Droplets, Sunrise, Sunset, Umbrella, ThermometerSun, Eye } from 'lucide-react';
import { getDetailedWeather, getWeatherAdvice, getWeatherDescription } from '../services/weatherService';
import { DetailedWeather } from '../types';

const WeatherWidget: React.FC = () => {
  const [location, setLocation] = useState<'indaiatuba' | 'saopaulo'>('indaiatuba');
  const [data, setData] = useState<DetailedWeather | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getDetailedWeather(location);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [location]);

  const getWeatherIcon = (code: number, isDay: boolean, size: string = "w-6 h-6") => {
    if (code >= 95) return <CloudLightning className={`${size} text-purple-200 animate-pulse`} />;
    if (code >= 51 || code >= 80) return <CloudRain className={`${size} text-blue-300`} />;
    if (code >= 1 && code <= 3) return <Cloud className={`${size} text-slate-200`} />;
    if (!isDay) return <Moon className={`${size} text-indigo-200`} />;
    return <Sun className={`${size} text-amber-300 animate-[spin_10s_linear_infinite]`} />;
  };

  // Dynamic Background based on weather
  const getBgClass = () => {
    if (!data) return 'bg-slate-900';
    const { conditionCode, isDay } = data.current;
    
    if (conditionCode >= 51 || conditionCode >= 80) return 'bg-gradient-to-br from-slate-700 to-slate-900'; // Rain
    if (!isDay) return 'bg-gradient-to-br from-indigo-900 to-slate-900'; // Night
    if (conditionCode === 0) return 'bg-gradient-to-br from-sky-400 to-blue-600'; // Clear Day
    return 'bg-gradient-to-br from-slate-400 to-slate-600'; // Cloudy
  };

  return (
    <div className={`rounded-[2rem] p-5 shadow-xl text-white transition-all duration-700 relative overflow-hidden ${getBgClass()}`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      {/* 1. Header & Switcher */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-1.5 text-white/80">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-bold tracking-wide">{data?.locationName}</span>
        </div>
        
        {/* Switcher Pill */}
        <div className="bg-black/20 backdrop-blur-md p-1 rounded-full flex relative">
          <div 
            className={`absolute top-1 bottom-1 w-[48%] bg-white/20 rounded-full transition-all duration-300 ${location === 'indaiatuba' ? 'left-1' : 'left-[50%]'}`}
          ></div>
          <button 
            onClick={() => setLocation('indaiatuba')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors relative z-10 ${location === 'indaiatuba' ? 'text-white' : 'text-white/50'}`}
          >
            Amanda
          </button>
          <button 
            onClick={() => setLocation('saopaulo')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors relative z-10 ${location === 'saopaulo' ? 'text-white' : 'text-white/50'}`}
          >
            Alex
          </button>
        </div>
      </div>

      {loading || !data ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
          
          {/* 2. Hero Section */}
          <div className="text-center">
             <div className="flex justify-center mb-2 drop-shadow-lg">
                {getWeatherIcon(data.current.conditionCode, data.current.isDay, "w-20 h-20")}
             </div>
             <div className="flex justify-center items-end gap-2 mb-1">
               <span className="text-6xl font-bold tracking-tighter drop-shadow-md">{data.current.temp}°</span>
             </div>
             <p className="text-lg font-medium text-white/90">{getWeatherDescription(data.current.conditionCode)}</p>
             <div className="flex justify-center gap-3 text-sm text-white/70 mt-1">
                <span>Máx: {data.daily[0]?.max}°</span>
                <span>Mín: {data.daily[0]?.min}°</span>
                <span>S. Térmica: {data.current.feelsLike}°</span>
             </div>
             
             {/* AI Advice Pill */}
             <div className="mt-4 inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-xs font-medium text-white/90">
                  {getWeatherAdvice(data.current.conditionCode, data.current.temp)}
                </p>
             </div>
          </div>

          {/* 3. Hourly Forecast (Scrollable) */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest pl-1">Próximas 24h</p>
            <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
               {data.hourly.map((hour, idx) => (
                 <div key={idx} className="flex-none flex flex-col items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-3 w-16 min-h-[90px] border border-white/5 snap-start">
                    <span className="text-xs font-medium text-white/70">{hour.time}</span>
                    {getWeatherIcon(hour.conditionCode, hour.isDay, "w-6 h-6")}
                    <span className="text-sm font-bold">{hour.temp}°</span>
                 </div>
               ))}
            </div>
          </div>

          {/* 4. Detailed Grid */}
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white/50 mb-2">
                   <Droplets className="w-4 h-4" />
                   <span className="text-[10px] uppercase font-bold">Umidade</span>
                </div>
                <span className="text-2xl font-bold">{data.current.humidity}%</span>
             </div>
             <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white/50 mb-2">
                   <Wind className="w-4 h-4" />
                   <span className="text-[10px] uppercase font-bold">Vento</span>
                </div>
                <span className="text-2xl font-bold">{data.current.windSpeed} <span className="text-xs font-normal">km/h</span></span>
             </div>
             <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white/50 mb-2">
                   <ThermometerSun className="w-4 h-4" />
                   <span className="text-[10px] uppercase font-bold">Índice UV</span>
                </div>
                <div className="flex items-baseline gap-1">
                   <span className="text-2xl font-bold">{data.current.uvIndex}</span>
                   <span className="text-[10px] text-white/50">{data.current.uvIndex > 5 ? 'Alto' : 'Baixo'}</span>
                </div>
             </div>
             <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white/50 mb-2">
                   {data.current.isDay ? <Sunset className="w-4 h-4" /> : <Sunrise className="w-4 h-4" />}
                   <span className="text-[10px] uppercase font-bold">{data.current.isDay ? 'Pôr do Sol' : 'Nascer'}</span>
                </div>
                <span className="text-xl font-bold">{data.current.isDay ? data.sunset : data.sunrise}</span>
             </div>
          </div>

          {/* 5. 7-Day Forecast */}
          <div className="bg-black/20 rounded-3xl p-4 backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-3 text-white/50">
               <Eye className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Previsão 7 Dias</span>
             </div>
             <div className="space-y-3">
               {data.daily.map((day, idx) => (
                 <div key={idx} className="flex items-center justify-between">
                    <span className="w-10 text-sm font-bold text-white/90">{day.date}</span>
                    <div className="flex flex-col items-center flex-1">
                       <div className="flex items-center gap-1">
                          {day.rainProb > 0 && (
                            <span className="text-[10px] text-blue-300 font-bold">{day.rainProb}%</span>
                          )}
                          {getWeatherIcon(day.conditionCode, true, "w-5 h-5")}
                       </div>
                    </div>
                    <div className="flex gap-3 text-sm w-24 justify-end">
                       <span className="text-white/50 font-medium">{day.min}°</span>
                       <div className="w-16 h-1 bg-white/10 rounded-full self-center relative">
                          <div className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-300 to-yellow-300 rounded-full opacity-50 w-full"></div>
                       </div>
                       <span className="text-white font-bold">{day.max}°</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
