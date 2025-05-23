
import { useAuth } from '@/contexts/AuthContext';
import { useExerciseState } from './workout/useExerciseState';
import { useWorkoutFetch } from './workout/useWorkoutFetch';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export const useWorkoutData = (id: string | undefined) => {
  const { currentUser, session } = useAuth();
  
  // Add logging for debugging navigation issues
  useEffect(() => {
    console.log('[TrainGO] useWorkoutData initialized with:', {
      workoutId: id,
      hasUser: !!currentUser,
      hasSession: !!session,
      userId: currentUser?.id
    });
  }, [id, currentUser, session]);
  
  // Get current user ID with session verification
  const getCurrentUserId = async () => {
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const activeUser = currentSession?.user || currentUser;
      
      if (!activeUser?.id) {
        console.error('[TrainGO] useWorkoutData - No valid user found');
        return undefined;
      }
      
      console.log('[TrainGO] useWorkoutData - Current user ID:', activeUser.id);
      return activeUser.id;
    } catch (error) {
      console.error('[TrainGO] useWorkoutData - Error getting user ID:', error);
      return undefined;
    }
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
