
// Serviço para APIs Públicas Extras

// 1. CoinGecko API (Para o Widget Financeiro)
export const getBitcoinPrice = async (): Promise<number> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
    const data = await response.json();
    return data.bitcoin.brl;
  } catch (error) {
    console.error("Erro ao buscar BTC:", error);
    return 350000; // Fallback
  }
};

// 2. Quotable API (Para o Widget de Frases)
export const getDailyQuote = async (): Promise<{ content: string; author: string }> => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=love|happiness');
    const data = await response.json();
    return {
      content: data.content,
      author: data.author
    };
  } catch (error) {
    // Fallback se a API falhar
    return {
      content: "O amor é composto de uma única alma habitando dois corpos.",
      author: "Aristóteles"
    };
  }
};
