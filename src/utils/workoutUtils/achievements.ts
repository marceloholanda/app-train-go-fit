
/**
 * Calcula e retorna as conquistas desbloqueadas
 */
export const getAchievements = (): {
  id: string;
  name: string;
  description: string;
  threshold: number;
  unlocked: boolean;
  unlockedDate?: string;
}[] => {
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
        unlocked: totalDays >= 3,
        unlockedDate: totalDays >= 3 ? getUnlockDate(user.workoutHistory, 3) : undefined
      },
      {
        id: 'silver',
        name: 'Em Ritmo',
        description: 'Complete 7 dias de treino',
        threshold: 7,
        unlocked: totalDays >= 7,
        unlockedDate: totalDays >= 7 ? getUnlockDate(user.workoutHistory, 7) : undefined
      },
      {
        id: 'gold',
        name: 'Consistência Total',
        description: 'Complete 15 dias de treino',
        threshold: 15,
        unlocked: totalDays >= 15,
        unlockedDate: totalDays >= 15 ? getUnlockDate(user.workoutHistory, 15) : undefined
      },
      {
        id: 'platinum',
        name: 'Foco Implacável',
        description: 'Complete 30 dias de treino',
        threshold: 30,
        unlocked: totalDays >= 30,
        unlockedDate: totalDays >= 30 ? getUnlockDate(user.workoutHistory, 30) : undefined
      }
    ];
    
    return achievements;
  } catch (error) {
    console.error('Erro ao obter conquistas:', error);
    return [];
  }
};

/**
 * Verifica se uma nova conquista foi desbloqueada comparando com as conquistas anteriores
 * @returns A conquista recém-desbloqueada, se houver
 */
export const checkNewAchievement = () => {
  try {
    // Verifica conquistas anteriores (se existirem)
    const previousAchievements = localStorage.getItem('traingo-previous-achievements');
    const currentAchievements = getAchievements();
    
    if (!previousAchievements) {
      // Salva as conquistas atuais para referência futura
      localStorage.setItem('traingo-previous-achievements', JSON.stringify(currentAchievements));
      return null;
    }
    
    const prevAchievements = JSON.parse(previousAchievements);
    
    // Encontra a primeira conquista que não estava desbloqueada antes, mas está agora
    const newAchievement = currentAchievements.find((curr) => {
      const prev = prevAchievements.find((p: any) => p.id === curr.id);
      return curr.unlocked && (!prev || !prev.unlocked);
    });
    
    // Atualiza as conquistas salvas com as atuais
    localStorage.setItem('traingo-previous-achievements', JSON.stringify(currentAchievements));
    
    return newAchievement || null;
  } catch (error) {
    console.error('Erro ao verificar novas conquistas:', error);
    return null;
  }
};

/**
 * Calcula quando uma conquista foi desbloqueada (data do N-ésimo treino único)
 */
const getUnlockDate = (history: {date: string}[], threshold: number) => {
  if (!history || history.length === 0) return undefined;
  
  // Ordena o histórico por data e encontra o dia em que o limite foi atingido
  const uniqueDates = [...new Set(history.map(entry => entry.date))];
  uniqueDates.sort(); // Ordena as datas
  
  if (uniqueDates.length >= threshold) {
    return uniqueDates[threshold - 1]; // A data do N-ésimo dia de treino
  }
  
  return undefined;
};

// Removed the functions that are now in levelTracking.ts to avoid conflicts
