import { supabase } from '@/integrations/supabase/client';

interface WeeklyWorkouts {
  completed: number;
  total: number;
}

/**
 * Obtém o progresso semanal do usuário
 * @returns Objeto com treinos completados e total da semana
 */
export const getWorkoutsThisWeek = async (userId?: string): Promise<WeeklyWorkouts> => {
  if (!userId) {
    return {
      completed: 0,
      total: 3
    };
  }

  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    
    const { data: completed, error } = await supabase
      .from('progress')
      .select('id')
      .eq('user_id', userId)
      .gte('completed_date', startOfWeek.toISOString().split('T')[0]);
      
    if (error) {
      console.error('Erro ao obter treinos da semana:', error);
      return { completed: 0, total: 3 };
    }
    
    // Get user's workout plan to determine total workouts per week
    const { data: workoutPlan } = await supabase
      .from('user_workouts')
      .select('days')
      .eq('user_id', userId)
      .single();
    
    return {
      completed: completed?.length || 0,
      total: workoutPlan?.days || 3
    };
  } catch (error) {
    console.error('Erro ao obter treinos da semana:', error);
    return { completed: 0, total: 3 };
  }
};

/**
 * Obtém o progresso semanal do usuário em porcentagem
 * @param userId ID do usuário
 * @returns Número entre 0 e 100 representando o progresso
 */
export const getWeeklyProgress = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('week_progress')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao obter progresso semanal:', error);
      return 0;
    }
    
    return data?.week_progress || 0;
  } catch (error) {
    console.error('Erro ao obter progresso semanal:', error);
    return 0;
  }
};

/**
 * Atualiza o progresso do treino e retorna o novo progresso semanal
 * @param workoutId ID do treino
 * @param completed Status de conclusão
 * @returns Novo progresso semanal (0-100)
 */
export const updateWorkoutProgress = (workoutId: number, completed: boolean): number => {
  // Implementação temporária (síncrona) para compatibilidade
  console.log(`Atualizando treino ${workoutId} para ${completed ? 'concluído' : 'pendente'}`);
  
  // Simula um progresso entre 0-100
  return Math.min(100, Math.max(0, Math.floor(Math.random() * 100)));
};
