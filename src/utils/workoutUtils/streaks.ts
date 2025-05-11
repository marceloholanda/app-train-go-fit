
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

/**
 * Calcula o nível do usuário com base na quantidade de dias treinados
 * e salva o nível caso seja novo
 */
export const getUserLevel = (): { level: string; nextLevel: string; progress: number } => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return { level: "Iniciante", nextLevel: "Intermediário", progress: 0 };
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory) return { level: "Iniciante", nextLevel: "Intermediário", progress: 0 };
    
    // Conta dias únicos de treino
    const uniqueDatesSet = new Set(user.workoutHistory.map((workout: {date: string}) => workout.date));
    const totalDiasTreinados = uniqueDatesSet.size;
    
    // Define o nível atual e o próximo, além do progresso percentual para o próximo nível
    let level = "Iniciante";
    let nextLevel = "Intermediário"; 
    let currentThreshold = 0;
    let nextThreshold = 5;
    
    if (totalDiasTreinados < 5) {
      level = "Iniciante";
      nextLevel = "Intermediário";
      currentThreshold = 0;
      nextThreshold = 5;
    } else if (totalDiasTreinados < 15) {
      level = "Intermediário";
      nextLevel = "Avançado";
      currentThreshold = 5;
      nextThreshold = 15;
    } else if (totalDiasTreinados < 30) {
      level = "Avançado";
      nextLevel = "Atleta";
      currentThreshold = 15;
      nextThreshold = 30;
    } else {
      level = "Atleta";
      nextLevel = "Master";  // Pode ser adicionado um nível extra no futuro
      currentThreshold = 30;
      nextThreshold = 50;    // Valor arbitrário para continuar a progressão
    }
    
    // Salvar o nível atual no histórico se for novo
    import('../workoutUtils').then(module => {
      const { saveUnlockedLevel } = module;
      saveUnlockedLevel(level);
    }).catch(error => {
      console.error('Erro ao importar saveUnlockedLevel:', error);
    });
    
    // Calcula o progresso percentual para o próximo nível
    const levelRange = nextThreshold - currentThreshold;
    const currentProgress = totalDiasTreinados - currentThreshold;
    const progress = Math.min(100, Math.floor((currentProgress / levelRange) * 100));
    
    return { level, nextLevel, progress };
  } catch (error) {
    console.error('Erro ao calcular nível do usuário:', error);
    return { level: "Iniciante", nextLevel: "Intermediário", progress: 0 };
  }
};

/**
 * Calcula os dias esperados de treino com base na configuração do usuário
 */
export const getExpectedWorkoutDays = (): {date: string, missed: boolean}[] => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return [];
    
    const user = JSON.parse(userData);
    if (!user.workoutPlan || !user.workoutPlan.days_per_week) return [];
    
    const daysPerWeek = user.workoutPlan.days_per_week;
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Obtém todos os dias treinados do mês atual
    const trainedDays = new Set(
      (user.workoutHistory || [])
        .map((workout: {date: string}) => workout.date)
        .filter((date: string) => {
          const workoutDate = new Date(date);
          return workoutDate.getMonth() === today.getMonth() && 
                 workoutDate.getFullYear() === today.getFullYear();
        })
    );
    
    const expectedDays: {date: string, missed: boolean}[] = [];
    
    // Define quais dias da semana devem ser dias de treino com base em days_per_week
    // Assumindo: 1=segunda, 2=terça, etc. Distribui os dias uniformemente na semana.
    const workoutDays = getWorkoutDaysOfWeek(daysPerWeek);
    
    // Para cada dia do mês atual até hoje
    const currentDate = new Date(startOfMonth);
    while (currentDate <= today) {
      const dayOfWeek = currentDate.getDay(); // 0=domingo, 1=segunda, etc.
      
      // Se esse dia da semana é um dia de treino esperado
      if (workoutDays.includes(dayOfWeek)) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const wasTrained = trainedDays.has(dateStr);
        
        // Só considera "missed" se a data já passou e não houve treino
        if (currentDate < today && !wasTrained) {
          expectedDays.push({
            date: dateStr,
            missed: true
          });
        }
      }
      
      // Avança para o próximo dia
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return expectedDays;
  } catch (error) {
    console.error('Erro ao obter dias esperados de treino:', error);
    return [];
  }
};

/**
 * Converte o número de dias por semana em dias específicos da semana
 * Distribui os dias uniformemente durante a semana
 */
const getWorkoutDaysOfWeek = (daysPerWeek: number): number[] => {
  // Limita entre 3-5 dias por semana
  const normalizedDays = Math.min(5, Math.max(3, daysPerWeek));
  
  switch (normalizedDays) {
    case 3:
      return [1, 3, 5]; // Segunda, Quarta, Sexta
    case 4:
      return [1, 2, 4, 5]; // Segunda, Terça, Quinta, Sexta
    case 5:
      return [1, 2, 3, 4, 5]; // Segunda a Sexta
    default:
      return [1, 3, 5]; // Padrão: 3 dias (segunda, quarta, sexta)
  }
};
