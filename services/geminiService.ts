import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, ensure API_KEY is handled via backend proxy or strict environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

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
