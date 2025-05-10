
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Card from '@/components/Card';
import { useToast } from '@/hooks/use-toast';
import { updateWorkoutProgress } from '@/utils/workoutUtils';

interface Exercise {
  nome: string;
  reps: string;
  completed?: boolean;
}

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [workoutDay, setWorkoutDay] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    const loadWorkoutData = () => {
      try {
        setIsLoading(true);
        
        const userData = localStorage.getItem('traingo-user');
        if (!userData || !id) {
          navigate('/dashboard');
          return;
        }
        
        const user = JSON.parse(userData);
        const workoutPlan = user.workoutPlan;
        
        if (!workoutPlan) {
          toast({
            title: "Plano não encontrado",
            description: "Não foi possível encontrar seu plano de treino.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        // Encontrar o dia de treino baseado no ID
        const dayNumber = parseInt(id);
        const dayKey = `dia${dayNumber}`;
        const dayExercises = workoutPlan.plan[dayKey];
        
        if (!dayExercises) {
          toast({
            title: "Treino não encontrado",
            description: "Este treino não existe no seu plano atual.",
            variant: "destructive",
          });
          navigate('/dashboard');
          return;
        }
        
        // Verificar se o treino está concluído
        const completedWorkouts = user.workoutProgress?.completedWorkouts || [];
        const completed = completedWorkouts.includes(dayNumber);
        setIsCompleted(completed);
        
        // Preparar dados para exibição
        setWorkoutDay(`Dia ${dayNumber}`);
        
        // Carregar status de conclusão individual dos exercícios (se salvo)
        const savedExercises = user[`exercises_day${dayNumber}`] || dayExercises.map((ex: Exercise) => ({ 
          ...ex, 
          completed: false 
        }));
        
        setExercises(savedExercises);
      } catch (error) {
        console.error('Erro ao carregar treino:', error);
        toast({
          title: "Erro ao carregar treino",
          description: "Ocorreu um erro ao carregar os detalhes do treino.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWorkoutData();
  }, [id, navigate, toast]);
  
  const handleExerciseToggle = (index: number) => {
    const updatedExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData && id) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Verificar se todos exercícios estão concluídos
    const allCompleted = updatedExercises.every(ex => ex.completed);
    if (allCompleted && !isCompleted) {
      markWorkoutAsCompleted();
    } else if (!allCompleted && isCompleted) {
      markWorkoutAsPending();
    }
  };
  
  const markWorkoutAsCompleted = () => {
    if (!id) return;
    
    setIsCompleted(true);
    const progress = updateWorkoutProgress(parseInt(id), true);
    
    toast({
      title: "Treino concluído!",
      description: "Parabéns! Seu progresso foi atualizado.",
    });
  };
  
  const markWorkoutAsPending = () => {
    if (!id) return;
    
    setIsCompleted(false);
    const progress = updateWorkoutProgress(parseInt(id), false);
  };
  
  const handleToggleWorkout = () => {
    if (!id) return;
    
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    
    // Atualizar status de todos os exercícios
    const updatedExercises = exercises.map(exercise => ({ 
      ...exercise, 
      completed: newStatus 
    }));
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Atualizar progresso
    const progress = updateWorkoutProgress(parseInt(id), newStatus);
    
    toast({
      title: newStatus ? "Treino concluído!" : "Treino desmarcado",
      description: newStatus 
        ? "Parabéns! Seu progresso foi atualizado."
        : "O treino foi marcado como pendente.",
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
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{workoutDay}</h1>
        </div>
      </header>
      
      {/* Exercises List */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Exercícios</h2>
          <button 
            onClick={handleToggleWorkout}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isCompleted 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-traingo-primary text-black'
            }`}
          >
            {isCompleted ? 'Concluído' : 'Marcar todos'}
          </button>
        </div>
        
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <Card 
              key={index} 
              variant="outline" 
              className={`transition-colors ${exercise.completed ? 'border-green-600/30 bg-green-950/10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{exercise.nome}</h3>
                  <p className="text-gray-400 text-sm">{exercise.reps}</p>
                </div>
                <button 
                  onClick={() => handleExerciseToggle(index)}
                  className="p-2"
                >
                  {exercise.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
                  )}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExerciseDetail;
