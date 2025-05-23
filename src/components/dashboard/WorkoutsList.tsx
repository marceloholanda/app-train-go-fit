
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { updateWorkoutProgress } from '@/utils/workoutUtils';
import { WorkoutDisplay } from '@/types/dashboard';
import WorkoutItem from './WorkoutItem';
import { isPremiumUser } from '@/utils/userUtils';

interface WorkoutsListProps {
  workouts: WorkoutDisplay[];
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutDisplay[]>>;
  setWeekProgress: React.Dispatch<React.SetStateAction<number>>;
}

const WorkoutsList: React.FC<WorkoutsListProps> = ({ 
  workouts, 
  setWorkouts,
  setWeekProgress 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isPremium = isPremiumUser();

  const handleWorkoutClick = (workoutId: number) => {
    console.log('[TrainGO] WorkoutsList - Navigating to workout:', workoutId);
    
    // Validate workout ID before navigation
    if (!workoutId || isNaN(workoutId) || workoutId < 1) {
      console.error('[TrainGO] WorkoutsList - Invalid workout ID:', workoutId);
      toast({
        title: "Erro na navegação",
        description: "ID do treino inválido.",
        variant: "destructive",
      });
      return;
    }
    
    navigate(`/exercise/${workoutId}`);
  };

  const toggleWorkoutCompletion = (e: React.MouseEvent, workoutId: number, currentStatus: 'completed' | 'pending') => {
    e.stopPropagation();
    
    console.log('[TrainGO] WorkoutsList - Toggling workout completion:', { workoutId, currentStatus });
    
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const newCompleted = newStatus === 'completed';
    
    // Atualiza o status do treino localmente
    setWorkouts(prev => prev.map(workout => 
      workout.id === workoutId 
        ? { ...workout, status: newStatus } 
        : workout
    ));
    
    // Atualiza o progresso da semana (função agora é síncrona)
    const newProgress = updateWorkoutProgress(workoutId, newCompleted);
    setWeekProgress(newProgress);
    
    toast({
      title: newCompleted ? "Treino concluído!" : "Treino desmarcado",
      description: newCompleted 
        ? "Continue assim! Seu progresso foi atualizado." 
        : "O treino foi marcado como pendente."
    });
  };

  if (workouts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Nenhum plano de treino encontrado.</p>
        <button 
          onClick={() => navigate('/onboarding')}
          className="mt-4 text-traingo-primary hover:underline"
        >
          Criar meu plano personalizado
        </button>
      </div>
    );
  }

  console.log('[TrainGO] WorkoutsList - Rendering workouts:', workouts.map(w => ({ id: w.id, name: w.name })));

  return (
    <div className="space-y-4">
      {workouts.map(workout => (
        <WorkoutItem
          key={workout.id}
          workout={workout}
          isPremium={isPremium}
          onWorkoutClick={handleWorkoutClick}
          onToggleCompletion={toggleWorkoutCompletion}
        />
      ))}
    </div>
  );
};

export default WorkoutsList;
