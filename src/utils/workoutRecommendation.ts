
import { WorkoutPlan, workoutPlans } from "../data/workoutPlans";

// Interface para as respostas do quiz
export interface QuizAnswers {
  objective: string;
  environment: string;
  level: string;
  days_per_week: string;
  time_per_session: string;
  personality: string;
  body_focus: string;
  training_history: string;
}

/**
 * Encontra o plano de treino mais compatível com as respostas do usuário
 */
export function findBestWorkoutPlan(answers: QuizAnswers): WorkoutPlan {
  // Cria um array com os valores das respostas para comparar com as tags dos planos
  const answerValues = Object.values(answers);
  
  // Ordena os planos por número de correspondências com as respostas do usuário
  const sortedPlans = workoutPlans
    .map(plan => {
      // Conta quantas tags do plano correspondem às respostas do usuário
      const matchCount = plan.tags.reduce((count, tag) => {
        if (answerValues.includes(tag)) {
          return count + 1;
        }
        return count;
      }, 0);
      
      // Retorna o plano e seu número de correspondências
      return { plan, matchCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount); // Ordena por correspondências (maior primeiro)
  
  // Se o plano com mais correspondências tem pelo menos 2 correspondências, use-o
  if (sortedPlans[0].matchCount >= 2) {
    return sortedPlans[0].plan;
  }
  
  // Caso contrário, encontre um plano genérico baseado apenas no nível do usuário
  const genericPlan = workoutPlans.find(plan => 
    plan.tags.includes(answers.level) && plan.tags.includes("full_body")
  );
  
  if (genericPlan) {
    return genericPlan;
  }
  
  // Se até o plano genérico não for encontrado, retorne o primeiro plano genérico
  return workoutPlans.find(plan => plan.id.includes("treino_005")) || workoutPlans[0];
}

/**
 * Gera uma mensagem personalizada com base nas respostas e no plano recomendado
 */
export function generatePersonalizedMessage(answers: QuizAnswers, plan: WorkoutPlan): string {
  const levelMessages = {
    beginner: "iniciante",
    returning: "que está retornando aos treinos",
    advanced: "avançado"
  };
  
  const objectiveMessages = {
    lose_fat: "perder gordura corporal",
    gain_muscle: "ganhar massa muscular",
    health_energy: "melhorar sua saúde e disposição",
    create_habit: "criar uma rotina consistente de treinos"
  };
  
  const environmentMessages = {
    gym: "na academia",
    home: "em casa",
    outdoor: "ao ar livre",
    anywhere: "em qualquer lugar disponível"
  };
  
  const levelMsg = levelMessages[answers.level as keyof typeof levelMessages] || "com seu nível atual";
  const objectiveMsg = objectiveMessages[answers.objective as keyof typeof objectiveMessages] || "alcançar seus objetivos";
  const environmentMsg = environmentMessages[answers.environment as keyof typeof environmentMessages] || "";

  return `Baseado no seu perfil ${levelMsg} e foco em ${objectiveMsg} ${environmentMsg}, criamos um plano de treino personalizado com ${plan.days} dias por semana para maximizar seus resultados.`;
}
