
/**
 * Calcula os streaks (sequências de dias consecutivos) de treino
 */
export const getWorkoutStreaks = (): { current: number; longest: number } => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return { current: 0, longest: 0 };
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory || user.workoutHistory.length === 0) return { current: 0, longest: 0 };
    
    // Obtém todas as datas de treino únicas e as ordena
    const uniqueDatesSet = new Set(user.workoutHistory.map((workout: {date: string}) => workout.date));
    const uniqueDates = Array.from(uniqueDatesSet).sort() as string[];
    
    if (uniqueDates.length === 0) return { current: 0, longest: 0 };
    
    // Inicializa contadores
    let currentStreak = 1;
    let longestStreak = 1;
    let tempStreak = 1;
    
    // Calcula o maior streak da história
    for (let i = 1; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const prevDate = new Date(uniqueDates[i-1]);
      
      // Adiciona um dia à data anterior para ver se é consecutiva
      prevDate.setDate(prevDate.getDate() + 1);
      
      if (currentDate.toISOString().split('T')[0] === prevDate.toISOString().split('T')[0]) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
      
      longestStreak = Math.max(longestStreak, tempStreak);
    }
    
    // Calcula o streak atual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Verifica se o último treino foi hoje ou ontem
    const lastTrainingDate = new Date(uniqueDates[uniqueDates.length - 1]);
    lastTrainingDate.setHours(0, 0, 0, 0);
    
    if (lastTrainingDate.getTime() !== today.getTime() && 
        lastTrainingDate.getTime() !== yesterday.getTime()) {
      // Se o último treino não foi hoje nem ontem, o streak atual é zero
      currentStreak = 0;
    } else {
      // Calcula o streak atual a partir do último treino para trás
      currentStreak = 1;
      for (let i = uniqueDates.length - 2; i >= 0; i--) {
        const currentDate = new Date(uniqueDates[i]);
        const nextDate = new Date(uniqueDates[i+1]);
        
        // Adiciona um dia à data atual para ver se é consecutiva
        currentDate.setDate(currentDate.getDate() + 1);
        
        if (currentDate.toISOString().split('T')[0] === nextDate.toISOString().split('T')[0]) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
    
    return { current: currentStreak, longest: longestStreak };
  } catch (error) {
    console.error('Erro ao calcular streaks:', error);
    return { current: 0, longest: 0 };
  }
};
