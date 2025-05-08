
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import { CheckCircle, Clock, BarChart3 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockWorkouts = [
  {
    id: 1,
    name: 'Treino A - Peitoral e Tríceps',
    day: 'Segunda',
    status: 'completed',
    exercises: 6,
    icon: '💪'
  },
  {
    id: 2,
    name: 'Treino B - Costas e Bíceps',
    day: 'Quarta',
    status: 'pending',
    exercises: 6,
    icon: '🏋️'
  },
  {
    id: 3,
    name: 'Treino C - Pernas',
    day: 'Sexta',
    status: 'pending',
    exercises: 6,
    icon: '🦵'
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weekProgress, setWeekProgress] = useState(33); // 1/3 treinos concluídos

  useEffect(() => {
    // Carregar dados do usuário
    const loadUserData = () => {
      try {
        const user = localStorage.getItem('traingo-user');
        if (user) {
          setUserData(JSON.parse(user));
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

  const handleWorkoutClick = (workoutId: number) => {
    navigate(`/exercise/${workoutId}`);
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
        <p className="text-gray-400 text-xs mt-2">1 de 3 treinos concluídos</p>
      </section>

      {/* Workouts List */}
      <section className="px-6 pb-6">
        <h2 className="font-bold text-lg mb-4">Seu Plano de Treino</h2>

        <div className="space-y-4">
          {mockWorkouts.map(workout => (
            <Card 
              key={workout.id} 
              onClick={() => handleWorkoutClick(workout.id)}
              className="animate-fade-in"
            >
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
                {workout.status === 'completed' ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-gray-700" />
                )}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Upgrade Prompt */}
        {userData && !userData.isPremium && (
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
      </section>
    </div>
  );
};

export default Dashboard;
