
import { useAuth } from '@/contexts/AuthContext';
import { useExerciseState } from './workout/useExerciseState';
import { useWorkoutFetch } from './workout/useWorkoutFetch';

export const useWorkoutData = (id: string | undefined) => {
  const { currentUser } = useAuth();
  
  const {
    exercises,
    setExercises,
    isCompleted,
    setIsCompleted,
    handleExerciseToggle,
    handleToggleWorkout
  } = useExerciseState(id, currentUser?.id);

  const { workoutDay, isLoading, userLevel } = useWorkoutFetch(
    currentUser?.id,
    id,
    setExercises,
    setIsCompleted
  );

  return {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    handleExerciseToggle,
    handleToggleWorkout,
    userLevel
  };
};
