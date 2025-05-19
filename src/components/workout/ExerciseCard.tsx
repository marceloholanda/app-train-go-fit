
import React from 'react';
import { CheckCircle, Play, Replace, Lock } from 'lucide-react';
import { Exercise } from '@/types/workout';
import Card from '@/components/Card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { isPremiumUser } from '@/utils/userUtils';
import { getExerciseImageUrl, handleImageError } from '@/utils/workoutRecommendation/exerciseImages';
import { getExerciseVideoUrl } from '@/utils/workoutUtils/videoMapping';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isPremium: boolean;
  onToggleComplete: (index: number) => void;
  onOpenVideoModal: (index: number) => void;
  onOpenReplaceModal: (index: number) => void;
  onOpenImageModal: (index: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  index, 
  isPremium, 
  onToggleComplete, 
  onOpenVideoModal, 
  onOpenReplaceModal,
  onOpenImageModal
}) => {
  // Verificar se há vídeo disponível para este exercício
  const hasVideo = Boolean(exercise.video_url || getExerciseVideoUrl(exercise.nome));
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Evitar abertura do modal se o clique for nos botões de ação
    if (
      e.target instanceof Element && 
      (e.target.closest('button') || e.target.closest('[role="button"]'))
    ) {
      return;
    }
    
    onOpenImageModal(index);
  };
  
  return (
    <Card 
      key={index} 
      variant="outline" 
      className={`transition-colors ${exercise.completed ? 'border-green-600/30 bg-green-950/10' : ''}`}
      onClick={handleCardClick}
    >
      {/* Imagem do exercício - Usando Supabase */}
      <div className="w-full h-36 mb-3 bg-black/10 rounded-lg overflow-hidden shadow-md">
        <img 
          src={getExerciseImageUrl(exercise.nome)}
          alt={`Imagem do exercício ${exercise.nome}`}
          className="w-full h-full object-cover" 
          onError={handleImageError}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{exercise.nome}</h3>
          <p className="text-gray-400 text-sm">{exercise.reps}</p>
          
          {/* Aviso de vídeo premium apenas para usuários free quando há vídeo disponível */}
          {!isPremium && hasVideo && (
            <p className="text-xs text-yellow-400 mt-2 italic">
              Vídeo de demonstração disponível apenas no plano PRO.
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Botão de Vídeo - Premium */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenVideoModal(index)}
                  className="h-8 w-8 rounded-full"
                  disabled={!hasVideo}
                >
                  {isPremium ? (
                    <Play size={16} className={!hasVideo ? "text-gray-400" : ""} />
                  ) : (
                    <Lock size={16} className="text-gray-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {!hasVideo 
                  ? "Vídeo não disponível" 
                  : isPremium 
                    ? "Ver vídeo do exercício" 
                    : "Disponível apenas no plano Premium"
                }
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
                  onClick={() => onOpenReplaceModal(index)}
                  className="h-8 w-8 rounded-full"
                >
                  {isPremium ? <Replace size={16} /> : <Lock size={16} className="text-gray-400" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPremium ? "Substituir exercício" : "Opção Premium: Substituir"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Botão de conclusão do exercício */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(index);
            }}
            className="p-2"
          >
            {exercise.completed ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;
