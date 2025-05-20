
import { Exercise } from '@/types/workout';

/**
 * Normalizes an exercise object to ensure it has both name and nome properties
 * and the required sets property for TypeScript.
 */
export const normalizeExercise = (exercise: Partial<Exercise>): Exercise => {
  const normalizedExercise: Exercise = {
    name: exercise.name || exercise.nome || 'Unnamed Exercise',
    nome: exercise.nome || exercise.name || 'Exercício Sem Nome',
    sets: typeof exercise.sets === 'number' ? exercise.sets : (
      // Try to extract sets from reps string like "3x10"
      exercise.reps?.match(/^(\d+)x/) ? parseInt(exercise.reps.match(/^(\d+)x/)[1], 10) : 3
    ),
    reps: exercise.reps || '10',
  };

  // Copy all other properties
  return { ...exercise, ...normalizedExercise };
};

/**
 * Normalizes video URL properties to ensure consistency
 */
export const normalizeVideoUrls = (exercise: Exercise): Exercise => {
  const videoUrl = exercise.videoUrl || exercise.video_url || '';
  return {
    ...exercise,
    videoUrl,
    video_url: videoUrl
  };
};

/**
 * Normalizes image URL properties to ensure consistency
 */
export const normalizeImageUrls = (exercise: Exercise): Exercise => {
  const imageUrl = exercise.imageUrl || exercise.gif_url || '';
  return {
    ...exercise,
    imageUrl,
    gif_url: imageUrl
  };
};

/**
 * Fully normalizes an exercise with all properties standardized
 */
export const standardizeExercise = (exercise: Partial<Exercise>): Exercise => {
  let normalized = normalizeExercise(exercise);
  normalized = normalizeVideoUrls(normalized);
  normalized = normalizeImageUrls(normalized);
  return normalized;
};

/**
 * Process an array of exercises to ensure they all have consistent properties
 */
export const standardizeExercises = (exercises: Partial<Exercise>[]): Exercise[] => {
  return exercises.map(standardizeExercise);
};
