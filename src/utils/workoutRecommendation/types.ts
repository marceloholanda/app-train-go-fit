
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
 * Type for quiz answers
 */
export interface QuizAnswers {
  objective: string;
  level: string;
  environment: string;
  days_per_week: string;
  // Add additional fields that appear in QuizData.ts
  age: string;
  weight: string;
  height: string;
  motivation_type: string;
  training_barrier: string;
}

/**
 * Type for a single exercise
 */
export interface Exercise {
  id?: number;
  name: string;
  nome?: string; // Portuguese alternative
  sets: number;
  reps: string;
  restTime?: number;
  equipment?: string;
  muscleGroup?: string;
  description?: string;
  descricao?: string; // Portuguese alternative
  videoUrl?: string;
  video_url?: string; // Alternative format
  imageUrl?: string;
  gif_url?: string; // Alternative format
  tips?: string[];
  alternatives?: Exercise[];
  substituicoes?: Exercise[]; // Portuguese alternative
  completed?: boolean; // For tracking completion status
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
