
import { useState } from 'react';
import { Exercise } from '@/types/workout';
import { isPremiumUser, hasSeenPremiumWelcome, markPremiumWelcomeSeen } from '@/utils/userUtils';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';

export const useExerciseModals = () => {
  const [isPremium, setIsPremium] = useState(isPremiumUser());
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(-1);
  const [showPremiumWelcome, setShowPremiumWelcome] = useState(false);
  
  // Check if user is premium and hasn't seen welcome message
  const checkPremiumStatus = () => {
    const premiumStatus = isPremiumUser();
    setIsPremium(premiumStatus);
    
    // Show welcome modal if premium and hasn't seen message
    if (premiumStatus && !hasSeenPremiumWelcome()) {
      setShowPremiumWelcome(true);
    }
  };
  
  const handleOpenVideoModal = (exerciseIndex: number) => {
    setSelectedExerciseIndex(exerciseIndex);
    setIsVideoModalOpen(true);
  };

  const handleOpenReplaceModal = (exerciseIndex: number) => {
    setSelectedExerciseIndex(exerciseIndex);
    setIsReplaceModalOpen(true);
  };

  const handleClosePremiumWelcome = () => {
    setShowPremiumWelcome(false);
    markPremiumWelcomeSeen();
  };
  
  // Helper para obter o URL do vídeo de um exercício
  const getVideoUrl = (exercise: Exercise): string => {
    if (exercise.video_url) return exercise.video_url;
    
    const videoUrl = getExerciseVideoUrl(exercise.nome);
    return videoUrl || '';
  };
  
  return {
    isPremium,
    setIsPremium,
    isVideoModalOpen,
    setIsVideoModalOpen,
    isReplaceModalOpen,
    setIsReplaceModalOpen,
    isAddExerciseModalOpen, 
    setIsAddExerciseModalOpen,
    selectedExerciseIndex,
    setSelectedExerciseIndex,
    showPremiumWelcome,
    setShowPremiumWelcome,
    handleOpenVideoModal,
    handleOpenReplaceModal,
    handleClosePremiumWelcome,
    checkPremiumStatus,
    getVideoUrl
  };
};
