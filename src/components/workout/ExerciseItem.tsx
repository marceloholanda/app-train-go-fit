
import React, { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, Play, Replace } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isPremiumUser } from '@/utils/userUtils';
import ExerciseVideoModal from './ExerciseVideoModal';
import ExerciseReplaceModal from './ExerciseReplaceModal';
import { getExerciseImageUrl, getExerciseVideoUrl, FALLBACK_IMAGE_URL, checkImageExists } from '@/utils/workoutRecommendation';
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
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const isPremium = isPremiumUser();

  // Obter URL da imagem específica
  const imageUrl = exercise.gif_url || getExerciseImageUrl(exercise.nome);
  
  // Verificar se o exercício tem vídeo disponível
  const videoUrl = exercise.video_url || getExerciseVideoUrl(exercise.nome);
  const hasVideo = Boolean(videoUrl);

  // Debug: verificar disponibilidade da imagem
  useEffect(() => {
    const debugImage = async () => {
      if (imageUrl) {
        console.log(`Verificando imagem para ${exercise.nome}:`, imageUrl);
        const exists = await checkImageExists(imageUrl);
        console.log(`Imagem ${imageUrl} ${exists ? 'existe' : 'NÃO existe'}`);
      }
    };
    
    debugImage();
  }, [imageUrl, exercise.nome]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Erro ao carregar imagem: ${imageUrl}`);
    setImageStatus('error');
    e.currentTarget.src = FALLBACK_IMAGE_URL;
    e.currentTarget.alt = 'Imagem não encontrada';
  };

  const handleImageLoad = () => {
    console.log(`Imagem carregada com sucesso: ${imageUrl}`);
    setImageStatus('success');
  };

  const handleReplaceExercise = (newExercise: Exercise) => {
    if (onReplaceExercise) {
      onReplaceExercise(index, newExercise);
    }
  };

  return (
    <div className="bg-traingo-gray border border-gray-700 rounded-xl p-4 mb-3">
      {/* Imagem do exercício com fallback - Agora mais responsiva e com loading */}
      <div className="w-full h-32 mb-3 bg-black rounded-lg overflow-hidden relative">
        {imageStatus === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-6 h-6 border-2 border-traingo-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img 
          src={imageUrl} 
          alt={`Imagem do exercício ${exercise.nome}`}
          className={`w-full h-full object-contain ${imageStatus === 'loading' ? 'opacity-0' : 'opacity-100'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="lazy"
          data-exercise-name={exercise.nome}
        />
      </div>

      {/* Debug: mostrar status da imagem */}
      <div className="text-xs mb-2">
        {imageStatus === 'error' && (
          <p className="text-red-500">⚠️ Imagem não encontrada</p>
        )}
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
            
            {/* Aviso de vídeo premium apenas para usuários free e se houver vídeo disponível */}
            {!isPremium && hasVideo && (
              <p className="text-xs text-yellow-400 mt-1 italic">
                Vídeo disponível no plano PRO
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão de Vídeo - Premium e apenas se houver vídeo */}
          {hasVideo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="h-8 w-8 rounded-full"
                  >
                    {isPremium ? (
                      <Play size={16} className="text-traingo-primary" />
                    ) : (
                      <Lock size={16} className="text-gray-400" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPremium ? "Ver vídeo do exercício" : "Disponível apenas no plano Premium"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

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
                {isPremium ? "Substituir exercício" : "Opção Premium: Substituir"}
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
        videoUrl={videoUrl || ""}
        isPremium={isPremium}
      />

      {/* Modal de Substituição */}
      <ExerciseReplaceModal
        isOpen={isReplaceModalOpen}
        onClose={() => setIsReplaceModalOpen(false)}
        isPremium={isPremium}
        currentExercise={exercise}
        alternativeExercises={exercise.substituicoes || []}
        onReplaceExercise={handleReplaceExercise}
      />
    </div>
  );
};

export default ExerciseItem;
