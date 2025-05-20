
import { supabase } from '@/integrations/supabase/client';
import { getUserProgress } from './getUserProgress';

/**
 * Atualiza o streak do usuário
 */
export const updateUserStreak = async (userId: string) => {
  try {
    const progress = await getUserProgress(userId);
    
    // Atualizar o registro mais recente com o streak atual
    if (progress.workoutDates.length > 0) {
      const mostRecentDate = progress.workoutDates[0];
      
      await supabase
        .from('progress')
        .update({ 
          streak: progress.currentStreak,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('workout_date', mostRecentDate);
    }
    
    return progress.currentStreak;
  } catch (error) {
    console.error("Erro ao atualizar streak:", error);
    return 0;
  }
};
