
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { mapWorkoutDays, getWorkoutIcon, generateWorkoutName } from '@/utils/workoutUtils';
import { WorkoutPlan } from '@/types/workout';
import { WorkoutDisplay } from '@/types/dashboard';

export const useDashboardData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekProgress, setWeekProgress] = useState(0);
  const [workouts, setWorkouts] = useState<WorkoutDisplay[]>([]);

  useEffect(() => {
    // Carregar dados do usuário e plano de treino
    const loadUserData = () => {
      try {
        setIsLoading(true);
        const user = localStorage.getItem('traingo-user');
        console.log("[TrainGO] Loading user data from localStorage:", user ? "Found" : "Not found");
        
        if (user) {
          const parsedUser = JSON.parse(user);
          console.log("[TrainGO] User data loaded:", parsedUser.name);
          console.log("[TrainGO] Workout plan:", parsedUser.workoutPlan ? "Found" : "Not found");
          
          setUserData(parsedUser);
          
          // Processar o plano de treino
          if (parsedUser.workoutPlan) {
            processWorkoutPlan(parsedUser);
          } else {
            console.error("[TrainGO] No workout plan found in user data");
            toast({
              title: "Plano não encontrado",
              description: "Não foi possível encontrar seu plano de treino.",
              variant: "destructive",
            });
          }
        } else {
          console.error("[TrainGO] No user data found in localStorage");
          navigate('/login');
        }
      } catch (error) {
        console.error('[TrainGO] Erro ao carregar dados do usuário:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar seu perfil.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate, toast]);
  
  // Processa o plano de treino e prepara os dados para exibição
  const processWorkoutPlan = (user: any) => {
    if (!user.workoutPlan) {
      console.error("[TrainGO] No workout plan in user data");
      setWorkouts([]);
      setWeekProgress(0);
      return;
    }
    
    const plan: WorkoutPlan = user.workoutPlan;
    console.log("[TrainGO] Processing workout plan:", plan.name);
    console.log("[TrainGO] Plan details:", {
      days: plan.days,
      exercises: Object.keys(plan.plan).length,
      tags: plan.tags
    });
    
    const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
    const weekDays = mapWorkoutDays(plan.days);
    
    // Cria os cards de treino para o dashboard
    const workoutItems: WorkoutDisplay[] = Object.entries(plan.plan).map(([dayId, exercises], index) => {
      const dayNumber = index + 1;
      const workoutItem = {
        id: dayNumber,
        name: generateWorkoutName(dayNumber, exercises),
        day: weekDays[index] || `Dia ${dayNumber}`,
        status: completedWorkouts.includes(dayNumber) ? 'completed' : 'pending',
        exercises: exercises.length,
        icon: getWorkoutIcon(exercises)
      };
      console.log(`[TrainGO] Workout day ${dayNumber} processed:`, workoutItem.name);
      return workoutItem;
    });
    
    console.log("[TrainGO] Total workout items:", workoutItems.length);
    setWorkouts(workoutItems);
    
    // Atualiza o progresso da semana
    const progress = user.workoutProgress?.lastWeekProgress || 0;
    setWeekProgress(progress);
  };

  return {
    userData,
    isLoading,
    weekProgress,
    setWeekProgress,
    workouts,
    setWorkouts,
  };
};

export default useDashboardData;
