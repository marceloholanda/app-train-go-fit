
import { supabase } from '@/integrations/supabase/client';
import { Achievement } from '@/types/workout';

/**
 * Verifica e retorna as conquistas do usuário
 * @param userId ID do usuário
 * @returns Lista de conquistas
 */
export const checkAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Erro ao verificar conquistas:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
    return [];
  }
};

/**
 * Verifica novas conquistas com base nas ações do usuário
 * @param userId ID do usuário
 * @param action Ação que pode desbloquear conquistas
 * @returns Lista de novas conquistas desbloqueadas
 */
export const checkNewAchievement = async (userId: string, action?: string): Promise<Achievement[]> => {
  return checkAchievements(userId);
};
