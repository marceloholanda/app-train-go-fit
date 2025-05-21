
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Exercise } from '@/types/workout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PremiumRestrictionContent from './PremiumRestrictionContent';
import ExerciseSearchBar from '@/components/workout/ExerciseSearchBar';
import ExerciseSelectList from '@/components/workout/ExerciseSelectList';
import ExerciseAddModalFooter from './ExerciseAddModalFooter';
import useExerciseSelection from '@/hooks/useExerciseSelection';
import { muscleGroups } from '@/data/availableExercises';

interface ExerciseAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onAddExercises: (exercises: Exercise[]) => void;
}

const ExerciseAddModal: React.FC<ExerciseAddModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  onAddExercises
}) => {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedExercises,
    toggleExerciseSelection,
    getFilteredExercises,
    clearSelections
  } = useExerciseSelection();
  
  // Handle premium restriction
  if (!isPremium) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <PremiumRestrictionContent />
      </Dialog>
    );
  }
  
  const filteredExercises = getFilteredExercises();
  
  const handleAddSelectedExercises = () => {
    onAddExercises(selectedExercises);
    clearSelections();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Adicionar exercícios</DialogTitle>
          <DialogDescription>
            Selecione os exercícios que deseja adicionar ao seu treino.
          </DialogDescription>
        </DialogHeader>
        
        <ExerciseSearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <Tabs defaultValue="Peito" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            {muscleGroups.map(group => (
              <TabsTrigger key={group} value={group}>{group}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <ExerciseSelectList
          exercises={filteredExercises}
          selectedExercises={selectedExercises}
          toggleExerciseSelection={toggleExerciseSelection}
        />
        
        <ExerciseAddModalFooter
          selectedCount={selectedExercises.length}
          onAddExercises={handleAddSelectedExercises}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseAddModal;
