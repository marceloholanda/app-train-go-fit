
import { WorkoutPlan } from '@/types/workout';
import { replaceExerciseForEnvironment } from './exerciseSubstitution';

/**
 * Adapts a workout plan to be suitable for a different environment
 */
export const adaptWorkoutPlanToEnvironment = (originalPlan: WorkoutPlan, targetEnvironment: string): WorkoutPlan => {
  // Create a copy of the original plan
  const adaptedPlan: WorkoutPlan = {
    ...originalPlan,
    id: `${originalPlan.id}_adapted_${targetEnvironment}`,
    name: `${originalPlan.name} (Adaptado para ${targetEnvironment === 'home' ? 'Casa' : 'Ar Livre'})`,
    tags: [...originalPlan.tags.filter(tag => tag !== 'gym' && tag !== 'home' && tag !== 'outdoor'), targetEnvironment],
    plan: {}
  };
  
  // Replace exercises with alternatives suitable for the environment
  Object.entries(originalPlan.plan).forEach(([day, exercises]) => {
    adaptedPlan.plan[day] = exercises.map(exercise => {
      return replaceExerciseForEnvironment(exercise.nome, targetEnvironment, exercise.reps);
    });
  });
  
  return adaptedPlan;
};
