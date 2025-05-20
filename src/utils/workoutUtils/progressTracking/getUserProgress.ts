
import { supabase } from '@/integrations/supabase/client';
import { calculateStreaks } from './calculateStreaks';

/**
 * Busca todos os registros de progresso do usuário
 */
export const getUserProgress = async (userId?: string) => {
  try {
    if (!userId) {
      const { currentUser } = await import('@/contexts/AuthContext').then(module => module.useAuth());
      userId = currentUser?.id;
      
      if (!userId) {
        console.error("Erro: ID do usuário não fornecido");
        return { workoutDates: [], exercisesCount: 0, currentStreak: 0, longestStreak: 0 };
      }
    }
    
    // Buscar todos os registros de progresso do usuário
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .order('workout_date', { ascending: false });
      
    if (error) {
      console.error("Erro ao buscar progresso:", error);
      return { workoutDates: [], exercisesCount: 0, currentStreak: 0, longestStreak: 0 };
    }
    
    if (!data || data.length === 0) {
      return { workoutDates: [], exercisesCount: 0, currentStreak: 0, longestStreak: 0 };
    }
    
    // Extrair datas únicas de treino
    const uniqueDates = [...new Set(data.map(item => item.workout_date))].sort();
    
    // Calcular streak atual e mais longo
    const { currentStreak, longestStreak } = calculateStreaks(uniqueDates);
    
    // Contar exercícios totais
    const exercisesCount = data.reduce((total, item) => {
      if (item.completed_exercises && Array.isArray(item.completed_exercises)) {
        return total + item.completed_exercises.length;
      }
      return total;
    }, 0);
    
    return {
      workoutDates: uniqueDates,
      exercisesCount,
      currentStreak,
      longestStreak
    };
  } catch (error) {
    console.error("Erro ao processar progresso do usuário:", error);
    return { workoutDates: [], exercisesCount: 0, currentStreak: 0, longestStreak: 0 };
  }
};
