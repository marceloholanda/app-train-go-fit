
import React, { useEffect } from 'react';
import useDashboardData from '@/hooks/useDashboardData';
import { useProfileContext } from '@/contexts/ProfileContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeeklyProgress from '@/components/dashboard/WeeklyProgress';
import WorkoutsList from '@/components/dashboard/WorkoutsList';
import SubscriptionBanner from '@/components/dashboard/SubscriptionBanner';
import FitRecipesCard from '@/components/dashboard/FitRecipesCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { profile, isLoading: isProfileLoading } = useProfileContext();
  const {
    userData,
    isLoading: isDashboardLoading,
    weekProgress,
    setWeekProgress,
    workouts,
    setWorkouts
  } = useDashboardData();

  // Efeito para carregar os workouts do Supabase
  useEffect(() => {
    const loadWorkoutsFromSupabase = async () => {
      if (!currentUser?.id) return;
      
      try {
        // Buscar plano de treino do usuário
        const { data: workoutData, error: workoutError } = await supabase
          .from('user_workouts')
          .select('data')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (workoutError) {
          console.error("Erro ao carregar plano de treino:", workoutError);
          return;
        }
        
        if (workoutData?.data) {
          console.log("Plano de treino carregado do Supabase:", workoutData.data);
          setWorkouts(workoutData.data);
        }
        
        // Buscar progresso dos treinos
        const { data: progressData, error: progressError } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('workout_date', { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (progressError) {
          console.error("Erro ao carregar progresso:", progressError);
          return;
        }
        
        if (progressData) {
          console.log("Progresso carregado do Supabase:", progressData);
          
          // Calcular o progresso semanal baseado nos exercícios completados
          if (progressData.completed_exercises && workoutData?.data) {
            const completedCount = progressData.completed_exercises.length || 0;
            const totalWorkouts = workoutData?.data?.days || 0;
            const weeklyProgress = totalWorkouts > 0 ? (completedCount / totalWorkouts) * 100 : 0;
            
            setWeekProgress(weeklyProgress);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Supabase:", error);
      }
    };
    
    loadWorkoutsFromSupabase();
  }, [currentUser, setWorkouts, setWeekProgress]);

  const isLoading = isDashboardLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate total workouts correctly
  const totalWorkouts = Array.isArray(workouts) 
    ? workouts.length 
    : (workouts?.days || userData?.workoutPlan?.days || 3);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <DashboardHeader userName={profile?.name || userData?.name || 'Atleta'} />

      {/* Weekly Progress */}
      <WeeklyProgress 
        progress={weekProgress} 
        completedWorkouts={userData?.workoutProgress?.completedWorkouts?.length || 0} 
        totalWorkouts={totalWorkouts} 
      />

      {/* Workouts List */}
      <section className="px-6 pb-6">
        <h2 className="font-bold text-lg mb-4">Seu Plano de Treino</h2>

        <WorkoutsList 
          workouts={workouts} 
          setWorkouts={setWorkouts} 
          setWeekProgress={setWeekProgress} 
        />
        
        {/* Upgrade/Premium Banner */}
        <SubscriptionBanner />
        
        {/* Fit Recipes Card */}
        <FitRecipesCard />
      </section>
    </div>
  );
};

export default Dashboard;
