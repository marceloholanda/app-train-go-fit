
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WorkoutCard from './WorkoutCard';
import { useToast } from '@/hooks/use-toast';
import { updateWorkoutProgress } from '@/utils/workoutUtils';

interface WorkoutItem {
  id: number;
  name: string;
  day: string;
  status: 'completed' | 'pending';
  exercises: number;
  icon: string;
  isPremium?: boolean;
}

interface WorkoutsListProps {
  workouts: WorkoutItem[];
  isPremium: boolean;
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutItem[]>>;
  setWeekProgress: React.Dispatch<React.SetStateAction<number>>;
}

const WorkoutsList: React.FC<WorkoutsListProps> = ({ 
  workouts, 
  isPremium, 
  setWorkouts, 
  setWeekProgress 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      {workouts.map(workout => (
        <WorkoutCard
          key={workout.id}
          id={workout.id}
          name={workout.name}
          day={workout.day}
          status={workout.status}
          exercises={workout.exercises}
          icon={workout.icon}
          isPremium={workout.isPremium}
          showPremiumBadge={isPremium}
          onCardClick={handleWorkoutClick}
          onToggleStatus={toggleWorkoutCompletion}
        />
      ))}
    </div>
  );
};

export default WorkoutsList;
