
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
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  
  // Modal para usuários free
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

  // Se o videoUrl não estiver disponível
  if (!videoUrl) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vídeo não disponível</DialogTitle>
            <DialogDescription>
              O vídeo para este exercício não está disponível no momento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={onClose}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Prepara a URL para incorporação (embed) do Vimeo ou YouTube
  const getEmbedUrl = (url: string): string => {
    if (url.includes('vimeo.com')) {
      // Extrai o ID do Vimeo da URL
      const vimeoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Extrai o ID do YouTube da URL
      let youtubeId = '';
      if (url.includes('youtube.com/watch?v=')) {
        youtubeId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        youtubeId = url.split('youtu.be/')[1].split('?')[0];
      }
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
    
    // Retorna a URL original se não for Vimeo nem YouTube
    return url;
  };
  
  const embedUrl = getEmbedUrl(videoUrl);
  
  // Modal para usuários premium com vídeo incorporado
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5 text-traingo-primary" />
            {exerciseName}
          </DialogTitle>
          <DialogDescription>
            Observe atentamente a execução correta do exercício
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={embedUrl}
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
