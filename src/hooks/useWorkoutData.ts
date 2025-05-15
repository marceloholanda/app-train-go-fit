
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { updateWorkoutProgress } from '@/utils/workoutUtils';
import { getExerciseImageUrl } from '@/utils/workoutRecommendation';

export const useWorkoutData = (id: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
          completed: false,
          // Usar a função de mapeamento para obter URL da imagem
          gif_url: ex.gif_url || getExerciseImageUrl(ex.nome)
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

  const handleExerciseToggle = (index: number) => {
    const updatedExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData && id) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Verificar se todos exercícios estão concluídos
    const allCompleted = updatedExercises.every(ex => ex.completed);
    if (allCompleted && !isCompleted) {
      markWorkoutAsCompleted();
    } else if (!allCompleted && isCompleted) {
      markWorkoutAsPending();
    }
  };

  const markWorkoutAsCompleted = () => {
    if (!id) return;
    
    setIsCompleted(true);
    updateWorkoutProgress(parseInt(id), true);
    
    toast({
      title: "Treino concluído!",
      description: "Parabéns! Seu progresso foi atualizado.",
    });
  };
  
  const markWorkoutAsPending = () => {
    if (!id) return;
    
    setIsCompleted(false);
    updateWorkoutProgress(parseInt(id), false);
  };
  
  const handleToggleWorkout = () => {
    if (!id) return;
    
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
    
    // Atualizar progresso
    updateWorkoutProgress(parseInt(id), newStatus);
    
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
