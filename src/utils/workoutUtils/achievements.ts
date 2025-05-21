
import { supabase } from '@/integrations/supabase/client';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_id: string;
  image_url?: string;
  unlocked_at: string;
}

/**
 * Verifica conquistas do usuário e desbloqueia novas se necessário
 */
export const checkAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    // Implementação básica para evitar erros
    return await getAchievements(userId);
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
    return [];
  }
};

/**
 * Desbloqueia uma nova conquista para o usuário
 */
export const unlockAchievement = async (userId: string, badge_id: string, name: string, description: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        badge_id,
        name,
        description,
        unlocked_at: new Date().toISOString()
      });
      
    return !error;
  } catch (error) {
    console.error('Erro ao desbloquear conquista:', error);
    return false;
  }
};

/**
 * Busca todas as conquistas do usuário
 */
export const getAchievements = async (userId: string): Promise<Achievement[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error);
    return [];
  }
};
