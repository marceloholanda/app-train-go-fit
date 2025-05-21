
// Arquivo de compatibilidade para evitar quebras durante a refatoração
// As funções são exportadas novamente, mas agora vêm dos módulos específicos
import {
  mapWorkoutDays,
  getWorkoutIcon,
  generateWorkoutName,
  getWorkoutProgress,
  getWorkoutName,
  generateWorkoutNameFromExercises,
  getWorkoutDatesForMonth,
  checkAchievements,
  unlockAchievement,
  getAchievements,
  calculateStreak,
  getStreakData,
  updateWorkoutProgress,
  getWeeklyProgress,
} from './workoutUtils/index';

export {
  mapWorkoutDays,
  getWorkoutIcon,
  generateWorkoutName,
  getWorkoutProgress,
  getWorkoutName,
  generateWorkoutNameFromExercises,
  getWorkoutDatesForMonth,
  checkAchievements,
  unlockAchievement,
  getAchievements,
  calculateStreak,
  getStreakData,
  updateWorkoutProgress,
  getWeeklyProgress,
};
