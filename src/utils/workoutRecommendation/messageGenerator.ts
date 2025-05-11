
import { QuizAnswers } from './types';

/**
 * Generate a personalized message based on the user's answers and plan
 */
export const generatePersonalizedMessage = (answers: QuizAnswers, plan: any) => {
  const { objective, level, days_per_week, motivation_type, training_barrier, environment } = answers;
  
  let message = '';
  
  if (objective === 'gain_muscle') {
    message += 'Criamos um plano focado em ganho de massa muscular ';
  } else if (objective === 'lose_weight') {
    message += 'Criamos um plano focado em perda de peso ';
  } else if (objective === 'maintain') {
    message += 'Criamos um plano para manter sua forma física ';
  } else if (objective === 'health_energy') {
    message += 'Criamos um plano para melhorar sua disposição e energia ';
  }
  
  if (level === 'beginner') {
    message += 'para iniciantes, ';
  } else if (level === 'intermediate') {
    message += 'para praticantes intermediários, ';
  } else {
    message += 'para praticantes avançados, ';
  }
  
  message += `com treinos ${days_per_week} vezes por semana. `;
  
  // Add specific message for the training environment
  if (environment === 'gym') {
    message += 'Os exercícios foram selecionados para execução em academia com equipamentos completos. ';
  } else if (environment === 'home_with_equipment') {
    message += 'Os exercícios foram adaptados para serem realizados em casa com equipamentos básicos. ';
  } else if (environment === 'home_no_equipment') {
    message += 'Selecionamos exercícios que podem ser realizados em casa sem necessidade de equipamentos. ';
  } else if (environment === 'outdoor') {
    message += 'Os exercícios foram pensados para prática ao ar livre, aproveitando os recursos disponíveis. ';
  }
  
  // Add personalized message based on user motivation
  if (motivation_type === 'fast_results') {
    message += 'Seu plano foi otimizado para resultados visíveis em curto prazo. ';
  } else if (motivation_type === 'discipline') {
    message += 'Seu plano foi estruturado para criar uma rotina consistente. ';
  } else if (motivation_type === 'fun') {
    message += 'Incluímos exercícios variados para tornar seus treinos mais divertidos. ';
  } else if (motivation_type === 'challenge') {
    message += 'Preparamos desafios progressivos para manter você estimulado. ';
  }
  
  // Add message based on the user's training barrier
  if (training_barrier === 'time') {
    message += 'Os treinos são compactos e eficientes para se adequar à sua agenda ocupada. ';
  } else if (training_barrier === 'motivation') {
    message += 'Recomendamos definir metas de curto prazo para manter sua motivação alta. ';
  } else if (training_barrier === 'discipline') {
    message += 'Sugerimos criar alertas para seus horários de treino. ';
  } else if (training_barrier === 'pain') {
    message += 'Incluímos exercícios de baixo impacto e alternativas para maior conforto. ';
  }
  
  message += 'Siga este plano consistentemente para alcançar seus objetivos!';
  
  return message;
};
