
import { Exercise } from '@/types/workout';

// This file is kept for backward compatibility
// Please import directly from specific workoutUtils module
export * from './workoutUtils/index';

// Add additional type guard to handle exercise arrays that might not have required nome
export function generateWorkoutName(dayNumber: number, exercises: Array<Exercise | { nome: string; reps: string }>) {
  const mod = require('./workoutUtils/nameGeneration');
  return mod.generateWorkoutName(dayNumber, exercises);
}

// Add additional type guard to handle exercise arrays that might not have required nome
export function getWorkoutIcon(exercises: Array<Exercise | { nome: string; reps: string }>) {
  const mod = require('./workoutUtils/iconGeneration');
  return mod.getWorkoutIcon(exercises);
}
