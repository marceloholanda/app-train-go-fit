
import { WorkoutPlan } from '@/types/workout';
import { QuizAnswers } from './types';
import { mapEnvironment } from './environmentMapping';
import { adaptWorkoutPlanToEnvironment } from './planAdapter';
import { adaptPlanToDaysPerWeek } from './planAdaptation';

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
 * Find a workout plan based on the user's preferences
 */
export function findPlanForPreferences(
  objetivo: string,
  nivel: string,
  frequencia: string,
  local: string
): WorkoutPlan | null {
  // Map input values to our internal representations
  const objective = mapObjective(objetivo);
  const level = mapLevel(nivel);
  const environment = mapEnvironment(local);
  const daysPerWeek = mapFrequency(frequencia);
  
  // Build a basic set of answers
  const answers: QuizAnswers = {
    objective,
    level,
    environment,
    days_per_week: String(daysPerWeek)
  };
  
  // Use the existing function to find the best plan
  return findBestWorkoutPlan(answers);
}

// Helper functions to map Portuguese inputs to internal values
function mapObjective(objetivo: string): string {
  const mapping: Record<string, string> = {
    'ganhar_massa': 'gain_muscle',
    'perder_peso': 'lose_weight',
    'manter_forma': 'maintain',
    'saude': 'health_energy'
  };
  return mapping[objetivo] || objetivo;
}

function mapLevel(nivel: string): string {
  const mapping: Record<string, string> = {
    'iniciante': 'beginner',
    'intermediario': 'intermediate',
    'avancado': 'advanced'
  };
  return mapping[nivel] || nivel;
}

function mapFrequency(frequencia: string): number {
  // Convert string frequency like "3x" to number 3
  const number = parseInt(frequencia.replace('x', ''), 10);
  return isNaN(number) ? 3 : number;
}

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
