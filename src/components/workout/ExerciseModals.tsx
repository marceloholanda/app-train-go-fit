
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseVideoModal from '@/components/workout/modals/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/modals/ExerciseReplaceModal';
import ExerciseAddModal from '@/components/workout/modals/ExerciseAddModal';
import ExerciseImageModal from '@/components/workout/modals/ExerciseImageModal';
import PremiumWelcomeModal from '@/components/premium/PremiumWelcomeModal';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';
import { getExerciseImageUrl } from '@/utils/workoutRecommendation/exerciseImages';
import { useExerciseModalProps } from '@/hooks/useExerciseModalProps';

interface ExerciseModalsProps {
  selectedExerciseIndex: number;
  visibleExercises: Exercise[];
  isPremium: boolean;
  isVideoModalOpen: boolean;
  isReplaceModalOpen: boolean;
  isAddExerciseModalOpen: boolean;
  isImageModalOpen: boolean;
  showPremiumWelcome: boolean;
  onCloseVideoModal: () => void;
  onCloseReplaceModal: () => void;
  onCloseAddExerciseModal: () => void;
  onCloseImageModal: () => void;
  onClosePremiumWelcome: () => void;
  onReplaceExercise: (newExercise: Exercise) => void;
  onAddExercises: (newExercises: Exercise[]) => void;
}

const ExerciseModals: React.FC<ExerciseModalsProps> = ({
  selectedExerciseIndex,
  visibleExercises,
  isPremium,
  isVideoModalOpen,
  isReplaceModalOpen,
  isAddExerciseModalOpen,
  isImageModalOpen,
  showPremiumWelcome,
  onCloseVideoModal,
  onCloseReplaceModal,
  onCloseAddExerciseModal,
  onCloseImageModal,
  onClosePremiumWelcome,
  onReplaceExercise,
  onAddExercises
}) => {
  const { selectedExercise, alternativeExercises, videoUrl, imageUrl } = 
    useExerciseModalProps(selectedExerciseIndex, visibleExercises);

  // Log modal state for debugging
  React.useEffect(() => {
    if (isImageModalOpen) {
      console.log('[TrainGO] Image modal opened for exercise:', selectedExercise?.nome || 'unknown');
      console.log('[TrainGO] Exercise data:', selectedExercise);
      console.log('[TrainGO] Image URL:', imageUrl);
    }
  }, [isImageModalOpen, selectedExercise, imageUrl]);

  React.useEffect(() => {
    if (isVideoModalOpen) {
      console.log('[TrainGO] Video modal opened for exercise:', selectedExercise?.nome || 'unknown');
      console.log('[TrainGO] Video URL:', videoUrl);
    }
  }, [isVideoModalOpen, selectedExercise, videoUrl]);

  return (
    <>
      {/* Exercise Modals */}
      {selectedExerciseIndex !== -1 && selectedExercise && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={onCloseVideoModal}
            exerciseName={selectedExercise.nome || "Exercício"}
            videoUrl={videoUrl}
            isPremium={isPremium}
          />

          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={onCloseReplaceModal}
            isPremium={isPremium}
            currentExercise={selectedExercise}
            alternativeExercises={alternativeExercises}
            onReplaceExercise={onReplaceExercise}
          />
          
          <ExerciseImageModal
            isOpen={isImageModalOpen}
            onClose={onCloseImageModal}
            exerciseName={selectedExercise.nome || "Exercício"}
            imageUrl={imageUrl}
            description={selectedExercise.instructions}
          />
        </>
      )}
      
      {/* Add Exercise Modal */}
      <ExerciseAddModal
        isOpen={isAddExerciseModalOpen}
        onClose={onCloseAddExerciseModal}
        isPremium={isPremium}
        onAddExercises={onAddExercises}
      />
      
      {/* Premium Welcome Modal */}
      <PremiumWelcomeModal
        isOpen={showPremiumWelcome}
        onClose={onClosePremiumWelcome}
      />
    </>
  );
};

export default ExerciseModals;
