
import React from 'react';
import { Exercise } from '@/types/workout';
import ExerciseCard from '@/components/workout/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ExerciseListProps {
  visibleExercises: Exercise[];
  isPremium: boolean;
  totalExercises: number;
  handleExerciseToggle: (index: number) => void;
  handleOpenVideoModal: (index: number) => void;
  handleOpenReplaceModal: (index: number) => void;
  handleOpenImageModal: (index: number) => void;
  handleAddExerciseModal: () => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  visibleExercises,
  isPremium,
  totalExercises,
  handleExerciseToggle,
  handleOpenVideoModal,
  handleOpenReplaceModal,
  handleOpenImageModal,
  handleAddExerciseModal
}) => {
  return (
    <div className="space-y-4">
      {/* Exercise Cards */}
      {visibleExercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          exercise={exercise}
          index={index}
          isPremium={isPremium}
          onToggleComplete={handleExerciseToggle}
          onOpenVideoModal={handleOpenVideoModal}
          onOpenReplaceModal={handleOpenReplaceModal}
          onOpenImageModal={handleOpenImageModal}
        />
      ))}
      
      {/* Message when there are limited exercises for free users */}
      {!isPremium && totalExercises > visibleExercises.length && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
          <p className="text-sm text-yellow-400 text-center">
            🔒 O plano gratuito exibe apenas {visibleExercises.length} exercícios. 
            Faça upgrade para o plano PRO para acessar todos os {totalExercises} exercícios.
          </p>
        </div>
      )}
      
      {/* Add Exercise Button - Premium Only */}
      {isPremium && (
        <div className="mt-6">
          <Button
            onClick={handleAddExerciseModal}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
          >
            <Plus size={20} />
            Adicionar novo exercício
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseList;
