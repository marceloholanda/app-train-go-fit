
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Exercise } from '@/types/workout';
import { isPremiumUser } from '@/utils/userUtils';
import FreePlanUpgradeCard from '@/components/premium/FreePlanUpgradeCard';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { useExerciseModals } from '@/hooks/useExerciseModals';
import ExerciseHeader from '@/components/workout/ExerciseHeader';
import ExerciseList from '@/components/workout/ExerciseList';
import ExerciseModals from '@/components/workout/ExerciseModals';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Custom hooks for workout data and modals
  const {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    handleExerciseToggle,
    handleToggleWorkout,
    userLevel
  } = useWorkoutData(id);
  
  const {
    isPremium,
    isVideoModalOpen,
    setIsVideoModalOpen,
    isReplaceModalOpen,
    setIsReplaceModalOpen,
    isAddExerciseModalOpen,
    setIsAddExerciseModalOpen,
    selectedExerciseIndex,
    showPremiumWelcome,
    handleOpenVideoModal,
    handleOpenReplaceModal,
    handleClosePremiumWelcome,
    checkPremiumStatus
  } = useExerciseModals();
  
  // Limit the number of exercises based on plan and level
  const [visibleExercises, setVisibleExercises] = useState<Exercise[]>([]);
  
  // Adiciona URLs de vídeo do Vimeo aos exercícios
  useEffect(() => {
    if (exercises.length) {
      const updatedExercises = exercises.map(exercise => {
        // Se já tem video_url, mantém
        if (exercise.video_url) return exercise;
        
        // Busca URL no mapeamento
        const videoUrl = getExerciseVideoUrl(exercise.nome);
        if (videoUrl) {
          return { ...exercise, video_url: videoUrl };
        }
        
        return exercise;
      });
      
      setExercises(updatedExercises);
    }
  }, []);
  
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

  // Revalidate premium status when component mounts
  useEffect(() => {
    // Check initial status
    checkPremiumStatus();
    
    // Set up event listener for storage changes
    const handleStorageChange = () => {
      checkPremiumStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleReplaceExercise = (newExercise: Exercise) => {
    if (selectedExerciseIndex === -1) return;

    // Preservar o URL do vídeo do mapeamento se não for fornecido
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
    
    // Adicionar URLs de vídeo dos exercícios adicionados
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-16">
      {/* Header with workout day and toggle button */}
      <ExerciseHeader
        workoutDay={workoutDay}
        isCompleted={isCompleted}
        handleToggleWorkout={handleToggleWorkout}
      />
      
      {/* Exercise List Section */}
      <section className="p-6">
        <ExerciseList
          visibleExercises={visibleExercises}
          isPremium={isPremium}
          totalExercises={exercises.length}
          handleExerciseToggle={handleExerciseToggle}
          handleOpenVideoModal={handleOpenVideoModal}
          handleOpenReplaceModal={handleOpenReplaceModal}
          handleAddExerciseModal={() => setIsAddExerciseModalOpen(true)}
        />
        
        {/* Upgrade card for free users */}
        {!isPremium && <FreePlanUpgradeCard />}
      </section>

      {/* Modals */}
      <ExerciseModals
        selectedExerciseIndex={selectedExerciseIndex}
        visibleExercises={visibleExercises}
        isPremium={isPremium}
        isVideoModalOpen={isVideoModalOpen}
        isReplaceModalOpen={isReplaceModalOpen}
        isAddExerciseModalOpen={isAddExerciseModalOpen}
        showPremiumWelcome={showPremiumWelcome}
        onCloseVideoModal={() => setIsVideoModalOpen(false)}
        onCloseReplaceModal={() => setIsReplaceModalOpen(false)}
        onCloseAddExerciseModal={() => setIsAddExerciseModalOpen(false)}
        onClosePremiumWelcome={handleClosePremiumWelcome}
        onReplaceExercise={handleReplaceExercise}
        onAddExercises={handleAddExercises}
      />
    </div>
  );
};

export default ExerciseDetail;
