
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseListItem from './ExerciseListItem';

interface ExerciseSelectionListProps {
  exercises: Exercise[];
  selectedExercises: Exercise[];
  onToggleSelection: (exercise: Exercise) => void;
}

const ExerciseSelectionList: React.FC<ExerciseSelectionListProps> = ({
  exercises,
  selectedExercises,
  onToggleSelection
}) => {
  const isExerciseSelected = (exercise: Exercise) => {
    return selectedExercises.some(ex => ex.nome === exercise.nome || ex.name === exercise.name);
  };

  return (
    <div className="overflow-y-auto flex-1 py-2 space-y-3">
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <ExerciseListItem
            key={`exercise-${index}`}
            exercise={exercise}
            isSelected={isExerciseSelected(exercise)}
            onToggleSelection={onToggleSelection}
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-400">
          Nenhum exercício encontrado.
        </div>
      )}
    </div>
  );
};

export default ExerciseSelectionList;
