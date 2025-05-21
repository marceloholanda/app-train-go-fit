
// Exportações explícitas para evitar conflitos
import { mapWorkoutDays } from './dayMapping';
import { getWorkoutIcon } from './iconGeneration';
import { generateWorkoutName } from './nameGeneration';
import { getWorkoutProgress } from './progress';
import { getWorkoutName, generateWorkoutNameFromExercises, getWorkoutDatesForMonth } from './history';
import { checkAchievements, unlockAchievement, getAchievements } from './achievements';
import { calculateStreak, getStreakData } from './streaks';
import { updateWorkoutProgress } from './workoutTracking';
import { getWeeklyProgress } from './weeklyProgress';

// Exportações explícitas para evitar o conflito de estrela
export {
  // Day Mapping
  mapWorkoutDays,
  
  // Icon Generation
  getWorkoutIcon,
  
  // Name Generation
  generateWorkoutName,
  
  // Progress
  getWorkoutProgress,
  
  // History
  getWorkoutName,
  generateWorkoutNameFromExercises,
  getWorkoutDatesForMonth,
  
  // Achievements
  checkAchievements,
  unlockAchievement,
  getAchievements,
  
  // Streaks
  calculateStreak,
  getStreakData,
  
  // Workout Tracking
  updateWorkoutProgress,
  
  // Weekly Progress
  getWeeklyProgress,
};
