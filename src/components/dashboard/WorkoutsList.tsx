
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
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
  const [userIsPremium, setUserIsPremium] = useState(false);
  
  // Check premium status on component mount
  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const premium = await isPremiumUser();
        setUserIsPremium(premium);
      } catch (error) {
        console.error("Error checking premium status:", error);
        setUserIsPremium(false);
      }
    };
    
    checkPremiumStatus();
  }, []);

  const handleWorkoutClick = (workoutId: number) => {
    navigate(`/exercise/${workoutId}`);
  };

  const toggleWorkoutCompletion = async (e: React.MouseEvent, workoutId: number, currentStatus: 'completed' | 'pending') => {
    e.stopPropagation();
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const newCompleted = newStatus === 'completed';
    
    // Atualiza o status do treino localmente
    setWorkouts(prev => prev.map(workout => 
      workout.id === workoutId 
        ? { ...workout, status: newStatus } 
        : workout
    ));
    
    try {
      // Atualiza o progresso da semana
      const newProgress = await updateWorkoutProgress(workoutId, newCompleted);
      setWeekProgress(newProgress);
      
      if (newCompleted) {
        toast("Treino concluído!", {
          description: "Continue assim! Seu progresso foi atualizado."
        });
      } else {
        toast("Treino desmarcado", {
          description: "O treino foi marcado como pendente."
        });
      }
    } catch (error) {
      console.error("Error updating workout progress:", error);
      toast("Erro", {
        description: "Não foi possível atualizar o status do treino.",
        variant: "destructive"
      });
    }
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
        <WorkoutItem
          key={workout.id}
          workout={workout}
          isPremium={userIsPremium}
          onWorkoutClick={handleWorkoutClick}
          onToggleCompletion={toggleWorkoutCompletion}
        />
      ))}
    </div>
  );
};

export default WorkoutsList;
