
import { useState, useCallback } from 'react';
import { Exercise } from '@/types/workout';
import { availableExercises } from '@/data/availableExercises';
import { standardizeExercise } from '@/utils/exerciseFormatter';

export const useExerciseSelection = () => {
  const [activeTab, setActiveTab] = useState<string>("Peito");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  // Filtrar exercícios com base na busca
  const getFilteredExercises = useCallback(() => {
    if (!searchTerm.trim()) {
      return availableExercises[activeTab].map(standardizeExercise);
    }
    
    const normalizedSearch = searchTerm.toLowerCase();
    
    // Se estiver na aba de busca, pesquisar em todos os grupos musculares
    if (activeTab === "search") {
      return Object.values(availableExercises)
        .flat()
        .filter(ex => 
          (ex.nome?.toLowerCase() || "").includes(normalizedSearch) ||
          (ex.name?.toLowerCase() || "").includes(normalizedSearch)
        )
        .map(standardizeExercise);
    }
    
    // Se estiver em uma aba específica, filtrar apenas nesse grupo muscular
    return availableExercises[activeTab]
      .filter(ex => 
        (ex.nome?.toLowerCase() || "").includes(normalizedSearch) ||
        (ex.name?.toLowerCase() || "").includes(normalizedSearch)
      )
      .map(standardizeExercise);
  }, [searchTerm, activeTab]);

  const toggleExerciseSelection = useCallback((exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.some(ex => 
        (ex.nome === exercise.nome) || (ex.name === exercise.name)
      );
      
      if (isSelected) {
        return prev.filter(ex => 
          (ex.nome !== exercise.nome) && (ex.name !== exercise.name)
        );
      } else {
        return [...prev, standardizeExercise(exercise)];
      }
    });
  }, []);

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
