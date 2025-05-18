
import { Exercise } from '@/types/workout';

/**
 * Gera um nome para o treino baseado nos exercícios
 */
export const generateWorkoutName = (dayNumber: number, exercises: Exercise[]): string => {
  // Determina o tipo de treino com base nos exercícios
  const muscleGroups: {[key: string]: number} = {};
  
  exercises.forEach(ex => {
    const muscleGroup = ex.muscleGroup?.toLowerCase() || 'geral';
    muscleGroups[muscleGroup] = (muscleGroups[muscleGroup] || 0) + 1;
  });
  
  // Encontra os grupos musculares mais treinados
  let topMuscleGroup = 'geral';
  let topCount = 0;
  
  Object.entries(muscleGroups).forEach(([group, count]) => {
    if (count > topCount) {
      topMuscleGroup = group;
      topCount = count;
    }
  });
  
  // Mapeia os principais grupos para nomes de treino
  const muscleGroupNames: {[key: string]: string} = {
    'peito': 'Treino de Peito',
    'costas': 'Treino de Costas', 
    'pernas': 'Treino de Pernas',
    'ombro': 'Treino de Ombros',
    'ombros': 'Treino de Ombros',
    'biceps': 'Treino de Braços',
    'triceps': 'Treino de Braços',
    'abdomen': 'Treino de Core',
    'core': 'Treino de Core',
    'glúteos': 'Treino de Glúteos',
    'glúteo': 'Treino de Glúteos',
    'gluteos': 'Treino de Glúteos',
    'peitoral': 'Treino de Peito',
    'quadriceps': 'Treino de Pernas',
    'posterior': 'Treino de Pernas',
    'abdômen': 'Treino de Core',
    'braço': 'Treino de Braços',
    'bracos': 'Treino de Braços',
    'braços': 'Treino de Braços'
  };
  
  // Se o grupo muscular principal não está no mapa, usa um nome genérico
  return muscleGroupNames[topMuscleGroup] || `Treino ${dayNumber}`;
};
