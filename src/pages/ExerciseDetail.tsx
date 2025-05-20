
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { trackExerciseCompletion } from '@/utils/workoutUtils';
import { isPremiumUser } from '@/utils/userUtils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ExerciseCard from '@/components/workout/ExerciseCard';
import ExerciseImageModal from '@/components/workout/ExerciseImageModal';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { useExerciseMedia } from '@/hooks/useExerciseMedia';

const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    loading, 
    exercises, 
    exercisesState, 
    setExercisesState, 
    dayName, 
    dayIndex, 
    error 
  } = useWorkoutData(id || 0);
  
  const { getImageUrl } = useExerciseMedia();
  const [userIsPremium, setUserIsPremium] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number | null>(null);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  
  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleToggleExercise = async (index: number) => {
    const newExercisesState = [...exercisesState];
    newExercisesState[index] = !newExercisesState[index];
    setExercisesState(newExercisesState);
    
    try {
      await trackExerciseCompletion(
        dayIndex, 
        index, 
        newExercisesState[index]
      );
      
      // Update local state
      const allCompleted = newExercisesState.every(state => state);
      setAllExercisesCompleted(allCompleted);
      
      // Show toast notification
      if (newExercisesState[index]) {
        toast("Exercício concluído!", {
          description: "Continue assim! Seu progresso foi atualizado."
        });
      } else {
        toast("Exercício desmarcado", {
          description: "O exercício foi marcado como pendente."
        });
      }
    } catch (error) {
      console.error("Error tracking exercise completion:", error);
      // Restore previous state on error
      const revertedState = [...exercisesState];
      setExercisesState(revertedState);
      
      toast("Erro", {
        description: "Não foi possível atualizar o status do exercício."
      });
    }
  };

  const handleOpenImageModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsImageModalOpen(true);
  };

  const handleOpenVideoModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsVideoModalOpen(true);
  };

  const handleOpenReplaceModal = (index: number) => {
    setSelectedExerciseIndex(index);
    setIsReplaceModalOpen(true);
  };

  const handleReplaceExercise = (index: number, newExercise: any) => {
    // Implementar lógica para substituir o exercício
    console.log(`Substituir exercício ${index} por`, newExercise);
    setIsReplaceModalOpen(false);
  };
  
  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const premium = await isPremiumUser();
        setUserIsPremium(premium);
      } catch (error) {
        console.error("Error checking premium status:", error);
        setUserIsPremium(false);
      }
    };
    
    checkPremiumStatus();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={handleGoBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <h1 className="text-2xl font-bold mb-4">{dayName}</h1>

      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={{ ...exercise, completed: exercisesState[index] }}
          index={index}
          isPremium={userIsPremium}
          onToggleComplete={handleToggleExercise}
          onOpenVideoModal={handleOpenVideoModal}
          onOpenReplaceModal={handleOpenReplaceModal}
          onOpenImageModal={handleOpenImageModal}
        />
      ))}

      {/* Modais */}
      {selectedExerciseIndex !== null && (
        <>
          {/* Modal de Imagem */}
          <ExerciseImageModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            exerciseName={exercises[selectedExerciseIndex]?.nome || ""}
            imageUrl={getImageUrl(exercises[selectedExerciseIndex])}
            description={exercises[selectedExerciseIndex]?.descricao}
          />

          {/* Modal de Vídeo */}
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            exerciseName={exercises[selectedExerciseIndex]?.nome || ""}
            videoUrl={exercises[selectedExerciseIndex]?.video_url || ""}
            isPremium={userIsPremium}
          />

          {/* Modal de Substituição */}
          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={() => setIsReplaceModalOpen(false)}
            isPremium={userIsPremium}
            currentExercise={exercises[selectedExerciseIndex]}
            alternativeExercises={exercises[selectedExerciseIndex]?.substituicoes || []}
            onReplaceExercise={(newExercise) => {
              if (selectedExerciseIndex !== null) {
                handleReplaceExercise(selectedExerciseIndex, newExercise);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default ExerciseDetail;
