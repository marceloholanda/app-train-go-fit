
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
