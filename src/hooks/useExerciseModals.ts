
import { useState, useEffect } from 'react';
import { isPremiumUser } from '@/utils/userUtils';

export const useExerciseModals = () => {
  const [isPremium, setIsPremium] = useState(isPremiumUser());
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(-1);
  const [showPremiumWelcome, setShowPremiumWelcome] = useState(false);

  const checkPremiumStatus = () => {
    const premiumStatus = isPremiumUser();
    const wasUpgraded = !isPremium && premiumStatus;
    setIsPremium(premiumStatus);
    
    // Mostrar o modal de boas-vindas para usuários que acabaram de fazer upgrade
    if (wasUpgraded) {
      setShowPremiumWelcome(true);
    }
  };

  const handleOpenVideoModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsVideoModalOpen(true);
  };

  const handleOpenReplaceModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsReplaceModalOpen(true);
  };

  const handleClosePremiumWelcome = () => {
    setShowPremiumWelcome(false);
  };

  return {
    isPremium,
    isVideoModalOpen,
    setIsVideoModalOpen,
    isReplaceModalOpen,
    setIsReplaceModalOpen,
    isAddExerciseModalOpen,
    setIsAddExerciseModalOpen,
    selectedExerciseIndex,
    setSelectedExerciseIndex,
    showPremiumWelcome,
    handleOpenVideoModal,
    handleOpenReplaceModal,
    handleClosePremiumWelcome,
    checkPremiumStatus
  };
};
