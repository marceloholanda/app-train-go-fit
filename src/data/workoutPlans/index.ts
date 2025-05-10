
import { WorkoutPlan } from "@/types/workout";
import { beginnerFatLoss } from "./beginnerFatLoss";
import { advancedHypertrophy } from "./advancedHypertrophy";
import { outdoorHealthPlan } from "./outdoorHealthPlan";
import { habitConsistencyPlan } from "./habitConsistencyPlan";
import { genericBeginnerPlan, genericIntermediatePlan, genericAdvancedPlan } from "./genericPlans";

// Lista de planos de treino pré-definidos
export const workoutPlans: WorkoutPlan[] = [
  beginnerFatLoss,
  advancedHypertrophy,
  outdoorHealthPlan,
  habitConsistencyPlan,
  genericBeginnerPlan,
  genericIntermediatePlan,
  genericAdvancedPlan
];

export type { Exercise, WorkoutPlan } from "@/types/workout";
