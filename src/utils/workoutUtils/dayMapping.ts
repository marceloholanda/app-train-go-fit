
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
