
export interface Exercise {
  nome: string;
  series: number;
  repeticoes: number | string;
  link?: string;
  image?: string;
  instructions?: string[];
  variations?: string[];
  muscle_group?: string;
  id?: number;
  completed?: boolean;
}

export interface WorkoutPlan {
  name: string;
  days: number;
  level: string;
  goal: string;
  equipment: string;
  plan: {
    [key: string]: Exercise[];
  };
}
