
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseDetailHeader from '@/components/workout/ExerciseDetailHeader';

interface ExerciseHeaderProps {
  workoutDay: string;
  isCompleted: boolean;
  handleToggleWorkout: () => void;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  workoutDay,
  isCompleted,
  handleToggleWorkout
}) => {
  return (
    <>
      <ExerciseDetailHeader workoutDay={workoutDay} />
      
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
      </section>
    </>
  );
};

export default ExerciseHeader;
