
// Re-export functions from submodules
// Use explicit exports to avoid name conflicts
export * from './achievements';
export * from './dayMapping';
export * from './history';
export * from './iconGeneration';
export * from './levelTracking';

// Explicit re-exports for mapping.ts to avoid conflicts
export { 
  // Rename the conflicting function from mapping
  generateWorkoutName as generateWorkoutNameFromGroups
} from './mapping'; 

export * from './nameGeneration';
export * from './progress';

// Explicit re-export for scheduleTracking
export {
  getWorkoutDaysOfWeek,
  // Rename the conflicting function
  getExpectedWorkoutDays as getScheduledWorkoutDays
} from './scheduleTracking';

export * from './streakCalculation';
export * from './streaks';
export * from './userLevel';
export * from './videoMapping';

// Explicit re-export for weeklyProgress
export {
  getWeeklyProgress,
  getWorkoutsThisWeek,
  // Rename the conflicting function
  updateWorkoutProgress as updateWeeklyWorkoutProgress
} from './weeklyProgress';

// Explicit re-export for workoutTracking
export {
  updateWorkoutProgress
} from './workoutTracking';

// Get achievements function is already exported from achievements.ts
export { getAchievements, unlockAchievement } from './achievements';

// Re-export the getWorkoutStreaks function
export { getWorkoutStreaks } from './streaks';

// Add missing exports for expected workout days
export { getExpectedWorkoutDays } from './scheduleTracking';

// Export the workout dates function
export { getWorkoutDatesForMonth } from './history';
