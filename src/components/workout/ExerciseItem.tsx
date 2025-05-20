
import React, { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Play, Replace } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isPremiumUser } from '@/utils/userUtils';
import ExerciseVideoModal from './ExerciseVideoModal';
import ExerciseReplaceModal from './ExerciseReplaceModal';
import { getExerciseImageUrl, handleImageError } from '@/utils/workoutRecommendation/exerciseImages';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  dayId: string;
  onReplaceExercise?: (index: number, newExercise: Exercise) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  index, 
  dayId,
  onReplaceExercise
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [userIsPremium, setUserIsPremium] = useState(false);
  
  useEffect(() => {
    const checkPremiumStatus = async () => {
      const premium = await isPremiumUser();
      setUserIsPremium(premium);
    };
    
    checkPremiumStatus();
  }, []);

  const handleReplaceExercise = (newExercise: Exercise) => {
    if (onReplaceExercise) {
      onReplaceExercise(index, newExercise);
    }
  };

  return (
    <div className="bg-traingo-gray border border-gray-700 rounded-xl p-4 mb-3">
      {/* Imagem do exercício - Usando Supabase */}
      <div className="w-full h-36 mb-3 bg-black/10 rounded-lg overflow-hidden">
        <img 
          src={getExerciseImageUrl(exercise.nome)}
          alt={`Imagem do exercício ${exercise.nome}`}
          className="w-full h-full object-cover" 
          onError={handleImageError}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center h-5">
            <Checkbox id={`${dayId}-ex-${index}`} />
          </div>
          <div>
            <label 
              htmlFor={`${dayId}-ex-${index}`} 
              className="font-medium cursor-pointer"
            >
              {exercise.nome}
            </label>
            <p className="text-sm text-gray-400">{exercise.reps}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão de Vídeo - Premium */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="h-8 w-8 rounded-full"
                >
                  {userIsPremium ? (
                    <Play size={16} />
                  ) : (
                    <Lock size={16} className="text-gray-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {userIsPremium ? "Ver vídeo do exercício" : "Disponível apenas no plano Premium"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Botão Substituir Exercício */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsReplaceModalOpen(true)}
                  className="h-8 w-8 rounded-full"
                >
                  <Replace size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {userIsPremium ? "Substituir exercício" : "Opção Premium: Substituir"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Modal de Vídeo */}
      <ExerciseVideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        exerciseName={exercise.nome}
        videoUrl={exercise.video_url || ""}
        isPremium={userIsPremium}
      />

      {/* Modal de Substituição */}
      <ExerciseReplaceModal
        isOpen={isReplaceModalOpen}
        onClose={() => setIsReplaceModalOpen(false)}
        isPremium={userIsPremium}
        currentExercise={exercise}
        alternativeExercises={exercise.substituicoes || []}
        onReplaceExercise={handleReplaceExercise}
      />
    </div>
  );
};

export default ExerciseItem;
