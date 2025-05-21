
import { supabase } from '@/integrations/supabase/client';

/**
 * Verifica se o usuário conquistou novas conquistas
 */
export const checkAchievements = async (userId: string): Promise<boolean> => {
  try {
    // Implementação para verificar conquistas do usuário
    const { data: stats } = await supabase
      .from('stats')
      .select('total_workouts, current_streak, longest_streak')
      .eq('user_id', userId)
      .single();

    if (!stats) return false;

    const hasNewAchievement = await checkNewAchievement(userId, stats);
    return hasNewAchievement;
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
    return false;
  }
};

/**
 * Verifica se o usuário conquistou uma nova conquista específica
 */
export const checkNewAchievement = async (userId: string, stats: any): Promise<boolean> => {
  try {
    // Regras para desbloquear conquistas
    const achievements = [
      { id: 'first_workout', condition: stats.total_workouts >= 1, name: 'Primeiro Treino', description: 'Completou seu primeiro treino!' },
      { id: 'streak_3', condition: stats.current_streak >= 3, name: 'Sequência de 3 dias', description: 'Treinou por 3 dias consecutivos!' },
      { id: 'streak_7', condition: stats.current_streak >= 7, name: 'Sequência de 7 dias', description: 'Treinou por uma semana completa!' },
      { id: 'streak_30', condition: stats.longest_streak >= 30, name: 'Sequência de 30 dias', description: 'Treinou por um mês consecutivo!' },
      { id: 'workouts_10', condition: stats.total_workouts >= 10, name: '10 Treinos', description: 'Completou 10 treinos!' },
      { id: 'workouts_50', condition: stats.total_workouts >= 50, name: '50 Treinos', description: 'Completou 50 treinos!' },
      { id: 'workouts_100', condition: stats.total_workouts >= 100, name: '100 Treinos', description: 'Completou 100 treinos!' },
    ];

    // Verificar conquistas já desbloqueadas
    const { data: unlockedAchievements } = await supabase
      .from('achievements')
      .select('badge_id')
      .eq('user_id', userId);

    const unlockedIds = unlockedAchievements?.map(a => a.badge_id) || [];

    // Verificar novas conquistas
    for (const achievement of achievements) {
      if (achievement.condition && !unlockedIds.includes(achievement.id)) {
        // Desbloquear nova conquista
        await unlockAchievement(userId, achievement.id, achievement.name, achievement.description);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error('Erro ao verificar nova conquista:', error);
    return false;
  }
};

/**
 * Desbloqueia uma conquista para o usuário
 */
export const unlockAchievement = async (
  userId: string, 
  badgeId: string, 
  name: string, 
  description: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        badge_id: badgeId,
        name,
        description,
        unlocked_at: new Date().toISOString()
      });

    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Erro ao desbloquear conquista:', error);
    return false;
  }
};

/**
 * Obtém todas as conquistas do usuário
 */
export const getAchievements = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });

    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Erro ao obter conquistas:', error);
    return [];
  }
};
