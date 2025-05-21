
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém o nome associado a um workout específico
 */
export const getWorkoutName = (index: number, plan: any) => {
  // Implementação básica
  return `Treino ${index}`;
};

/**
 * Gera um nome de treino com base nos exercícios
 */
export const generateWorkoutNameFromExercises = (exercises: any) => {
  return `Treino personalizado (${exercises.length} exercícios)`;
};

/**
 * Obtém as datas de treino para um determinado mês
 * @param month Número do mês (0-11)
 * @param year Ano
 * @param userId ID do usuário
 */
export const getWorkoutDatesForMonth = async (month: number, year: number, userId: string): Promise<string[]> => {
  try {
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

    return data?.map(item => item.completed_date) || [];
  } catch (error) {
    console.error('Erro ao obter datas de treino:', error);
    return [];
  }
};
