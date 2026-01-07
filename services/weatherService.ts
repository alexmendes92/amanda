import { WeatherData } from "../types";

// Coordinates
const LOCATIONS = {
  indaiatuba: { lat: -23.0903, lon: -47.2181, name: "Indaiatuba" },
  saopaulo: { lat: -23.5505, lon: -46.6333, name: "São Paulo" }
};

export const getWeather = async (location: 'indaiatuba' | 'saopaulo'): Promise<WeatherData> => {
  try {
    const { lat, lon, name } = LOCATIONS[location];
    
    // Using Open-Meteo API (Free, no key required, high accuracy)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=America%2FSao_Paulo`
    );

    if (!response.ok) throw new Error("Weather fetch failed");

    const data = await response.json();
    
    return {
      temp: Math.round(data.current.temperature_2m),
      conditionCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
      locationName: name
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    // Fallback data in case of error
    return {
      temp: 25,
      conditionCode: 0,
      isDay: true,
      locationName: location === 'indaiatuba' ? "Indaiatuba" : "São Paulo"
    };
  }
};

export const getWeatherDescription = (code: number): string => {
  // WMO Weather interpretation codes
  if (code === 0) return "Céu limpo";
  if (code >= 1 && code <= 3) return "Parcialmente nublado";
  if (code >= 45 && code <= 48) return "Nevoeiro";
  if (code >= 51 && code <= 67) return "Chuva leve";
  if (code >= 80 && code <= 99) return "Pancadas de chuva";
  if (code >= 71) return "Neve (Raro!)";
  return "Nublado";
};

export const getTrainingAdvice = (code: number, temp: number): string => {
  if (code >= 51 || code >= 80) return "☔ Dia de chuva! Melhor treinar na academia.";
  if (temp > 30) return "🔥 Muito quente! Hidrate-se e evite sol direto.";
  if (temp < 15) return "❄️ Friozinho! Aqueça bem antes de começar.";
  return "🌳 Tempo perfeito para um cardio ao ar livre!";
};
