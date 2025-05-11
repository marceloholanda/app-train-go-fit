
import { muscleBeginnerGym } from '../data/workoutPlans/muscleBeginnerGym';
import { muscleIntermediateGym } from '../data/workoutPlans/muscleIntermediateGym';
import { healthBeginnerHome } from '../data/workoutPlans/healthBeginnerHome';
import { healthIntermediateGym } from '../data/workoutPlans/healthIntermediateGym';
import { healthAdvancedOutdoor } from '../data/workoutPlans/healthAdvancedOutdoor';
import { muscleAdvancedHome } from '../data/workoutPlans/muscleAdvancedHome';
import { outdoorHealthPlan } from '../data/workoutPlans/outdoorHealthPlan';
import { habitBeginnerHome } from '../data/workoutPlans/habitBeginnerHome';
import { habitIntermediateHome } from '../data/workoutPlans/habitIntermediateHome';
import { habitAdvancedGym } from '../data/workoutPlans/habitAdvancedGym';
import { fatLossBeginnerHome } from '../data/workoutPlans/fatLossBeginnerHome';
import { fatLossIntermediateHome } from '../data/workoutPlans/fatLossIntermediateHome';
import { fatLossAdvancedGym } from '../data/workoutPlans/fatLossAdvancedGym';
import { WorkoutPlan } from '@/types/workout';

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
export const findBestWorkoutPlan = (answers: QuizAnswers): WorkoutPlan => {
  const { objective, level, environment } = answers;
  
  // Mapear ambiente para o tipo adequado
  const mappedEnvironment = mapEnvironment(environment);
  
  // Selecionar um plano baseado na combinação de objetivo, nível e ambiente
  if (objective === 'gain_muscle') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'gym') {
        return muscleBeginnerGym;
      } else if (mappedEnvironment === 'home') {
        return muscleAdvancedHome; // Usando plano adaptado para casa
      } else {
        return adaptWorkoutPlanToEnvironment(muscleBeginnerGym, mappedEnvironment);
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'gym') {
        return muscleIntermediateGym;
      } else {
        return adaptWorkoutPlanToEnvironment(muscleIntermediateGym, mappedEnvironment);
      }
    } else { // advanced
      if (mappedEnvironment === 'gym') {
        return muscleIntermediateGym; // Usando intermediário já que não tem avançado de academia
      } else if (mappedEnvironment === 'home') {
        return muscleAdvancedHome;
      } else {
        return adaptWorkoutPlanToEnvironment(muscleAdvancedHome, 'outdoor');
      }
    }
  } else if (objective === 'lose_weight') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'gym') {
        return fatLossAdvancedGym;
      } else if (mappedEnvironment === 'home') {
        return fatLossBeginnerHome;
      } else {
        return adaptWorkoutPlanToEnvironment(fatLossBeginnerHome, 'outdoor');
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'gym') {
        return fatLossAdvancedGym;
      } else if (mappedEnvironment === 'home') {
        return fatLossIntermediateHome;
      } else {
        return adaptWorkoutPlanToEnvironment(fatLossIntermediateHome, 'outdoor');
      }
    } else { // advanced
      if (mappedEnvironment === 'gym') {
        return fatLossAdvancedGym;
      } else {
        return adaptWorkoutPlanToEnvironment(fatLossAdvancedGym, mappedEnvironment);
      }
    }
  } else if (objective === 'maintain') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'home') {
        return healthBeginnerHome;
      } else if (mappedEnvironment === 'gym') {
        return healthIntermediateGym;
      } else {
        return healthAdvancedOutdoor;
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'gym') {
        return healthIntermediateGym;
      } else if (mappedEnvironment === 'outdoor') {
        return healthAdvancedOutdoor;
      } else {
        return adaptWorkoutPlanToEnvironment(healthIntermediateGym, 'home');
      }
    } else { // advanced
      if (mappedEnvironment === 'outdoor') {
        return healthAdvancedOutdoor;
      } else if (mappedEnvironment === 'gym') {
        return healthIntermediateGym;
      } else {
        return adaptWorkoutPlanToEnvironment(healthAdvancedOutdoor, 'home');
      }
    }
  } else if (objective === 'health_energy') {
    // Novo objetivo: melhorar disposição e saúde - usando os planos de criação de hábito que eram usados para home_training
    if (level === 'beginner') {
      if (mappedEnvironment === 'home') {
        return habitBeginnerHome;
      } else if (mappedEnvironment === 'gym') {
        return habitAdvancedGym;
      } else {
        return adaptWorkoutPlanToEnvironment(habitBeginnerHome, 'outdoor');
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'home') {
        return habitIntermediateHome;
      } else if (mappedEnvironment === 'gym') {
        return habitAdvancedGym;
      } else {
        return adaptWorkoutPlanToEnvironment(habitIntermediateHome, 'outdoor');
      }
    } else { // advanced
      if (mappedEnvironment === 'gym') {
        return habitAdvancedGym;
      } else {
        return adaptWorkoutPlanToEnvironment(habitAdvancedGym, mappedEnvironment);
      }
    }
  }

  // Caso não encontre um plano específico, seleciona com base no ambiente
  if (mappedEnvironment === 'outdoor') {
    return outdoorHealthPlan;
  } else if (mappedEnvironment === 'home') {
    return habitBeginnerHome;
  }

  // Plano padrão se nenhum critério específico corresponder
  return muscleBeginnerGym;
};

