
import { supabase } from '@/integrations/supabase/client';

/**
 * Obter o progresso semanal do usuário
 */
export const getWeeklyProgress = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('week_progress')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao obter progresso semanal:', error);
      return 0;
    }
    
    return data?.week_progress || 0;
  } catch (error) {
    console.error('Erro ao obter progresso semanal:', error);
    return 0;
  }
};
