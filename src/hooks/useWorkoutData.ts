
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Json } from '@/integrations/supabase/types';

export const useWorkoutData = (id: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const [workoutDay, setWorkoutDay] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userLevel, setUserLevel] = useState<string>('beginner');

  useEffect(() => {
    const loadWorkoutData = async () => {
      if (!currentUser || !id) {
        navigate('/dashboard');
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Buscar perfil do usuário para obter nível
        const { data: profile } = await supabase
          .from('profiles')
          .select('level')
          .eq('id', currentUser.id)
          .single();
          
        if (profile && profile.level) {
          setUserLevel(profile.level);
        }
        
        // Buscar plano de treino do usuário
        const { data: workoutPlan, error: workoutPlanError } = await supabase
          .from('user_workouts')
          .select('*')
          .eq('user_id', currentUser.id)
          .maybeSingle();
          
        if (workoutPlanError) throw workoutPlanError;
        
        if (!workoutPlan) {
          toast({
            title: "Plano não encontrado",
            description: "Não foi possível encontrar seu plano de treino.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        // Buscar se o treino está concluído
        const { data: progress } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', currentUser.id)
          .eq('workout_day', parseInt(id))
          .maybeSingle();
        
        // Encontrar o dia de treino baseado no ID
        const dayNumber = parseInt(id);
        const dayKey = `dia${dayNumber}`;
        const dayExercises = workoutPlan.plan[dayKey];
        
        if (!dayExercises) {
          toast({
            title: "Treino não encontrado",
            description: "Este treino não existe no seu plano atual.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        setIsCompleted(!!progress);
        setWorkoutDay(`Dia ${dayNumber}`);
        
        // Carregar status de conclusão individual dos exercícios (se salvo)
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
  }, [id, navigate, toast, currentUser]);

  const handleExerciseToggle = async (index: number) => {
    if (!currentUser || !id) return;
    
    const updatedExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
    setExercises(updatedExercises);
    
    try {
      // Buscar registro existente
      const { data: existingProgress } = await supabase
        .from('progress')
        .select('id')
        .eq('user_id', currentUser.id)
        .eq('workout_day', parseInt(id))
        .maybeSingle();
        
      if (existingProgress) {
        // Atualizar registro existente
        await supabase
          .from('progress')
          .update({
            // Convert Exercise[] to Json before sending to Supabase
            exercises: updatedExercises as unknown as Json
          })
          .eq('id', existingProgress.id);
      }
      
      // Verificar se todos exercícios estão concluídos
      const allCompleted = updatedExercises.every(ex => ex.completed);
      if (allCompleted && !isCompleted) {
        markWorkoutAsCompleted();
      } else if (!allCompleted && isCompleted) {
        markWorkoutAsPending();
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar seu progresso.",
        variant: "destructive",
      });
    }
  };

  const markWorkoutAsCompleted = async () => {
    if (!currentUser || !id) return;
    
    try {
      const today = new Date();
      
      // Verificar se já existe um registro para este treino
      const { data: existingProgress } = await supabase
        .from('progress')
        .select('id')
        .eq('user_id', currentUser.id)
        .eq('workout_day', parseInt(id))
        .maybeSingle();
        
      if (existingProgress) {
        // Atualizar registro existente
        await supabase
          .from('progress')
          .update({
            // Convert Exercise[] to Json before sending to Supabase
            exercises: exercises as unknown as Json,
            completed_date: today.toISOString().split('T')[0]
          })
          .eq('id', existingProgress.id);
      } else {
        // Criar novo registro
        await supabase
          .from('progress')
          .insert({
            user_id: currentUser.id,
            workout_day: parseInt(id),
            // Convert Exercise[] to Json before sending to Supabase
            exercises: exercises as unknown as Json,
            completed_date: today.toISOString().split('T')[0]
          });
      }
      
      setIsCompleted(true);
      
      toast({
        title: "Treino concluído!",
        description: "Parabéns! Seu progresso foi atualizado.",
      });
    } catch (error) {
      console.error('Erro ao marcar treino como concluído:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu progresso.",
        variant: "destructive",
      });
    }
  };
  
  const markWorkoutAsPending = async () => {
    if (!currentUser || !id) return;
    
    try {
      // Remover registro de treino concluído
      await supabase
        .from('progress')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('workout_day', parseInt(id));
        
      setIsCompleted(false);
    } catch (error) {
      console.error('Erro ao marcar treino como pendente:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu progresso.",
        variant: "destructive",
      });
    }
  };
  
  const handleToggleWorkout = () => {
    isCompleted ? markWorkoutAsPending() : markWorkoutAsCompleted();
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
