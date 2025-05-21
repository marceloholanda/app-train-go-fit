
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { formatVideoUrlForEmbed } from '@/utils/workoutUtils/videoMapping';

interface ExerciseVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  videoUrl: string;
  isPremium?: boolean;
}

const ExerciseVideoModal: React.FC<ExerciseVideoModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  videoUrl,
  isPremium = false
}) => {
  const navigate = useNavigate();
  
  // Modal for free users
  if (!isPremium) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recurso Premium</DialogTitle>
            <DialogDescription>
              Este recurso está disponível apenas para usuários Premium. 
              Faça o upgrade para acessar vídeos demonstrativos dos exercícios.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="secondary">Fechar</Button>
            </DialogClose>
            <Button 
              variant="default" 
              onClick={() => navigate('/upgrade')}
            >
              Fazer upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Format the URL for embed correctly
  const displayUrl = videoUrl ? formatVideoUrlForEmbed(videoUrl) : '';
  
  // If no URL, show message
  if (!displayUrl) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Vídeo indisponível</DialogTitle>
            <DialogDescription>
              O vídeo demonstrativo para o exercício "{exerciseName}" ainda não está disponível.
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Modal for premium users with embedded video
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Execução do exercício: {exerciseName}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogHeader>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={displayUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseVideoModal;
