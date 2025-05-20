
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
