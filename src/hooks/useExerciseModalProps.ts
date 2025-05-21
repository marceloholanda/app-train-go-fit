import { useMemo } from 'react';
import { Exercise } from '@/types/workout';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';
import { getExerciseImageUrl } from '@/utils/workoutRecommendation/exerciseImages';

export const useExerciseModalProps = (
  selectedExerciseIndex: number,
  visibleExercises: Exercise[]
) => {
  // Get the selected exercise
  const selectedExercise = useMemo(() => 
    selectedExerciseIndex !== -1 ? visibleExercises[selectedExerciseIndex] : undefined,
    [selectedExerciseIndex, visibleExercises]
  );
  
  // Convert string substitutes to Exercise objects if needed
  const alternativeExercises = useMemo(() => {
    if (!selectedExercise?.substitutes) return [];
    
    return selectedExercise.substitutes.map(sub => {
      // If already an Exercise object, return as is
      if (typeof sub === 'object') return sub as Exercise;
      // If it's a string, convert to simple Exercise object
      return { 
        nome: String(sub),
        reps: selectedExercise.reps || '3x10'
      };
    });
  }, [selectedExercise]);
  
  // Get video URL (from exercise property or mapping)
  const videoUrl = useMemo(() => {
    if (!selectedExercise) return '';
    
    // Use the URL from the exercise, if available
    if (selectedExercise.video_url) return selectedExercise.video_url;
    
    // Otherwise, look up in the mapping
    return getExerciseVideoUrl(selectedExercise.nome) || '';
  }, [selectedExercise]);
  
  // Get image URL
  const imageUrl = useMemo(() => {
    if (!selectedExercise) return '';
    return getExerciseImageUrl(selectedExercise.nome || "");
  }, [selectedExercise]);

  return {
    selectedExercise,
    alternativeExercises,
    videoUrl,
    imageUrl
  };
};
