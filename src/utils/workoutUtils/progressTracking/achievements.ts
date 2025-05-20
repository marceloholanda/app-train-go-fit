
import { getUserProgress } from './getUserProgress';
import { checkNewAchievements } from '../achievementsService';

/**
 * Verifica e desbloqueia conquistas com base no progresso
 */
export const checkAchievementsProgress = async (userId: string) => {
  try {
    const progress = await getUserProgress(userId);
    
    // Verificar conquistas baseadas em sequência de dias
    const achievements = [
      { id: 'bronze', threshold: 3, name: 'Bronze' },
      { id: 'silver', threshold: 7, name: 'Prata' },
      { id: 'gold', threshold: 14, name: 'Ouro' },
      { id: 'platinum', threshold: 30, name: 'Platina' }
    ];
    
    // Desbloquear conquistas com base na maior sequência
    const unlockedAchievements = achievements.filter(
      achievement => progress.longestStreak >= achievement.threshold
    );
    
    // Salvar conquistas desbloqueadas
    if (unlockedAchievements.length > 0) {
      // Verificar conquistas no Supabase
      await checkNewAchievements(userId);
      return unlockedAchievements;
    }
    
    return [];
  } catch (error) {
    console.error("Erro ao verificar conquistas:", error);
    return [];
  }
};
