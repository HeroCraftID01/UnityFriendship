
export enum AnalysisType {
  SENTIMENT = 'Analisa Sentimen Tim',
  PERFORMANCE = 'Evaluasi Kinerja Individu',
  CONFLICT = 'Prediksi Konflik',
}

export interface HistoryItem {
  id: string;
  title: string;
  type: AnalysisType;
  date: string;
  result: AnalysisResult;
}

export interface AnalysisResult {
  title: string;
  summary: string;
  recommendations: string[];
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export interface User {
  name: string;
  plan: string;
  avatarLetter: string;
}

export type ViewType = 'dashboard' | 'history';
