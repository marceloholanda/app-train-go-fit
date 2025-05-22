
import { QuizAnswers } from '@/utils/workoutRecommendation/types';
import { supabase } from '@/integrations/supabase/client';
import { findBestWorkoutPlan, generatePersonalizedMessage } from '@/utils/workoutRecommendation';
import { weightRangeToNumber, heightRangeToNumber, ageRangeToNumber } from '@/utils/userUtils';
import { AuthResponse } from '@supabase/supabase-js';

export async function processRegistration(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  console.log("[TrainGO] Registrando novo usuário:", email);
  
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  });
}

export async function updateUserProfile(
  userId: string,
  quizAnswers: QuizAnswers
): Promise<void> {
  const weight_exact = weightRangeToNumber(quizAnswers.weight);
  const height_exact = heightRangeToNumber(quizAnswers.height);
  const age_exact = ageRangeToNumber(quizAnswers.age);
  
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      ...quizAnswers,
      weight_exact,
      height_exact,
      age_exact,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);
    
  if (profileError) {
    console.error("[TrainGO] Erro ao atualizar perfil:", profileError);
    throw profileError;
  }
}

export async function createOrUpdateWorkoutPlan(
  userId: string,
  recommendedPlan: any
): Promise<void> {
  // Verificar se já existe um plano de treino
  const { data: existingPlan, error: planCheckError } = await supabase
    .from('user_workouts')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
    
  if (planCheckError && planCheckError.code !== 'PGRST116') {
    console.error("[TrainGO] Erro ao verificar plano existente:", planCheckError);
    throw planCheckError;
  }
  
  // Transformar plan para compatibilidade com Json do Supabase
  const planJson = JSON.parse(JSON.stringify(recommendedPlan.plan));
  const tagsJson = JSON.parse(JSON.stringify(recommendedPlan.tags));
  
  if (existingPlan) {
    // Atualizar plano existente
    console.log("[TrainGO] Atualizando plano existente para usuário:", userId);
    const { error: planUpdateError } = await supabase
      .from('user_workouts')
      .update({
        plan_id: recommendedPlan.id,
        name: recommendedPlan.name,
        description: recommendedPlan.description || '',
        days: recommendedPlan.days,
        level: recommendedPlan.level,
        environment: recommendedPlan.environment,
        objective: recommendedPlan.objective,
        tags: tagsJson,
        plan: planJson,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingPlan.id);
      
    if (planUpdateError) {
      console.error("[TrainGO] Erro ao atualizar plano:", planUpdateError);
      throw planUpdateError;
    }
  } else {
    // Criar novo plano
    console.log("[TrainGO] Criando novo plano para usuário:", userId);
    const { error: planInsertError } = await supabase
      .from('user_workouts')
      .insert({
        user_id: userId,
        plan_id: recommendedPlan.id,
        name: recommendedPlan.name,
        description: recommendedPlan.description || '',
        days: recommendedPlan.days,
        level: recommendedPlan.level,
        environment: recommendedPlan.environment,
        objective: recommendedPlan.objective,
        tags: tagsJson,
        plan: planJson
      });
      
    if (planInsertError) {
      console.error("[TrainGO] Erro ao criar plano:", planInsertError);
      throw planInsertError;
    }
  }
}

export async function markUserAsOnboarded(): Promise<void> {
  await supabase.auth.updateUser({
    data: {
      onboarded: true
    }
  });
}

export function generateWorkoutPlan(quizAnswers: QuizAnswers): {
  recommendedPlan: any;
  message: string;
} {
  // Encontrar o plano de treino mais adequado
  const recommendedPlan = findBestWorkoutPlan(quizAnswers);
  const message = generatePersonalizedMessage(quizAnswers, recommendedPlan);
  
  console.log("[TrainGO] Recommended workout plan:", recommendedPlan);
  
  return {
    recommendedPlan,
    message
  };
}
