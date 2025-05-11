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

/**
 * Salva o histórico de níveis desbloqueados pelo usuário
 */
export const saveUnlockedLevel = (level: string) => {
  try {
    // Obter histórico de níveis atual
    let unlockedLevels = [];
    const savedLevels = localStorage.getItem('traingo-niveis-desbloqueados');
    
    if (savedLevels) {
      unlockedLevels = JSON.parse(savedLevels);
    }
    
    // Verificar se esse nível já foi registrado
    const levelExists = unlockedLevels.some((item: {nivel: string}) => item.nivel === level);
    
    // Se o nível for novo, adiciona ao histórico com a data atual
    if (!levelExists) {
      const today = new Date().toISOString().split('T')[0];
      unlockedLevels.push({
        nivel: level,
        date: today
      });
      
      // Salvar histórico atualizado
      localStorage.setItem('traingo-niveis-desbloqueados', JSON.stringify(unlockedLevels));
      
      // Salvar nível atual
      localStorage.setItem('traingo-nivel-atual', level);
      
      return {
        isNewLevel: true,
        level
      };
    }
    
    // Salvar nível atual mesmo que não seja novo
    localStorage.setItem('traingo-nivel-atual', level);
    
    return {
      isNewLevel: false,
      level
    };
  } catch (error) {
    console.error('Erro ao salvar nível desbloqueado:', error);
    return {
      isNewLevel: false,
      level
    };
  }
};

/**
 * Obter histórico de níveis desbloqueados
 */
export const getUnlockedLevels = () => {
  try {
    const savedLevels = localStorage.getItem('traingo-niveis-desbloqueados');
    
    if (savedLevels) {
      return JSON.parse(savedLevels);
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao recuperar níveis desbloqueados:', error);
    return [];
  }
};

/**
 * Verifica se é o primeiro acesso do mês
 */
export const isFirstAccessOfMonth = () => {
  const currentMonth = new Date().getMonth();
  const lastAccessMonth = localStorage.getItem('traingo-last-access-month');
  
  // Armazena o mês atual como último acesso
  localStorage.setItem('traingo-last-access-month', currentMonth.toString());
  
  // Se não houver registro ou se for um mês diferente, é o primeiro acesso
  if (!lastAccessMonth || parseInt(lastAccessMonth) !== currentMonth) {
    return true;
  }
  
  return false;
};

/**
 * Verifica se o banner de onboarding de nível deve ser exibido
 */
export const shouldShowLevelOnboarding = () => {
  const currentMonth = new Date().getMonth();
  const lastOnboardingMonth = localStorage.getItem('traingo-level-onboarding-month');
  
  // Se não houver registro ou se for um mês diferente, exibe o onboarding
  if (!lastOnboardingMonth || parseInt(lastOnboardingMonth) !== currentMonth) {
    // Armazena o mês atual como último mês que exibiu o onboarding
    localStorage.setItem('traingo-level-onboarding-month', currentMonth.toString());
    return true;
  }
  
  return false;
};
