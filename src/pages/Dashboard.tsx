
import React from 'react';
import useDashboardData from '@/hooks/useDashboardData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeeklyProgress from '@/components/dashboard/WeeklyProgress';
import WorkoutsList from '@/components/dashboard/WorkoutsList';
import SubscriptionBanner from '@/components/dashboard/SubscriptionBanner';
import FitRecipesCard from '@/components/dashboard/FitRecipesCard';

const Dashboard = () => {
  const {
    userData,
    isLoading,
    weekProgress,
    setWorkProgress, // Renamed from setWeekProgress to match hook
    workouts,
    setWorkouts
  } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <DashboardHeader userName={userData?.name || 'Atleta'} />

      {/* Weekly Progress */}
      <WeeklyProgress 
        progress={weekProgress} 
        completedWorkouts={userData?.workoutProgress?.completedWorkouts?.length || 0} 
        totalWorkouts={userData?.workoutPlan?.days || 3} 
      />

      {/* Workouts List */}
      <section className="px-6 pb-6">
        <h2 className="font-bold text-lg mb-4">Seu Plano de Treino</h2>

        <WorkoutsList 
          workouts={workouts} 
          setWorkouts={setWorkouts} 
          setWeekProgress={setWorkProgress} // Using the renamed property
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
