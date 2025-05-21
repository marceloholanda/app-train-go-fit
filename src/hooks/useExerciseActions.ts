
import { Exercise } from '@/types/workout';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';

export const useExerciseActions = (
  exercises: Exercise[],
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>,
  id?: string
) => {
  const handleReplaceExercise = (newExercise: Exercise, selectedExerciseIndex: number) => {
    if (selectedExerciseIndex === -1) return;

    // Preserve video URL from mapping if not provided
    if (!newExercise.video_url) {
      const videoUrl = getExerciseVideoUrl(newExercise.nome);
      if (videoUrl) {
        newExercise.video_url = videoUrl;
      }
    }

    const updatedExercises = [...exercises];
    updatedExercises[selectedExerciseIndex] = {
      ...newExercise,
      completed: updatedExercises[selectedExerciseIndex].completed
    };
    
    setExercises(updatedExercises);
    
    // Save exercises state
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData && id) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar exercício substituído:', error);
    }
  };

  const handleAddExercises = (newExercises: Exercise[]) => {
    if (!newExercises.length) return;
    
    // Add video URLs to new exercises
    const exercisesWithVideos = newExercises.map(ex => {
      const videoUrl = getExerciseVideoUrl(ex.nome);
      return {
        ...ex,
        completed: false,
        video_url: videoUrl || ex.video_url
      };
    });
    
    const updatedExercises = [...exercises, ...exercisesWithVideos];
    setExercises(updatedExercises);
    
    // Save exercises state
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData && id) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao adicionar exercícios:', error);
    }
  };
  
  return {
    handleReplaceExercise,
    handleAddExercises
  };
};
