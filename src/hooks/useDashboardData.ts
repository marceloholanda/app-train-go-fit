
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
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  useEffect(() => {
    // Carregar dados do usuário e plano de treino
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setDashboardError(null);
        
        // Verificar se há um usuário autenticado
        if (!currentUser?.id) {
          console.log("[TrainGO] Redirecionando para login (usuário não autenticado)");
          navigate('/login');
          return;
        }
        
        // Primeiro carregamos dados locais - para rápida resposta
        try {
          const localStorageUser = localStorage.getItem('traingo-user');
          if (localStorageUser) {
            const parsedUser = JSON.parse(localStorageUser);
            console.log("[TrainGO] User data loaded from localStorage:", parsedUser.name || 'Nome não encontrado');
            setUserData(parsedUser);
            
            if (parsedUser.workoutPlan) {
              console.log("[TrainGO] Plan encontrado no localStorage");
              // Processando o plano de treino local no formato para o dashboard
              processWorkoutPlan(parsedUser);
            }
          }
        } catch (localStorageError) {
          console.error("[TrainGO] Erro ao ler localStorage:", localStorageError);
          // Não interrompemos o fluxo aqui, continuamos para carregar dados do Supabase
        }
        
        // Agora continuamos normalmente para carregar dados do Supabase
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
            console.error("[TrainGO] Erro ao carregar plano de treino do Supabase:", workoutError);
            toast({
              title: "Erro ao carregar treinos",
              description: workoutError.message,
              variant: "destructive",
            });
          } else if (workoutData?.data) {
            console.log("[TrainGO] Plano de treino carregado do Supabase");
            const plan = workoutData.data;
            
            // Se os dados são diferentes do localStorage, atualizar
            if (JSON.stringify(plan) !== JSON.stringify(userData?.workoutPlan)) {
              if (userData) {
                const updatedUserData = {
                  ...userData,
                  workoutPlan: plan
                };
                setUserData(updatedUserData);
                localStorage.setItem('traingo-user', JSON.stringify(updatedUserData));
              }
              
              // Processar o plano para exibição
              processWorkoutPlanFromSupabase(plan);
            }
          } else {
            console.log("[TrainGO] Nenhum plano de treino encontrado no Supabase");
            // Se não temos dados, mas temos dados locais, enviar para Supabase
            if (userData?.workoutPlan && currentUser?.id) {
              await supabase
                .from('user_workouts')
                .insert([{
                  user_id: currentUser.id,
                  data: userData.workoutPlan
                }]);
            }
          }
        } catch (supabaseError) {
          console.error("[TrainGO] Erro na comunicação com Supabase:", supabaseError);
          setDashboardError("Falha na comunicação com o servidor");
        }
      } catch (error) {
        console.error('[TrainGO] Erro ao carregar dados do usuário:', error);
        setDashboardError("Erro ao carregar dados");
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
  
  // Processa o plano de treino carregado do localStorage - versão simplificada
  const processWorkoutPlan = (user: any) => {
    try {
      if (!user.workoutPlan) {
        console.error("[TrainGO] No workout plan in user data");
        setWorkouts([]);
        setWeekProgress(0);
        return;
      }
      
      const plan: WorkoutPlan = user.workoutPlan;
      console.log("[TrainGO] Processing workout plan:", plan.name);
      
      const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
      const weekDays = mapWorkoutDays(plan.days || 3);
      
      // Versão simplificada para evitar erros de tipo
      const workoutItems: WorkoutDisplay[] = [];
      
      // Usar Object.entries mais segura
      Object.entries(plan.plan || {}).forEach(([dayId, exercises], index) => {
        try {
          const dayNumber = index + 1;
          const workoutStatus: 'completed' | 'pending' = completedWorkouts.includes(dayNumber) ? 'completed' : 'pending';
          
          const workoutItem: WorkoutDisplay = {
            id: dayNumber,
            name: generateWorkoutName(dayNumber, exercises as any),
            day: weekDays[index] || `Dia ${dayNumber}`,
            status: workoutStatus,
            exercises: (exercises as any[]).length,
            icon: getWorkoutIcon(exercises as any)
          };
          
          workoutItems.push(workoutItem);
        } catch (itemError) {
          console.error(`[TrainGO] Erro ao processar dia ${index + 1}:`, itemError);
        }
      });
      
      console.log("[TrainGO] Total workout items:", workoutItems.length);
      setWorkouts(workoutItems);
      
      // Atualiza o progresso da semana
      const progress = user.workoutProgress?.lastWeekProgress || 0;
      setWeekProgress(progress);
    } catch (error) {
      console.error("[TrainGO] Error in processWorkoutPlan:", error);
      setDashboardError("Erro ao processar plano de treino");
    }
  };

  // Versão simplificada do processamento dos dados do Supabase
  const processWorkoutPlanFromSupabase = (plan: any) => {
    try {
      if (!plan) {
        console.error("[TrainGO] No workout plan data");
        setWorkouts([]);
        setWeekProgress(0);
        return;
      }
      
      console.log("[TrainGO] Processing Supabase workout plan");
      
      // Verificar o formato do plano e processar adequadamente
      if ('plan' in plan) {
        const weekDays = mapWorkoutDays(plan.days || 3);
        const workoutItems: WorkoutDisplay[] = [];
        
        Object.entries(plan.plan || {}).forEach(([dayId, exercises], index) => {
          try {
            const dayNumber = index + 1;
            const exercisesArray = exercises as any[];
            
            const workoutItem: WorkoutDisplay = {
              id: dayNumber,
              name: generateWorkoutName(dayNumber, exercisesArray),
              day: weekDays[index] || `Dia ${dayNumber}`,
              status: 'pending',
              exercises: exercisesArray.length,
              icon: getWorkoutIcon(exercisesArray)
            };
            
            workoutItems.push(workoutItem);
          } catch (itemError) {
            console.error(`[TrainGO] Erro ao processar dia ${index + 1} do Supabase:`, itemError);
          }
        });
        
        setWorkouts(workoutItems);
      } else if (Array.isArray(plan)) {
        // Se já estiver no formato WorkoutDisplay[]
        setWorkouts(plan);
      } else {
        console.error("[TrainGO] Unsupported workout plan format", plan);
        setWorkouts([]);
      }
    } catch (error) {
      console.error("[TrainGO] Error processing workout plan:", error);
      setDashboardError("Erro ao processar dados do servidor");
    }
  };

  // Se houver erro, fornecer uma função para limpar o erro e tentar novamente
  const resetDashboardError = () => {
    setDashboardError(null);
    setIsLoading(true);
    // Forçar um novo carregamento dos dados
    if (currentUser) {
      const loadData = async () => {
        try {
          const { data: workoutData } = await supabase
            .from('user_workouts')
            .select('data')
            .eq('user_id', currentUser.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
            
          if (workoutData?.data) {
            processWorkoutPlanFromSupabase(workoutData.data);
          }
        } catch (error) {
          console.error("[TrainGO] Error reloading data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadData();
    } else {
      setIsLoading(false);
    }
  };

  return {
    userData,
    isLoading,
    weekProgress,
    setWeekProgress,
    workouts,
    setWorkouts,
    dashboardError,
    resetDashboardError
  };
};

export default useDashboardData;
