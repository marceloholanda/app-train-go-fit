
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { 
  mapWorkoutDays, 
  getWorkoutIcon, 
  generateWorkoutNameFromGroups
} from '@/utils/workoutUtils';
import { WorkoutPlan, WorkoutPlanSupabase } from '@/types/workout';
import { WorkoutDisplay } from '@/types/dashboard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Json } from '@/integrations/supabase/types';

export const useDashboardData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, session } = useAuth();
  
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekProgress, setWeekProgress] = useState(0);
  const [workouts, setWorkouts] = useState<WorkoutDisplay[]>([]);

  useEffect(() => {
    // Carregar dados do usuário e plano de treino do Supabase
    const loadUserData = async () => {
      // Always get fresh user session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const activeUser = currentSession?.user || currentUser;
      
      if (!activeUser) {
        console.log('[TrainGO] No user found, redirecting to login');
        navigate('/login');
        return;
      }
      
      console.log('[TrainGO] Loading dashboard data for user:', activeUser.id);
      
      try {
        setIsLoading(true);
        
        // Buscar perfil do usuário
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', activeUser.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('[TrainGO] Error fetching profile for user', activeUser.id, ':', profileError);
          throw profileError;
        }
        
        // Buscar plano de treino do usuário
        const { data: workoutPlan, error: workoutPlanError } = await supabase
          .from('user_workouts')
          .select('*')
          .eq('user_id', activeUser.id)
          .maybeSingle();
          
        if (workoutPlanError && workoutPlanError.code !== 'PGRST116') {
          console.error('[TrainGO] Error fetching workout plan for user', activeUser.id, ':', workoutPlanError);
          throw workoutPlanError;
        }
        
        // Buscar estatísticas do usuário
        const { data: stats, error: statsError } = await supabase
          .from('stats')
          .select('*')
          .eq('user_id', activeUser.id)
          .maybeSingle();
          
        if (statsError && statsError.code !== 'PGRST116') {
          console.error('[TrainGO] Error fetching stats for user', activeUser.id, ':', statsError);
          throw statsError;
        }
        
        // Buscar treinos concluídos
        const { data: completedWorkouts, error: completedWorkoutsError } = await supabase
          .from('progress')
          .select('workout_day')
          .eq('user_id', activeUser.id);
          
        if (completedWorkoutsError) {
          console.error('[TrainGO] Error fetching completed workouts for user', activeUser.id, ':', completedWorkoutsError);
          throw completedWorkoutsError;
        }
        
        const completed = completedWorkouts?.map(item => item.workout_day) || [];
        
        // Montar objeto com os dados do usuário
        const user = {
          ...activeUser,
          profile,
          workoutPlan,
          stats,
          workoutProgress: {
            completedWorkouts: completed,
            lastWeekProgress: stats?.week_progress || 0
          }
        };
        
        console.log("[TrainGO] Dashboard data loaded for user:", activeUser.id, activeUser.email);
        console.log("[TrainGO] Workout plan:", workoutPlan ? "Found" : "Not found");
        console.log("[TrainGO] Completed workouts:", completed.length);
        
        setUserData(user);
        
        // Processar o plano de treino
        if (workoutPlan) {
          processWorkoutPlan(workoutPlan, completed);
          setWeekProgress(stats?.week_progress || 0);
        } else {
          console.log("[TrainGO] No workout plan found for user:", activeUser.id);
          setWorkouts([]);
        }
      } catch (error) {
        console.error('[TrainGO] Error loading dashboard data for user', activeUser?.id, ':', error);
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
  }, [navigate, toast, currentUser, session]);
  
  // Processa o plano de treino e prepara os dados para exibição
  const processWorkoutPlan = (workoutPlanData: WorkoutPlanSupabase, completedWorkouts: number[]) => {
    if (!workoutPlanData) {
      console.error("[TrainGO] No workout plan data provided");
      setWorkouts([]);
      return;
    }
    
    // Converter do formato Supabase para o formato WorkoutPlan
    const plan: WorkoutPlan = {
      id: workoutPlanData.plan_id,
      name: workoutPlanData.name,
      description: workoutPlanData.description,
      days: workoutPlanData.days,
      level: workoutPlanData.level as string,
      environment: workoutPlanData.environment as string,
      objective: workoutPlanData.objective as string,
      // Convert JSON array to string array using map
      tags: Array.isArray(workoutPlanData.tags) ? 
        (workoutPlanData.tags as any[]).map((tag: any) => String(tag)) : 
        [],
      plan: workoutPlanData.plan as Record<string, any>
    };
    
    console.log("[TrainGO] Processing workout plan:", plan.name);
    console.log("[TrainGO] Plan details:", {
      days: plan.days,
      exercises: Object.keys(plan.plan).length,
      tags: plan.tags
    });
    
    const weekDays = mapWorkoutDays(plan.days);
    
    // Cria os cards de treino para o dashboard
    const workoutItems: WorkoutDisplay[] = Object.entries(plan.plan).map(([dayId, exercises], index) => {
      const dayNumber = index + 1;
      const workoutStatus: 'completed' | 'pending' = completedWorkouts.includes(dayNumber) ? 'completed' : 'pending';
      
      // Convert exercises to the format needed by generateWorkoutNameFromGroups
      const workoutExercises = exercises.map((ex: any) => ({
        nome: ex.nome || "", 
        reps: ex.reps || "3x12"  // Ensure reps is always present
      }));
      
      const workoutItem: WorkoutDisplay = {
        id: dayNumber,
        name: generateWorkoutNameFromGroups(dayNumber, workoutExercises),
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

  const updateWorkoutStatus = async (workoutId: number, status: 'completed' | 'pending') => {
    // Get fresh session
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const activeUser = currentSession?.user || currentUser;
    
    if (!activeUser) {
      console.error('[TrainGO] No user found for workout status update');
      return;
    }
    
    console.log('[TrainGO] Updating workout status for user:', activeUser.id, 'workout:', workoutId, 'status:', status);
    
    try {
      if (status === 'completed') {
        // Adicionar novo registro de treino concluído
        const today = new Date();
        const { error } = await supabase
          .from('progress')
          .insert({
            user_id: activeUser.id,
            workout_day: workoutId,
            completed_date: today.toISOString().split('T')[0]
          });
          
        if (error) throw error;
        console.log('[TrainGO] Workout marked as completed for user:', activeUser.id);
      } else {
        // Remover registro de treino concluído
        const { error } = await supabase
          .from('progress')
          .delete()
          .eq('user_id', activeUser.id)
          .eq('workout_day', workoutId);
          
        if (error) throw error;
        console.log('[TrainGO] Workout marked as pending for user:', activeUser.id);
      }
      
      // Atualizar a lista local de treinos
      const updatedWorkouts = workouts.map(workout => 
        workout.id === workoutId
          ? { ...workout, status }
          : workout
      );
      
      setWorkouts(updatedWorkouts);
      
      // Calcular novo progresso semanal
      const completed = updatedWorkouts.filter(w => w.status === 'completed').length;
      const total = updatedWorkouts.length;
      const newProgress = total > 0 ? (completed / total) * 100 : 0;
      
      // Atualizar progresso na tabela stats
      await supabase
        .from('stats')
        .update({ 
          week_progress: newProgress,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', activeUser.id);
      
      setWeekProgress(newProgress);
      console.log('[TrainGO] Progress updated for user:', activeUser.id, 'new progress:', newProgress);
    } catch (error) {
      console.error('[TrainGO] Error updating workout status for user', activeUser.id, ':', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do treino.",
        variant: "destructive",
      });
    }
  };

  return {
    userData,
    isLoading,
    weekProgress,
    workouts,
    setWorkProgress: setWeekProgress,
    setWorkouts,
    updateWorkoutStatus
  };
};

export default useDashboardData;
