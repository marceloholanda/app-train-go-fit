
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém o progresso semanal do usuário
 * @returns Objeto com treinos completados e total da semana
 */
export const getWorkoutsThisWeek = () => {
  return {
    completed: 0,
    total: 3
  };
};

/**
 * Obtém o progresso semanal do usuário em porcentagem
 * @param userId ID do usuário
 * @returns Número entre 0 e 100 representando o progresso
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

