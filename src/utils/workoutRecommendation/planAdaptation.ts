
import { WorkoutPlan } from '@/types/workout';
import { isPremiumUser } from '@/utils/userUtils';
import { 
  createGymSplitOneDayPlan, 
  createGymSplitTwoDaysPlan, 
  createGymSplitThreeDaysPlan, 
  createGymSplitFourDaysPlan, 
  createGymSplitFivePlusDaysPlan 
} from './splitCreators/gymSplits';
import { 
  createHomeSplitOneDayPlan, 
  createHomeSplitTwoDaysPlan, 
  createHomeSplitThreeDaysPlan, 
  createHomeSplitFourPlusDaysPlan 
} from './splitCreators/homeSplits';
import { 
  createOutdoorSplitOneDayPlan, 
  createOutdoorSplitTwoDaysPlan, 
  createOutdoorSplitThreePlusDaysPlan 
} from './splitCreators/outdoorSplits';

/**
 * Adapts a workout plan to the specified number of days per week
 */
export const adaptPlanToDaysPerWeek = (
  basePlan: WorkoutPlan, 
  daysPerWeek: number, 
  environment: string,
  objective: string,
  level: string
): WorkoutPlan => {
  // Create a copy of the base plan with updated days count
  const adaptedPlan: WorkoutPlan = {
    ...basePlan,
    days: daysPerWeek,
    plan: {}
  };
  
  // Determine muscle group split based on environment and days per week
  let rawPlan: Record<string, any> = {};
  
  if (environment === 'gym') {
    switch(daysPerWeek) {
      case 1:
        rawPlan = createGymSplitOneDayPlan(objective);
        break;
      case 2:
        rawPlan = createGymSplitTwoDaysPlan(objective);
        break;
      case 3:
        rawPlan = createGymSplitThreeDaysPlan(objective);
        break;
      case 4:
        rawPlan = createGymSplitFourDaysPlan(objective);
        break;
      case 5:
      case 6:
      case 7:
        rawPlan = createGymSplitFivePlusDaysPlan(objective, daysPerWeek);
        break;
      default:
        rawPlan = createGymSplitThreeDaysPlan(objective);
    }
  } else if (environment === 'home') {
    switch(daysPerWeek) {
      case 1:
        rawPlan = createHomeSplitOneDayPlan(objective);
        break;
      case 2:
        rawPlan = createHomeSplitTwoDaysPlan(objective);
        break;
      case 3:
        rawPlan = createHomeSplitThreeDaysPlan(objective);
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        rawPlan = createHomeSplitFourPlusDaysPlan(objective, daysPerWeek);
        break;
      default:
        rawPlan = createHomeSplitThreeDaysPlan(objective);
    }
  } else { // outdoor
    switch(daysPerWeek) {
      case 1:
        rawPlan = createOutdoorSplitOneDayPlan(objective);
        break;
      case 2:
        rawPlan = createOutdoorSplitTwoDaysPlan(objective);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        rawPlan = createOutdoorSplitThreePlusDaysPlan(objective, daysPerWeek);
        break;
      default:
        rawPlan = createOutdoorSplitTwoDaysPlan(objective);
    }
  }
  
  // Aplicar limitações com base no plano do usuário
  const isPremium = isPremiumUser();
  const processedPlan: Record<string, any> = {};
  
  // Determinar limite de exercícios com base no plano e nível
  let exerciseLimit = 4; // Padrão para usuários Free
  
  if (isPremium) {
    // Definir limite com base no nível para usuários premium
    switch(level) {
      case 'beginner':
        exerciseLimit = 6;
        break;
      case 'intermediate':
        exerciseLimit = 7;
        break;
      case 'advanced':
        exerciseLimit = 8;
        break;
      default:
        exerciseLimit = 6;
    }
  }
  
  // Aplicar o limite a cada dia do plano
  Object.keys(rawPlan).forEach(day => {
    // Adicionar URLs de GIFs para os exercícios
    const exercisesWithGifs = rawPlan[day].map((ex: any) => ({
      ...ex,
      gif_url: `https://source.unsplash.com/random/400x300/?${encodeURIComponent(ex.nome.replace(' ', '-'))}&fitness`
    }));
    
    // Não limitar durante a geração inicial, deixar para o front-end aplicar
    processedPlan[day] = exercisesWithGifs;
  });
  
  adaptedPlan.plan = processedPlan;
  return adaptedPlan;
}
