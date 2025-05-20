
import { Exercise } from '@/types/workout';

/**
 * Gera um nome para o treino baseado nos exercícios
 */
export const generateWorkoutName = (dayNumber: number, exercises: Exercise[]): string => {
  // Determina o tipo de treino com base nos exercícios
  const muscleGroups: {[key: string]: number} = {};
  
  // Analisa os nomes de exercícios para tentar determinar os grupos musculares
  exercises.forEach(ex => {
    // Como o tipo Exercise não tem muscleGroup, vamos inferir pelo nome do exercício
    const exerciseName = ex.nome.toLowerCase();
    
    // Mapeamento básico de palavras-chave para grupos musculares
    const muscleKeywords: {[key: string]: string} = {
      'peito': 'peito',
      'peitoral': 'peito',
      'supino': 'peito',
      'crucifixo': 'peito',
      'voador': 'peito',
      'costas': 'costas',
      'puxada': 'costas',
      'remada': 'costas',
      'dorsal': 'costas',
      'trapézio': 'costas',
      'trapezio': 'costas',
      'perna': 'pernas',
      'agachamento': 'pernas',
      'leg': 'pernas',
      'quadríceps': 'pernas',
      'quadriceps': 'pernas',
      'posterior': 'pernas',
      'panturrilha': 'pernas',
      'ombro': 'ombros',
      'ombros': 'ombros',
      'elevação': 'ombros',
      'desenvolvimento': 'ombros',
      'deltóide': 'ombros',
      'deltoide': 'ombros',
      'biceps': 'braços',
      'bíceps': 'braços',
      'curl': 'braços',
      'rosca': 'braços',
      'triceps': 'braços',
      'tríceps': 'braços',
      'extensão': 'braços',
      'abdominal': 'core',
      'abdômen': 'core',
      'abdomen': 'core',
      'core': 'core',
      'prancha': 'core',
      'glúteos': 'glúteos',
      'gluteos': 'glúteos',
      'glúteo': 'glúteos',
      'elevação pélvica': 'glúteos',
      'ponte': 'glúteos',
    };
    
    // Determina o grupo muscular com base no nome do exercício
    let identifiedGroup = 'geral';
    
    Object.entries(muscleKeywords).forEach(([keyword, group]) => {
      if (exerciseName.includes(keyword)) {
        identifiedGroup = group;
      }
    });
    
    muscleGroups[identifiedGroup] = (muscleGroups[identifiedGroup] || 0) + 1;
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
    'braços': 'Treino de Braços',
    'core': 'Treino de Core',
    'glúteos': 'Treino de Glúteos',
  };
  
  // Se o grupo muscular principal não está no mapa, usa um nome genérico
  return muscleGroupNames[topMuscleGroup] || `Treino ${dayNumber}`;
};
