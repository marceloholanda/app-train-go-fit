
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { mapWorkoutDays, getWorkoutIcon, generateWorkoutName } from '@/utils/workoutUtils';
import { WorkoutPlan } from '@/types/workout';
import { WorkoutDisplay } from '@/types/dashboard';
import { supabase } from '@/integrations/supabase/client';
import { getUserData } from '@/utils/userUtils';

export const useDashboardData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekProgress, setWeekProgress] = useState(0);
  const [workouts, setWorkouts] = useState<WorkoutDisplay[]>([]);

  useEffect(() => {
    // Carregar dados do usuário e plano de treino
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        
        // Verificar se o usuário está autenticado
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("[TrainGO] User not authenticated, redirecting to login");
          navigate('/login');
          return;
        }
        
        // Buscar dados do usuário
        const userData = await getUserData();
        
        if (!userData) {
          console.error("[TrainGO] Failed to fetch user data");
          toast({
            title: "Erro ao carregar dados",
            description: "Não foi possível carregar seu perfil.",
            variant: "destructive",
          });
          navigate('/login');
          return;
        }
        
        console.log("[TrainGO] User data loaded:", userData.name);
        console.log("[TrainGO] Workout plan:", userData.workoutPlan ? "Found" : "Not found");
        
        setUserData(userData);
        
        // Buscar progresso da semana
        // Use a try catch block to safely handle this part since we're not sure
        // if the 'progress' table exists yet
        try {
          // Temporarily fake this data until we create the proper tables
          const completedWorkouts = [];
          const weekProgressValue = 0;
          setWeekProgress(Math.min(100, weekProgressValue));
        } catch (error) {
          console.error("[TrainGO] Error fetching progress data:", error);
          setWeekProgress(0);
        }
        
        // Processar o plano de treino
        if (userData.workoutPlan) {
          await processWorkoutPlan(userData);
        } else {
          console.error("[TrainGO] No workout plan found in user data");
          toast({
            title: "Plano não encontrado",
            description: "Não foi possível encontrar seu plano de treino.",
            variant: "destructive",
          });
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
  const processWorkoutPlan = async (user: any) => {
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
    
    const weekDays = mapWorkoutDays(plan.days);
    
    // Initialize with an empty array until we create the progress table
    let completedWorkouts: number[] = [];
    
    // Cria os cards de treino para o dashboard
    const workoutItems: WorkoutDisplay[] = Object.entries(plan.plan).map(([dayId, exercises], index) => {
      const dayNumber = index + 1;
      const workoutStatus: 'completed' | 'pending' = completedWorkouts.includes(dayNumber) ? 'completed' : 'pending';
      
      const workoutItem: WorkoutDisplay = {
        id: dayNumber,
        name: generateWorkoutName(dayNumber, exercises),
        day: weekDays[index] || `Dia ${dayNumber}`,
        status: workoutStatus,
        exercises: exercises.length,
        icon: getWorkoutIcon(exercises)
      };
      console.log(`[TrainGO] Workout day ${dayNumber} processed:`, workoutItem.name);
      return workoutItem;
    });
    
    console.log("[TrainGO] Total workout items:", workoutItems.length);
    setWorkouts(workoutItems);
  };

  const updateWeekProgress = async (newProgress: number) => {
    setWeekProgress(Math.min(100, newProgress));
  };

  return {
    userData,
    isLoading,
    weekProgress,
    setWeekProgress: updateWeekProgress,
    workouts,
    setWorkouts,
  };
};

export default useDashboardData;
