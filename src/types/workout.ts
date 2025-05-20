
export interface Exercise {
  id?: number;
  name: string;
  nome?: string; // Portuguese alternative
  sets: number;
  reps: string;
  equipment?: string;
  muscleGroup?: string;
  description?: string;
  descricao?: string; // Portuguese alternative
  videoUrl?: string;
  video_url?: string; // Alternative format
  imageUrl?: string;
  gif_url?: string; // Alternative format
  restTime?: number;
  tips?: string[];
  alternatives?: Exercise[];
  substituicoes?: Exercise[]; // Portuguese alternative
  completed?: boolean; // For tracking completion status
}

export interface WorkoutDay {
  id: number;
  name: string;
  exercises: Exercise[];
  day?: string;
  focus?: string;
  description?: string;
}

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

export interface Workout {
  id: number;
  name: string;
  description: string;
  image: string;
  video: string;
  sets: number;
  reps: number;
}
