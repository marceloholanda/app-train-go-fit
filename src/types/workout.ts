export interface Exercise {
  id?: number;
  name: string;
  sets: number;
  reps: string;
  equipment?: string;
  muscleGroup?: string;
  description?: string;
  videoUrl?: string;
  imageUrl?: string;
  restTime?: number;
  tips?: string[];
  alternatives?: Exercise[];
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
