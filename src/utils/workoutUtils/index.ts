
// Re-export todas as funções principais
export * from './mapping'; // exporta generateWorkoutNameFromExercises (e seu alias generateWorkoutName)
// Não re-exportamos nameGeneration diretamente para evitar conflito
import * as nameGenUtils from './nameGeneration';
export { nameGenUtils }; // Exportamos como namespace para evitar conflitos

export * from './iconGeneration';
export * from './dayMapping';
export * from './workoutTracking';
export * from './history';
export * from './weeklyProgress';
export * from './userLevel';
export * from './streakCalculation';
export * from './scheduleTracking';
export * from './levelTracking';
export * from './videoMapping';
export * from './achievements';