// Função para mapear o valor do ambiente selecionado para um tipo consistente
const mapEnvironment = (environment: string): 'gym' | 'home' | 'outdoor' => {
  if (environment === 'gym') {
    return 'gym';
  } else if (environment === 'home_with_equipment' || environment === 'home_no_equipment') {
    return 'home';
  } else if (environment === 'outdoor') {
    return 'outdoor';
  }
  
  // Valor padrão
  return 'gym';
};

// Função para adaptar um plano de treino para um ambiente diferente
const adaptWorkoutPlanToEnvironment = (originalPlan: WorkoutPlan, targetEnvironment: string): WorkoutPlan => {
  // Cria uma cópia do plano original
  const adaptedPlan: WorkoutPlan = {
    ...originalPlan,
    id: `${originalPlan.id}_adapted_${targetEnvironment}`,
    name: `${originalPlan.name} (Adaptado para ${targetEnvironment === 'home' ? 'Casa' : 'Ar Livre'})`,
    tags: [...originalPlan.tags.filter(tag => tag !== 'gym' && tag !== 'home' && tag !== 'outdoor'), targetEnvironment],
    plan: {}
  };
  
  // Substitui os exercícios por alternativas adequadas ao ambiente
  Object.entries(originalPlan.plan).forEach(([day, exercises]) => {
    adaptedPlan.plan[day] = exercises.map(exercise => {
      return replaceExerciseForEnvironment(exercise.nome, targetEnvironment, exercise.reps);
    });
  });
  
  return adaptedPlan;
};

// Função para substituir um exercício por uma alternativa adequada ao ambiente
const replaceExerciseForEnvironment = (exerciseName: string, environment: string, reps: string): any => {
  // Lista de exercícios de máquina que precisam ser substituídos
  const machineExercises = [
    'supino máquina', 'crucifixo máquina', 'desenvolvimento máquina', 'leg press', 
    'cadeira extensora', 'cadeira flexora', 'puxada alta', 'remada sentada',
    'abdominal máquina', 'pec deck', 'hack squat', 'leg curl', 'leg extension',
    'smith', 'agachamento smith', 'crossover', 'graviton', 'pulldown'
  ];
  
  // Verifica se é um exercício de máquina
  const needsReplacement = machineExercises.some(machine => 
    exerciseName.toLowerCase().includes(machine.toLowerCase())
  );
  
  if (!needsReplacement) {
    // Se não for exercício de máquina, retorna o mesmo exercício
    return { nome: exerciseName, reps };
  }
  
  // Mapeamento de substituições para exercícios comuns
  const replacements: Record<string, Record<string, string>> = {
    home: {
      'supino máquina': 'Flexão de braço',
      'crucifixo máquina': 'Flexão com braços abertos',
      'desenvolvimento máquina': 'Elevação lateral com garrafas',
      'leg press': 'Agachamento livre',
      'cadeira extensora': 'Agachamento isométrico',
      'cadeira flexora': 'Ponte de glúteos',
      'puxada alta': 'Remada com elástico',
      'remada sentada': 'Remada curvada com garrafas',
      'abdominal máquina': 'Abdominal tradicional',
      'pec deck': 'Flexão hindu',
      'hack squat': 'Agachamento sumô',
      'smith': 'Afundo estacionário',
      'agachamento smith': 'Agachamento com pausa',
      'crossover': 'Flexão diamante'
    },
    outdoor: {
      'supino máquina': 'Flexão no banco',
      'crucifixo máquina': 'Flexão aberta no banco',
      'desenvolvimento máquina': 'Flexão pike',
      'leg press': 'Agachamento com salto',
      'cadeira extensora': 'Agachamento unilateral',
      'cadeira flexora': 'Elevação de quadril unilateral',
      'puxada alta': 'Barra fixa (se disponível)',
      'remada sentada': 'Remada invertida no banco',
      'abdominal máquina': 'Abdominal completo',
      'pec deck': 'Flexão com rotação',
      'hack squat': 'Agachamento búlgaro',
      'smith': 'Afundo com salto',
      'agachamento smith': 'Agachamento sumo',
      'crossover': 'Flexão com elevação'
    }
  };
  
  // Busca substituição específica ou usa uma substituição genérica
  const replacement = replacements[environment][exerciseName.toLowerCase()] || 
    (environment === 'home' ? 'Exercício com peso corporal' : 'Exercício ao ar livre');
  
  return { nome: replacement, reps };
};

// Gerar mensagem personalizada para o usuário
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
  
  // Adiciona mensagem específica para o ambiente de treino
  if (environment === 'gym') {
    message += 'Os exercícios foram selecionados para execução em academia com equipamentos completos. ';
  } else if (environment === 'home_with_equipment') {
    message += 'Os exercícios foram adaptados para serem realizados em casa com equipamentos básicos. ';
  } else if (environment === 'home_no_equipment') {
    message += 'Selecionamos exercícios que podem ser realizados em casa sem necessidade de equipamentos. ';
  } else if (environment === 'outdoor') {
    message += 'Os exercícios foram pensados para prática ao ar livre, aproveitando os recursos disponíveis. ';
  }
  
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
