
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém o nome do treino com base no ID
 */
export const getWorkoutName = async (userId: string, workoutId: number): Promise<string> => {
  try {
    // Buscar plano de treino do usuário
    const { data: workout, error } = await supabase
      .from('user_workouts')
      .select('plan, name')
      .eq('user_id', userId)
      .single();
      
    if (error || !workout) {
      return `Treino ${workoutId}`;
    }
    
    const dayKey = `dia${workoutId}`;
    if (workout.plan && workout.plan[dayKey]) {
      return generateWorkoutNameFromExercises(workoutId, workout.plan[dayKey]);
    }
    
    return `Treino ${workoutId}`;
  } catch (error) {
    console.error('Erro ao obter nome do treino:', error);
    return `Treino ${workoutId}`;
  }
};

/**
 * Gera um nome para o treino com base nos exercícios
 * Renomeada para evitar conflito de exportação
 */
export const generateWorkoutNameFromExercises = (dayNumber: number, exercises: any[]): string => {
  // Implementação simplificada
  if (!exercises || exercises.length === 0) {
    return `Treino ${dayNumber}`;
  }
  
  // Verificar o tipo de treino com base nos grupos musculares dos exercícios
  const muscleGroups = exercises.map(ex => ex.muscleGroup?.toLowerCase() || '');
  
  if (muscleGroups.some(group => group.includes('peito'))) {
    return 'Treino de Peito';
  } else if (muscleGroups.some(group => group.includes('costas'))) {
    return 'Treino de Costas';
  } else if (muscleGroups.some(group => group.includes('perna'))) {
    return 'Treino de Pernas';
  } else if (muscleGroups.some(group => group.includes('ombro'))) {
    return 'Treino de Ombros';
  } else {
    return `Treino ${dayNumber}`;
  }
};

/**
 * Retorna datas com treinos concluídos para um determinado mês
 */
export const getWorkoutDatesForMonth = async (userId: string, month: number, year: number): Promise<string[]> => {
  try {
    // Calcular intervalo de datas para o mês
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    const { data, error } = await supabase
      .from('progress')
      .select('completed_date')
      .eq('user_id', userId)
      .gte('completed_date', startDate.toISOString().split('T')[0])
      .lte('completed_date', endDate.toISOString().split('T')[0]);
      
    if (error) {
      console.error('Erro ao obter datas de treino:', error);
      return [];
    }
    
    return data.map(item => item.completed_date);
  } catch (error) {
    console.error('Erro ao obter datas de treino do mês:', error);
    return [];
  }
};
