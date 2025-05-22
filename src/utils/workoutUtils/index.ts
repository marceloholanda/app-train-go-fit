
// Re-export functions from submodules
// Use explicit exports to avoid name conflicts
export * from './dayMapping';
export * from './history';
export * from './iconGeneration';
export * from './levelTracking';

// Explicit re-exports for mapping.ts to avoid conflicts
export { 
  generateWorkoutName,
  // Also export with the alias that's being used in other parts of the app
  generateWorkoutName as generateWorkoutNameFromGroups
} from './mapping'; 

export * from './nameGeneration';
export * from './progress';

// Explicit re-export for scheduleTracking
export {
  getWorkoutDaysOfWeek,
  // Rename the conflicting function
  getExpectedWorkoutDays as getScheduledWorkoutDays,
  getExpectedWorkoutDays
} from './scheduleTracking';

// Now properly handle the streak functions from both files
// Export functions from streakCalculation.ts with explicit exports
export { 
  calculateStreak,
  getWorkoutStreaks 
} from './streakCalculation';

// Export functions from streaks.ts with explicit exports to avoid conflicts
export {
  getStreakData,
  getWorkoutStreaks as getWorkoutStreaksData
} from './streaks';

export * from './userLevel';
export * from './videoMapping';

// Explicit re-export for weeklyProgress
export {
  getWorkoutsThisWeek,
  getWeeklyProgress,
  // Rename the conflicting function
  updateWorkoutProgress as updateWeeklyWorkoutProgress
} from './weeklyProgress';

// Explicit re-export for workoutTracking
export {
  updateWorkoutProgress
} from './workoutTracking';

// Export the workout dates function explicitly
export { getWorkoutDatesForMonth } from './history';

// Explicit export for achievement functions
export {
  checkAchievements,
  checkNewAchievement,
  unlockAchievement,
  getAchievements
} from './achievements';
