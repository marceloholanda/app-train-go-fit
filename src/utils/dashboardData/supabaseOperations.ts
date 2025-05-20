
import { supabase } from '@/integrations/supabase/client';
import { WorkoutDisplay } from '@/types/dashboard';
import { WorkoutPlan } from '@/types/workout';
import { toast } from '@/hooks/use-toast';

/**
 * Loads workout plan data from Supabase for a specific user
 */
export const loadWorkoutPlanFromSupabase = async (userId: string) => {
  try {
    const { data: workoutData, error: workoutError } = await supabase
      .from('user_workouts')
      .select('data')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (workoutError) {
      console.error("[TrainGO] Error loading workout plan from Supabase:", workoutError);
      toast({
        title: "Erro ao carregar treinos",
        description: workoutError.message,
        variant: "destructive",
      });
      return null;
    }
    
    return workoutData?.data || null;
  } catch (error) {
    console.error("[TrainGO] Error in Supabase communication:", error);
    return null;
  }
};

/**
 * Saves workout plan data to Supabase for a specific user
 */
export const saveWorkoutPlanToSupabase = async (userId: string, workoutPlan: WorkoutPlan | WorkoutDisplay[]) => {
  try {
    const { error } = await supabase
      .from('user_workouts')
      .insert([{
        user_id: userId,
        data: workoutPlan
      }]);
      
    if (error) {
      console.error("[TrainGO] Error saving workout plan to Supabase:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("[TrainGO] Error in Supabase save operation:", error);
    return false;
  }
};

/**
 * Loads user progress data from Supabase
 */
export const loadUserProgressFromSupabase = async (userId: string) => {
  try {
    const { data: progressData, error: progressError } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('workout_date', { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (progressError) {
      console.error("[TrainGO] Error loading progress from Supabase:", progressError);
      return null;
    }
    
    return progressData;
  } catch (error) {
    console.error("[TrainGO] Error in progress load operation:", error);
    return null;
  }
};
