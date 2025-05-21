
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém o progresso do treino do usuário
 */
export const getWorkoutProgress = async (userId: string): Promise<number> => {
  try {
    const { data: stats, error } = await supabase
      .from('stats')
      .select('week_progress')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao obter progresso do treino:', error);
      return 0;
    }
    
    return stats?.week_progress || 0;
  } catch (error) {
    console.error('Erro ao obter progresso do treino:', error);
    return 0;
  }
};
