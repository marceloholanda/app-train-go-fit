
import { supabase } from '@/integrations/supabase/client';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  lastWorkoutDate?: string;
}

export interface WorkoutStreaks {
  current: number;
  longest: number;
}

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
 * Obtém os dados de sequência do usuário
 */
export const getStreakData = async (userId: string): Promise<StreakData> => {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('current_streak, longest_streak, total_workouts, last_workout_date')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao obter dados de sequência:', error);
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalWorkouts: 0
      };
    }
    
    return {
      currentStreak: data.current_streak || 0,
      longestStreak: data.longest_streak || 0,
      totalWorkouts: data.total_workouts || 0,
      lastWorkoutDate: data.last_workout_date
    };
  } catch (error) {
    console.error('Erro ao obter dados de sequência:', error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalWorkouts: 0
    };
  }
};

/**
 * Obtém as dados de streak para um usuário específico
 */
export const getWorkoutStreaks = async (userId?: string): Promise<WorkoutStreaks> => {
  if (!userId) {
    return {
      current: 0,
      longest: 0
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
