
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import ExerciseAddModal from '@/components/workout/ExerciseAddModal';
import ExerciseImageModal from '@/components/workout/ExerciseImageModal';
import PremiumWelcomeModal from '@/components/premium/PremiumWelcomeModal';
import useExerciseMedia from '@/hooks/useExerciseMedia';

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
  const { getVideoUrl, getImageUrl } = useExerciseMedia();
  const selectedExercise = selectedExerciseIndex !== -1 ? visibleExercises[selectedExerciseIndex] : undefined;

  return (
    <>
      {/* Render exercise-specific modals only when an exercise is selected */}
      {selectedExerciseIndex !== -1 && selectedExercise && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={onCloseVideoModal}
            exerciseName={selectedExercise.nome || selectedExercise.name}
            videoUrl={getVideoUrl(selectedExercise)}
            isPremium={isPremium}
          />

          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={onCloseReplaceModal}
            isPremium={isPremium}
            currentExercise={selectedExercise}
            alternativeExercises={selectedExercise.substituicoes || []}
            onReplaceExercise={onReplaceExercise}
          />
          
          <ExerciseImageModal
            isOpen={isImageModalOpen}
            onClose={onCloseImageModal}
            exerciseName={selectedExercise.nome || selectedExercise.name}
            imageUrl={getImageUrl(selectedExercise)}
            description={selectedExercise.descricao || selectedExercise.description}
          />
        </>
      )}
      
      {/* Add Exercise Modal (not dependent on selected exercise) */}
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
