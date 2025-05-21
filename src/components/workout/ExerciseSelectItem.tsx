
import React from 'react';
import { Check } from 'lucide-react';
import { Exercise } from '@/types/workout';

interface ExerciseSelectItemProps {
  exercise: Exercise;
  isSelected: boolean;
  onClick: () => void;
}

const ExerciseSelectItem: React.FC<ExerciseSelectItemProps> = ({
  exercise,
  isSelected,
  onClick
}) => {
  return (
    <div
      className={`
        border border-gray-700 rounded-lg p-3 cursor-pointer
        transition-colors duration-200 
        ${isSelected ? 'border-traingo-primary bg-traingo-primary/10' : 'hover:bg-gray-800'}
      `}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{exercise.nome}</h4>
          <p className="text-xs text-gray-400">{exercise.reps}</p>
        </div>
        {isSelected && (
          <div className="bg-traingo-primary h-6 w-6 rounded-full flex items-center justify-center">
            <Check className="h-4 w-4 text-black" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseSelectItem;
