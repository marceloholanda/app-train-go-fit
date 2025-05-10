
import { WorkoutPlan } from "@/types/workout";
import { beginnerFatLoss } from "./beginnerFatLoss";
import { advancedHypertrophy } from "./advancedHypertrophy";
import { outdoorHealthPlan } from "./outdoorHealthPlan";
import { habitConsistencyPlan } from "./habitConsistencyPlan";
import { genericBeginnerPlan, genericIntermediatePlan, genericAdvancedPlan } from "./genericPlans";

// Importação dos novos planos detalhados
import { allWorkoutPlans } from "./allWorkoutPlans";

// Lista de planos de treino pré-definidos
export const workoutPlans: WorkoutPlan[] = [
  // Planos existentes
  beginnerFatLoss,
  advancedHypertrophy,
  outdoorHealthPlan,
  habitConsistencyPlan,
  genericBeginnerPlan,
  genericIntermediatePlan,
  genericAdvancedPlan,
  
  // Novos planos detalhados
  ...allWorkoutPlans
];

export type { Exercise, WorkoutPlan } from "@/types/workout";
