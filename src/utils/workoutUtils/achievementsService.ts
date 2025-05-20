
import { supabase } from '@/integrations/supabase/client';

/**
 * Interface for achievement definition
 */
interface Achievement {
  id: string;
  name: string;
  description: string;
  threshold: number;
  unlocked: boolean;
  unlockedDate?: string | null;
}

/**
 * Get all achievement definitions with unlocked status from database
 */
export const getAchievementsFromSupabase = async (userId: string): Promise<Achievement[]> => {
  try {
    if (!userId) {
      console.error("Erro: ID do usuário não fornecido");
      return [];
    }

    // Buscar conquistas já desbloqueadas pelo usuário no banco de dados
    const { data: unlockedAchievements, error: achievementsError } = await supabase
      .from('achievements')
      .select('badge_id, badge_name, badge_description, unlocked_at')
      .eq('user_id', userId);

    if (achievementsError) {
      console.error("Erro ao buscar conquistas:", achievementsError);
      return [];
    }

    // Converter para um Map para facilitar a verificação
    const unlockedMap = new Map();
    if (unlockedAchievements) {
      unlockedAchievements.forEach((achievement) => {
        unlockedMap.set(achievement.badge_id, {
          name: achievement.badge_name,
          description: achievement.badge_description,
          unlockedDate: achievement.unlocked_at
        });
      });
    }

    // Buscar progresso do usuário para determinar conquistas elegíveis
    const { workoutDates, currentStreak, longestStreak } = await getUserProgress(userId);
    const isPremium = await checkIfUserIsPremium(userId);

    // Definir todas as conquistas possíveis e seus critérios
    const achievementsList: Achievement[] = [
      { 
        id: 'bronze', 
        name: 'Iniciante Bronze', 
        description: 'Complete 3 dias seguidos de treino', 
        threshold: 3,
        unlocked: longestStreak >= 3 || unlockedMap.has('bronze'),
        unlockedDate: unlockedMap.get('bronze')?.unlockedDate || null
      },
      { 
        id: 'silver', 
        name: 'Atleta Prata', 
        description: 'Complete 7 dias seguidos de treino', 
        threshold: 7,
        unlocked: longestStreak >= 7 || unlockedMap.has('silver'),
        unlockedDate: unlockedMap.get('silver')?.unlockedDate || null
      },
      { 
        id: 'gold', 
        name: 'Campeão Ouro', 
        description: 'Complete 14 dias seguidos de treino', 
        threshold: 14,
        unlocked: longestStreak >= 14 || unlockedMap.has('gold'),
        unlockedDate: unlockedMap.get('gold')?.unlockedDate || null
      },
      { 
        id: 'platinum', 
        name: 'Lenda Platina', 
        description: 'Complete 30 dias seguidos de treino', 
        threshold: 30,
        unlocked: longestStreak >= 30 || unlockedMap.has('platinum'),
        unlockedDate: unlockedMap.get('platinum')?.unlockedDate || null
      },
      { 
        id: 'consistency_pro', 
        name: 'Consistência PRO', 
        description: 'Seja usuário PRO e acumule 5 dias seguidos de treino', 
        threshold: 5,
        unlocked: (isPremium && longestStreak >= 5) || unlockedMap.has('consistency_pro'),
        unlockedDate: unlockedMap.get('consistency_pro')?.unlockedDate || null
      }
    ];
    
    return achievementsList;
  } catch (error) {
    console.error("Erro ao obter conquistas:", error);
    return [];
  }
};

/**
 * Verifica se o usuário é premium
 */
const checkIfUserIsPremium = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) {
      console.error("Erro ao verificar plano do usuário:", error);
      return false;
    }
    
    return data?.plan === 'premium';
  } catch (error) {
    console.error("Erro ao verificar plano do usuário:", error);
    return false;
  }
};

/**
 * Salva uma conquista desbloqueada no banco de dados
 */
export const saveAchievement = async (userId: string, achievement: Achievement): Promise<boolean> => {
  try {
    if (!userId || !achievement || !achievement.unlocked) return false;
    
    const { error } = await supabase
      .from('achievements')
      .upsert(
        {
          user_id: userId,
          badge_id: achievement.id,
          badge_name: achievement.name,
          badge_description: achievement.description,
          unlocked_at: new Date().toISOString()
        },
        {
          onConflict: 'user_id,badge_id'
        }
      );
      
    if (error) {
      console.error("Erro ao salvar conquista:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao salvar conquista:", error);
    return false;
  }
};

/**
 * Verifica e retorna novas conquistas desbloqueadas
 */
export const checkNewAchievements = async (userId: string): Promise<Achievement | null> => {
  try {
    if (!userId) return null;
    
    // Obter todas as conquistas atuais do usuário
    const currentAchievements = await getAchievementsFromSupabase(userId);
    
    // Filtrar conquistas que estão desbloqueadas mas não foram salvas no Supabase
    const newlyUnlocked = currentAchievements.filter(achievement => {
      return achievement.unlocked && !achievement.unlockedDate;
    });
    
    if (newlyUnlocked.length === 0) return null;
    
    // Salvar as novas conquistas no Supabase
    const latestAchievement = newlyUnlocked[0]; // Pega a primeira nova conquista
    await saveAchievement(userId, latestAchievement);
    
    return latestAchievement;
  } catch (error) {
    console.error("Erro ao verificar novas conquistas:", error);
    return null;
  }
};

// Importar função de progresso necessária para verificar elegibilidade de conquistas
import { getUserProgress } from './progressTracking';

