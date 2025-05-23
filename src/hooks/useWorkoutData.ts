
import { useAuth } from '@/contexts/AuthContext';
import { useExerciseState } from './workout/useExerciseState';
import { useWorkoutFetch } from './workout/useWorkoutFetch';
import { supabase } from '@/integrations/supabase/client';

export const useWorkoutData = (id: string | undefined) => {
  const { currentUser, session } = useAuth();
  
  // Get current user ID with session verification
  const getCurrentUserId = async () => {
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const activeUser = currentSession?.user || currentUser;
    console.log('[TrainGO] useWorkoutData - Current user ID:', activeUser?.id);
    return activeUser?.id;
  };
  
  const {
    exercises,
    setExercises,
    isCompleted,
    setIsCompleted,
    handleExerciseToggle,
    handleToggleWorkout
  } = useExerciseState(id, getCurrentUserId);

  const { workoutDay, isLoading, userLevel } = useWorkoutFetch(
    getCurrentUserId,
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
