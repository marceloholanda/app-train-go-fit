
import { WorkoutPlan } from "@/types/workout";

// Importação dos planos de perda de gordura
import { fatLossBeginnerHome } from "./fatLossBeginnerHome";
import { fatLossIntermediateHome } from "./fatLossIntermediateHome";
import { fatLossAdvancedGym } from "./fatLossAdvancedGym";

// Importação dos planos de ganho muscular
import { muscleBeginnerGym } from "./muscleBeginnerGym";
import { muscleIntermediateGym } from "./muscleIntermediateGym";
import { muscleAdvancedHome } from "./muscleAdvancedHome";

// Importação dos planos de saúde e energia
import { healthBeginnerHome } from "./healthBeginnerHome";
import { healthIntermediateGym } from "./healthIntermediateGym";
import { healthAdvancedOutdoor } from "./healthAdvancedOutdoor";

// Importação dos planos de criação de hábito
import { habitBeginnerHome } from "./habitBeginnerHome";
import { habitIntermediateHome } from "./habitIntermediateHome";
import { habitAdvancedGym } from "./habitAdvancedGym";

// Array com todos os planos importados
export const allWorkoutPlans: WorkoutPlan[] = [
  // Planos de perda de gordura
  fatLossBeginnerHome,
  fatLossIntermediateHome,
  fatLossAdvancedGym,
  
  // Planos de ganho muscular
  muscleBeginnerGym,
  muscleIntermediateGym,
  muscleAdvancedHome,
  
  // Planos de saúde e energia
  healthBeginnerHome,
  healthIntermediateGym,
  healthAdvancedOutdoor,
  
  // Planos de criação de hábito
  habitBeginnerHome,
  habitIntermediateHome,
  habitAdvancedGym
];
