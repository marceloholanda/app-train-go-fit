
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

interface ExerciseModalFooterProps {
  selectedCount: number;
  onAddExercises: () => void;
}

const ExerciseModalFooter: React.FC<ExerciseModalFooterProps> = ({
  selectedCount,
  onAddExercises
}) => {
  return (
    <div className="flex w-full items-center justify-between border-t border-gray-700 pt-4">
      <div className="text-sm">
        {selectedCount} exercício(s) selecionado(s)
      </div>
      <div className="space-x-2">
        <DialogClose asChild>
          <Button variant="secondary">Cancelar</Button>
        </DialogClose>
        <Button 
          onClick={onAddExercises}
          disabled={selectedCount === 0}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default ExerciseModalFooter;
