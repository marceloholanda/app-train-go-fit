
import { useState } from 'react';
import { isPremiumUser } from '@/utils/userUtils';

export const useExerciseModals = () => {
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(-1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [showPremiumWelcome, setShowPremiumWelcome] = useState(false);
  const [isPremium, setIsPremium] = useState(isPremiumUser());

  const checkPremiumStatus = () => {
    const userIsPremium = isPremiumUser();
    setIsPremium(userIsPremium);
  };

  const handleOpenVideoModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsVideoModalOpen(true);
  };

  const handleOpenReplaceModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsReplaceModalOpen(true);
  };
  
  const handleOpenImageModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsImageModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleCloseReplaceModal = () => {
    setIsReplaceModalOpen(false);
  };
  
  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleOpenAddExerciseModal = () => {
    setIsAddExerciseModalOpen(true);
  };

  const handleCloseAddExerciseModal = () => {
    setIsAddExerciseModalOpen(false);
  };

  const handleOpenPremiumWelcome = () => {
    setShowPremiumWelcome(true);
  };

  const handleClosePremiumWelcome = () => {
    setShowPremiumWelcome(false);
  };

  return {
    selectedExerciseIndex,
    isVideoModalOpen,
    isReplaceModalOpen,
    isAddExerciseModalOpen,
    isImageModalOpen,
    showPremiumWelcome,
    isPremium,
    setIsVideoModalOpen,
    setIsReplaceModalOpen,
    setIsAddExerciseModalOpen,
    setIsImageModalOpen,
    checkPremiumStatus,
    handleOpenVideoModal,
    handleOpenReplaceModal,
    handleOpenImageModal,
    handleCloseVideoModal,
    handleCloseReplaceModal,
    handleCloseImageModal,
    handleOpenAddExerciseModal,
    handleCloseAddExerciseModal,
    handleOpenPremiumWelcome,
    handleClosePremiumWelcome
  };
};

export default useExerciseModals;
