
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getExerciseImageUrl, getExerciseVideoUrl } from '@/utils/workoutRecommendation';

export const useWorkoutLoader = (id: string | undefined) => {
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
        // Adicionar URLs de imagem e vídeo se não estiverem presentes
        const savedExercises = user[`exercises_day${dayNumber}`] || dayExercises.map((ex: Exercise) => {
          const exercise = { ...ex, completed: false };
          
          // Adicionar URL da imagem se não existir
          if (!exercise.gif_url) {
            exercise.gif_url = getExerciseImageUrl(exercise.nome);
          }
          
          // Adicionar URL do vídeo se não existir
          if (!exercise.video_url) {
            const videoUrl = getExerciseVideoUrl(exercise.nome);
            if (videoUrl) {
              exercise.video_url = videoUrl;
            }
          }
          
          return exercise;
        });
        
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

  return {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    userLevel,
    setIsCompleted
  };
};
