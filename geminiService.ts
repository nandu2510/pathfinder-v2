

import { GoogleGenAI, Type } from "@google/genai";

// Strictly following initialization guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async discoverCareer(interests: string[], goals: string) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on my interests: ${interests.join(', ')} and my career goals: ${goals}, what are the top 3 best career paths for me from the tech industry? Provide reasons for each. Return response in a JSON format with 'roles' array of objects having 'role', 'reason', and 'fitScore'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  fitScore: { type: Type.NUMBER }
                },
                required: ['role', 'reason', 'fitScore']
              }
            }
          }
        }
      }
    });
    // Correctly using .text property instead of .text() method
    const text = response.text || '{}';
    return JSON.parse(text);
  },

  async getAiTips(role: string, progress: number) {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I am learning to be a ${role} and I am ${progress}% complete with my roadmap. Give me 3 actionable tips for today to stay productive and learn effectively. Keep it motivational.`,
    });
    // Correctly using .text property
    return response.text;
  },

  async chatWithMentor(message: string, userProfile: any, chatHistory: any[]) {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are EduPath Mentor, a friendly and motivational AI career coach for students. You help with ${userProfile.careerGoal} roadmaps, time management, and learning doubts. Always be encouraging and provide structured advice.`,
      },
    });

    // sendMessage expects message parameter
    const response = await chat.sendMessage({ message });
    // Correctly using .text property
    return response.text;
  }
};
