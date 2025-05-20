
import { Exercise } from '@/types/workout';

// Modified to handle optional reps property
export const getWorkoutIcon = (exercises: Exercise[]) => {
  // Default icon if no exercises or unable to determine
  let icon = 'dumbbell';

  if (!exercises || exercises.length === 0) {
    return icon;
  }

  // Count occurrences of muscle groups
  const muscleGroups: Record<string, number> = {};
  
  exercises.forEach(exercise => {
    const group = exercise.muscle_group;
    if (group) {
      muscleGroups[group] = (muscleGroups[group] || 0) + 1;
    }
  });
  
  // Find the most common muscle group
  let maxCount = 0;
  let dominantGroup = '';
  
  for (const group in muscleGroups) {
    if (muscleGroups[group] > maxCount) {
      maxCount = muscleGroups[group];
      dominantGroup = group;
    }
  }
  
  // Map dominant muscle group to an icon
  switch (dominantGroup.toLowerCase()) {
    case 'chest':
    case 'peito':
      return 'chest';
    case 'back':
    case 'costas':
      return 'back';
    case 'legs':
    case 'pernas':
      return 'legs';
    case 'shoulders':
    case 'ombros':
      return 'shoulders';
    case 'arms':
    case 'braços':
    case 'bracos':
      return 'arms';
    case 'abs':
    case 'abdomen':
    case 'abdominal':
    case 'core':
      return 'abs';
    case 'cardio':
      return 'cardio';
    default:
      return 'dumbbell';
  }
};
