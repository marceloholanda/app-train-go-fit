
export interface Exercise {
  nome: string;
  series?: number;
  repeticoes?: number | string;
  reps?: string;  // Used in place of repeticoes in many components
  link?: string;
  image?: string;
  instructions?: string[];
  variations?: string[];
  muscle_group?: string;
  id?: number;
  completed?: boolean;
  video_url?: string;
  gif_url?: string;
  substituicoes?: Exercise[];
  descricao?: string;
}

export interface WorkoutPlan {
  id?: string;
  name: string;
  days: number;
  level?: string;
  goal?: string;
  equipment?: string;
  tags?: string[];
  description?: string;
  plan: {
    [key: string]: Exercise[];
  };
}
