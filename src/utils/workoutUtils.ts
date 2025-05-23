
// Arquivo de compatibilidade para evitar quebras durante a refatoração
// As funções são exportadas novamente, mas agora vêm dos módulos específicos
import {
  mapWorkoutDays,
  getWorkoutIcon,
  generateWorkoutName,
  generateWorkoutNameFromGroups,
  getWorkoutProgress,
  getScheduledWorkoutDays,
  checkAchievements,
  getAchievements,
  unlockAchievement,
  calculateStreak,
  getStreakData,
  getWorkoutStreaksData,
  updateWorkoutProgress,
  getWeeklyProgress,
  getWorkoutsThisWeek,
  getWorkoutDatesForMonth,
  checkNewAchievement,
} from './workoutUtils/index';

export {
  mapWorkoutDays,
  getWorkoutIcon,
  generateWorkoutName,
  generateWorkoutNameFromGroups,
  getWorkoutProgress,
  getScheduledWorkoutDays,
  checkAchievements,
  getAchievements,
  unlockAchievement,
  checkNewAchievement,
  calculateStreak,
  getStreakData,
  getWorkoutStreaksData as getWorkoutStreaks,
  updateWorkoutProgress,
  getWeeklyProgress,
  getWorkoutsThisWeek,
  getWorkoutDatesForMonth,
};
