
export interface Exercise {
  nome: string;
  reps: string;
  gif_url?: string;
  video_url?: string;
  substituicoes?: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  tags: string[];
  days: number;
  plan: Record<string, Exercise[]>;
  description?: string;
}
