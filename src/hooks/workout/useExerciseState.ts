
import { useState } from 'react';
import { Exercise } from '@/types/workout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useExerciseState = (
  workoutDayId: string | undefined,
  getUserId: () => Promise<string | undefined>
) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleExerciseToggle = async (index: number) => {
    const userId = await getUserId();
    
    if (!userId || !workoutDayId) {
      console.error('[TrainGO] No user ID or workout day ID for exercise toggle');
      return;
    }
    
    console.log('[TrainGO] Toggling exercise for user:', userId, 'workout:', workoutDayId, 'exercise:', index);
    
    const updatedExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
    setExercises(updatedExercises);
    
    try {
      // Fetch existing progress record
      const { data: existingProgress } = await supabase
        .from('progress')
        .select('id')
        .eq('user_id', userId)
        .eq('workout_day', parseInt(workoutDayId))
        .maybeSingle();
        
      if (existingProgress) {
        // Update existing record
        await supabase
          .from('progress')
          .update({
            exercises: updatedExercises as any
          })
          .eq('id', existingProgress.id);
        console.log('[TrainGO] Exercise progress updated for user:', userId);
      }
      
      // Check if all exercises are completed
      const allCompleted = updatedExercises.every(ex => ex.completed);
      if (allCompleted && !isCompleted) {
        markWorkoutAsCompleted();
      } else if (!allCompleted && isCompleted) {
        markWorkoutAsPending();
      }
    } catch (error) {
      console.error('[TrainGO] Error saving exercise state for user', userId, ':', error);
      toast({
        title: "Error",
        description: "Could not save your progress.",
        variant: "destructive",
      });
    }
  };

  const markWorkoutAsCompleted = async () => {
    const userId = await getUserId();
    
    if (!userId || !workoutDayId) {
      console.error('[TrainGO] No user ID or workout day ID for marking complete');
      return;
    }
    
    console.log('[TrainGO] Marking workout as completed for user:', userId, 'workout:', workoutDayId);
    
    try {
      const today = new Date();
      
      // Check if a record already exists for this workout
      const { data: existingProgress } = await supabase
        .from('progress')
        .select('id')
        .eq('user_id', userId)
        .eq('workout_day', parseInt(workoutDayId))
        .maybeSingle();
        
      if (existingProgress) {
        // Update existing record
        await supabase
          .from('progress')
          .update({
            exercises: exercises as any,
            completed_date: today.toISOString().split('T')[0]
          })
          .eq('id', existingProgress.id);
      } else {
        // Create new record
        await supabase
          .from('progress')
          .insert({
            user_id: userId,
            workout_day: parseInt(workoutDayId),
            exercises: exercises as any,
            completed_date: today.toISOString().split('T')[0]
          });
      }
      
      setIsCompleted(true);
      console.log('[TrainGO] Workout marked as completed for user:', userId);
      
      toast({
        title: "Workout completed!",
        description: "Congratulations! Your progress has been updated.",
      });
    } catch (error) {
      console.error('[TrainGO] Error marking workout as completed for user', userId, ':', error);
      toast({
        title: "Error",
        description: "Could not update your progress.",
        variant: "destructive",
      });
    }
  };
  
  const markWorkoutAsPending = async () => {
    const userId = await getUserId();
    
    if (!userId || !workoutDayId) {
      console.error('[TrainGO] No user ID or workout day ID for marking pending');
      return;
    }
    
    console.log('[TrainGO] Marking workout as pending for user:', userId, 'workout:', workoutDayId);
    
    try {
      // Remove completed workout record
      await supabase
        .from('progress')
        .delete()
        .eq('user_id', userId)
        .eq('workout_day', parseInt(workoutDayId));
        
      setIsCompleted(false);
      console.log('[TrainGO] Workout marked as pending for user:', userId);
    } catch (error) {
      console.error('[TrainGO] Error marking workout as pending for user', userId, ':', error);
      toast({
        title: "Error",
        description: "Could not update your progress.",
        variant: "destructive",
      });
    }
  };
  
  const handleToggleWorkout = () => {
    isCompleted ? markWorkoutAsPending() : markWorkoutAsCompleted();
  };

  return {
    exercises,
    setExercises,
    isCompleted,
    setIsCompleted,
    handleExerciseToggle,
    handleToggleWorkout,
    markWorkoutAsCompleted,
    markWorkoutAsPending
  };
};
