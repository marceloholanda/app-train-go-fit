/**
 * Type for workout plan preferences
 */
export interface WorkoutPlanPreferences {
  objetivo: string;
  nivel: string;
  frequencia: string;
  local: string;
}

/**
 * Type for a single exercise
 */
export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  restTime: number;
  equipment?: string;
  muscleGroup?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  tips?: string[];
  alternatives?: Exercise[];
}

/**
 * Type for a workout day
 */
export interface WorkoutDay {
  id: number;
  name: string;
  exercises: Exercise[];
  focus?: string;
  description?: string;
}

/**
 * Type for a complete workout plan
 */
export interface WorkoutPlan {
  id?: string;
  name: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  days: number;
  goal: string;
  plan: { [key: string]: Exercise[] };
  tags?: string[];
  location?: 'home' | 'gym' | 'outdoor';
  equipment?: string[];
  frequency?: string;
  author?: string;
  notes?: string;
}

/**
 * Type for generateWorkoutPlan function parameters
 */
export interface generateWorkoutPlanType {
  objetivo: string;
  nivel: string;
  frequencia: string;
  local: string;
}
