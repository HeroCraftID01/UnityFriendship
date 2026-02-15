
export enum AnalysisType {
  SENTIMENT = 'Analisa Sentimen Tim',
  PERFORMANCE = 'Evaluasi Kinerja Individu',
  CONFLICT = 'Prediksi Konflik',
}

export interface RecommendedAction {
  action: string;
}

export interface Analytics {
  "environment-score": number;
  "person-behaviour": string;
  "danger-chat": string;
}

export interface AnalysisResult {
  title?: string; // Local helper for UI display
  "executive-summary": string;
  analytics: Analytics;
  "recommended-action": RecommendedAction[];
}

export interface HistoryItem {
  id: string;
  title: string;
  type: AnalysisType;
  date: string;
  result: AnalysisResult;
}

export interface User {
  name: string;
  plan: string;
  avatarLetter: string;
}

export type ViewType = 'dashboard' | 'history';
