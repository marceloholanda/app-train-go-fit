
import { supabase } from '@/integrations/supabase/client';

/**
 * Atualiza o status de treino (concluído/pendente)
 * Retorna o novo progresso semanal como número
 */
export const updateWorkoutProgress = async (workoutDay: number, isCompleted: boolean): Promise<number> => {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      console.error("[TrainGO] User not authenticated");
      return 0;
    }
    
    const userId = session.session.user.id;
    
    if (isCompleted) {
      // Adicionar treino concluído
      const today = new Date();
      
      const { error } = await supabase
        .from('progress')
        .insert({
          user_id: userId,
          workout_day: workoutDay,
          completed_date: today.toISOString().split('T')[0]
        });
        
      if (error) {
        console.error('[TrainGO] Error updating workout progress:', error);
        return 0;
      }
    } else {
      // Remover treino concluído
      const { error } = await supabase
        .from('progress')
        .delete()
        .eq('user_id', userId)
        .eq('workout_day', workoutDay);
        
      if (error) {
        console.error('[TrainGO] Error updating workout progress:', error);
        return 0;
      }
    }
    
    // Calcular e atualizar progresso semanal
    const { data: progressData } = await supabase
      .from('progress')
      .select('workout_day')
      .eq('user_id', userId);
      
    const { data: workoutPlanData } = await supabase
      .from('user_workouts')
      .select('days')
      .eq('user_id', userId)
      .single();
      
    if (progressData && workoutPlanData) {
      const completed = progressData.length;
      const total = workoutPlanData.days;
      const weekProgress = total > 0 ? (completed / total) * 100 : 0;
      
      await supabase
        .from('stats')
        .update({ 
          week_progress: weekProgress,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
        
      return weekProgress;
    }
    
    return 0;
  } catch (error) {
    console.error('[TrainGO] Error updating workout progress:', error);
    return 0;
  }
};
