
import { useState } from 'react';
import { Exercise } from '@/types/workout';
import { availableExercises } from '@/data/availableExercises';

export const useExerciseSelection = () => {
  const [activeTab, setActiveTab] = useState<string>("Peito");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  // Filtrar exercícios com base na busca
  const getFilteredExercises = () => {
    if (!searchTerm.trim()) {
      return availableExercises[activeTab];
    }
    
    const normalizedSearch = searchTerm.toLowerCase();
    
    // Se estiver na aba de busca, pesquisar em todos os grupos musculares
    if (activeTab === "search") {
      return Object.values(availableExercises)
        .flat()
        .filter(ex => 
          (ex.nome?.toLowerCase() || "").includes(normalizedSearch) ||
          (ex.name?.toLowerCase() || "").includes(normalizedSearch)
        );
    }
    
    // Se estiver em uma aba específica, filtrar apenas nesse grupo muscular
    return availableExercises[activeTab].filter(ex => 
      (ex.nome?.toLowerCase() || "").includes(normalizedSearch) ||
      (ex.name?.toLowerCase() || "").includes(normalizedSearch)
    );
  };

  const toggleExerciseSelection = (exercise: Exercise) => {
    const isSelected = selectedExercises.some(ex => 
      (ex.nome === exercise.nome) || (ex.name === exercise.name)
    );
    
    if (isSelected) {
      setSelectedExercises(selectedExercises.filter(ex => 
        (ex.nome !== exercise.nome) && (ex.name !== exercise.name)
      ));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedExercises,
    setSelectedExercises,
    filteredExercises: getFilteredExercises(),
    toggleExerciseSelection
  };
};

export default useExerciseSelection;
