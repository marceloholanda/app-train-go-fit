
export interface WorkoutDisplay {
  id: number;
  name: string;
  day: string;
  status: 'completed' | 'pending';
  exercises: number;
  icon: string;
  isPremium?: boolean;
}
