
import { createClient } from '@supabase/supabase-js';
import { HistoryItem, AnalysisType, AnalysisResult } from '../types';

const supabaseUrl = 'https://gfyzcdfsprzmnpufubmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmeXpjZGZzcHJ6bW5wdWZ1Ym1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNzA4OTYsImV4cCI6MjA4NjY0Njg5Nn0.uPitmpUCGhhefDsgCI4XDeytl3Q66a6RZQB1gprzXos';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TABLE_NAME = 'analysis_result';

/**
 * Helper function to deep parse JSON strings.
 * Supabase sometimes returns JSON columns as string if they were inserted as stringified.
 */
const deepParseJSON = (input: any): any => {
  if (typeof input !== 'string') return input;
  try {
    const parsed = JSON.parse(input);
    // If the result is still a string, parse again (handle double serialization)
    if (typeof parsed === 'string') return deepParseJSON(parsed);
    return parsed;
  } catch (e) {
    return input;
  }
};

export const saveAnalysisToDB = async (title: string, type: AnalysisType, result: AnalysisResult) => {
  const payload = {
    conversation_title: title,
    // We save as object, Supabase will handle the rest
    conversation_analysis_result: {
      ...result,
      meta_type: type
    }
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([payload])
    .select();

  if (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  }
  return data;
};

export const fetchHistoryFromDB = async (): Promise<HistoryItem[]> => {
  // We select everything to be safe with column names
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching from Supabase:', error);
    return [];
  }

  console.log('Raw data from Supabase:', data); // Helper for debugging

  return (data || []).map((row: any): HistoryItem => {
    // Check both potential column names
    let rawResult = row.conversation_analysis_result || row.analysis_result;
    
    // Use the robust deep parse helper
    const resultData = deepParseJSON(rawResult);

    const formattedDate = row.created_at 
      ? new Date(row.created_at).toLocaleString('id-ID', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) 
      : 'Baru saja';

    return {
      id: row.id.toString(),
      title: row.conversation_title || 'Analisa Tanpa Judul',
      type: resultData?.meta_type || AnalysisType.SENTIMENT,
      date: formattedDate,
      result: resultData || {}
    };
  });
};
