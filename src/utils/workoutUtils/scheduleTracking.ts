
import { supabase } from '@/integrations/supabase/client';
import { ExpectedWorkoutDay } from '@/types/workout';

/**
 * Obter os dias da semana em que o usuário deve treinar
 */
export const getWorkoutDaysOfWeek = async (userId: string): Promise<number[]> => {
  try {
    // Buscar perfil do usuário para obter frequência de treinos
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('days_per_week')
      .eq('id', userId)
      .single();
      
    if (error || !profile) {
      console.error('Erro ao obter dias de treino:', error);
      return [1, 3, 5]; // Default: Segunda, Quarta e Sexta
    }
    
    // Mapear string para array de dias (0 = domingo, 6 = sábado)
    switch(profile.days_per_week) {
      case '3': return [1, 3, 5]; // 3x: Segunda, Quarta e Sexta
      case '4': return [1, 2, 4, 5]; // 4x: Segunda, Terça, Quinta e Sexta
      case '5': return [1, 2, 3, 4, 5]; // 5x: Segunda a Sexta
      case '6': return [1, 2, 3, 4, 5, 6]; // 6x: Segunda a Sábado
      case '7': return [0, 1, 2, 3, 4, 5, 6]; // 7x: Todos os dias
      case '2': return [1, 4]; // 2x: Segunda e Quinta
      default: return [1, 3, 5]; // Default: 3x por semana
    }
    
  } catch (error) {
    console.error('Erro ao obter dias de treino:', error);
    return [1, 3, 5]; // Default em caso de erro
  }
};

/**
 * Calcula os dias de treino esperados para o usuário
 */
export const getExpectedWorkoutDays = async (userId: string, startDate?: Date, daysAhead = 14): Promise<ExpectedWorkoutDay[]> => {
  try {
    const workoutDays = await getWorkoutDaysOfWeek(userId);
    const start = startDate || new Date();
    start.setHours(0, 0, 0, 0);
    
    const expectedDays: ExpectedWorkoutDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Obter os dias de treino completados para comparação
    const { data: completed, error } = await supabase
      .from('progress')
      .select('completed_date')
      .eq('user_id', userId)
      .gte('completed_date', new Date(start.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .lte('completed_date', new Date(start.getTime() + daysAhead * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      
    if (error) {
      console.error('Erro ao obter treinos completados:', error);
    }
    
    const completedDates = completed ? completed.map(c => c.completed_date) : [];
    
    // Gerar datas esperadas
    for (let i = -7; i <= daysAhead; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      
      // Checar se é um dia de treino para o usuário
      if (workoutDays.includes(date.getDay())) {
        const dateStr = date.toISOString().split('T')[0];
        const isCompleted = completedDates.includes(dateStr);
        const isMissed = !isCompleted && date < today;
        
        // Só adicionar se for um dia perdido (no passado) ou futuro
        if (isMissed || date >= today) {
          expectedDays.push({
            date: dateStr,
            missed: isMissed
          });
        }
      }
    }
    
    return expectedDays;
    
  } catch (error) {
    console.error('Erro ao calcular dias esperados de treino:', error);
    return [];
  }
};

/**
 * Obter dias esperados de treino para a agenda
 * @deprecated Use getExpectedWorkoutDays instead
 */
export const getScheduledWorkoutDays = getExpectedWorkoutDays;
