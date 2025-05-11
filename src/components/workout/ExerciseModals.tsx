
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import ExerciseAddModal from '@/components/workout/ExerciseAddModal';
import PremiumWelcomeModal from '@/components/premium/PremiumWelcomeModal';

interface ExerciseModalsProps {
  selectedExerciseIndex: number;
  visibleExercises: Exercise[];
  isPremium: boolean;
  isVideoModalOpen: boolean;
  isReplaceModalOpen: boolean;
  isAddExerciseModalOpen: boolean;
  showPremiumWelcome: boolean;
  onCloseVideoModal: () => void;
  onCloseReplaceModal: () => void;
  onCloseAddExerciseModal: () => void;
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
  showPremiumWelcome,
  onCloseVideoModal,
  onCloseReplaceModal,
  onCloseAddExerciseModal,
  onClosePremiumWelcome,
  onReplaceExercise,
  onAddExercises
}) => {
  return (
    <>
      {/* Exercise Modals */}
      {selectedExerciseIndex !== -1 && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={onCloseVideoModal}
            exerciseName={visibleExercises[selectedExerciseIndex]?.nome || ""}
            videoUrl={visibleExercises[selectedExerciseIndex]?.video_url || ""}
            isPremium={isPremium}
          />

          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={onCloseReplaceModal}
            isPremium={isPremium}
            currentExercise={visibleExercises[selectedExerciseIndex]}
            alternativeExercises={visibleExercises[selectedExerciseIndex]?.substituicoes || []}
            onReplaceExercise={onReplaceExercise}
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
