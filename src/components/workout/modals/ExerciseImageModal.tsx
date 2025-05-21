
import React from 'react';
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
          <div className="relative w-full overflow-hidden rounded-md bg-black/10">
            <img 
              src={imageUrl}
              alt={`Demonstração do exercício ${exerciseName}`}
              className="w-full h-auto max-h-[60vh] object-contain"
              onError={handleImageError}
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
