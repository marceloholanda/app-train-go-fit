
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import ExerciseAddModal from '@/components/workout/ExerciseAddModal';
import PremiumWelcomeModal from '@/components/premium/PremiumWelcomeModal';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';

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
  // Função para obter o URL do vídeo (da propriedade do exercício ou do mapeamento)
  const getVideoUrl = (exercise: Exercise | undefined): string => {
    if (!exercise) return '';
    
    // Usar o URL do vídeo do exercício, se disponível
    if (exercise.video_url) return exercise.video_url;
    
    // Caso contrário, procurar no mapeamento
    return getExerciseVideoUrl(exercise.nome) || '';
  };

  return (
    <>
      {/* Exercise Modals */}
      {selectedExerciseIndex !== -1 && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={onCloseVideoModal}
            exerciseName={visibleExercises[selectedExerciseIndex]?.nome || ""}
            videoUrl={getVideoUrl(visibleExercises[selectedExerciseIndex])}
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
