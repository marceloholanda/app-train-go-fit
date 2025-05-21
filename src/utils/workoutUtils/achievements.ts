
import { supabase } from '@/integrations/supabase/client';

export interface Achievement {
  id: string;
  badge_id: string;
  name: string;
  description: string;
  image_url: string;
  unlocked_at: string;
}

/**
 * Verifica e desbloqueia conquistas com base em um evento específico
 */
export const checkAndUnlockAchievement = async (
  eventType: 'workout_completed' | 'streak' | 'level_up', 
  value: number
) => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      return null;
    }
    
    const userId = session.session.user.id;
    
    // Verificar quais conquistas podem ser desbloqueadas
    const possibleAchievements = getAchievementsForEvent(eventType, value);
    if (!possibleAchievements.length) return null;
    
    // Verificar conquistas já desbloqueadas
    const { data: existingAchievements } = await supabase
      .from('achievements')
      .select('badge_id')
      .eq('user_id', userId);
      
    const unlockedBadgeIds = existingAchievements?.map(a => a.badge_id) || [];
    
    // Filtrar conquistas que ainda não foram desbloqueadas
    const newAchievements = possibleAchievements.filter(
      achievement => !unlockedBadgeIds.includes(achievement.badge_id)
    );
    
    if (newAchievements.length === 0) return null;
    
    // Adicionar novas conquistas
    const achievementsToInsert = newAchievements.map(achievement => ({
      user_id: userId,
      badge_id: achievement.badge_id,
      name: achievement.name,
      description: achievement.description,
      image_url: achievement.image_url
    }));
    
    const { error } = await supabase
      .from('achievements')
      .insert(achievementsToInsert);
      
    if (error) {
      console.error('[TrainGO] Error unlocking achievements:', error);
      return null;
    }
    
    // Retornar a primeira nova conquista desbloqueada
    return newAchievements[0];
  } catch (error) {
    console.error('[TrainGO] Error checking achievements:', error);
    return null;
  }
};

/**
 * Retorna conquistas que podem ser desbloqueadas para um evento específico
 */
function getAchievementsForEvent(eventType: string, value: number) {
  const achievements: {
    badge_id: string;
    name: string;
    description: string;
    image_url: string;
  }[] = [];
  
  if (eventType === 'workout_completed') {
    // Conquistas baseadas em treinos completados
    if (value === 1) {
      achievements.push({
        badge_id: 'first_workout',
        name: 'Primeiro Treino',
        description: 'Completou seu primeiro treino!',
        image_url: '/badges/first_workout.png'
      });
    } else if (value === 10) {
      achievements.push({
        badge_id: 'workout_master',
        name: 'Mestre dos Treinos',
        description: 'Completou 10 treinos!',
        image_url: '/badges/workout_master.png'
      });
    } else if (value === 50) {
      achievements.push({
        badge_id: 'workout_legend',
        name: 'Lenda do Treino',
        description: 'Completou 50 treinos!',
        image_url: '/badges/workout_legend.png'
      });
    }
  } else if (eventType === 'streak') {
    // Conquistas baseadas em sequências de treinos
    if (value === 3) {
      achievements.push({
        badge_id: 'streak_starter',
        name: 'Sequência Iniciante',
        description: 'Treinou por 3 dias consecutivos!',
        image_url: '/badges/streak_starter.png'
      });
    } else if (value === 7) {
      achievements.push({
        badge_id: 'streak_warrior',
        name: 'Guerreiro da Constância',
        description: 'Treinou por 7 dias consecutivos!',
        image_url: '/badges/streak_warrior.png'
      });
    } else if (value === 30) {
      achievements.push({
        badge_id: 'streak_legend',
        name: 'Lenda da Constância',
        description: 'Treinou por 30 dias consecutivos!',
        image_url: '/badges/streak_legend.png'
      });
    }
  } else if (eventType === 'level_up') {
    // Conquistas baseadas em níveis
    if (value === 2) {
      achievements.push({
        badge_id: 'level_intermediate',
        name: 'Nível Intermediário',
        description: 'Alcançou o nível intermediário!',
        image_url: '/badges/level_intermediate.png'
      });
    } else if (value === 3) {
      achievements.push({
        badge_id: 'level_advanced',
        name: 'Nível Avançado',
        description: 'Alcançou o nível avançado!',
        image_url: '/badges/level_advanced.png'
      });
    }
  }
  
  return achievements;
}
