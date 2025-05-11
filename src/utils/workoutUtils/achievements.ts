
/**
 * Calcula e retorna as conquistas desbloqueadas
 */
export const getAchievements = (): {id: string, name: string, description: string, unlocked: boolean}[] => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return [];
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory) return [];
    
    // Conta dias únicos treinados (total)
    const uniqueDays = new Set(user.workoutHistory.map((workout: {date: string}) => workout.date));
    const totalDays = uniqueDays.size;
    
    // Define as conquistas
    const achievements = [
      {
        id: 'bronze',
        name: 'Primeiros Passos',
        description: 'Complete 3 dias de treino',
        threshold: 3,
        unlocked: totalDays >= 3
      },
      {
        id: 'silver',
        name: 'Em Ritmo',
        description: 'Complete 7 dias de treino',
        threshold: 7,
        unlocked: totalDays >= 7
      },
      {
        id: 'gold',
        name: 'Consistência Total',
        description: 'Complete 15 dias de treino',
        threshold: 15,
        unlocked: totalDays >= 15
      },
      {
        id: 'platinum',
        name: 'Foco Implacável',
        description: 'Complete 30 dias de treino',
        threshold: 30,
        unlocked: totalDays >= 30
      }
    ];
    
    return achievements;
  } catch (error) {
    console.error('Erro ao obter conquistas:', error);
    return [];
  }
};
