import { useMemo } from 'react';
import { Exercise } from '@/types/workout';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';
import { getExerciseImageUrl } from '@/utils/workoutRecommendation/exerciseImages';

export const useExerciseModalProps = (
  selectedExerciseIndex: number,
  visibleExercises: Exercise[]
) => {
  // Get the selected exercise
  const selectedExercise = useMemo(() => {
    if (selectedExerciseIndex === -1 || !visibleExercises[selectedExerciseIndex]) {
      console.log('[TrainGO] No exercise selected or invalid index:', selectedExerciseIndex);
      return undefined;
    }
    const exercise = visibleExercises[selectedExerciseIndex];
    console.log('[TrainGO] Selected exercise:', exercise.nome);
    return exercise;
  }, [selectedExerciseIndex, visibleExercises]);
  
  // Convert string substitutes to Exercise objects if needed
  const alternativeExercises = useMemo(() => {
    if (!selectedExercise?.substitutes) {
      console.log('[TrainGO] No substitutes available for exercise');
      return [];
    }
    
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
    if (!selectedExercise) {
      console.log('[TrainGO] No exercise selected for video URL');
      return '';
    }
    
    // Use the URL from the exercise, if available
    if (selectedExercise.video_url) {
      console.log('[TrainGO] Using exercise video URL:', selectedExercise.video_url);
      return selectedExercise.video_url;
    }
    
    // Otherwise, look up in the mapping
    const mappedUrl = getExerciseVideoUrl(selectedExercise.nome) || '';
    console.log('[TrainGO] Using mapped video URL for', selectedExercise.nome, ':', mappedUrl);
    return mappedUrl;
  }, [selectedExercise]);
  
  // Get image URL
  const imageUrl = useMemo(() => {
    if (!selectedExercise) {
      console.log('[TrainGO] No exercise selected for image URL');
      return '';
    }
    const imgUrl = getExerciseImageUrl(selectedExercise.nome || "");
    console.log('[TrainGO] Exercise image URL for', selectedExercise.nome, ':', imgUrl);
    return imgUrl;
  }, [selectedExercise]);

  return {
    selectedExercise,
    alternativeExercises,
    videoUrl,
    imageUrl
  };
};
