
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

/**
 * Adicionar uma nova conquista ao usuário
 * @param userId ID do usuário
 * @param achievementId ID da conquista a ser desbloqueada
 * @returns true se bem-sucedido, false caso contrário
 */
export const unlockAchievement = async (userId: string, achievementId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        badge_id: achievementId,
        name: `Achievement ${achievementId}`,
        description: `You've unlocked achievement ${achievementId}`
      });
      
    if (error) {
      console.error('Erro ao desbloquear conquista:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao desbloquear conquista:', error);
    return false;
  }
};

/**
 * Obtém todas as conquistas do usuário
 * @param userId ID do usuário
 * @returns Lista de conquistas
 */
export const getAchievements = async (userId: string): Promise<Achievement[]> => {
  return checkAchievements(userId);
};
