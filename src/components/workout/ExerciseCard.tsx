
import React, { useEffect, useState } from 'react';
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
import { getExerciseImageUrl, getExerciseVideoUrl, FALLBACK_IMAGE_URL, checkImageExists } from '@/utils/workoutRecommendation';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isPremium: boolean;
  onToggleComplete: (index: number) => void;
  onOpenVideoModal: (index: number) => void;
  onOpenReplaceModal: (index: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ 
  exercise, 
  index, 
  isPremium, 
  onToggleComplete, 
  onOpenVideoModal, 
  onOpenReplaceModal 
}) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error'>('loading');
  
  // Obter URL da imagem específica
  const imageUrl = exercise.gif_url || getExerciseImageUrl(exercise.nome);
  
  // Verificar se o exercício tem vídeo disponível
  const hasVideo = Boolean(exercise.video_url || getExerciseVideoUrl(exercise.nome));

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

  return (
    <Card 
      key={index} 
      variant="outline" 
      className={`transition-colors ${exercise.completed ? 'border-green-600/30 bg-green-950/10' : ''}`}
    >
      {/* Imagem do exercício com fallback e indicador de loading */}
      <div className="w-full h-32 mb-3 bg-traingo-gray rounded-lg overflow-hidden shadow-md relative">
        {imageStatus === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-traingo-gray">
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
        <div>
          <h3 className="font-medium">{exercise.nome}</h3>
          <p className="text-gray-400 text-sm">{exercise.reps}</p>
          
          {/* Aviso de vídeo premium apenas para usuários free e se houver vídeo disponível */}
          {!isPremium && hasVideo && (
            <p className="text-xs text-yellow-400 mt-2 italic">
              Vídeo de demonstração disponível apenas no plano PRO.
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Botão de Vídeo - Premium e apenas se houver vídeo */}
          {hasVideo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onOpenVideoModal(index)}
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
            onClick={() => onToggleComplete(index)}
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
