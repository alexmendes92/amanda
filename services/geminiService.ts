
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, ensure API_KEY is handled via backend proxy or strict environment variables.
// Using the token specifically asked for consuming APIs as fallback
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'AIzaSyDZk_tY0pjDrAOWH1-t4a6chhHIUh43icM' });

export const getDailyDevotional = async (): Promise<{ verse: string; reflection: string }> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Gere um versículo bíblico encorajador para um casal cristão (Católico) e uma reflexão curta e carinhosa de 2 frases.
      Foco: Amor, paciência, construção de família ou confiança em Deus.
      Retorne em JSON: { "verse": "...", "reflection": "..." }
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      verse: "O amor é paciente, o amor é bondoso. (1 Coríntios 13:4)",
      reflection: "Que hoje possamos exercitar a paciência e a bondade um com o outro, lembrando que Deus nos uniu."
    };
  }
};

export const getSleepAdvice = async (hours: number): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      O namorado (Alex) dormiu apenas ${hours} horas hoje.
      Escreva uma mensagem curta (max 20 palavras) e carinhosa que a namorada (Amanda) poderia mandar para ele agora para animá-lo e lembrá-lo de descansar.
      Tom: Carinhoso, preocupado, mas leve.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Amor, vi que dormiu pouco. Tente descansar hoje, me preocupo com você! ❤️";
  } catch (error) {
    return "Amor, vi que dormiu pouco. Tente descansar um pouquinho hoje!";
  }
};

export const getDateSuggestion = async (weather: string, mood: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview'; 
    const prompt = `
      Atue como um conselheiro amoroso para um casal (Alex e Amanda).
      O clima hoje está: ${weather}.
      A vibe/humor do casal é: ${mood}.
      
      Sugira 3 opções criativas de "Dates" (encontros) para eles fazerem hoje.
      1. Uma opção caseira/tranquila.
      2. Uma opção para sair/fazer algo diferente.
      3. Uma opção romântica surpresa.
      
      Use emojis, seja breve e direto. Formate como uma lista bonita.
    `;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Que tal pedir uma pizza e assistir um filme abraçadinhos?";
  } catch (error) {
    console.error("Gemini Date Error:", error);
    return "1. Noite de Fondue em casa 🧀\n2. Cinema Drive-in improvisado na sala 🎬\n3. Observar as estrelas no quintal ✨";
  }
};

export const getPlaylistSuggestion = async (vibe: string): Promise<any[]> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Crie uma playlist de 5 músicas para a Amanda.
      
      Gosto musical dela:
      1. Rock (Clássico, Alternativo, Pop Rock).
      2. Boyce Avenue (Covers acústicos/românticos).
      
      Contexto/Vibe do momento: ${vibe}.
      
      Regras:
      - Misture músicas de Rock com covers do Boyce Avenue.
      - Se a vibe for romântica, foque em Boyce Avenue e baladas de Rock.
      - Se a vibe for animada, foque em Rock mais agitado.
      
      Retorne APENAS um JSON array neste formato:
      [
        { "title": "Nome da Música", "artist": "Nome do Artista", "reason": "Uma frase curta explicando a escolha" }
      ]
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Playlist Error:", error);
    return [
      { title: "Iris", artist: "Goo Goo Dolls", reason: "Um clássico do rock romântico que nunca falha." },
      { title: "Photograph", artist: "Boyce Avenue (Cover)", reason: "Versão acústica perfeita para o momento." },
      { title: "Yellow", artist: "Coldplay", reason: "Para acalmar o coração." }
    ];
  }
};

export const getExploreSuggestions = async (location: string): Promise<any[]> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      O usuário quer sugestões de lugares românticos ou divertidos para um casal visitar em: ${location}.
      Sugira 4 lugares específicos.
      
      Para cada lugar, você DEVE estimar a latitude e longitude (lat, lng) aproximadas.
      
      Retorne APENAS um JSON array neste formato:
      [
        { 
          "name": "Nome do Lugar", 
          "description": "Breve descrição (max 10 palavras)", 
          "lat": -23.1234, 
          "lng": -46.1234,
          "type": "food" | "nature" | "fun"
        }
      ]
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Explore Error:", error);
    return [];
  }
};
