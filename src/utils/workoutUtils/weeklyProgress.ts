
/**
 * Calcula a quantidade de dias treinados na semana atual
 */
export const getWorkoutsThisWeek = (): { completed: number, total: number } => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return { completed: 0, total: 0 };
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory) return { completed: 0, total: 0 };
    
    // Determina o primeiro e último dia da semana atual (domingo a sábado)
    const now = new Date();
    const currentDay = now.getDay(); // 0 = domingo, 6 = sábado
    
    // Cria uma data para o início da semana (domingo)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Cria uma data para o fim da semana (sábado)
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (6 - currentDay));
    endOfWeek.setHours(23, 59, 59, 999);
    
    // Filtra os treinos realizados nesta semana
    const workoutsThisWeek = user.workoutHistory.filter((workout: {date: string}) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    });
    
    // Conta dias únicos treinados na semana
    const uniqueDays = new Set(workoutsThisWeek.map((workout: {date: string}) => workout.date));
    
    // Total de dias na semana é 7 ou o total de dias do plano do usuário, o que for menor
    const totalDays = Math.min(7, user.workoutPlan?.days || 7);
    
    return {
      completed: uniqueDays.size,
      total: totalDays
    };
  } catch (error) {
    console.error('Erro ao obter treinos da semana:', error);
    return { completed: 0, total: 0 };
  }
};
