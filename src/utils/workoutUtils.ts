
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
  getWorkoutsThisWeek,
  getWorkoutStreaks,
  getWorkoutDatesForMonth,
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
  getWorkoutsThisWeek,
  getWorkoutStreaks,
  getWorkoutDatesForMonth,
};
