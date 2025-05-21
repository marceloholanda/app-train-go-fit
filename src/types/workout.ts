
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
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  days: number;
  tags: string[];
  plan: Record<string, Exercise[]>;
  level?: string; // Adicionado para resolver o erro
  environment?: string; // Adicionado para resolver o erro
  objective?: string; // Adicionado para resolver o erro
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
}
