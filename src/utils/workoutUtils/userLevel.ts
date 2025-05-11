
import { saveUnlockedLevel } from './levelTracking';

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
    saveUnlockedLevel(level);
    
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
