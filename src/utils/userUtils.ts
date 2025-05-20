
import { supabase } from '@/integrations/supabase/client';

/**
 * Verifica se o usuário tem plano premium
 */
export const isPremiumUser = async (userId?: string): Promise<boolean> => {
  try {
    if (!userId) {
      const { data: { session } } = await supabase.auth.getSession();
      userId = session?.user?.id;
    }
    
    if (!userId) return false;
    
    // Buscar perfil do usuário no Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('plano')
      .eq('user_id', userId)
      .single();

    return profile?.plano === 'premium';
  } catch (error) {
    console.error('Erro ao verificar status premium:', error);
    return false;
  }
};

/**
 * Salva os dados do usuário no Supabase
 */
export const saveUserData = async (userData: any): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      console.error('Usuário não autenticado');
      return;
    }
    
    // Atualiza o perfil do usuário
    const { error } = await supabase
      .from('profiles')
      .update({
        nome: userData.name,
        objetivo: userData.profile?.objective,
        nivel_experiencia: userData.profile?.level,
        frequencia_treino: userData.profile?.days_per_week,
        local_treino: userData.profile?.environment,
      })
      .eq('user_id', userId);

    if (error) throw error;
    
    // Se houver um plano de treino, salve-o também
    if (userData.workoutPlan) {
      // Verificar se já existe um plano de treino
      const { data: existingPlan } = await supabase
        .from('user_workouts')
        .select('id')
        .eq('user_id', userId)
        .single();
      
      if (existingPlan) {
        // Atualizar plano existente
        await supabase
          .from('user_workouts')
          .update({ workout_plan: userData.workoutPlan })
          .eq('id', existingPlan.id);
      } else {
        // Inserir novo plano
        await supabase
          .from('user_workouts')
          .insert({
            user_id: userId,
            workout_plan: userData.workoutPlan
          });
      }
    }
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

/**
 * Busca dados do usuário do Supabase
 */
export const getUserData = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) return null;
    
    // Buscar perfil do usuário
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    // Buscar plano de treino do usuário
    const { data: workoutPlan } = await supabase
      .from('user_workouts')
      .select('workout_plan')
      .eq('user_id', userId)
      .single();
    
    return {
      id: userId,
      email: session?.user?.email,
      name: profile?.nome || session?.user?.email?.split('@')[0],
      profile: {
        objective: profile?.objetivo,
        level: profile?.nivel_experiencia,
        days_per_week: profile?.frequencia_treino,
        environment: profile?.local_treino,
      },
      workoutPlan: workoutPlan?.workout_plan,
    };
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
};

/**
 * Calcula o Índice de Massa Corporal
 * @param weight - Peso em kg
 * @param height - Altura em metros
 * @returns número representando o IMC
 */
export const calculateIMC = (weight: number, height: number): number => {
  if (!weight || !height || height === 0) return 0;
  return weight / (height * height);
};

/**
 * Retorna a classificação do IMC de acordo com a OMS
 * @param imc - Valor do IMC calculado
 * @returns string com a classificação
 */
export const getIMCClassification = (imc: number): string => {
  if (imc === 0) return 'Não calculado';
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau 1';
  if (imc < 40) return 'Obesidade grau 2';
  return 'Obesidade grau 3';
};

/**
 * Converte a faixa etária em um valor numérico aproximado
 */
export const ageRangeToNumber = (ageRange: string): number => {
  switch (ageRange) {
    case 'under_18':
      return 16;
    case '18_29':
      return 24;
    case '30_44':
      return 37;
    case '45_59':
      return 52;
    case '60_plus':
      return 65;
    default:
      return 30; // valor padrão
  }
};

/**
 * Converte a faixa de peso em um valor numérico aproximado (kg)
 */
export const weightRangeToNumber = (weightRange: string): number => {
  switch (weightRange) {
    case 'under_60':
      return 55;
    case '60_75':
      return 68;
    case '75_90':
      return 83;
    case '90_110':
      return 100;
    case 'above_110':
      return 120;
    default:
      return 70; // valor padrão
  }
};

/**
 * Converte a faixa de altura em um valor numérico aproximado (m)
 */
export const heightRangeToNumber = (heightRange: string): number => {
  switch (heightRange) {
    case 'under_160':
      return 1.55;
    case '160_175':
      return 1.68;
    case '175_185':
      return 1.80;
    case 'above_185':
      return 1.90;
    default:
      return 1.70; // valor padrão
  }
};

/**
 * Verifica se o usuário já viu a mensagem de boas-vindas premium
 */
export const hasSeenPremiumWelcome = async (): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) return false;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('premium_welcome_seen')
      .eq('user_id', userId)
      .single();

    return !!profile?.premium_welcome_seen;
  } catch (error) {
    console.error('Erro ao verificar status de boas-vindas premium:', error);
    return false;
  }
};

/**
 * Marca que o usuário já viu a mensagem de boas-vindas premium
 */
export const markPremiumWelcomeSeen = async (): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) return;
    
    await supabase
      .from('profiles')
      .update({ premium_welcome_seen: true })
      .eq('user_id', userId);
  } catch (error) {
    console.error('Erro ao marcar boas-vindas premium como visto:', error);
  }
};

/**
 * Reseta o status de visualização da mensagem de boas-vindas premium
 */
export const resetPremiumWelcomeStatus = async (): Promise<void> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) return;
    
    await supabase
      .from('profiles')
      .update({ premium_welcome_seen: false })
      .eq('user_id', userId);
  } catch (error) {
    console.error('Erro ao resetar status de boas-vindas premium:', error);
  }
};
