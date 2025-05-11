
import { WorkoutPlan } from '@/types/workout';
import { QuizAnswers } from './types';
import { mapEnvironment } from './environmentMapping';
import { adaptWorkoutPlanToEnvironment } from './planAdapter';

// Import workout plans
import { muscleBeginnerGym } from '@/data/workoutPlans/muscleBeginnerGym';
import { muscleIntermediateGym } from '@/data/workoutPlans/muscleIntermediateGym';
import { healthBeginnerHome } from '@/data/workoutPlans/healthBeginnerHome';
import { healthIntermediateGym } from '@/data/workoutPlans/healthIntermediateGym';
import { healthAdvancedOutdoor } from '@/data/workoutPlans/healthAdvancedOutdoor';
import { muscleAdvancedHome } from '@/data/workoutPlans/muscleAdvancedHome';
import { outdoorHealthPlan } from '@/data/workoutPlans/outdoorHealthPlan';
import { habitBeginnerHome } from '@/data/workoutPlans/habitBeginnerHome';
import { habitIntermediateHome } from '@/data/workoutPlans/habitIntermediateHome';
import { habitAdvancedGym } from '@/data/workoutPlans/habitAdvancedGym';
import { fatLossBeginnerHome } from '@/data/workoutPlans/fatLossBeginnerHome';
import { fatLossIntermediateHome } from '@/data/workoutPlans/fatLossIntermediateHome';
import { fatLossAdvancedGym } from '@/data/workoutPlans/fatLossAdvancedGym';

/**
 * Find the best workout plan based on user answers
 */
export const findBestWorkoutPlan = (answers: QuizAnswers): WorkoutPlan => {
  const { objective, level, environment, days_per_week } = answers;
  
  // Map environment to the appropriate type
  const mappedEnvironment = mapEnvironment(environment);
  
  // Convert days_per_week to number if it's a string
  const daysPerWeek = typeof days_per_week === 'string' 
    ? parseInt(days_per_week, 10) 
    : (days_per_week || 3);
  
  // First, select a base plan based on objective, level and environment
  let selectedPlan: WorkoutPlan;
  
  // Select a plan based on the combination of objective, level and environment
  if (objective === 'gain_muscle') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'gym') {
        selectedPlan = muscleBeginnerGym;
      } else if (mappedEnvironment === 'home') {
        selectedPlan = muscleAdvancedHome; // Using adapted plan for home
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(muscleBeginnerGym, mappedEnvironment);
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'gym') {
        selectedPlan = muscleIntermediateGym;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(muscleIntermediateGym, mappedEnvironment);
      }
    } else { // advanced
      if (mappedEnvironment === 'gym') {
        selectedPlan = muscleIntermediateGym; // Using intermediate as there's no advanced gym plan
      } else if (mappedEnvironment === 'home') {
        selectedPlan = muscleAdvancedHome;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(muscleAdvancedHome, 'outdoor');
      }
    }
  } else if (objective === 'lose_weight') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'gym') {
        selectedPlan = fatLossAdvancedGym;
      } else if (mappedEnvironment === 'home') {
        selectedPlan = fatLossBeginnerHome;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(fatLossBeginnerHome, 'outdoor');
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'gym') {
        selectedPlan = fatLossAdvancedGym;
      } else if (mappedEnvironment === 'home') {
        selectedPlan = fatLossIntermediateHome;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(fatLossIntermediateHome, 'outdoor');
      }
    } else { // advanced
      if (mappedEnvironment === 'gym') {
        selectedPlan = fatLossAdvancedGym;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(fatLossAdvancedGym, mappedEnvironment);
      }
    }
  } else if (objective === 'maintain') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'home') {
        selectedPlan = healthBeginnerHome;
      } else if (mappedEnvironment === 'gym') {
        selectedPlan = healthIntermediateGym;
      } else {
        selectedPlan = healthAdvancedOutdoor;
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'gym') {
        selectedPlan = healthIntermediateGym;
      } else if (mappedEnvironment === 'outdoor') {
        selectedPlan = healthAdvancedOutdoor;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(healthIntermediateGym, 'home');
      }
    } else { // advanced
      if (mappedEnvironment === 'outdoor') {
        selectedPlan = healthAdvancedOutdoor;
      } else if (mappedEnvironment === 'gym') {
        selectedPlan = healthIntermediateGym;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(healthAdvancedOutdoor, 'home');
      }
    }
  } else if (objective === 'health_energy') {
    // health_energy objective - using habit creation plans that were used for home_training
    if (level === 'beginner') {
      if (mappedEnvironment === 'home') {
        selectedPlan = habitBeginnerHome;
      } else if (mappedEnvironment === 'gym') {
        selectedPlan = habitAdvancedGym;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(habitBeginnerHome, 'outdoor');
      }
    } else if (level === 'intermediate') {
      if (mappedEnvironment === 'home') {
        selectedPlan = habitIntermediateHome;
      } else if (mappedEnvironment === 'gym') {
        selectedPlan = habitAdvancedGym;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(habitIntermediateHome, 'outdoor');
      }
    } else { // advanced
      if (mappedEnvironment === 'gym') {
        selectedPlan = habitAdvancedGym;
      } else {
        selectedPlan = adaptWorkoutPlanToEnvironment(habitAdvancedGym, mappedEnvironment);
      }
    }
  } else {
    // Default plan selection based on environment if no specific criteria match
    if (mappedEnvironment === 'outdoor') {
      selectedPlan = outdoorHealthPlan;
    } else if (mappedEnvironment === 'home') {
      selectedPlan = habitBeginnerHome;
    } else {
      selectedPlan = muscleBeginnerGym; // Default gym plan
    }
  }
  
  // Now adapt the plan to match the requested number of days per week
  // This ensures proper muscle group splits based on training frequency
  return adaptPlanToDaysPerWeek(selectedPlan, daysPerWeek, mappedEnvironment, objective, level);
};

