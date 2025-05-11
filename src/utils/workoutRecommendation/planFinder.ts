
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
  const { objective, level, environment } = answers;
  
  // Map environment to the appropriate type
  const mappedEnvironment = mapEnvironment(environment);
  
  // Select a plan based on the combination of objective, level and environment
  if (objective === 'gain_muscle') {
    if (level === 'beginner') {
      if (mappedEnvironment === 'gym') {
        return muscleBeginnerGym;
      } else if (mappedEnvironment === 'home') {
        return muscleAdvancedHome; // Using adapted plan for home
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
        return muscleIntermediateGym; // Using intermediate as there's no advanced gym plan
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
    // health_energy objective - using habit creation plans that were used for home_training
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

  // Default plan selection based on environment if no specific criteria match
  if (mappedEnvironment === 'outdoor') {
    return outdoorHealthPlan;
  } else if (mappedEnvironment === 'home') {
    return habitBeginnerHome;
  }

  // Default plan if no criteria match
  return muscleBeginnerGym;
};
