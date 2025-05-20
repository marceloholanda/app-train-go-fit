
import { Exercise } from '@/types/workout';

// Modified to handle optional reps property
export const generateWorkoutName = (dayNumber: number, exercises: Exercise[]) => {
  if (!exercises || exercises.length === 0) {
    return `Treino ${dayNumber}`;
  }

  // Count occurrences of muscle groups
  const muscleGroups: Record<string, number> = {};
  
  exercises.forEach(exercise => {
    const group = exercise.muscle_group;
    if (group) {
      muscleGroups[group] = (muscleGroups[group] || 0) + 1;
    }
  });
  
  // Find the most common muscle groups (up to 2)
  const sortedGroups = Object.entries(muscleGroups)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(entry => entry[0]);
  
  if (sortedGroups.length === 0) {
    return `Treino ${dayNumber}`;
  }
  
  // Format the workout name based on the dominant muscle groups
  const formattedGroups = sortedGroups.map(group => {
    // Capitalize first letter and lowercase the rest
    return group.charAt(0).toUpperCase() + group.slice(1).toLowerCase();
  });
  
  if (formattedGroups.length === 1) {
    return `${formattedGroups[0]}`;
  } else {
    return `${formattedGroups.join(' e ')}`;
  }
};
