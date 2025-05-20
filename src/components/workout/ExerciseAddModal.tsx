
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
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExerciseSearch from './ExerciseSearch';
import ExerciseSelectionList from './ExerciseSelectionList';
import ExerciseModalFooter from './ExerciseModalFooter';
import useExerciseSelection from '@/hooks/useExerciseSelection';

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
  const navigate = useNavigate();
  
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedExercises,
    filteredExercises,
    toggleExerciseSelection
  } = useExerciseSelection();
  
  // Handle non-premium users
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
  
  const handleAddSelectedExercises = () => {
    onAddExercises(selectedExercises);
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
        
        <ExerciseSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        
        <Tabs defaultValue="Peito" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="Peito">Peito</TabsTrigger>
            <TabsTrigger value="Costas">Costas</TabsTrigger>
            <TabsTrigger value="Pernas">Pernas</TabsTrigger>
            <TabsTrigger value="Ombros">Ombros</TabsTrigger>
            <TabsTrigger value="Braços">Braços</TabsTrigger>
            <TabsTrigger value="Abdômen">Abdômen</TabsTrigger>
          </TabsList>
        </Tabs>
          
        <ExerciseSelectionList
          exercises={filteredExercises}
          selectedExercises={selectedExercises}
          onToggleSelection={toggleExerciseSelection}
        />
        
        <DialogFooter className="border-t border-gray-700 pt-4">
          <ExerciseModalFooter
            selectedCount={selectedExercises.length}
            onAddExercises={handleAddSelectedExercises}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseAddModal;
