
import { supabase } from '@/integrations/supabase/client';

/**
 * Verifica se o usuário possui plano premium ativo
 */
export const isPremiumUser = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('plano')
      .eq('id', session.user.id)
      .maybeSingle();
    
    if (error) {
      console.error('Erro ao verificar status premium:', error);
      return false;
    }
    
    return data?.plano === 'premium';
  } catch (error) {
    console.error('Erro ao verificar status premium:', error);
    return false;
  }
};

/**
 * Atualiza o nome de usuário no perfil
 */
export const updateUserName = async (name: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    const { error } = await supabase
      .from('profiles')
      .update({ nome: name })
      .eq('id', session.user.id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar nome de usuário:', error);
    return false;
  }
};

/**
 * Salva ou atualiza o plano de treino do usuário
 */
export const saveUserWorkoutPlan = async (workoutPlan: any): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    const { data: existingPlan } = await supabase
      .from('user_workouts')
      .select('id')
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (existingPlan) {
      const { error } = await supabase
        .from('user_workouts')
        .update({ workout_plan: workoutPlan })
        .eq('id', existingPlan.id);
      
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_workouts')
        .insert({
          user_id: session.user.id,
          workout_plan: workoutPlan
        });
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar plano de treino:', error);
    return false;
  }
};

/**
 * Recupera o perfil do usuário atual
 */
export const getUserProfile = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return null;
  }
};

/**
 * Define o plano do usuário como premium
 */
export const setUserPremium = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    const { error } = await supabase
      .from('profiles')
      .update({ plano: 'premium' })
      .eq('id', session.user.id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar para premium:', error);
    return false;
  }
};

/**
 * Marca o modal de boas-vindas premium como visualizado
 */
export const markPremiumWelcomeSeen = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    const { error } = await supabase
      .from('profiles')
      .update({ premium_welcome_seen: true })
      .eq('id', session.user.id);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Erro ao marcar boas-vindas premium:', error);
    return false;
  }
};

/**
 * Verifica se o usuário já viu a tela de boas-vindas premium
 */
export const hasPremiumWelcomeSeen = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('premium_welcome_seen')
      .eq('id', session.user.id)
      .maybeSingle();
    
    if (error) throw error;
    
    return data?.premium_welcome_seen || false;
  } catch (error) {
    console.error('Erro ao verificar boas-vindas premium:', error);
    return false;
  }
};
