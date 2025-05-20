
import { supabase } from '@/integrations/supabase/client';

export interface Achievement {
  id: string;
  badge_id: string;
  badge_name: string;
  badge_description: string;
  unlocked_at: string;
}

/**
 * Verifica e registra conquistas com base nas ações do usuário
 */
export const checkNewAchievement = async (eventType: string): Promise<Achievement | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;
    
    const userId = session.user.id;
    
    // Verificar se já tem alguma conquista
    const { data: existingAchievements } = await supabase
      .from('achievements')
      .select('badge_id')
      .eq('user_id', userId);
    
    const existingBadgeIds = existingAchievements?.map(a => a.badge_id) || [];
    
    let newAchievement: Achievement | null = null;
    
    switch(eventType) {
      case 'first_workout':
        if (!existingBadgeIds.includes('first_workout')) {
          newAchievement = await unlockAchievement(userId, {
            badge_id: 'first_workout',
            badge_name: 'Primeiro Treino',
            badge_description: 'Completou seu primeiro treino. Este é o início de uma jornada incrível!'
          });
        }
        break;
        
      case 'streak_3days':
        if (!existingBadgeIds.includes('streak_3days')) {
          newAchievement = await unlockAchievement(userId, {
            badge_id: 'streak_3days',
            badge_name: 'Consistente',
            badge_description: 'Treinou por 3 dias consecutivos. A consistência é a chave!'
          });
        }
        break;
        
      case 'streak_7days':
        if (!existingBadgeIds.includes('streak_7days')) {
          newAchievement = await unlockAchievement(userId, {
            badge_id: 'streak_7days',
            badge_name: 'Semana Perfeita',
            badge_description: 'Uma semana inteira de treinos consecutivos. Impressionante!'
          });
        }
        break;
        
      case 'complete_plan':
        if (!existingBadgeIds.includes('complete_plan')) {
          newAchievement = await unlockAchievement(userId, {
            badge_id: 'complete_plan',
            badge_name: 'Plano Completo',
            badge_description: 'Completou todos os treinos do seu plano. Muito bem!'
          });
        }
        break;
        
      case 'profile_complete':
        if (!existingBadgeIds.includes('profile_complete')) {
          newAchievement = await unlockAchievement(userId, {
            badge_id: 'profile_complete',
            badge_name: 'Perfil Completo',
            badge_description: 'Completou todas as informações do seu perfil.'
          });
        }
        break;
    }
    
    return newAchievement;
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
    return null;
  }
};

/**
 * Registra uma nova conquista para o usuário
 */
const unlockAchievement = async (userId: string, badge: { badge_id: string, badge_name: string, badge_description: string }): Promise<Achievement | null> => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        user_id: userId,
        badge_id: badge.badge_id,
        badge_name: badge.badge_name,
        badge_description: badge.badge_description
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao desbloquear conquista:', error);
    return null;
  }
};

/**
 * Recupera todas as conquistas de um usuário
 */
export const getUserAchievements = async (): Promise<Achievement[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];
    
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', session.user.id)
      .order('unlocked_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao recuperar conquistas:', error);
    return [];
  }
};

/**
 * Recupera conquistas estáticas para exibição 
 */
export const getAchievements = (): any[] => {
  // Retorna uma lista estática de conquistas para exibição na interface
  return [
    {
      id: 'bronze',
      name: 'Primeiro Treino',
      description: 'Completou seu primeiro treino. O início de uma jornada incrível!',
      unlocked: true,
      unlockedDate: new Date().toISOString(),
      threshold: 1
    },
    {
      id: 'silver',
      name: 'Consistente',
      description: 'Treinou por 3 dias consecutivos. A consistência é a chave!',
      unlocked: false,
      threshold: 3
    },
    {
      id: 'gold',
      name: 'Semana Perfeita',
      description: 'Uma semana inteira de treinos consecutivos. Impressionante!',
      unlocked: false,
      threshold: 7
    },
    {
      id: 'platinum',
      name: 'Plano Completo',
      description: 'Completou todos os treinos do seu plano. Muito bem!',
      unlocked: false,
      threshold: 30
    }
  ];
};
