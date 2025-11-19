import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = (): Chat | null => {
  const ai = getAiClient();
  if (!ai) return null;

  // Using gemini-2.5-flash for quick, responsive chat interactions
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Você é um assistente virtual inteligente para o escritório de advocacia "Silva & Associados".
      
      Suas diretrizes são:
      1. Responda a perguntas gerais sobre direito brasileiro de forma educada, profissional e concisa.
      2. IMPORTANTE: Sempre inclua um aviso de que você é uma IA e que suas respostas não constituem aconselhamento jurídico oficial.
      3. Se o usuário perguntar sobre casos específicos ou pedir conselhos detalhados, recomende que agendem uma consulta com nossos advogados humanos através do formulário de contato.
      4. Mantenha um tom formal, empático e seguro.
      5. As áreas de atuação do escritório são: Direito Civil, Direito de Família, Direito Trabalhista e Direito Penal.
      `,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "Erro: Não foi possível conectar ao serviço de IA. Por favor, verifique a configuração da chave de API.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Desculpe, não consegui gerar uma resposta no momento.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.";
  }
};