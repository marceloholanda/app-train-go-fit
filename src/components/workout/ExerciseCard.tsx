
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
  return (
    <Card 
      key={index} 
      variant="outline" 
      className={`transition-colors ${exercise.completed ? 'border-green-600/30 bg-green-950/10' : ''}`}
    >
      {/* GIF para todos os usuários */}
      {exercise.gif_url && (
        <div className="w-full h-32 mb-3 bg-black rounded-lg overflow-hidden">
          <img 
            src={exercise.gif_url} 
            alt={exercise.nome}
            className="w-full h-full object-contain" 
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{exercise.nome}</h3>
          <p className="text-gray-400 text-sm">{exercise.reps}</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Botão de Vídeo - Premium */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!isPremium || !exercise.video_url}
                  onClick={() => isPremium && exercise.video_url ? onOpenVideoModal(index) : undefined}
                  className="h-8 w-8 rounded-full"
                >
                  {isPremium ? (
                    <Play size={16} />
                  ) : (
                    <Lock size={16} className="text-gray-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPremium ? "Ver vídeo" : "Disponível no plano Premium"}
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
                  <Replace size={16} />
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
