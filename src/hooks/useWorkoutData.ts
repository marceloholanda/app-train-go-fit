
import { useState } from 'react';
import { Exercise } from '@/types/workout';
import { useWorkoutLoader } from './workout/useWorkoutLoader';
import { useExerciseCompletion } from './workout/useExerciseCompletion';

export const useWorkoutData = (id: string | undefined) => {
  const {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    userLevel,
    setIsCompleted
  } = useWorkoutLoader(id);

  const {
    handleExerciseToggle,
    handleToggleWorkout
  } = useExerciseCompletion(
    id,
    exercises,
    isCompleted,
    setExercises,
    setIsCompleted
  );

  return {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    handleExerciseToggle,
    handleToggleWorkout,
    userLevel
  };
};
