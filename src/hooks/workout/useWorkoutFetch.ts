
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useWorkoutFetch = (
  getUserId: () => Promise<string | undefined>,
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
      const userId = await getUserId();
      
      if (!userId || !workoutDayId) {
        console.log('[TrainGO] No user ID or workout day ID, redirecting to dashboard');
        navigate('/dashboard');
        return;
      }
      
      console.log('[TrainGO] Loading workout data for user:', userId, 'workout day:', workoutDayId);
      
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
          console.log('[TrainGO] User level loaded:', profile.level);
        }
        
        // Fetch user's workout plan
        const { data: workoutPlan, error: workoutPlanError } = await supabase
          .from('user_workouts')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
          
        if (workoutPlanError) {
          console.error('[TrainGO] Error fetching workout plan:', workoutPlanError);
          throw workoutPlanError;
        }
        
        if (!workoutPlan) {
          console.log('[TrainGO] No workout plan found for user:', userId);
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
          console.log('[TrainGO] Workout day not found in plan:', dayKey);
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
          console.log('[TrainGO] Loaded exercise progress from database');
        } else {
          exercisesWithStatus = dayExercises.map((ex: Exercise) => ({ 
            ...ex, 
            completed: false
          }));
          console.log('[TrainGO] Using default exercise status');
        }
        
        setExercises(exercisesWithStatus);
        console.log('[TrainGO] Workout data loaded successfully for user:', userId);
      } catch (error) {
        console.error('[TrainGO] Error loading workout for user', userId, ':', error);
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
  }, [workoutDayId, navigate, toast, getUserId, setExercises, setIsCompleted]);

  return { workoutDay, isLoading, userLevel };
};
