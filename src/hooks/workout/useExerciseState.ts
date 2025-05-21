
import { useState } from 'react';
import { Exercise } from '@/types/workout';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useExerciseState = (
  workoutDayId: string | undefined,
  userId: string | undefined
) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { toast } = useToast();

  const handleExerciseToggle = async (index: number) => {
    if (!userId || !workoutDayId) return;
    
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
      }
      
      // Check if all exercises are completed
      const allCompleted = updatedExercises.every(ex => ex.completed);
      if (allCompleted && !isCompleted) {
        markWorkoutAsCompleted();
      } else if (!allCompleted && isCompleted) {
        markWorkoutAsPending();
      }
    } catch (error) {
      console.error('Error saving exercise state:', error);
      toast({
        title: "Error",
        description: "Could not save your progress.",
        variant: "destructive",
      });
    }
  };

  const markWorkoutAsCompleted = async () => {
    if (!userId || !workoutDayId) return;
    
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
      
      toast({
        title: "Workout completed!",
        description: "Congratulations! Your progress has been updated.",
      });
    } catch (error) {
      console.error('Error marking workout as completed:', error);
      toast({
        title: "Error",
        description: "Could not update your progress.",
        variant: "destructive",
      });
    }
  };
  
  const markWorkoutAsPending = async () => {
    if (!userId || !workoutDayId) return;
    
    try {
      // Remove completed workout record
      await supabase
        .from('progress')
        .delete()
        .eq('user_id', userId)
        .eq('workout_day', parseInt(workoutDayId));
        
      setIsCompleted(false);
    } catch (error) {
      console.error('Error marking workout as pending:', error);
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
