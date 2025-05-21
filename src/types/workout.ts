
// Adicionar ou modificar apenas os tipos necessários
import { Json } from '@/integrations/supabase/types';

export interface Exercise {
  id?: number;
  nome: string;
  series?: number;
  reps?: string;
  description?: string;
  isCustom?: boolean;
  target?: string;
  gif_url?: string;
  video_url?: string;
  completed?: boolean; // Added for tracking completion status
  substituicoes?: Exercise[]; // Added for exercise substitutions
  descricao?: string; // Added for Portuguese descriptions
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  days: number;
  tags: string[];
  plan: Record<string, Exercise[]>;
  level?: string;
  environment?: string;
  objective?: string;
  plan_id?: string; // Added for Supabase integration
}

// Para manter compatibilidade com o Supabase
export interface WorkoutPlanSupabase {
  id: string;
  name: string;
  description?: string;
  days: number;
  tags: Json;
  plan: Json;
  level?: string;
  environment?: string;
  objective?: string;
  plan_id?: string; // Added for consistency
}

// Added for achievements
export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked_at: string;
}

// Fixed types for workout stats
export interface WorkoutStreaks {
  current: number;
  longest: number;
}

export interface ExpectedWorkoutDay {
  date: string;
  missed: boolean;
}
