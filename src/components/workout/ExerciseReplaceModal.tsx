
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Exercise } from '@/types/workout';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ExerciseReplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  currentExercise: Exercise;
  alternativeExercises?: Exercise[];
  onReplaceExercise?: (newExercise: Exercise) => void;
}

const ExerciseReplaceModal: React.FC<ExerciseReplaceModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  currentExercise,
  alternativeExercises = [],
  onReplaceExercise
}) => {
  const navigate = useNavigate();

  if (!isPremium) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recurso Premium</DialogTitle>
            <DialogDescription>
              Este recurso está disponível apenas para usuários Premium. 
              Faça o upgrade para personalizar ainda mais seus treinos.
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Substituir exercício</DialogTitle>
          <DialogDescription>
            Escolha uma alternativa para {currentExercise.nome}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {alternativeExercises.length > 0 ? (
            alternativeExercises.map((exercise, index) => (
              <Card 
                key={index} 
                variant="outline" 
                className="cursor-pointer hover:bg-gray-800"
                onClick={() => {
                  onReplaceExercise?.(exercise);
                  onClose();
                }}
              >
                <div className="flex items-center gap-4">
                  {exercise.gif_url && (
                    <div className="w-16 h-16 flex-shrink-0 bg-black rounded overflow-hidden">
                      <img 
                        src={exercise.gif_url} 
                        alt={exercise.nome} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">{exercise.nome}</h4>
                    <p className="text-sm text-gray-400">{exercise.reps}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              Nenhuma alternativa disponível para este exercício.
            </div>
          )}
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseReplaceModal;
