
import { supabase } from '@/integrations/supabase/client';
import { WorkoutStreaks, ExpectedWorkoutDay } from '@/types/workout';

/**
 * Calcula a sequência atual de treinos do usuário
 */
export const calculateStreak = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('current_streak')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao calcular streak:', error);
      return 0;
    }
    
    return data?.current_streak || 0;
  } catch (error) {
    console.error('Erro ao calcular streak:', error);
    return 0;
  }
};

/**
 * Obtém os dados de streak do usuário
 */
export const getWorkoutStreaks = async (userId?: string): Promise<WorkoutStreaks> => {
  if (!userId) {
    return {
      current: 0,
      longest: 3
    };
  }

  try {
    const { data, error } = await supabase
      .from('stats')
      .select('current_streak, longest_streak')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao obter streaks:', error);
      return { current: 0, longest: 0 };
    }
    
    return {
      current: data?.current_streak || 0,
      longest: data?.longest_streak || 0
    };
  } catch (error) {
    console.error('Erro ao obter streaks:', error);
    return { current: 0, longest: 0 };
  }
};

/**
 * Obtém os dias esperados de treino
 */
export const getExpectedWorkoutDays = async (userId?: string): Promise<ExpectedWorkoutDay[]> => {
  if (!userId) {
    return [
      { date: '2023-05-15', missed: true },
      { date: '2023-05-17', missed: false },
      { date: '2023-05-19', missed: true },
    ];
  }

  try {
    // Implement real logic here when backend is ready
    return [
      { date: '2023-05-15', missed: true },
      { date: '2023-05-17', missed: false },
      { date: '2023-05-19', missed: true },
    ];
  } catch (error) {
    console.error('Erro ao obter dias esperados:', error);
    return [];
  }
};
