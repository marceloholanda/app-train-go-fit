
import { supabase } from '@/integrations/supabase/client';

/**
 * Atualiza o progresso de um treino específico
 */
export const updateWorkoutProgress = async (workoutId: number, completed: boolean): Promise<number> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return 0;
    
    const userId = session.user.id;
    const exerciseName = `day_${workoutId}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Verificar se já existe um registro para este exercício neste dia
    const { data: existingProgress } = await supabase
      .from('progress')
      .select('id')
      .eq('user_id', userId)
      .eq('exercise_name', exerciseName)
      .eq('date', today)
      .maybeSingle();
    
    if (existingProgress) {
      // Atualizar registro existente
      await supabase
        .from('progress')
        .update({ completed })
        .eq('id', existingProgress.id);
    } else {
      // Inserir novo registro
      await supabase
        .from('progress')
        .insert({
          user_id: userId,
          exercise_name: exerciseName,
          date: today,
          completed
        });
    }
    
    // Calcular progresso semanal
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const { data: weekProgress } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startOfWeek.toISOString().split('T')[0])
      .eq('completed', true);
    
    // Buscar plano de treino para saber o número total de dias
    const { data: userWorkout } = await supabase
      .from('user_workouts')
      .select('workout_plan')
      .eq('user_id', userId)
      .single();
    
    const totalWorkoutDays = userWorkout?.workout_plan?.days || 7;
    const completedDays = weekProgress?.length || 0;
    const progressPercentage = Math.min(100, (completedDays / totalWorkoutDays) * 100);
    
    return progressPercentage;
  } catch (error) {
    console.error('Erro ao atualizar progresso de treino:', error);
    return 0;
  }
};

/**
 * Marca os exercícios específicos como concluídos
 */
export const trackExerciseCompletion = async (
  workoutDay: number, 
  exerciseIndex: number, 
  completed: boolean
): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    
    const userId = session.user.id;
    const exerciseName = `day${workoutDay}_ex${exerciseIndex}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Verificar se já existe um registro para este exercício neste dia
    const { data: existingProgress } = await supabase
      .from('progress')
      .select('id')
      .eq('user_id', userId)
      .eq('exercise_name', exerciseName)
      .eq('date', today)
      .maybeSingle();
    
    if (existingProgress) {
      // Atualizar registro existente
      await supabase
        .from('progress')
        .update({ completed })
        .eq('id', existingProgress.id);
    } else {
      // Inserir novo registro
      await supabase
        .from('progress')
        .insert({
          user_id: userId,
          exercise_name: exerciseName,
          date: today,
          completed
        });
    }
  } catch (error) {
    console.error('Erro ao rastrear conclusão de exercício:', error);
  }
};

/**
 * Obtém o estado atual dos exercícios de um dia específico
 */
export const getExercisesState = async (workoutDay: number): Promise<boolean[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return [];
    
    const userId = session.user.id;
    const today = new Date().toISOString().split('T')[0];
    
    const { data } = await supabase
      .from('progress')
      .select('exercise_name, completed')
      .eq('user_id', userId)
      .eq('date', today)
      .like('exercise_name', `day${workoutDay}_ex%`);
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Ordenar por índice do exercício
    return data
      .sort((a, b) => {
        const indexA = parseInt(a.exercise_name.split('_ex')[1]);
        const indexB = parseInt(b.exercise_name.split('_ex')[1]);
        return indexA - indexB;
      })
      .map(item => item.completed);
  } catch (error) {
    console.error('Erro ao obter estado dos exercícios:', error);
    return [];
  }
};
