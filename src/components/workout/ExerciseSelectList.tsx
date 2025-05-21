
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseSelectItem from './ExerciseSelectItem';

interface ExerciseSelectListProps {
  exercises: Exercise[];
  selectedExercises: Exercise[];
  toggleExerciseSelection: (exercise: Exercise) => void;
}

const ExerciseSelectList: React.FC<ExerciseSelectListProps> = ({
  exercises,
  selectedExercises,
  toggleExerciseSelection
}) => {
  const isExerciseSelected = (exercise: Exercise) => {
    return selectedExercises.some(ex => ex.nome === exercise.nome);
  };
  
  return (
    <div className="overflow-y-auto flex-1 py-2 space-y-3">
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <ExerciseSelectItem
            key={`exercise-${index}`}
            exercise={exercise}
            isSelected={isExerciseSelected(exercise)}
            onClick={() => toggleExerciseSelection(exercise)}
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

export default ExerciseSelectList;
