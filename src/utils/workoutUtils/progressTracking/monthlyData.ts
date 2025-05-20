
import { supabase } from '@/integrations/supabase/client';

/**
 * Busca todos os dias em que o usuário treinou em um determinado mês
 */
export const getWorkoutDatesForMonth = async (userId: string, month: number, year: number) => {
  try {
    if (!userId) {
      console.error("Erro: ID do usuário não fornecido");
      return [];
    }
    
    // Criar datas de início e fim do mês
    const startDate = new Date(year, month, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    
    // Buscar registros do mês
    const { data, error } = await supabase
      .from('progress')
      .select('workout_date')
      .eq('user_id', userId)
      .gte('workout_date', startDate)
      .lte('workout_date', endDate);
      
    if (error) {
      console.error("Erro ao buscar datas de treino:", error);
      return [];
    }
    
    // Extrair datas únicas
    const uniqueDates = [...new Set(data.map(item => item.workout_date))];
    return uniqueDates;
  } catch (error) {
    console.error("Erro ao buscar datas de treino:", error);
    return [];
  }
};
