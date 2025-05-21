
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { isPremiumUser } from '@/utils/userUtils';
import FreePlanUpgradeCard from '@/components/premium/FreePlanUpgradeCard';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { useExerciseModals } from '@/hooks/useExerciseModals';
import { useExerciseActions } from '@/hooks/useExerciseActions';
import { useVisibleExercises } from '@/hooks/useVisibleExercises';
import ExerciseDetailLoading from '@/components/workout/ExerciseDetailLoading';
import ExerciseVideoHandler from '@/components/workout/ExerciseVideoHandler';
import ExerciseHeader from '@/components/workout/ExerciseHeader';
import ExerciseList from '@/components/workout/ExerciseList';
import ExerciseModals from '@/components/workout/ExerciseModals';

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
    selectedExerciseIndex,
    isVideoModalOpen,
    isReplaceModalOpen,
    isAddExerciseModalOpen,
    isImageModalOpen,
    showPremiumWelcome,
    isPremium,
    handleOpenVideoModal,
    handleOpenReplaceModal,
    handleOpenImageModal,
    handleCloseVideoModal,
    handleCloseReplaceModal,
    handleCloseImageModal,
    handleOpenAddExerciseModal,
    handleCloseAddExerciseModal,
    handleClosePremiumWelcome,
    checkPremiumStatus
  } = useExerciseModals();

  // Hook for handling visible exercises based on plan
  const { visibleExercises } = useVisibleExercises(exercises, isPremium, userLevel);
  
  // Hook for exercise actions (replace, add)
  const { handleReplaceExercise, handleAddExercises } = useExerciseActions(exercises, setExercises, id);

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

  if (isLoading) {
    return <ExerciseDetailLoading />;
  }
  
  return (
    <div className="min-h-screen pb-16">
      {/* Video URL handler (no UI) */}
      <ExerciseVideoHandler exercises={exercises} setExercises={setExercises} />
      
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
          handleOpenImageModal={handleOpenImageModal}
          handleAddExerciseModal={handleOpenAddExerciseModal}
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
        isImageModalOpen={isImageModalOpen}
        showPremiumWelcome={showPremiumWelcome}
        onCloseVideoModal={handleCloseVideoModal}
        onCloseReplaceModal={handleCloseReplaceModal}
        onCloseAddExerciseModal={handleCloseAddExerciseModal}
        onCloseImageModal={handleCloseImageModal}
        onClosePremiumWelcome={handleClosePremiumWelcome}
        onReplaceExercise={(newExercise) => handleReplaceExercise(newExercise, selectedExerciseIndex)}
        onAddExercises={handleAddExercises}
      />
    </div>
  );
};

export default ExerciseDetail;
