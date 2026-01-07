
import { DetailedWeather, WeatherDay, WeatherHour } from "../types";

// Coordinates
const LOCATIONS = {
  indaiatuba: { lat: -23.0903, lon: -47.2181, name: "Indaiatuba" },
  saopaulo: { lat: -23.5505, lon: -46.6333, name: "São Paulo" }
};

export const getDetailedWeather = async (location: 'indaiatuba' | 'saopaulo'): Promise<DetailedWeather> => {
  const { lat, lon, name } = LOCATIONS[location];
  
  try {
    // Fetch Completo: Current, Hourly (24h), Daily (7d)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&timezone=America%2FSao_Paulo`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    
    // Process Hourly Data (Next 24 hours only)
    const currentHourIndex = new Date().getHours();
    const hourly: WeatherHour[] = data.hourly.time
      .slice(currentHourIndex, currentHourIndex + 24)
      .map((timeStr: string, index: number) => ({
        time: timeStr.split('T')[1].substring(0, 5),
        temp: Math.round(data.hourly.temperature_2m[currentHourIndex + index]),
        conditionCode: data.hourly.weather_code[currentHourIndex + index],
        isDay: data.hourly.is_day[currentHourIndex + index] === 1
      }));

    // Process Daily Data (Next 7 days)
    const daily: WeatherDay[] = data.daily.time.map((timeStr: string, index: number) => {
        const date = new Date(timeStr);
        const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
        return {
            date: index === 0 ? 'Hoje' : dayName.charAt(0).toUpperCase() + dayName.slice(1),
            max: Math.round(data.daily.temperature_2m_max[index]),
            min: Math.round(data.daily.temperature_2m_min[index]),
            conditionCode: data.daily.weather_code[index],
            rainProb: data.daily.precipitation_probability_max[index]
        };
    });

    return {
      current: {
        temp: Math.round(data.current.temperature_2m),
        conditionCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        uvIndex: Math.round(data.daily.uv_index_max[0]), // Using max UV of today
        feelsLike: Math.round(data.current.apparent_temperature)
      },
      hourly,
      daily,
      locationName: name,
      sunrise: data.daily.sunrise[0].split('T')[1].substring(0, 5),
      sunset: data.daily.sunset[0].split('T')[1].substring(0, 5)
    };
  } catch (error) {
    console.error("Error fetching detailed weather:", error);
    // Fallback Mock Data
    return {
      current: { temp: 25, conditionCode: 0, isDay: true, humidity: 60, windSpeed: 10, uvIndex: 5, feelsLike: 27 },
      hourly: [],
      daily: [],
      locationName: name,
      sunrise: "06:00",
      sunset: "18:00"
    };
  }
};

export const getWeatherDescription = (code: number): string => {
  if (code === 0) return "Céu Limpo";
  if (code >= 1 && code <= 3) return "Nublado";
  if (code >= 45 && code <= 48) return "Nevoeiro";
  if (code >= 51 && code <= 67) return "Chuva Leve";
  if (code >= 80 && code <= 99) return "Tempestade";
  return "Nublado";
};

export const getWeatherAdvice = (code: number, temp: number): string => {
  if (code >= 80) return "⛈️ Cuidado! Temporal. Fique em casa agarradinho.";
  if (code >= 51) return "☔ Leve guarda-chuva, vai molhar!";
  if (temp > 30) return "🔥 Calorão! Água, protetor e ar condicionado.";
  if (temp < 15) return "❄️ Friozinho bom para vinho e edredom.";
  if (code === 0 && temp >= 20 && temp <= 28) return "☀️ Dia perfeito! Ótimo para passear.";
  return "☁️ Clima tranquilo, vida normal.";
};
