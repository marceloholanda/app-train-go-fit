
export interface Exercise {
  nome: string;
  reps: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  tags: string[];
  days: number;
  plan: Record<string, Exercise[]>;
  description?: string;
}
