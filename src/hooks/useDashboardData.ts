import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { mapWorkoutDays } from '@/utils/workoutUtils/dayMapping';
import { getWorkoutIcon } from '@/utils/workoutUtils/iconGeneration';
import { generateWorkoutName } from '@/utils/workoutUtils/nameGeneration';
import { WorkoutPlan } from '@/types/workout';
import { WorkoutDisplay } from '@/types/dashboard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useDashboardData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekProgress, setWeekProgress] = useState(0);
  const [workouts, setWorkouts] = useState<WorkoutDisplay[]>([]);

  useEffect(() => {
    // Carregar dados do usuário e plano de treino
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        
        // Verificar se há um usuário autenticado
        if (!currentUser?.id) {
          console.log("[TrainGO] Redirecionando para login (usuário não autenticado)");
          navigate('/login');
          return;
        }
        
        // Tenta carregar os dados do localStorage primeiro para rápida renderização
        const localStorageUser = localStorage.getItem('traingo-user');
        if (localStorageUser) {
          const parsedUser = JSON.parse(localStorageUser);
          console.log("[TrainGO] User data loaded from localStorage:", parsedUser.name);
          setUserData(parsedUser);
          
          if (parsedUser.workoutPlan) {
            console.log("[TrainGO] Plan encontrado no localStorage");
            // Transforma o plano de treino local no formato de cards para o dashboard
            processWorkoutPlan(parsedUser);
          }
        }
        
        // Carrega dados do Supabase (dados mais atualizados)
        try {
          // Buscar plano de treino do usuário no Supabase
          const { data: workoutData, error: workoutError } = await supabase
            .from('user_workouts')
            .select('data')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
            
          if (workoutError) {
            console.error("Erro ao carregar plano de treino do Supabase:", workoutError);
          } else if (workoutData?.data) {
            console.log("[TrainGO] Plano de treino carregado do Supabase");
            const plan = workoutData.data;
            
            // Se os dados do Supabase forem diferentes do localStorage, atualiza
            if (JSON.stringify(plan) !== JSON.stringify(userData?.workoutPlan)) {
              // Atualiza os dados do usuário com o plano do Supabase
              if (userData) {
                const updatedUserData = {
                  ...userData,
                  workoutPlan: plan
                };
                setUserData(updatedUserData);
                localStorage.setItem('traingo-user', JSON.stringify(updatedUserData));
              }
              
              // Processa o plano para exibição
              processWorkoutPlanFromSupabase(plan);
            }
          } else {
            console.log("[TrainGO] Nenhum plano de treino encontrado no Supabase");
            
            // Se não há plano no Supabase, mas tem no localStorage, salva o do localStorage no Supabase
            if (userData?.workoutPlan && currentUser?.id) {
              console.log("[TrainGO] Salvando plano do localStorage no Supabase");
              const { error } = await supabase
                .from('user_workouts')
                .insert([{
                  user_id: currentUser.id,
                  data: userData.workoutPlan
                }]);
              
              if (error) {
                console.error("Erro ao salvar plano no Supabase:", error);
              }
            }
          }
        } catch (supabaseError) {
          console.error("Erro na comunicação com Supabase:", supabaseError);
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
  }, [navigate, toast, currentUser]);
  
  // Processa o plano de treino carregado do localStorage
  const processWorkoutPlan = (user: any) => {
    if (!user.workoutPlan) {
      console.error("[TrainGO] No workout plan in user data");
      setWorkouts([]);
      setWeekProgress(0);
      return;
    }
    
    const plan: WorkoutPlan = user.workoutPlan;
    console.log("[TrainGO] Processing workout plan:", plan.name);
    
    const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
    const weekDays = mapWorkoutDays(plan.days);
    
    // Cria os cards de treino para o dashboard - modified to handle type issues
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
    
    // Atualiza o progresso da semana
    const progress = user.workoutProgress?.lastWeekProgress || 0;
    setWeekProgress(progress);
  };

  // Processa o plano carregado do Supabase
  const processWorkoutPlanFromSupabase = (plan: any) => {
    if (!plan) {
      console.error("[TrainGO] No workout plan data");
      setWorkouts([]);
      setWeekProgress(0);
      return;
    }
    
    try {
      console.log("[TrainGO] Processing Supabase workout plan");
      
      // Verifica e processa diferentes estruturas possíveis do plano
      if ('plan' in plan) {
        // Formato WorkoutPlan com propriedade plan
        const weekDays = mapWorkoutDays(plan.days || 3);
        
        const workoutItems: WorkoutDisplay[] = Object.entries(plan.plan).map(([dayId, exercises], index) => {
          const dayNumber = index + 1;
          const workoutStatus: 'completed' | 'pending' = 'pending'; // Estado inicial
          
          const workoutItem: WorkoutDisplay = {
            id: dayNumber,
            name: generateWorkoutName(dayNumber, exercises as any[]),
            day: weekDays[index] || `Dia ${dayNumber}`,
            status: workoutStatus,
            exercises: (exercises as any[]).length,
            icon: getWorkoutIcon(exercises as any[])
          };
          return workoutItem;
        });
        
        setWorkouts(workoutItems);
      } else if (Array.isArray(plan)) {
        // Se o plano já estiver no formato WorkoutDisplay[]
        setWorkouts(plan);
      } else {
        console.error("[TrainGO] Unsupported workout plan format", plan);
        setWorkouts([]);
      }
    } catch (error) {
      console.error("[TrainGO] Error processing workout plan:", error);
      setWorkouts([]);
    }
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
