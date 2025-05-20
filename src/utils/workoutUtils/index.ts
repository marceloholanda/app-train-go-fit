
// Export principal para facilitar as importações
export * from './dayMapping';
export * from './iconGeneration';
export * from './nameGeneration';
// Export progress.ts but rename the updateWorkoutProgress to avoid conflict
export { 
  saveWorkoutPlanToSupabase
} from './progress';
export * from './history';
export * from './achievements';
export * from './streaks';
export * from './workoutTracking';
export * from './weeklyProgress';
// Rename the export from progressTracking to avoid conflict with history.ts
export { 
  getUserProgress,
  recordExerciseCompletion,
  removeExerciseCompletion,
  recordWorkoutCompletion,
  checkAchievementsProgress,
  getWorkoutDatesForMonth as getWorkoutDatesForMonthFromSupabase
} from './progressTracking';
