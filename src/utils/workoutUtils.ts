
// Arquivo de compatibilidade para evitar quebras durante a refatoração
// As funções são exportadas novamente, mas agora vêm dos módulos específicos
import {
  mapWorkoutDays,
  getWorkoutIcon,
  generateWorkoutNameFromGroups,
  getWorkoutProgress,
  getScheduledWorkoutDays,
  checkAchievements,
  getAchievements,
  unlockAchievement,
  calculateStreak,
  getStreakData,
  updateWorkoutProgress,
  getWeeklyProgress,
  getWorkoutStreaks,
} from './workoutUtils/index';

export {
  mapWorkoutDays,
  getWorkoutIcon,
  generateWorkoutNameFromGroups,
  getWorkoutProgress,
  getScheduledWorkoutDays,
  checkAchievements,
  getAchievements,
  unlockAchievement,
  calculateStreak,
  getStreakData,
  updateWorkoutProgress,
  getWeeklyProgress,
  getWorkoutStreaks,
};
