import { Exercise } from '@/types/workout';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';
import { getExerciseImageUrl } from '@/utils/workoutRecommendation/exerciseImages';

/**
 * Hook to manage exercise media (videos and images)
 */
export const useExerciseMedia = () => {
  /**
   * Get video URL for an exercise (from the exercise property or from mapping)
   */
  const getVideoUrl = (exercise: Exercise | undefined): string => {
    if (!exercise) return '';
    
    // Use the URL from the exercise if available
    if (exercise.video_url) return exercise.video_url;
    if (exercise.videoUrl) return exercise.videoUrl;
    
    // Otherwise, look it up in the mapping
    return getExerciseVideoUrl(exercise.nome || exercise.name) || '';
  };

  /**
   * Get image URL for an exercise
   */
  const getImageUrl = (exercise: Exercise | undefined): string => {
    if (!exercise) return '';
    
    // Use the URL from the exercise if available
    if (exercise.imageUrl) return exercise.imageUrl;
    if (exercise.gif_url) return exercise.gif_url;
    
    // Otherwise, look it up in the mapping
    return getExerciseImageUrl(exercise.nome || exercise.name) || '';
  };

  return {
    getVideoUrl,
    getImageUrl
  };
};

export default useExerciseMedia;
