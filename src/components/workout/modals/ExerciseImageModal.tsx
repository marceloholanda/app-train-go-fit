
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { handleImageError } from '@/utils/workoutRecommendation/exerciseImages';

interface ExerciseImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  imageUrl: string;
  description?: string;
}

const ExerciseImageModal: React.FC<ExerciseImageModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  imageUrl,
  description
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    console.log('[TrainGO] Exercise image loaded successfully for:', exerciseName);
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageErrorWithState = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('[TrainGO] Error loading exercise image for:', exerciseName, imageUrl);
    setIsLoading(false);
    setHasError(true);
    handleImageError(e);
  };

  // Reset states when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, imageUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{exerciseName}</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <div className="relative w-full overflow-hidden rounded-md bg-black/10 min-h-[200px] flex items-center justify-center">
            {isLoading && !hasError && (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
                <span className="ml-2 text-sm text-gray-400">Carregando imagem...</span>
              </div>
            )}
            
            {hasError && (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl mb-2">🏋️</span>
                <span className="text-sm text-gray-400">Imagem não disponível</span>
              </div>
            )}
            
            <img 
              src={imageUrl}
              alt={`Demonstração do exercício ${exerciseName}`}
              className={`w-full h-auto max-h-[60vh] object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
              onLoad={handleImageLoad}
              onError={handleImageErrorWithState}
              style={{ display: hasError ? 'none' : 'block' }}
            />
          </div>
          
          {description && (
            <p className="text-sm text-gray-300 mt-2">{description}</p>
          )}
          
          <div className="flex justify-end">
            <Button onClick={onClose}>Fechar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseImageModal;
