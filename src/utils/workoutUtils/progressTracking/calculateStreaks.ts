
/**
 * Calcula sequências de treinos consecutivos
 */
export const calculateStreaks = (dates: string[]) => {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }
  
  // Ordenar datas da mais recente para a mais antiga
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  let currentStreak = 0;
  let tempStreak = 0;
  let longestStreak = 0;
  let lastDate: Date | null = null;
  
  // Verificar se o último treino foi hoje ou ontem para considerar o streak atual
  const lastWorkoutDate = new Date(sortedDates[0]);
  lastWorkoutDate.setHours(0, 0, 0, 0);
  
  const isRecentWorkout = 
    lastWorkoutDate.getTime() === today.getTime() || 
    lastWorkoutDate.getTime() === yesterday.getTime();
  
  // Se o último treino não foi recente, o streak atual é 0
  if (!isRecentWorkout) {
    currentStreak = 0;
  } else {
    // Calcular streak atual percorrendo as datas mais recentes
    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      currentDate.setHours(0, 0, 0, 0);
      
      if (lastDate === null) {
        // Primeiro dia de treino
        tempStreak = 1;
        lastDate = currentDate;
        continue;
      }
      
      const expectedPrevDate = new Date(currentDate);
      expectedPrevDate.setDate(expectedPrevDate.getDate() + 1);
      
      if (expectedPrevDate.getTime() === lastDate.getTime()) {
        // Dia consecutivo
        tempStreak++;
      } else {
        // Quebra de sequência
        break;
      }
      
      lastDate = currentDate;
    }
    
    currentStreak = tempStreak;
  }
  
  // Calcular maior sequência histórica
  lastDate = null;
  tempStreak = 0;
  
  // Ordenar datas da mais antiga para a mais recente para calcular o maior streak
  const chronologicalDates = [...dates].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  
  for (let i = 0; i < chronologicalDates.length; i++) {
    const currentDate = new Date(chronologicalDates[i]);
    currentDate.setHours(0, 0, 0, 0);
    
    if (lastDate === null) {
      // Primeiro dia de treino
      tempStreak = 1;
    } else {
      const expectedNextDate = new Date(lastDate);
      expectedNextDate.setDate(expectedNextDate.getDate() + 1);
      
      if (currentDate.getTime() === expectedNextDate.getTime()) {
        // Dia consecutivo
        tempStreak++;
      } else {
        // Quebra de sequência
        tempStreak = 1;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak);
    lastDate = currentDate;
  }
  
  return { currentStreak, longestStreak };
};
