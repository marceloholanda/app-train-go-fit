
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
        
        // Buscar perfil do usuário para obter o nível
        const { data: profile } = await supabase
          .from('profiles')
          .select('nivel_experiencia')
          .eq('user_id', userId)
          .single();
        
        if (profile?.nivel_experiencia) {
          setUserLevel(profile.nivel_experiencia);
        }
        
        // Buscar plano de treino
        const { data: workoutPlan } = await supabase
          .from('user_workouts')
          .select('workout_plan')
          .eq('user_id', userId)
          .single();
        
        if (!workoutPlan?.workout_plan) {
          toast({
            title: "Plano não encontrado",
            description: "Não foi possível encontrar seu plano de treino.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        // Encontrar o dia de treino baseado no ID
        const dayNumber = parseInt(id);
        const dayKey = `dia${dayNumber}`;
        const dayExercises = workoutPlan.workout_plan.plan[dayKey];
        
        if (!dayExercises) {
          toast({
            title: "Treino não encontrado",
            description: "Este treino não existe no seu plano atual.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        // Verificar se o treino está concluído
        const today = new Date().toISOString().split('T')[0];
        const { data: progressData } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', userId)
          .eq('date', today)
          .eq('exercise_name', `day_${dayNumber}`)
          .single();
        
        setIsCompleted(progressData?.completed || false);
        setWorkoutDay(`Dia ${dayNumber}`);
        
        // Buscar estado de conclusão de cada exercício
        const exerciseStates = await getExercisesState(dayNumber);
        
        // Se não houver estados de exercícios, inicializar todos como não concluídos
        if (exerciseStates.length === 0) {
          setExercises(dayExercises.map((ex: Exercise) => ({ ...ex, completed: false })));
        } else {
          // Atribuir estados de conclusão aos exercícios
          setExercises(dayExercises.map((ex: Exercise, index: number) => ({ 
            ...ex, 
            completed: exerciseStates[index] || false 
          })));
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
    
    // Salvar estado do exercício no Supabase
    await trackExerciseCompletion(dayNumber, index, updatedExercises[index].completed);
    
    // Verificar se todos exercícios estão concluídos
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
    const progress = await updateWorkoutProgress(parseInt(id), true);
    
    // Verificar conquistas
    const achievement = await checkNewAchievement('first_workout');
    
    if (achievement) {
      toast({
        title: "Nova conquista desbloqueada!",
        description: `${achievement.badge_name}: ${achievement.badge_description}`,
      });
    } else {
      toast({
        title: "Treino concluído!",
        description: "Parabéns! Seu progresso foi atualizado.",
      });
    }
    
    return progress;
  };
  
  const markWorkoutAsPending = async () => {
    if (!id) return;
    
    setIsCompleted(false);
    return await updateWorkoutProgress(parseInt(id), false);
  };
  
  const handleToggleWorkout = async () => {
    if (!id) return;
    
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    
    // Atualizar status de todos os exercícios
    const updatedExercises = exercises.map(exercise => ({ 
      ...exercise, 
      completed: newStatus 
    }));
    
    setExercises(updatedExercises);
    
    // Salvar estado de cada exercício
    const dayNumber = parseInt(id);
    for (let i = 0; i < updatedExercises.length; i++) {
      await trackExerciseCompletion(dayNumber, i, newStatus);
    }
    
    // Atualizar progresso
    const progress = await updateWorkoutProgress(parseInt(id), newStatus);
    
    if (newStatus) {
      // Verificar conquistas quando um treino é concluído
      const achievement = await checkNewAchievement('first_workout');
      
      if (achievement) {
        toast({
          title: "Nova conquista desbloqueada!",
          description: `${achievement.badge_name}: ${achievement.badge_description}`,
        });
      } else {
        toast({
          title: "Treino concluído!",
          description: "Parabéns! Seu progresso foi atualizado.",
        });
      }
    } else {
      toast({
        title: "Treino desmarcado",
        description: "O treino foi marcado como pendente.",
      });
    }
    
    return progress;
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
