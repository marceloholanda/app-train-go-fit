
import { useState, useCallback } from 'react';
import { Exercise } from '@/types/workout';
import { availableExercises } from '@/data/availableExercises';

export const useExerciseSelection = () => {
  const [activeTab, setActiveTab] = useState<string>("Peito");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const toggleExerciseSelection = useCallback((exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.some(ex => ex.nome === exercise.nome);
      if (isSelected) {
        return prev.filter(ex => ex.nome !== exercise.nome);
      } else {
        return [...prev, exercise];
      }
    });
  }, []);
  
  const getFilteredExercises = useCallback(() => {
    if (!searchTerm.trim()) {
      return availableExercises[activeTab];
    }
    
    const normalizedSearch = searchTerm.toLowerCase();
    
    // Se estiver na aba de busca, pesquisar em todos os grupos musculares
    if (activeTab === "search") {
      return Object.values(availableExercises)
        .flat()
        .filter(ex => 
          ex.nome.toLowerCase().includes(normalizedSearch)
        );
    }
    
    // Se estiver em uma aba específica, filtrar apenas nesse grupo muscular
    return availableExercises[activeTab].filter(ex => 
      ex.nome.toLowerCase().includes(normalizedSearch)
    );
  }, [activeTab, searchTerm]);
  
  const clearSelections = useCallback(() => {
    setSelectedExercises([]);
  }, []);

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    selectedExercises,
    setSelectedExercises,
    toggleExerciseSelection,
    getFilteredExercises,
    clearSelections
  };
};

export default useExerciseSelection;
