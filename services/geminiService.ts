
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisType, AnalysisResult } from "../types";

export const startAnalysis = async (type: AnalysisType): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Lakukan analisa mendalam untuk kategori: ${type}. 
  Gunakan format JSON yang sangat spesifik berikut:
  {
    "executive-summary": "Penjelasan ringkas dalam bahasa Indonesia mengenai konteks chat.",
    "analytics": {
      "environment-score": (angka 0-100),
      "person-behaviour": "Deskripsi singkat perilaku (misal: Good, Bad, Neutral)",
      "danger-chat": "Analisa risiko dan bahaya dari percakapan tersebut."
    },
    "recommended-action": [
      { "action": "Tindakan rekomendasi 1" },
      { "action": "Tindakan rekomendasi 2" }
    ]
  }
  
  Pastikan "executive-summary" dan "danger-chat" menggunakan Bahasa Indonesia yang profesional.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            "executive-summary": { type: Type.STRING },
            analytics: {
              type: Type.OBJECT,
              properties: {
                "environment-score": { type: Type.NUMBER },
                "person-behaviour": { type: Type.STRING },
                "danger-chat": { type: Type.STRING }
              },
              required: ["environment-score", "person-behaviour", "danger-chat"]
            },
            "recommended-action": {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  action: { type: Type.STRING }
                },
                required: ["action"]
              }
            }
          },
          required: ["executive-summary", "analytics", "recommended-action"]
        }
      }
    });

    const jsonText = response.text || "";
    const parsed = JSON.parse(jsonText);
    return {
      ...parsed,
      title: type // Set title from type locally
    } as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return getMockResult(type);
  }
};

const getMockResult = (type: AnalysisType): AnalysisResult => {
  return {
    title: type,
    "executive-summary": "Ringkasan eksekutif simulasi: Tim menunjukkan koordinasi yang baik namun ada indikasi kelelahan kerja pada beberapa anggota.",
    analytics: {
      "environment-score": 75,
      "person-behaviour": "Good",
      "danger-chat": "Risiko konflik rendah, namun perlu antisipasi burnout."
    },
    "recommended-action": [
      { action: "Berikan waktu istirahat tambahan bagi tim." },
      { action: "Lakukan sesi apresiasi akhir pekan." }
    ]
  };
};
