
export interface Exercise {
  nome: string;
  reps: string;
  gif_url?: string;
  video_url?: string;
  descricao?: string;
  substituicoes?: Exercise[];
  completed?: boolean;
  id?: number; // Adding the missing id property
  muscle_group?: string; // Adding the missing muscle_group property
}

export interface WorkoutPlan {
  id: string;
  name: string;
  tags: string[];
  days: number;
  plan: Record<string, Exercise[]>;
  description?: string;
}
