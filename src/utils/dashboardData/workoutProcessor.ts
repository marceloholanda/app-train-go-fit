
import { WorkoutDisplay } from '@/types/dashboard';
import { WorkoutPlan } from '@/types/workout';
import { mapWorkoutDays } from '@/utils/workoutUtils/dayMapping';
import { getWorkoutIcon } from '@/utils/workoutUtils/iconGeneration';
import { generateWorkoutName } from '@/utils/workoutUtils/nameGeneration';

/**
 * Processes a workout plan from localStorage into a displayable format
 */
export const processLocalWorkoutPlan = (user: any): { workouts: WorkoutDisplay[], weekProgress: number } => {
  try {
    if (!user?.workoutPlan) {
      console.error("[TrainGO] No workout plan in user data");
      return { workouts: [], weekProgress: 0 };
    }
    
    const plan: WorkoutPlan = user.workoutPlan;
    console.log("[TrainGO] Processing local workout plan:", plan.name);
    
    const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
    const weekDays = mapWorkoutDays(plan.days || 3);
    
    const workoutItems: WorkoutDisplay[] = [];
    
    Object.entries(plan.plan || {}).forEach(([dayId, exercises], index) => {
      try {
        const dayNumber = index + 1;
        const workoutStatus: 'completed' | 'pending' = completedWorkouts.includes(dayNumber) ? 'completed' : 'pending';
        
        const workoutItem: WorkoutDisplay = {
          id: dayNumber,
          name: generateWorkoutName(dayNumber, exercises as any),
          day: weekDays[index] || `Dia ${dayNumber}`,
          status: workoutStatus,
          exercises: (exercises as any[]).length,
          icon: getWorkoutIcon(exercises as any)
        };
        
        workoutItems.push(workoutItem);
      } catch (itemError) {
        console.error(`[TrainGO] Error processing day ${index + 1}:`, itemError);
      }
    });
    
    console.log("[TrainGO] Total workout items:", workoutItems.length);
    
    // Get week progress from user data
    const progress = user.workoutProgress?.lastWeekProgress || 0;
    
    return { workouts: workoutItems, weekProgress: progress };
  } catch (error) {
    console.error("[TrainGO] Error in processLocalWorkoutPlan:", error);
    return { workouts: [], weekProgress: 0 };
  }
};

/**
 * Processes a workout plan from Supabase into a displayable format
 */
export const processSupabaseWorkoutPlan = (plan: any): WorkoutDisplay[] => {
  try {
    if (!plan) {
      console.error("[TrainGO] No workout plan data");
      return [];
    }
    
    console.log("[TrainGO] Processing Supabase workout plan");
    
    // Check plan format and process accordingly
    if ('plan' in plan) {
      const weekDays = mapWorkoutDays(plan.days || 3);
      const workoutItems: WorkoutDisplay[] = [];
      
      Object.entries(plan.plan || {}).forEach(([dayId, exercises], index) => {
        try {
          const dayNumber = index + 1;
          const exercisesArray = exercises as any[];
          
          const workoutItem: WorkoutDisplay = {
            id: dayNumber,
            name: generateWorkoutName(dayNumber, exercisesArray),
            day: weekDays[index] || `Dia ${dayNumber}`,
            status: 'pending',
            exercises: exercisesArray.length,
            icon: getWorkoutIcon(exercisesArray)
          };
          
          workoutItems.push(workoutItem);
        } catch (itemError) {
          console.error(`[TrainGO] Error processing day ${index + 1} from Supabase:`, itemError);
        }
      });
      
      return workoutItems;
    } else if (Array.isArray(plan)) {
      // If already in WorkoutDisplay[] format
      return plan;
    }
    
    console.error("[TrainGO] Unsupported workout plan format", plan);
    return [];
  } catch (error) {
    console.error("[TrainGO] Error processing Supabase workout plan:", error);
    return [];
  }
};

/**
 * Calculate week progress from completed exercises and total exercises
 */
export const calculateWeekProgress = (completedExercises: string[] | any[], totalExercises: number): number => {
  if (totalExercises <= 0) return 0;
  const completedCount = completedExercises?.length || 0;
  return (completedCount / totalExercises) * 100;
};

/**
 * Extracts the total number of exercises from a workout plan
 */
export const getTotalExercises = (plan: any): number => {
  if (!plan) return 0;
  
  if (Array.isArray(plan)) {
    return plan.length;
  }
  
  if (plan && typeof plan === 'object' && plan !== null) {
    if ('days' in plan) {
      return (plan as any).days;
    }
    
    if ('plan' in plan) {
      const planObj = (plan as any).plan;
      if (planObj && typeof planObj === 'object') {
        return Object.keys(planObj).length;
      }
    }
  }
  
  return 0;
};
