
/**
 * Mapeia dias da semana para treinos com base no número de dias disponíveis
 */
export const mapWorkoutDays = (totalDays: number): string[] => {
  // Mapeamento baseado no número de dias por semana
  const weekDayMappings: Record<number, string[]> = {
    1: ['Segunda'],
    2: ['Segunda', 'Quinta'],
    3: ['Segunda', 'Quarta', 'Sexta'],
    4: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
    5: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    6: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    7: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  };
  
  return weekDayMappings[totalDays] || [];
};

/**
 * Gera um ícone representativo baseado nos exercícios do dia
 */
export const getWorkoutIcon = (exercises: { nome: string; reps: string }[]): string => {
  const lowerExercises = exercises.map(ex => ex.nome.toLowerCase());
  
  // Lógica para determinar o ícone baseado em grupos musculares
  if (lowerExercises.some(ex => ex.includes('supino') || ex.includes('peitoral') || ex.includes('crucifixo'))) {
    return '💪';
  }
  
  if (lowerExercises.some(ex => ex.includes('costa') || ex.includes('remada') || ex.includes('puxada'))) {
    return '🏋️';
  }
  
  if (lowerExercises.some(ex => ex.includes('perna') || ex.includes('agachamento') || ex.includes('leg'))) {
    return '🦵';
  }
  
  if (lowerExercises.some(ex => ex.includes('abdominal') || ex.includes('prancha'))) {
    return '🔥';
  }
  
  if (lowerExercises.some(ex => ex.includes('ombro') || ex.includes('desenvolvimento'))) {
    return '🏆';
  }
  
  return '🏃';
};

/**
 * Gera nomes para os treinos baseados nos exercícios
 */
export const generateWorkoutName = (dayNumber: number, exercises: { nome: string; reps: string }[]): string => {
  const lowerExercises = exercises.map(ex => ex.nome.toLowerCase());
  let focusName = 'Full Body';
  
  // Identifica o foco do treino com base nos exercícios
  if (lowerExercises.some(ex => ex.includes('supino') || ex.includes('peitoral') || ex.includes('crucifixo'))) {
    focusName = 'Peitoral e Tríceps';
  } else if (lowerExercises.some(ex => ex.includes('costa') || ex.includes('remada') || ex.includes('puxada'))) {
    focusName = 'Costas e Bíceps';
  } else if (lowerExercises.some(ex => ex.includes('perna') || ex.includes('agachamento') || ex.includes('leg'))) {
    focusName = 'Pernas';
  } else if (lowerExercises.some(ex => ex.includes('ombro') || ex.includes('desenvolvimento'))) {
    focusName = 'Ombros';
  } else if (lowerExercises.some(ex => ex.includes('abdominal') || ex.includes('prancha'))) {
    focusName = 'Core';
  }
  
  return `Treino ${String.fromCharCode(64 + dayNumber)} - ${focusName}`;
};
