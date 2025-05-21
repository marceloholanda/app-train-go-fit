
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import ExerciseAddModal from '@/components/workout/ExerciseAddModal';
import ExerciseImageModal from '@/components/workout/ExerciseImageModal';
import PremiumWelcomeModal from '@/components/premium/PremiumWelcomeModal';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';
import { getExerciseImageUrl } from '@/utils/workoutRecommendation/exerciseImages';

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
  // Função para obter o URL do vídeo (da propriedade do exercício ou do mapeamento)
  const getVideoUrl = (exercise: Exercise | undefined): string => {
    if (!exercise) return '';
    
    // Usar o URL do vídeo do exercício, se disponível
    if (exercise.video_url) return exercise.video_url;
    
    // Caso contrário, procurar no mapeamento
    return getExerciseVideoUrl(exercise.nome) || '';
  };

  const selectedExercise = selectedExerciseIndex !== -1 ? visibleExercises[selectedExerciseIndex] : undefined;

  // Convert string substitutes to Exercise objects if needed
  const alternativeExercises: Exercise[] = selectedExercise?.substitutes 
    ? selectedExercise.substitutes.map(sub => {
        // If already an Exercise object, return as is
        if (typeof sub === 'object') return sub as Exercise;
        // If it's a string, convert to simple Exercise object
        return { 
          nome: String(sub),
          reps: selectedExercise.reps || '3x10'
        };
      })
    : [];

  return (
    <>
      {/* Exercise Modals */}
      {selectedExerciseIndex !== -1 && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={onCloseVideoModal}
            exerciseName={selectedExercise?.nome || ""}
            videoUrl={getVideoUrl(selectedExercise)}
            isPremium={isPremium}
          />

          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={onCloseReplaceModal}
            isPremium={isPremium}
            currentExercise={selectedExercise!}
            alternativeExercises={alternativeExercises}
            onReplaceExercise={onReplaceExercise}
          />
          
          <ExerciseImageModal
            isOpen={isImageModalOpen}
            onClose={onCloseImageModal}
            exerciseName={selectedExercise?.nome || ""}
            imageUrl={getExerciseImageUrl(selectedExercise?.nome || "")}
            description={selectedExercise?.instructions}
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
