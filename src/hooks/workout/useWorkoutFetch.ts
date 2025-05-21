
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useWorkoutFetch = (
  userId: string | undefined,
  workoutDayId: string | undefined,
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>,
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workoutDay, setWorkoutDay] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<string>('beginner');

  useEffect(() => {
    const loadWorkoutData = async () => {
      if (!userId || !workoutDayId) {
        navigate('/dashboard');
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch user profile for level
        const { data: profile } = await supabase
          .from('profiles')
          .select('level')
          .eq('id', userId)
          .single();
          
        if (profile && profile.level) {
          setUserLevel(profile.level);
        }
        
        // Fetch user's workout plan
        const { data: workoutPlan, error: workoutPlanError } = await supabase
          .from('user_workouts')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
          
        if (workoutPlanError) throw workoutPlanError;
        
        if (!workoutPlan) {
          toast({
            title: "Plan not found",
            description: "Could not find your workout plan.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        // Check if workout is completed
        const { data: progress } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', userId)
          .eq('workout_day', parseInt(workoutDayId))
          .maybeSingle();
        
        // Find workout day based on ID
        const dayNumber = parseInt(workoutDayId);
        const dayKey = `dia${dayNumber}`;
        const dayExercises = workoutPlan.plan[dayKey];
        
        if (!dayExercises) {
          toast({
            title: "Workout not found",
            description: "This workout doesn't exist in your current plan.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        setIsCompleted(!!progress);
        setWorkoutDay(`Day ${dayNumber}`);
        
        // Load individual exercise completion status (if saved)
        let exercisesWithStatus;
        if (progress && progress.exercises) {
          exercisesWithStatus = progress.exercises;
        } else {
          exercisesWithStatus = dayExercises.map((ex: Exercise) => ({ 
            ...ex, 
            completed: false
          }));
        }
        
        setExercises(exercisesWithStatus);
      } catch (error) {
        console.error('Error loading workout:', error);
        toast({
          title: "Error loading workout",
          description: "An error occurred while loading workout details.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWorkoutData();
  }, [workoutDayId, navigate, toast, userId, setExercises, setIsCompleted]);

  return { workoutDay, isLoading, userLevel };
};
