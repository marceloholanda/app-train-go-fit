
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
        
        // For now, we'll just set a default user level
        setUserLevel('beginner');
        
        // Try to get workout plan from localStorage 
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
    
    // For now, we'll just update the state locally
    // In the future, we'll implement the Supabase integration
    
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
    
    // For now, we'll skip the actual database update
    // const progress = await updateWorkoutProgress(parseInt(id), true);
    
    toast({
      title: "Treino concluído!",
      description: "Parabéns! Seu progresso foi atualizado.",
    });
    
    return 0; // Return a default value for now
  };
  
  const markWorkoutAsPending = async () => {
    if (!id) return;
    
    setIsCompleted(false);
    
    // For now, we'll skip the actual database update
    // return await updateWorkoutProgress(parseInt(id), false);
    return 0; // Return a default value for now
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
    
    // For now, we'll skip the actual database update
    
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
    
    return 0; // Return a default value for now
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
