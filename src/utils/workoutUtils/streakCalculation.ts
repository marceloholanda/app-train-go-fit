
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém os dados de streak do usuário
 */
export const getWorkoutStreaks = () => {
  return {
    current: 0,
    longest: 3
  };
};

/**
 * Obtém os dias esperados de treino
 */
export const getExpectedWorkoutDays = () => {
  return [
    { date: '2023-05-15', missed: true },
    { date: '2023-05-17', missed: false },
    { date: '2023-05-19', missed: true },
  ];
};

