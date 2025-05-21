
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';

export const useVisibleExercises = (
  exercises: Exercise[],
  isPremium: boolean,
  userLevel: string
) => {
  const [visibleExercises, setVisibleExercises] = useState<Exercise[]>([]);
  
  useEffect(() => {
    if (exercises.length) {
      let limit = 4; // Default limit for Free plan
      
      if (isPremium) {
        // Limits for premium users based on level
        switch(userLevel) {
          case 'beginner':
            limit = 6;
            break;
          case 'intermediate':
            limit = 7;
            break;
          case 'advanced':
            limit = 8;
            break;
          default:
            limit = 6;
        }
      }
      
      // Apply limitation
      setVisibleExercises(exercises.slice(0, limit));
    }
  }, [exercises, isPremium, userLevel]);

  return { visibleExercises };
};
