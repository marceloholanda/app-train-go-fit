
import { supabase } from '@/integrations/supabase/client';
import { updateUserStreak } from './updateUserStreak';
import { checkAchievementsProgress } from './achievements';

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
