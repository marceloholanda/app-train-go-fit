
import { muscleBeginnerGym } from '../data/workoutPlans/muscleBeginnerGym';
import { muscleIntermediateGym } from '../data/workoutPlans/muscleIntermediateGym';

export interface QuizAnswers {
  objective: string;
  level: string;
  days_per_week: string;
  environment: string;
  age: string;
  weight: string;
  height: string;
  motivation_type: string;
  training_barrier: string;
}

// Função para encontrar o plano de treino mais adequado com base nas respostas
export const findBestWorkoutPlan = (answers: QuizAnswers) => {
  // Aqui você teria a lógica real para selecionar o plano de treino
  // Por enquanto, vamos retornar um plano padrão básico
  if (answers.objective === 'gain_muscle') {
    if (answers.level === 'beginner') {
      return muscleBeginnerGym;
    } else {
      return muscleIntermediateGym;
    }
  }

  // Plano padrão se nenhum critério específico corresponder
  return muscleBeginnerGym;
};

// Gerar mensagem personalizada para o usuário
export const generatePersonalizedMessage = (answers: QuizAnswers, plan: any) => {
  const { objective, level, days_per_week, motivation_type, training_barrier } = answers;
  
  let message = '';
  
  if (objective === 'gain_muscle') {
    message += 'Criamos um plano focado em ganho de massa muscular ';
  } else if (objective === 'lose_weight') {
    message += 'Criamos um plano focado em perda de peso ';
  } else if (objective === 'maintain') {
    message += 'Criamos um plano para manter sua forma física ';
  } else {
    message += 'Criamos um plano para você treinar em casa ';
  }
  
  if (level === 'beginner') {
    message += 'para iniciantes, ';
  } else if (level === 'intermediate') {
    message += 'para praticantes intermediários, ';
  } else {
    message += 'para praticantes avançados, ';
  }
  
  message += `com treinos ${days_per_week} vezes por semana. `;
  
  // Adiciona mensagem personalizada baseada na motivação do usuário
  if (motivation_type === 'fast_results') {
    message += 'Seu plano foi otimizado para resultados visíveis em curto prazo. ';
  } else if (motivation_type === 'discipline') {
    message += 'Seu plano foi estruturado para criar uma rotina consistente. ';
  } else if (motivation_type === 'fun') {
    message += 'Incluímos exercícios variados para tornar seus treinos mais divertidos. ';
  } else if (motivation_type === 'challenge') {
    message += 'Preparamos desafios progressivos para manter você estimulado. ';
  }
  
  // Adiciona mensagem baseada na barreira de treino do usuário
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
