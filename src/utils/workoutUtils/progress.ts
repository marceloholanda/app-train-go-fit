
import { supabase } from '@/integrations/supabase/client';

/**
 * Update workout progress in Supabase and localStorage
 * @param dayNumber - The day number to mark as completed or pending
 * @param isCompleted - Whether the workout is completed or not
 */
export const updateWorkoutProgress = async (dayNumber: number, isCompleted: boolean) => {
  try {
    // Primeiro atualizamos o localStorage para compatibilidade com o código antigo
    updateLocalProgress(dayNumber, isCompleted);
    
    // Depois atualizamos no Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    // Buscar o registro de progresso atual
    const { data: progressData, error: fetchError } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .order('workout_date', { ascending: false })
      .limit(1)
      .maybeSingle();
      
    if (fetchError) {
      console.error("Erro ao buscar progresso:", fetchError);
      return;
    }
    
    if (!progressData) {
      // Se não existir registro de progresso, criar um novo
      const today = new Date().toISOString().split('T')[0];
      const newProgress = {
        user_id: user.id,
        workout_date: today,
        completed_exercises: isCompleted ? [dayNumber] : [],
        streak: isCompleted ? 1 : 0
      };
      
      const { error } = await supabase
        .from('progress')
        .insert([newProgress]);
        
      if (error) {
        console.error("Erro ao criar progresso:", error);
      }
      
      return;
    }
    
    // Atualizar o progresso existente
    let completedExercises = progressData.completed_exercises || [];
    
    if (isCompleted && !completedExercises.includes(dayNumber)) {
      completedExercises.push(dayNumber);
    } else if (!isCompleted) {
      completedExercises = completedExercises.filter(day => day !== dayNumber);
    }
    
    // Atualizar o progresso no Supabase
    const { error } = await supabase
      .from('progress')
      .update({
        completed_exercises: completedExercises
      })
      .eq('id', progressData.id);
      
    if (error) {
      console.error("Erro ao atualizar progresso:", error);
    }
  } catch (error) {
    console.error("Erro ao atualizar progresso:", error);
  }
};

/**
 * Update local storage for workout progress (legacy function)
 */
function updateLocalProgress(dayNumber: number, isCompleted: boolean) {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return;
    
    const user = JSON.parse(userData);
    
    // Inicializar o progresso se não existir
    if (!user.workoutProgress) {
      user.workoutProgress = {
        completedWorkouts: [],
        lastUpdated: new Date().toISOString(),
        lastWeekProgress: 0
      };
    }
    
    let completedWorkouts = [...user.workoutProgress.completedWorkouts];
    
    if (isCompleted && !completedWorkouts.includes(dayNumber)) {
      completedWorkouts.push(dayNumber);
    } else if (!isCompleted) {
      completedWorkouts = completedWorkouts.filter(day => day !== dayNumber);
    }
    
    // Calcular o progresso semanal
    const workoutPlan = user.workoutPlan;
    const totalWorkouts = workoutPlan?.days || 0;
    const progress = totalWorkouts > 0 ? (completedWorkouts.length / totalWorkouts) * 100 : 0;
    
    // Atualizar o progresso
    user.workoutProgress = {
      ...user.workoutProgress,
      completedWorkouts,
      lastUpdated: new Date().toISOString(),
      lastWeekProgress: progress
    };
    
    localStorage.setItem('traingo-user', JSON.stringify(user));
  } catch (error) {
    console.error("Erro ao atualizar progresso local:", error);
  }
}
