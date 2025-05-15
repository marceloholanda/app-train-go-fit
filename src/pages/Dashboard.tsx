import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import { CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { mapWorkoutDays, getWorkoutIcon, generateWorkoutName, updateWorkoutProgress } from '@/utils/workoutUtils';
import { WorkoutPlan } from '@/types/workout';
import { Progress } from '@/components/ui/progress';
import { isPremiumUser } from '@/utils/userUtils';
import { Badge } from '@/components/ui/badge';

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

  const handleWorkoutClick = (workoutId: number) => {
    navigate(`/exercise/${workoutId}`);
  };

  const toggleWorkoutCompletion = (e: React.MouseEvent, workoutId: number, currentStatus: string) => {
    e.stopPropagation();
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const newCompleted = newStatus === 'completed';
    
    // Atualiza o status do treino localmente
    setWorkouts(prev => prev.map(workout => 
      workout.id === workoutId 
        ? { ...workout, status: newStatus as 'completed' | 'pending' } 
        : workout
    ));
    
    // Atualiza o progresso da semana
    const newProgress = updateWorkoutProgress(workoutId, newCompleted);
    setWeekProgress(newProgress);
    
    toast({
      title: newCompleted ? "Treino concluído!" : "Treino desmarcado",
      description: newCompleted 
        ? "Continue assim! Seu progresso foi atualizado." 
        : "O treino foi marcado como pendente."
    });
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
      <header className="bg-traingo-gray p-6">
        <h1 className="text-2xl font-bold mb-1">
          Olá, {userData?.name?.split(' ')[0] || 'Atleta'}! 👋
        </h1>
        <p className="text-gray-400">Vamos treinar hoje?</p>
      </header>

      {/* Weekly Progress */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold flex items-center">
            <BarChart3 size={18} className="mr-2 text-traingo-primary" />
            Progresso da Semana
          </h2>
          <span className="text-gray-400 text-sm">{weekProgress}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-traingo-primary rounded-full" 
            style={{ width: `${weekProgress}%`, transition: 'width 1s ease-in-out' }} 
          />
        </div>
        <p className="text-gray-400 text-xs mt-2">
          {userData?.workoutProgress?.completedWorkouts?.length || 0} de {userData?.workoutPlan?.days || 3} treinos concluídos
        </p>
      </section>

      {/* Workouts List */}
      <section className="px-6 pb-6">
        <h2 className="font-bold text-lg mb-4">Seu Plano de Treino</h2>

        <div className="space-y-4">
          {workouts.length > 0 ? (
            workouts.map(workout => (
              <Card 
                key={workout.id} 
                onClick={() => handleWorkoutClick(workout.id)}
                className="animate-fade-in relative"
              >
                {workout.isPremium && isPremium && (
                  <Badge 
                    variant="default" 
                    className="absolute top-2 right-2 bg-traingo-primary text-xs text-black"
                  >
                    PRO
                  </Badge>
                )}
                <div className="flex items-center">
                  <div className="p-3 bg-traingo-primary/20 rounded-lg mr-4">
                    <span className="text-2xl">{workout.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{workout.name}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock size={14} className="mr-1" />
                      <span>{workout.day}</span>
                      <span className="mx-2">•</span>
                      <span>{workout.exercises} exercícios</span>
                    </div>
                  </div>
                  <div 
                    onClick={(e) => toggleWorkoutCompletion(e, workout.id, workout.status)}
                    className="cursor-pointer p-2"
                  >
                    {workout.status === 'completed' ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Nenhum plano de treino encontrado.</p>
              <button 
                onClick={() => navigate('/onboarding')}
                className="mt-4 text-traingo-primary hover:underline"
              >
                Criar meu plano personalizado
              </button>
            </div>
          )}
        </div>
        
        {/* Upgrade Prompt - only show for non-premium users */}
        {userData && !isPremium && (
          <div 
            className="mt-8 bg-gradient-to-r from-traingo-primary/30 to-traingo-primary/10 rounded-xl p-5 relative overflow-hidden cursor-pointer"
            onClick={() => navigate('/upgrade')}
          >
            <div className="absolute top-0 right-0 opacity-10">
              <span className="text-6xl">✨</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Desbloqueie Mais Treinos</h3>
            <p className="text-gray-300 text-sm mb-3">
              Acesse o plano PRO e tenha um treino D exclusivo + exercícios adicionais.
            </p>
            <div className="text-traingo-primary font-bold text-sm">Saiba mais →</div>
          </div>
        )}
        
        {/* Pro Status Banner - only show for premium users */}
        {userData && isPremium && (
          <div className="mt-8 bg-gradient-to-r from-traingo-primary/30 to-traingo-primary/10 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <span className="text-6xl">✨</span>
            </div>
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <span className="text-traingo-primary mr-2">PRO</span> Plano Premium Ativo
            </h3>
            <p className="text-gray-300 text-sm">
              Você tem acesso a todos os recursos premium do TrainGO.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
