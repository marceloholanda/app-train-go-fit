
import React from 'react';
import { Exercise } from '@/types/workout';
import { Checkbox } from '@/components/ui/checkbox';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  dayId: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, index, dayId }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center h-5">
          <Checkbox id={`${dayId}-ex-${index}`} />
        </div>
        <div>
          <label 
            htmlFor={`${dayId}-ex-${index}`} 
            className="font-medium cursor-pointer"
          >
            {exercise.nome}
          </label>
        </div>
      </div>
      <span className="text-sm text-gray-400">{exercise.reps}</span>
    </div>
  );
};

export default ExerciseItem;
