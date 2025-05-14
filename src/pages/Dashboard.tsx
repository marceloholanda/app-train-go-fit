
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { mapWorkoutDays, getWorkoutIcon, generateWorkoutName, updateWorkoutProgress } from '@/utils/workoutUtils';
import { WorkoutPlan } from '@/types/workout';
import { isPremiumUser } from '@/utils/userUtils';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WeeklyProgress from '@/components/dashboard/WeeklyProgress';
import WorkoutsList from '@/components/dashboard/WorkoutsList';
import UpgradePrompt from '@/components/dashboard/UpgradePrompt';
import PremiumStatusBanner from '@/components/dashboard/PremiumStatusBanner';

interface WorkoutDisplay {
  id: number;
  name: string;
  day: string;
  status: 'completed' | 'pending';
  exercises: number;
  icon: string;
  isPremium?: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekProgress, setWeekProgress] = useState(0);
  const [workouts, setWorkouts] = useState<WorkoutDisplay[]>([]);
  const isPremium = isPremiumUser();

  useEffect(() => {
    // Carregar dados do usuário e plano de treino
    const loadUserData = () => {
      try {
        const user = localStorage.getItem('traingo-user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
          
          // Processar o plano de treino
          processWorkoutPlan(parsedUser);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
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
      setWorkouts([]);
      setWeekProgress(0);
      return;
    }
    
    const plan: WorkoutPlan = user.workoutPlan;
    const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
    const weekDays = mapWorkoutDays(plan.days);
    
    // Cria os cards de treino para o dashboard
    const workoutItems: WorkoutDisplay[] = Object.entries(plan.plan).map(([dayId, exercises], index) => {
      const dayNumber = index + 1;
      return {
        id: dayNumber,
        name: generateWorkoutName(dayNumber, exercises),
        day: weekDays[index] || `Dia ${dayNumber}`,
        status: completedWorkouts.includes(dayNumber) ? 'completed' : 'pending',
        exercises: exercises.length,
        icon: getWorkoutIcon(exercises)
      };
    });
    
    setWorkouts(workoutItems);
    
    // Atualiza o progresso da semana
    const progress = user.workoutProgress?.lastWeekProgress || 0;
    setWeekProgress(progress);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <DashboardHeader userName={userData?.name?.split(' ')[0]} />

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
          isPremium={isPremium} 
          setWorkouts={setWorkouts}
          setWeekProgress={setWeekProgress}
        />
        
        {/* Upgrade Prompt - only show for non-premium users */}
        {userData && !isPremium && <UpgradePrompt />}
        
        {/* Pro Status Banner - only show for premium users */}
        {userData && isPremium && <PremiumStatusBanner />}
      </section>
    </div>
  );
};

export default Dashboard;
