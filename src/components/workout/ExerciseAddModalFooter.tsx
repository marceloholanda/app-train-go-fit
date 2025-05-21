
import React from 'react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ExerciseAddModalFooterProps {
  selectedCount: number;
  onAddExercises: () => void;
}

const ExerciseAddModalFooter: React.FC<ExerciseAddModalFooterProps> = ({
  selectedCount,
  onAddExercises
}) => {
  return (
    <DialogFooter className="border-t border-gray-700 pt-4">
      <div className="flex w-full items-center justify-between">
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
    </DialogFooter>
  );
};

export default ExerciseAddModalFooter;
