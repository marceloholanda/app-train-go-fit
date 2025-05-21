import { Json } from '@/integrations/supabase/types';

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  days: number;
  level: string;
  environment: string;
  objective: string;
  plan: Record<string, any>;
  tags: string[];
}

export interface WorkoutPlanSupabase {
  id?: string;
  plan_id: string;
  user_id: string;
  name: string;
  description?: string;
  days: number;
  level?: string;
  environment?: string;
  objective?: string;
  plan: Json;
  tags?: Json;
  created_at?: string;
  updated_at?: string;
}

export interface Exercise {
  nome: string;
  reps?: string;
  sets?: number;
  rest?: number;
  weight?: number | string;
  video?: string;
  image?: string;
  instructions?: string;
  substitutes?: string[];
  equipment?: string;
  muscle?: string;
}

export interface WorkoutDay {
  day: number;
  exercises: Exercise[];
  completed?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description?: string;
  badge_id: string;
  image_url?: string;
  unlocked_at: string;
  user_id: string;
}

export interface WorkoutStreaks {
  current: number;
  longest: number;
}

export interface ExpectedWorkoutDay {
  date: string;
  missed: boolean;
}

// Tipos auxiliares para o componente de calendário
export type WorkoutDate = string; // Formato YYYY-MM-DD

export interface UserStats {
  current_streak: number;
  longest_streak: number;
  total_workouts: number;
  last_workout_date?: string;
  week_progress?: number;
  updated_at?: string;
  user_id: string;
}

export interface WorkoutProgress {
  id?: string;
  user_id: string;
  workout_day: number;
  completed_date: string;
  exercises?: Exercise[];
  notes?: string;
  created_at?: string;
}