/**
 * Adapts a workout plan to the specified number of days per week
 * This function ensures proper muscle group splits based on training frequency
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
  if (environment === 'gym') {
    switch(daysPerWeek) {
      case 1:
        adaptedPlan.plan = createGymSplitOneDayPlan(objective);
        break;
      case 2:
        adaptedPlan.plan = createGymSplitTwoDaysPlan(objective);
        break;
      case 3:
        adaptedPlan.plan = createGymSplitThreeDaysPlan(objective);
        break;
      case 4:
        adaptedPlan.plan = createGymSplitFourDaysPlan(objective);
        break;
      case 5:
      case 6:
      case 7:
        adaptedPlan.plan = createGymSplitFivePlusDaysPlan(objective, daysPerWeek);
        break;
      default:
        adaptedPlan.plan = createGymSplitThreeDaysPlan(objective);
    }
  } else if (environment === 'home') {
    switch(daysPerWeek) {
      case 1:
        adaptedPlan.plan = createHomeSplitOneDayPlan(objective);
        break;
      case 2:
        adaptedPlan.plan = createHomeSplitTwoDaysPlan(objective);
        break;
      case 3:
        adaptedPlan.plan = createHomeSplitThreeDaysPlan(objective);
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        adaptedPlan.plan = createHomeSplitFourPlusDaysPlan(objective, daysPerWeek);
        break;
      default:
        adaptedPlan.plan = createHomeSplitThreeDaysPlan(objective);
    }
  } else { // outdoor
    switch(daysPerWeek) {
      case 1:
        adaptedPlan.plan = createOutdoorSplitOneDayPlan(objective);
        break;
      case 2:
        adaptedPlan.plan = createOutdoorSplitTwoDaysPlan(objective);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        adaptedPlan.plan = createOutdoorSplitThreePlusDaysPlan(objective, daysPerWeek);
        break;
      default:
        adaptedPlan.plan = createOutdoorSplitTwoDaysPlan(objective);
    }
  }
  
  return adaptedPlan;
};

// GYM SPLITS

function createGymSplitOneDayPlan(objective: string) {
  // For 1 day per week, we create a full body workout focused on major muscle groups
  return {
    "dia1": [
      { nome: "Agachamento livre", reps: "3x12" },
      { nome: "Supino reto com barra", reps: "3x10-12" },
      { nome: "Remada curvada", reps: "3x12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Prancha", reps: "3x30s" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Panturrilha em pé", reps: "3x15" }
    ]
  };
}

function createGymSplitTwoDaysPlan(objective: string) {
  // For 2 days, we do upper/lower split
  return {
    "dia1": [ // Upper body
      { nome: "Supino reto com barra", reps: "3x10-12" },
      { nome: "Remada curvada", reps: "3x10-12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" },
      { nome: "Puxada alta", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" }
    ],
    "dia2": [ // Lower body + core
      { nome: "Agachamento livre", reps: "3x12" },
      { nome: "Leg press", reps: "3x15" },
      { nome: "Cadeira extensora", reps: "3x15" },
      { nome: "Cadeira flexora", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "3x15" },
      { nome: "Abdominal máquina", reps: "3x15" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Prancha", reps: "3x30s" }
    ]
  };
}

function createGymSplitThreeDaysPlan(objective: string) {
  // For 3 days, we do push/pull/legs split
  return {
    "dia1": [ // Push (chest, shoulders, triceps)
      { nome: "Supino reto com barra", reps: "4x10-12" },
      { nome: "Supino inclinado com halteres", reps: "3x12" },
      { nome: "Crucifixo máquina", reps: "3x12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    "dia2": [ // Pull (back, biceps)
      { nome: "Puxada alta", reps: "4x10-12" },
      { nome: "Remada curvada", reps: "3x12" },
      { nome: "Remada sentada na polia", reps: "3x12" },
      { nome: "Pull down", reps: "3x12" },
      { nome: "Rosca direta barra", reps: "3x12" },
      { nome: "Rosca martelo", reps: "3x12" },
      { nome: "Abdominal infra", reps: "3x15" }
    ],
    "dia3": [ // Legs + core
      { nome: "Agachamento livre", reps: "4x10-12" },
      { nome: "Leg press", reps: "3x15" },
      { nome: "Cadeira extensora", reps: "3x15" },
      { nome: "Cadeira flexora", reps: "3x15" },
      { nome: "Stiff", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "4x15" },
      { nome: "Abdominal máquina", reps: "3x15" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Prancha", reps: "3x30s" }
    ]
  };
}

function createGymSplitFourDaysPlan(objective: string) {
  // For 4 days, we can do a upper/lower split twice a week
  return {
    "dia1": [ // Upper body (strength focus)
      { nome: "Supino reto com barra", reps: "4x8-10" },
      { nome: "Remada curvada", reps: "4x8-10" },
      { nome: "Desenvolvimento máquina", reps: "3x10-12" },
      { nome: "Puxada alta", reps: "3x10-12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" }
    ],
    "dia2": [ // Lower body (strength focus)
      { nome: "Agachamento livre", reps: "4x8-10" },
      { nome: "Leg press", reps: "4x10-12" },
      { nome: "Cadeira extensora", reps: "3x12" },
      { nome: "Cadeira flexora", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "4x15" },
      { nome: "Abdominal máquina", reps: "3x15" }
    ],
    "dia3": [ // Upper body (volume focus)
      { nome: "Supino inclinado com halteres", reps: "3x12-15" },
      { nome: "Crucifixo máquina", reps: "3x12-15" },
      { nome: "Pull down", reps: "3x12-15" },
      { nome: "Remada sentada na polia", reps: "3x12-15" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Rosca martelo", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    "dia4": [ // Lower body (volume focus) + cardio for weight loss
      { nome: "Hack squat", reps: "3x12-15" },
      { nome: "Stiff", reps: "3x12" },
      { nome: "Avanço com halteres", reps: "3x10 cada" },
      { nome: "Mesa flexora", reps: "3x15" },
      { nome: "Panturrilha sentado", reps: "3x20" },
      { nome: "Abdominal infra", reps: "3x15" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Prancha", reps: "3x45s" }
    ]
  };
}

function createGymSplitFivePlusDaysPlan(objective: string, days: number) {
  // For 5+ days, we do a muscle group split
  const basePlan = {
    "dia1": [ // Chest + triceps
      { nome: "Supino reto com barra", reps: "4x8-10" },
      { nome: "Supino inclinado com halteres", reps: "3x10-12" },
      { nome: "Crucifixo máquina", reps: "3x12" },
      { nome: "Crossover", reps: "3x12-15" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    "dia2": [ // Back + biceps
      { nome: "Puxada alta", reps: "4x8-10" },
      { nome: "Remada curvada", reps: "4x8-10" },
      { nome: "Remada sentada na polia", reps: "3x12" },
      { nome: "Pull down", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Rosca martelo", reps: "3x12" }
    ],
    "dia3": [ // Legs
      { nome: "Agachamento livre", reps: "4x8-10" },
      { nome: "Leg press", reps: "4x10-12" },
      { nome: "Cadeira extensora", reps: "3x12" },
      { nome: "Cadeira flexora", reps: "3x12" },
      { nome: "Stiff", reps: "3x10-12" },
      { nome: "Panturrilha em pé", reps: "4x15" }
    ],
    "dia4": [ // Shoulders + abs
      { nome: "Desenvolvimento máquina", reps: "4x8-10" },
      { nome: "Elevação lateral", reps: "3x12-15" },
      { nome: "Elevação frontal", reps: "3x12" },
      { nome: "Face pull", reps: "3x15" },
      { nome: "Abdominal máquina", reps: "3x15" },
      { nome: "Prancha", reps: "3x45s" }
    ],
    "dia5": [ // Cardio + light fullbody
      { nome: objective === 'lose_weight' ? "Esteira" : "Corrida leve", reps: "25min" },
      { nome: "Supino máquina", reps: "2x15" },
      { nome: "Puxada alta", reps: "2x15" },
      { nome: "Desenvolvimento máquina", reps: "2x15" },
      { nome: "Leg press leve", reps: "2x20" },
      { nome: "Prancha", reps: "2x30s" }
    ]
  };
  
  // For 6 days, add an arm focus day
  if (days >= 6) {
    basePlan["dia6"] = [
      { nome: "Rosca scott", reps: "3x12" },
      { nome: "Rosca concentrada", reps: "3x12" },
      { nome: "Tríceps mergulho", reps: "3x12" },
      { nome: "Tríceps testa", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Abdominal infra", reps: "3x15" },
      { nome: objective === 'lose_weight' ? "Esteira" : "Corrida leve", reps: "20min" }
    ];
  }
  
  // For 7 days, add a rest/recovery/light day
  if (days >= 7) {
    basePlan["dia7"] = [
      { nome: "Caminhada leve", reps: "30min" },
      { nome: "Alongamento geral", reps: "15min" },
      { nome: "Mobilidade articular", reps: "10min" },
      { nome: "Abdominais", reps: "3x20" }
    ];
  }
  
  return basePlan;
}

// HOME SPLITS

function createHomeSplitOneDayPlan(objective: string) {
  // For 1 day per week at home, we create a full body workout
  return {
    "dia1": [
      { nome: "Agachamento livre", reps: "3x15" },
      { nome: "Flexão de braço", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Agachamento com salto", reps: "3x12" },
      { nome: "Tríceps no banco", reps: "3x12" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Polichinelo", reps: "3x30s" }
    ]
  };
}

function createHomeSplitTwoDaysPlan(objective: string) {
  // For 2 days at home, we do upper/lower split
  return {
    "dia1": [ // Upper body
      { nome: "Flexão de braço", reps: "4x máximo" },
      { nome: "Flexão inclinada (pés elevados)", reps: "3x máximo" },
      { nome: "Tríceps no banco", reps: "3x12" },
      { nome: "Remada com garrafa", reps: "3x15 cada" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Elevação lateral com garrafas", reps: "3x15" }
    ],
    "dia2": [ // Lower body + cardio
      { nome: "Agachamento livre", reps: "4x15" },
      { nome: "Avanço no lugar", reps: "3x12 cada" },
      { nome: "Elevação de quadril", reps: "3x15" },
      { nome: "Panturrilha em pé", reps: "3x20" },
      { nome: "Abdominal", reps: "3x20" },
      objective === 'lose_weight' ? { nome: "Polichinelo", reps: "4x30s" } : { nome: "Prancha lateral", reps: "3x20s cada" }
    ]
  };
}

function createHomeSplitThreeDaysPlan(objective: string) {
  // For 3 days at home
  return {
    "dia1": [ // Upper body
      { nome: "Flexão de braço", reps: "3x máximo" },
      { nome: "Flexão inclinada (pés elevados)", reps: "3x máximo" },
      { nome: "Tríceps no banco", reps: "3x15" },
      { nome: "Remada com garrafa", reps: "3x15 cada" },
      { nome: "Elevação lateral com garrafas", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" }
    ],
    "dia2": [ // Lower body
      { nome: "Agachamento livre", reps: "4x15" },
      { nome: "Avanço no lugar", reps: "3x12 cada" },
      { nome: "Elevação de quadril", reps: "3x15" },
      { nome: "Agachamento sumô", reps: "3x15" },
      { nome: "Panturrilha em pé", reps: "3x20" },
      { nome: "Abdominal canivete", reps: "3x15" }
    ],
    "dia3": [ // Core + cardio
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x45s" },
      { nome: "Mountain climber", reps: "3x30s" },
      { nome: "Corrida estacionária", reps: "4x30s" },
      { nome: "Burpee", reps: "3x10" },
      { nome: "Polichinelo", reps: "3x45s" }
    ]
  };
}

function createHomeSplitFourPlusDaysPlan(objective: string, days: number) {
  // For 4+ days at home
  const basePlan = {
    "dia1": [ // Chest + triceps focus
      { nome: "Flexão de braço", reps: "4x máximo" },
      { nome: "Flexão inclinada (pés elevados)", reps: "3x máximo" },
      { nome: "Flexão fechada (diamante)", reps: "3x máximo" },
      { nome: "Tríceps no banco", reps: "3x15" },
      { nome: "Dips entre cadeiras", reps: "3x máximo" }
    ],
    "dia2": [ // Legs focus
      { nome: "Agachamento livre", reps: "4x20" },
      { nome: "Avanço no lugar", reps: "3x15 cada" },
      { nome: "Elevação de quadril", reps: "3x20" },
      { nome: "Panturrilha em pé", reps: "4x30" },
      { nome: "Agachamento com salto", reps: "3x12" }
    ],
    "dia3": [ // Back + biceps focus (with substitutes)
      { nome: "Remada com garrafa", reps: "4x15 cada" },
      { nome: "Flexão invertida na mesa", reps: "3x máximo" },
      { nome: "Superman", reps: "3x15" },
      { nome: "Rosca com garrafas", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" }
    ],
    "dia4": [ // Shoulders + core
      { nome: "Elevação lateral com garrafas", reps: "3x15" },
      { nome: "Elevação frontal com garrafas", reps: "3x15" },
      { nome: "Pike push-up (flexão para ombro)", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x45s" },
      { nome: "Mountain climber", reps: "3x30s" }
    ]
  };
  
  // For 5 days or more, add cardio + mobility
  if (days >= 5) {
    basePlan["dia5"] = [
      { nome: "Polichinelo", reps: "4x45s" },
      { nome: "Corrida estacionária", reps: "4x45s" },
      { nome: "Burpee", reps: "3x12" },
      { nome: "Pular corda (ou simular)", reps: "3x1 min" },
      { nome: "Alongamento geral", reps: "15 min" }
    ];
  }
  
  // For 6 days or more, add a light full body + cardio day
  if (days >= 6) {
    basePlan["dia6"] = [
      { nome: "Flexão de braço", reps: "2x máximo" },
      { nome: "Agachamento", reps: "2x20" },
      { nome: "Prancha", reps: "2x30s" },
      { nome: "Remada com garrafa", reps: "2x15 cada" },
      { nome: "Polichinelo", reps: "3x45s" },
      { nome: "Alongamento", reps: "10 min" }
    ];
  }
  
  // For 7 days, add active recovery day
  if (days >= 7) {
    basePlan["dia7"] = [
      { nome: "Caminhada leve", reps: "30 min" },
      { nome: "Alongamento completo", reps: "15 min" },
      { nome: "Mobilidade articular", reps: "10 min" },
      { nome: "Respiração e relaxamento", reps: "5 min" }
    ];
  }
  
  return basePlan;
}

// OUTDOOR SPLITS

function createOutdoorSplitOneDayPlan(objective: string) {
  // For 1 day outdoors
  return {
    "dia1": [
      { nome: "Agachamento livre", reps: "3x15" },
      { nome: "Flexão no banco", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x15" },
      { nome: "Dips no banco", reps: "3x máximo" },
      { nome: "Elevação de pernas no banco", reps: "3x12" },
      { nome: objective === 'lose_weight' ? "Corrida leve" : "Caminhada", reps: "15 min" }
    ]
  };
}

function createOutdoorSplitTwoDaysPlan(objective: string) {
  // For 2 days outdoors
  return {
    "dia1": [ // Inferiores + cardio
      { nome: "Agachamento livre", reps: "4x15" },
      { nome: "Avanço com banco", reps: "3x12 cada" },
      { nome: "Step-up no banco", reps: "3x15 cada" },
      { nome: "Elevação de quadril", reps: "3x15" },
      { nome: objective === 'lose_weight' ? "Corrida em intervalos" : "Corrida leve", reps: "20 min" }
    ],
    "dia2": [ // Superiores + abdômen
      { nome: "Flexão no banco", reps: "3x máximo" },
      { nome: "Dips no banco", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Remada invertida no banco", reps: "3x máximo" },
      { nome: "Polichinelo", reps: "3x45s" }
    ]
  };
}

function createOutdoorSplitThreePlusDaysPlan(objective: string, days: number) {
  const basePlan = {
    "dia1": [ // Push (chest, triceps, shoulders)
      { nome: "Flexão no banco", reps: "3x máximo" },
      { nome: "Flexão declinada (mãos no banco)", reps: "3x máximo" },
      { nome: "Dips no banco", reps: "3x máximo" },
      { nome: "Elevações de braço em Y com peso corporal", reps: "3x15" },
      { nome: "Prancha com toque no ombro", reps: "3x12 cada" }
    ],
    "dia2": [ // Pull (back) + legs
      { nome: "Remada invertida no banco", reps: "3x máximo" },
      { nome: "Remada com objeto do parque", reps: "3x12" },
      { nome: "Agachamento livre", reps: "3x20" },
      { nome: "Avanço com banco", reps: "3x12 cada" },
      { nome: "Elevação de quadril", reps: "3x15" }
    ],
    "dia3": [ // Cardio + core
      { nome: objective === 'lose_weight' ? "Corrida em intervalos" : "Corrida leve", reps: "25 min" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x45s" },
      { nome: "Mountain climber", reps: "3x30s" },
      { nome: "Burpee", reps: "3x10" }
    ]
  };
  
  // If we have more days, add additional splits
  if (days >= 4) {
    basePlan["dia4"] = [ // Upper body focus
      { nome: "Flexão no banco variações", reps: "4x10 cada" },
      { nome: "Dips no banco profundo", reps: "3x máximo" },
      { nome: "Remada invertida no banco", reps: "3x máximo" },
      { nome: "Elevação lateral simulada", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" }
    ];
  }
  
  if (days >= 5) {
    basePlan["dia5"] = [ // Lower body focus
      { nome: "Agachamento com salto", reps: "3x12" },
      { nome: "Avanço com banco alternado", reps: "3x15 cada" },
      { nome: "Elevação de quadril unilateral", reps: "3x12 cada" },
      { nome: "Step-up no banco", reps: "3x15 cada" },
      { nome: "Panturrilha no degrau", reps: "3x20" }
    ];
  }
  
  if (days >= 6) {
    basePlan["dia6"] = [ // Cardio intensive
      { nome: "Corrida em intervalos", reps: "6x (30s sprint + 1min lento)" },
      { nome: "Burpee", reps: "3x12" },
      { nome: "Mountain climber", reps: "3x40s" },
      { nome: "Polichinelo", reps: "3x45s" },
      { nome: "Prancha", reps: "3x45s" }
    ];
  }
  
  if (days >= 7) {
    basePlan["dia7"] = [ // Active recovery
      { nome: "Caminhada", reps: "30 min" },
      { nome: "Alongamento completo", reps: "20 min" },
      { nome: "Mobilidade articular", reps: "10 min" }
    ];
  }
  
  return basePlan;
}

