
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { WorkoutDisplay } from '@/types/dashboard';
import { useAuth } from '@/contexts/AuthContext';
import { loadLocalUserData, saveLocalUserData } from '@/utils/localStorage/dashboardStorage';
import { 
  loadWorkoutPlanFromSupabase, 
  loadUserProgressFromSupabase, 
  saveWorkoutPlanToSupabase 
} from '@/utils/dashboardData/supabaseOperations';
import {
  processLocalWorkoutPlan,
  processSupabaseWorkoutPlan,
  calculateWeekProgress,
  getTotalExercises
} from '@/utils/dashboardData/workoutProcessor';

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
    // Load user data and workout plan
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        setDashboardError(null);
        
        // Check if user is authenticated
        if (!currentUser?.id) {
          console.log("[TrainGO] Redirecting to login (user not authenticated)");
          navigate('/login');
          return;
        }
        
        // First load data from localStorage for quick response
        const localUserData = loadLocalUserData();
        if (localUserData) {
          console.log("[TrainGO] User data loaded from localStorage:", localUserData.name || 'Name not found');
          setUserData(localUserData);
          
          if (localUserData.workoutPlan) {
            console.log("[TrainGO] Plan found in localStorage");
            const { workouts: processedWorkouts, weekProgress: localProgress } = processLocalWorkoutPlan(localUserData);
            setWorkouts(processedWorkouts);
            setWeekProgress(localProgress);
          }
        }
        
        // Now load data from Supabase
        try {
          const workoutPlan = await loadWorkoutPlanFromSupabase(currentUser.id);
          
          if (workoutPlan) {
            console.log("[TrainGO] Workout plan loaded from Supabase");
            
            // If data differs from localStorage, update
            if (JSON.stringify(workoutPlan) !== JSON.stringify(userData?.workoutPlan)) {
              if (userData) {
                const updatedUserData = {
                  ...userData,
                  workoutPlan: workoutPlan
                };
                setUserData(updatedUserData);
                saveLocalUserData(updatedUserData);
              }
              
              // Process the plan for display
              const processedWorkouts = processSupabaseWorkoutPlan(workoutPlan);
              setWorkouts(processedWorkouts);
            }
          } else {
            console.log("[TrainGO] No workout plan found in Supabase");
            // If no Supabase data but we have local data, save to Supabase
            if (userData?.workoutPlan && currentUser?.id) {
              await saveWorkoutPlanToSupabase(currentUser.id, userData.workoutPlan);
            }
          }
          
          // Load progress data
          const progressData = await loadUserProgressFromSupabase(currentUser.id);
          
          if (progressData && workoutPlan) {
            console.log("[TrainGO] Progress loaded from Supabase:", progressData);
            
            // Calculate weekly progress based on completed exercises
            if (progressData.completed_exercises) {
              const totalExercises = getTotalExercises(workoutPlan);
              const updatedProgress = calculateWeekProgress(progressData.completed_exercises, totalExercises);
              setWeekProgress(updatedProgress);
            }
          }
        } catch (supabaseError) {
          console.error("[TrainGO] Error in Supabase communication:", supabaseError);
          setDashboardError("Falha na comunicação com o servidor");
        }
      } catch (error) {
        console.error('[TrainGO] Error loading user data:', error);
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
  
  // Function to reset dashboard error and reload data
  const resetDashboardError = () => {
    setDashboardError(null);
    setIsLoading(true);
    
    // Force a data reload
    if (currentUser) {
      const loadData = async () => {
        try {
          const workoutPlan = await loadWorkoutPlanFromSupabase(currentUser.id);
          if (workoutPlan) {
            const processedWorkouts = processSupabaseWorkoutPlan(workoutPlan);
            setWorkouts(processedWorkouts);
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
