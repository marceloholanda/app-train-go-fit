
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
        try {
          const userId = session.user.id;
          const startOfWeek = new Date();
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          
          const { data: progressData } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', userId)
            .gte('date', startOfWeek.toISOString().split('T')[0])
            .eq('completed', true);
            
          const completedWorkouts = progressData || [];
          const weekProgressValue = Math.min(100, (completedWorkouts.length / 7) * 100);
          setWeekProgress(weekProgressValue);
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
    
    // Buscar informações de progresso no Supabase
    let completedWorkouts: number[] = [];
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const userId = session.user.id;
        const today = new Date().toISOString().split('T')[0];
        
        // Buscar treinos concluídos hoje
        const { data: progressData } = await supabase
          .from('progress')
          .select('exercise_name')
          .eq('user_id', userId)
          .eq('date', today)
          .eq('completed', true);
          
        if (progressData && progressData.length > 0) {
          // Extrair os números dos dias de treino das strings "day_1", "day_2", etc.
          completedWorkouts = progressData
            .filter(item => item.exercise_name.startsWith('day_'))
            .map(item => parseInt(item.exercise_name.split('_')[1]));
        }
      }
    } catch (error) {
      console.error("[TrainGO] Error fetching workout progress:", error);
    }
    
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
