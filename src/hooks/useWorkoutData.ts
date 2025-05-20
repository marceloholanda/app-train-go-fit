
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { updateWorkoutProgress, trackExerciseCompletion, getExercisesState } from '@/utils/workoutUtils';
import { checkNewAchievement } from '@/utils/workoutUtils/achievements';
import { supabase } from '@/integrations/supabase/client';

export const useWorkoutData = (id: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [workoutDay, setWorkoutDay] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userLevel, setUserLevel] = useState<string>('beginner');

  useEffect(() => {
    const loadWorkoutData = async () => {
      try {
        setIsLoading(true);
        
        // Verificar autenticação
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user || !id) {
          navigate('/dashboard');
          return;
        }
        
        const userId = session.user.id;
        
        // Get user level from profiles
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nivel_experiencia')
            .eq('id', userId)
            .single();
            
          if (profile && profile.nivel_experiencia) {
            setUserLevel(profile.nivel_experiencia);
          }
        } catch (error) {
          console.error('Error fetching user level:', error);
        }
        
        // Try to get workout plan from Supabase
        try {
          const { data: userWorkoutData } = await supabase
            .from('user_workouts')
            .select('workout_plan')
            .eq('user_id', userId)
            .single();
            
          if (!userWorkoutData || !userWorkoutData.workout_plan) {
            throw new Error('No workout plan found');
          }
          
          const workoutPlan = userWorkoutData.workout_plan;
          
          // Encontrar o dia de treino baseado no ID
          const dayNumber = parseInt(id);
          const dayKey = `dia${dayNumber}`;
          const dayExercises = workoutPlan.plan?.[dayKey];
          
          if (!dayExercises) {
            toast({
              title: "Treino não encontrado",
              description: "Este treino não existe no seu plano atual.",
              variant: "destructive",
            });
            navigate('/dashboard');
            return;
          }
          
          // Check if workout is completed today
          const today = new Date().toISOString().split('T')[0];
          const { data: progressData } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', userId)
            .eq('date', today)
            .eq('exercise_name', `day_${dayNumber}`)
            .eq('completed', true)
            .maybeSingle();
            
          setIsCompleted(!!progressData);
          setWorkoutDay(`Dia ${dayNumber}`);
          
          // Initialize all exercises as not completed
          setExercises(dayExercises.map((ex: Exercise) => ({ ...ex, completed: false })));
          
        } catch (error) {
          console.error('Error fetching workout plan from Supabase:', error);
          
          // Fallback to localStorage if Supabase fails
          const workoutPlanJson = localStorage.getItem('workout_plan');
          if (!workoutPlanJson) {
            toast({
              title: "Plano não encontrado",
              description: "Não foi possível encontrar seu plano de treino.",
              variant: "destructive",
            });
            navigate('/dashboard');
            return;
          }
          
          const workoutPlan = JSON.parse(workoutPlanJson);
          
          // Encontrar o dia de treino baseado no ID
          const dayNumber = parseInt(id);
          const dayKey = `dia${dayNumber}`;
          const dayExercises = workoutPlan.plan?.[dayKey];
          
          if (!dayExercises) {
            toast({
              title: "Treino não encontrado",
              description: "Este treino não existe no seu plano atual.",
              variant: "destructive",
            });
            navigate('/dashboard');
            return;
          }
          
          // Set default state
          setIsCompleted(false);
          setWorkoutDay(`Dia ${dayNumber}`);
          
          // Initialize all exercises as not completed
          setExercises(dayExercises.map((ex: Exercise) => ({ ...ex, completed: false })));
        }
          
      } catch (error) {
        console.error('Erro ao carregar treino:', error);
        toast({
          title: "Erro ao carregar treino",
          description: "Ocorreu um erro ao carregar os detalhes do treino.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWorkoutData();
  }, [id, navigate, toast]);

  const handleExerciseToggle = async (index: number) => {
    if (!id) return;
    
    const dayNumber = parseInt(id);
    const updatedExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
    setExercises(updatedExercises);
    
    // Track exercise completion in Supabase
    try {
      await trackExerciseCompletion(
        dayNumber,
        index,
        updatedExercises[index].completed
      );
    } catch (error) {
      console.error('Error tracking exercise completion:', error);
    }
    
    // Check if all exercises are completed
    const allCompleted = updatedExercises.every(ex => ex.completed);
    if (allCompleted && !isCompleted) {
      await markWorkoutAsCompleted();
    } else if (!allCompleted && isCompleted) {
      await markWorkoutAsPending();
    }
  };

  const markWorkoutAsCompleted = async () => {
    if (!id) return;
    
    setIsCompleted(true);
    
    try {
      const progress = await updateWorkoutProgress(parseInt(id), true);
      
      toast({
        title: "Treino concluído!",
        description: "Parabéns! Seu progresso foi atualizado.",
      });
      
      return progress;
    } catch (error) {
      console.error('Error marking workout as completed:', error);
      return 0;
    }
  };
  
  const markWorkoutAsPending = async () => {
    if (!id) return;
    
    setIsCompleted(false);
    
    try {
      return await updateWorkoutProgress(parseInt(id), false);
    } catch (error) {
      console.error('Error marking workout as pending:', error);
      return 0;
    }
  };
  
  const handleToggleWorkout = async () => {
    if (!id) return;
    
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    
    // Update status of all exercises
    const updatedExercises = exercises.map(exercise => ({ 
      ...exercise, 
      completed: newStatus 
    }));
    
    setExercises(updatedExercises);
    
    try {
      const progress = await updateWorkoutProgress(parseInt(id), newStatus);
      
      if (newStatus) {
        toast({
          title: "Treino concluído!",
          description: "Parabéns! Seu progresso foi atualizado.",
        });
      } else {
        toast({
          title: "Treino desmarcado",
          description: "O treino foi marcado como pendente.",
        });
      }
      
      return progress;
    } catch (error) {
      console.error('Error toggling workout status:', error);
      return 0;
    }
  };

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
