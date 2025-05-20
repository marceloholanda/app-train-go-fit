
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { updateWorkoutProgress } from '@/utils/workoutUtils/workoutTracking';
import { recordExerciseCompletion, removeExerciseCompletion } from '@/utils/workoutUtils/progressTracking';
import { checkNewAchievements } from '@/utils/workoutUtils/achievementsService';
import { useAuth } from '@/contexts/AuthContext';

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
    const loadWorkoutData = () => {
      try {
        setIsLoading(true);
        
        const userData = localStorage.getItem('traingo-user');
        if (!userData || !id) {
          navigate('/dashboard');
          return;
        }
        
        const user = JSON.parse(userData);
        const workoutPlan = user.workoutPlan;
        
        if (!workoutPlan) {
          toast({
            title: "Plano não encontrado",
            description: "Não foi possível encontrar seu plano de treino.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }

        // Obter o nível do usuário para determinar o limite de exercícios
        if (user.quizAnswers && user.quizAnswers.level) {
          setUserLevel(user.quizAnswers.level);
        }
        
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
        
        // Verificar se o treino está concluído
        const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
        const completed = completedWorkouts.includes(dayNumber);
        setIsCompleted(completed);
        
        // Preparar dados para exibição
        setWorkoutDay(`Dia ${dayNumber}`);
        
        // Carregar status de conclusão individual dos exercícios (se salvo)
        const savedExercises = user[`exercises_day${dayNumber}`] || dayExercises.map((ex: Exercise) => ({ 
          ...ex, 
          completed: false
        }));
        
        setExercises(savedExercises);
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
    if (!currentUser?.id || !id) return;
    
    const updatedExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios no localStorage para UI consistente
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Atualizar o progresso no Supabase
    const exercise = exercises[index];
    const exerciseId = exercise.id || parseInt(id);
    const exerciseName = exercise.nome;
    const muscleGroup = exercise.muscle_group;
    
    if (updatedExercises[index].completed) {
      // Registrar conclusão do exercício
      await recordExerciseCompletion(
        currentUser.id,
        exerciseId,
        exerciseName,
        muscleGroup
      );
    } else {
      // Remover registro de conclusão
      await removeExerciseCompletion(
        currentUser.id,
        exerciseId,
        exerciseName
      );
    }
    
    // Verificar se todos exercícios estão concluídos
    const allCompleted = updatedExercises.every(ex => ex.completed);
    if (allCompleted && !isCompleted) {
      markWorkoutAsCompleted();
    } else if (!allCompleted && isCompleted) {
      markWorkoutAsPending();
    }
    
    // Verificar se há novas conquistas após completar exercício
    if (updatedExercises[index].completed) {
      setTimeout(async () => {
        if (currentUser?.id) {
          await checkNewAchievements(currentUser.id);
        }
      }, 1000);
    }
  };

  const markWorkoutAsCompleted = async () => {
    if (!id || !currentUser?.id) return;
    
    setIsCompleted(true);
    await updateWorkoutProgress(parseInt(id), true);
    
    // Verificar conquistas após completar treino
    setTimeout(async () => {
      if (currentUser?.id) {
        await checkNewAchievements(currentUser.id);
      }
    }, 1000);
    
    toast({
      title: "Treino concluído!",
      description: "Parabéns! Seu progresso foi atualizado.",
    });
  };
  
  const markWorkoutAsPending = () => {
    if (!id || !currentUser?.id) return;
    
    setIsCompleted(false);
    updateWorkoutProgress(parseInt(id), false);
  };
  
  const handleToggleWorkout = async () => {
    if (!id || !currentUser?.id) return;
    
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    
    // Atualizar status de todos os exercícios
    const updatedExercises = exercises.map(exercise => ({ 
      ...exercise, 
      completed: newStatus 
    }));
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Atualizar progresso no Supabase
    await updateWorkoutProgress(parseInt(id), newStatus);
    
    // Verificar conquistas após concluir ou desmarcar treino
    if (newStatus) {
      setTimeout(async () => {
        if (currentUser?.id) {
          await checkNewAchievements(currentUser.id);
        }
      }, 1000);
    }
    
    toast({
      title: newStatus ? "Treino concluído!" : "Treino desmarcado",
      description: newStatus 
        ? "Parabéns! Seu progresso foi atualizado."
        : "O treino foi marcado como pendente.",
    });
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
