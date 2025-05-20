/**
 * Saves the generated workout plan to Supabase user_workouts table
 * @param userId The authenticated user ID
 * @param workoutPlan The generated workout plan to save
 */
import { supabase } from '@/integrations/supabase/client';

export const saveWorkoutPlanToSupabase = async (userId: string, workoutPlan: any) => {
  try {
    if (!userId) {
      console.error("Erro: ID do usuário não fornecido");
      return;
    }

    if (!workoutPlan) {
      console.error("Erro: Plano de treino não fornecido");
      return;
    }

    console.log("Salvando plano de treino no Supabase para o usuário:", userId);
    
    // Check if a workout plan already exists for this user
    const { data: existingPlan, error: queryError } = await supabase
      .from('user_workouts')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (queryError) {
      console.error("Erro ao verificar plano existente:", queryError);
      return;
    }

    let result;
    // If plan exists, update it, otherwise insert a new one
    if (existingPlan) {
      console.log("Atualizando plano de treino existente");
      result = await supabase
        .from('user_workouts')
        .update({ data: workoutPlan, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
    } else {
      console.log("Inserindo novo plano de treino");
      result = await supabase
        .from('user_workouts')
        .insert({ user_id: userId, data: workoutPlan });
    }

    if (result.error) {
      console.error("Erro ao salvar plano de treino:", result.error);
    } else {
      console.log("Plano de treino salvo com sucesso");
    }

    return result;
  } catch (error) {
    console.error("Erro ao salvar plano de treino:", error);
  }
};
