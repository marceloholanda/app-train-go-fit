
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
      console.log('[TrainGO] useWorkoutFetch - Starting data load for workout day:', workoutDayId);
      
      // Validate workout day ID first
      if (!workoutDayId || isNaN(parseInt(workoutDayId))) {
        console.error('[TrainGO] useWorkoutFetch - Invalid workout day ID:', workoutDayId);
        toast({
          title: "Erro na navegação",
          description: "ID do treino inválido. Redirecionando...",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }
      
      const userId = await getUserId();
      
      if (!userId) {
        console.error('[TrainGO] useWorkoutFetch - No user ID available');
        toast({
          title: "Erro de autenticação",
          description: "Usuário não encontrado. Faça login novamente.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      
      console.log('[TrainGO] useWorkoutFetch - Loading workout data for user:', userId, 'workout day:', workoutDayId);
      
      try {
        setIsLoading(true);
        
        // Fetch user profile for level
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('level')
          .eq('id', userId)
          .maybeSingle();
          
        if (profileError) {
          console.error('[TrainGO] useWorkoutFetch - Error fetching profile:', profileError);
        } else if (profile?.level) {
          setUserLevel(profile.level);
          console.log('[TrainGO] useWorkoutFetch - User level loaded:', profile.level);
        }
        
        // Fetch user's workout plan
        const { data: workoutPlan, error: workoutPlanError } = await supabase
          .from('user_workouts')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
          
        if (workoutPlanError) {
          console.error('[TrainGO] useWorkoutFetch - Error fetching workout plan:', workoutPlanError);
          throw workoutPlanError;
        }
        
        if (!workoutPlan) {
          console.log('[TrainGO] useWorkoutFetch - No workout plan found for user:', userId);
          toast({
            title: "Plano não encontrado",
            description: "Você ainda não possui um plano de treino. Vamos criar um!",
            variant: "default",
          });
          navigate('/onboarding');
          return;
        }
        
        console.log('[TrainGO] useWorkoutFetch - Workout plan loaded:', {
          planId: workoutPlan.plan_id,
          name: workoutPlan.name,
          days: workoutPlan.days,
          planKeys: Object.keys(workoutPlan.plan || {})
        });
        
        // Check if workout is completed
        const { data: progress, error: progressError } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', userId)
          .eq('workout_day', parseInt(workoutDayId))
          .maybeSingle();
        
        if (progressError) {
          console.error('[TrainGO] useWorkoutFetch - Error fetching progress:', progressError);
        }
        
        // Find workout day based on ID
        const dayNumber = parseInt(workoutDayId);
        const dayKey = `dia${dayNumber}`;
        const dayExercises = workoutPlan.plan?.[dayKey];
        
        console.log('[TrainGO] useWorkoutFetch - Looking for day key:', dayKey, 'in plan with keys:', Object.keys(workoutPlan.plan || {}));
        
        if (!dayExercises || !Array.isArray(dayExercises) || dayExercises.length === 0) {
          console.error('[TrainGO] useWorkoutFetch - Workout day not found or empty:', {
            dayKey,
            planKeys: Object.keys(workoutPlan.plan || {}),
            dayExercises
          });
          toast({
            title: "Treino não encontrado",
            description: `O treino do dia ${dayNumber} não existe no seu plano atual.`,
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        console.log('[TrainGO] useWorkoutFetch - Found exercises for day:', dayNumber, 'count:', dayExercises.length);
        
        setIsCompleted(!!progress);
        setWorkoutDay(`Dia ${dayNumber}`);
        
        // Load individual exercise completion status (if saved)
        let exercisesWithStatus;
        if (progress && progress.exercises && Array.isArray(progress.exercises)) {
          exercisesWithStatus = progress.exercises;
          console.log('[TrainGO] useWorkoutFetch - Loaded exercise progress from database');
        } else {
          exercisesWithStatus = dayExercises.map((ex: Exercise) => ({ 
            ...ex, 
            completed: false
          }));
          console.log('[TrainGO] useWorkoutFetch - Using default exercise status');
        }
        
        setExercises(exercisesWithStatus);
        console.log('[TrainGO] useWorkoutFetch - Workout data loaded successfully for user:', userId, 'exercises:', exercisesWithStatus.length);
      } catch (error) {
        console.error('[TrainGO] useWorkoutFetch - Error loading workout for user', userId, ':', error);
        toast({
          title: "Erro ao carregar treino",
          description: "Ocorreu um erro ao carregar os detalhes do treino. Tente novamente.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (workoutDayId) {
      loadWorkoutData();
    } else {
      console.log('[TrainGO] useWorkoutFetch - No workout day ID provided');
      setIsLoading(false);
    }
  }, [workoutDayId, navigate, toast, getUserId, setExercises, setIsCompleted]);

  return { workoutDay, isLoading, userLevel };
};
