
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisType, AnalysisResult } from "../types";

export const startAnalysis = async (type: AnalysisType): Promise<AnalysisResult> => {
  // Always initialize with the direct process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Lakukan analisa mendalam untuk kategori: ${type}. 
  Berikan laporan yang profesional dalam format JSON. 
  Laporan harus mencakup ringkasan eksekutif, 3 metrik utama dengan tren, dan 4 rekomendasi strategis.
  Bahasa: Indonesia.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            metrics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  trend: { 
                    type: Type.STRING,
                    description: "Hanya gunakan: 'up', 'down', atau 'stable'" 
                  }
                },
                required: ["label", "value", "trend"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "summary", "metrics", "recommendations"]
        }
      }
    });

    const jsonText = response.text || "";
    return JSON.parse(jsonText) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or is not configured
    return getMockResult(type);
  }
};

const getMockResult = (type: AnalysisType): AnalysisResult => {
  return {
    title: `Laporan ${type}`,
    summary: `Berdasarkan data historis terbaru, tim menunjukkan stabilitas yang kuat meskipun terdapat beberapa area yang membutuhkan perhatian. Fokus pada kolaborasi lintas divisi menjadi kunci utama untuk kuartal mendatang.`,
    metrics: [
      { label: "Skor Kepuasan", value: "8.4/10", trend: "up" },
      { label: "Produktivitas", value: "92%", trend: "stable" },
      { label: "Risiko Konflik", value: "Rendah", trend: "down" }
    ],
    recommendations: [
      "Tingkatkan frekuensi sesi feedback 1-on-1.",
      "Lakukan workshop resolusi konflik tim secara berkala.",
      "Optimalkan penggunaan tools kolaborasi digital.",
      "Berikan apresiasi publik untuk pencapaian mingguan."
    ]
  };
};
