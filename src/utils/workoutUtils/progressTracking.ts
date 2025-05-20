
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

/**
 * Calcula sequências de treinos consecutivos
 */
const calculateStreaks = (dates: string[]) => {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }
  
  // Ordenar datas da mais recente para a mais antiga
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  let currentStreak = 0;
  let tempStreak = 0;
  let longestStreak = 0;
  let lastDate: Date | null = null;
  
  // Verificar se o último treino foi hoje ou ontem para considerar o streak atual
  const lastWorkoutDate = new Date(sortedDates[0]);
  lastWorkoutDate.setHours(0, 0, 0, 0);
  
  const isRecentWorkout = 
    lastWorkoutDate.getTime() === today.getTime() || 
    lastWorkoutDate.getTime() === yesterday.getTime();
  
  // Se o último treino não foi recente, o streak atual é 0
  if (!isRecentWorkout) {
    currentStreak = 0;
  } else {
    // Calcular streak atual percorrendo as datas mais recentes
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      currentDate.setHours(0, 0, 0, 0);
      
      if (lastDate === null) {
        // Primeiro dia de treino
        tempStreak = 1;
        lastDate = currentDate;
        continue;
      }
      
      const expectedPrevDate = new Date(currentDate);
      expectedPrevDate.setDate(expectedPrevDate.getDate() + 1);
      
      if (expectedPrevDate.getTime() === lastDate.getTime()) {
        // Dia consecutivo
        tempStreak++;
      } else {
        // Quebra de sequência
        break;
      }
      
      lastDate = currentDate;
    }
    
    currentStreak = tempStreak;
  }
  
  // Calcular maior sequência histórica
  lastDate = null;
  tempStreak = 0;
  
  // Ordenar datas da mais antiga para a mais recente para calcular o maior streak
  const chronologicalDates = [...dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  for (let i = 0; i < chronologicalDates.length; i++) {
    const currentDate = new Date(chronologicalDates[i]);
    currentDate.setHours(0, 0, 0, 0);
    
    if (lastDate === null) {
      // Primeiro dia de treino
      tempStreak = 1;
    } else {
      const expectedNextDate = new Date(lastDate);
      expectedNextDate.setDate(expectedNextDate.getDate() + 1);
      
      if (currentDate.getTime() === expectedNextDate.getTime()) {
        // Dia consecutivo
        tempStreak++;
      } else {
        // Quebra de sequência
        tempStreak = 1;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);
    lastDate = currentDate;
  }
  
  return { currentStreak, longestStreak };
};

/**
 * Verifica e desbloqueia conquistas com base no progresso
 */
export const checkAchievementsProgress = async (userId: string) => {
  try {
    const progress = await getUserProgress(userId);
    
    // Verificar conquistas baseadas em sequência de dias
    const achievements = [
      { id: 'bronze', threshold: 3, name: 'Bronze' },
      { id: 'silver', threshold: 7, name: 'Prata' },
      { id: 'gold', threshold: 14, name: 'Ouro' },
      { id: 'platinum', threshold: 30, name: 'Platina' }
    ];
    
    // Desbloquear conquistas com base na maior sequência
    const unlockedAchievements = achievements.filter(
      achievement => progress.longestStreak >= achievement.threshold
    );
    
    // Salvar conquistas desbloqueadas
    if (unlockedAchievements.length > 0) {
      // Aqui poderíamos salvar as conquistas no Supabase
      // Por enquanto, apenas retorna as conquistas desbloqueadas
      return unlockedAchievements;
    }
    
    return [];
  } catch (error) {
    console.error("Erro ao verificar conquistas:", error);
    return [];
  }
};

/**
 * Registra a conclusão de um exercício
 */
export const recordExerciseCompletion = async (
  userId: string, 
  exerciseId: number, 
  exerciseName: string, 
  muscleGroup?: string
) => {
  try {
    if (!userId) {
      console.error("Erro: ID do usuário não fornecido");
      return false;
    }
    
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    
    // Verificar se já existe um registro para esta data
    const { data: existingRecord, error: fetchError } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .eq('workout_date', today)
      .maybeSingle();
      
    if (fetchError) {
      console.error("Erro ao verificar registro existente:", fetchError);
      return false;
    }
    
    // Preparar o objeto do exercício concluído
    const completedExercise = {
      id: exerciseId,
      name: exerciseName,
      completed_at: new Date().toISOString(),
      muscle_group: muscleGroup || null
    };
    
    let result;
    
    if (existingRecord) {
      // Verificar se este exercício já foi registrado para evitar duplicatas
      const existingExercises = existingRecord.completed_exercises || [];
      const isExerciseAlreadyCompleted = existingExercises.some(
        (ex: any) => ex.id === exerciseId && ex.name === exerciseName
      );
      
      if (!isExerciseAlreadyCompleted) {
        // Adicionar novo exercício à lista existente
        const updatedExercises = [...existingExercises, completedExercise];
        
        // Atualizar o registro existente
        result = await supabase
          .from('progress')
          .update({ 
            completed_exercises: updatedExercises,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingRecord.id);
      } else {
        // Exercício já registrado, não faz nada
        return true;
      }
    } else {
      // Criar novo registro para hoje
      result = await supabase
        .from('progress')
        .insert([{
          user_id: userId,
          workout_date: today,
          completed_exercises: [completedExercise],
          streak: 0 // Será calculado depois
        }]);
    }
    
    if (result && result.error) {
      console.error("Erro ao registrar exercício:", result.error);
      return false;
    }
    
    // Atualizar streak após o registro
    await updateUserStreak(userId);
    
    // Verificar conquistas
    await checkAchievementsProgress(userId);
    
    return true;
  } catch (error) {
    console.error("Erro ao registrar exercício:", error);
    return false;
  }
};

/**
 * Remove o registro de conclusão de um exercício
 */
export const removeExerciseCompletion = async (
  userId: string, 
  exerciseId: number, 
  exerciseName: string
) => {
  try {
    if (!userId) {
      console.error("Erro: ID do usuário não fornecido");
      return false;
    }
    
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    
    // Buscar o registro de hoje
    const { data: existingRecord, error: fetchError } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .eq('workout_date', today)
      .maybeSingle();
      
    if (fetchError) {
      console.error("Erro ao buscar registro existente:", fetchError);
      return false;
    }
    
    // Se não existir registro para hoje, não há o que remover
    if (!existingRecord) {
      return true;
    }
    
    // Filtrar o exercício a ser removido
    const existingExercises = existingRecord.completed_exercises || [];
    const updatedExercises = existingExercises.filter(
      (ex: any) => !(ex.id === exerciseId && ex.name === exerciseName)
    );
    
    // Se não houver alterações, não precisa atualizar
    if (updatedExercises.length === existingExercises.length) {
      return true;
    }
    
    // Atualizar o registro ou deletar se ficou vazio
    let result;
    if (updatedExercises.length > 0) {
      result = await supabase
        .from('progress')
        .update({ 
          completed_exercises: updatedExercises,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id);
    } else {
      // Se não sobrou nenhum exercício, remove o registro do dia
      result = await supabase
        .from('progress')
        .delete()
        .eq('id', existingRecord.id);
    }
    
    if (result && result.error) {
      console.error("Erro ao remover exercício:", result.error);
      return false;
    }
    
    // Atualizar streak após a remoção
    await updateUserStreak(userId);
    
    return true;
  } catch (error) {
    console.error("Erro ao remover exercício:", error);
    return false;
  }
};

/**
 * Atualiza o streak do usuário
 */
const updateUserStreak = async (userId: string) => {
  try {
    const progress = await getUserProgress(userId);
    
    // Atualizar o registro mais recente com o streak atual
    if (progress.workoutDates.length > 0) {
      const mostRecentDate = progress.workoutDates[0];
      
      await supabase
        .from('progress')
        .update({ 
          streak: progress.currentStreak,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('workout_date', mostRecentDate);
    }
    
    return progress.currentStreak;
  } catch (error) {
    console.error("Erro ao atualizar streak:", error);
    return 0;
  }
};

/**
 * Registra a conclusão de um treino completo
 */
export const recordWorkoutCompletion = async (userId: string, workoutId: number, exercises: any[]) => {
  try {
    if (!userId) {
      console.error("Erro: ID do usuário não fornecido");
      return false;
    }
    
    // Para cada exercício no treino, registrar conclusão
    for (const exercise of exercises) {
      await recordExerciseCompletion(
        userId, 
        exercise.id || workoutId, 
        exercise.nome || exercise.name,
        exercise.muscle_group
      );
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao registrar conclusão de treino:", error);
    return false;
  }
};

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
