import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';

interface ExerciseVideoHandlerProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const ExerciseVideoHandler: React.FC<ExerciseVideoHandlerProps> = ({
  exercises,
  setExercises
}) => {
  // Add video URLs to exercises
  useEffect(() => {
    if (exercises.length) {
      const updatedExercises = exercises.map(exercise => {
        // Keep existing video_url if present
        if (exercise.video_url) return exercise;
        
        // Look up URL in mapping
        const videoUrl = getExerciseVideoUrl(exercise.nome);
        if (videoUrl) {
          return { ...exercise, video_url: videoUrl };
        }
        
        return exercise;
      });
      
      setExercises(updatedExercises);
    }
  }, []);

  return null; // This is a utility component with no UI
};

export default ExerciseVideoHandler;
