

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

export const getMotivationQuote = async (type: 'classic' | 'funk'): Promise<{ quote: string, author: string }> => {
  try {
    const model = 'gemini-3-flash-preview';
    let prompt = '';
    
    if (type === 'classic') {
      prompt = `
        Gere uma citação curta e poderosa de um filósofo estóico ou clássico (Sêneca, Marco Aurélio, Epicteto, Platão).
        A citação deve ser sobre resiliência, autodomínio, felicidade ou virtude.
        Traduza para o português do Brasil.
        Retorne em JSON: { "quote": "...", "author": "..." }
      `;
    } else { // funk
      prompt = `
        Gere uma frase curta, engraçada e com um toque de 'putaria leve' ou flerte, no estilo de uma letra de funk brasileiro (Ex: MC Ryan SP, MC Hariel, Kayblack, Vulgo FK, MC Cabelinho).
        O tom deve ser de uma "cantada de baile funk", algo que um funkeiro diria para a namorada.
        Deve ser engraçado e ousado, mas SEM usar palavras de baixo calão ou ser desrespeitoso.
        Foco: humor, flerte, um pouco de 'putaria' na brincadeira.
        Retorne em JSON: { "quote": "...", "author": "..." }
      `;
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text);

  } catch (error) {
    console.error("Motivation Error:", error);
    if (type === 'classic') {
      return {
        quote: "A felicidade da sua vida depende da qualidade dos seus pensamentos.",
        author: "Marco Aurélio"
      };
    } else {
      return {
        quote: "Se o plano A não funciona, o alfabeto tem mais 25 letras. E a 'P' é de putaria.",
        author: "Poeta Desconhecido"
      };
    }
  }
};