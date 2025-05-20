
// This file is now a re-export wrapper to maintain backward compatibility
// The functionality has been refactored into separate files for better maintainability

export * from './planFinder';
export * from './planAdapter';
export * from './planAdaptation';
export * from './messageGenerator';
export * from './environmentMapping';
export * from './exerciseSubstitution';
export * from './types';

/**
 * Main function to get a workout plan based on user preferences
 * This is the entry point for workout plan generation
 */
export const getRecommendedWorkoutPlan = async (preferences: {
  objetivo: string;
  nivel: string;
  frequencia: string;
  local: string;
}) => {
  // Import needed modules
  const planFinder = await import('./planFinder');
  const planAdaptation = await import('./planAdaptation');
  const { generatePersonalizedMessage } = await import('./messageGenerator');
  
  try {
    // Convert preferences to quiz answers format
    const quizAnswers = {
      objective: preferences.objetivo,
      level: preferences.nivel,
      environment: preferences.local,
      days_per_week: preferences.frequencia,
      // Add default values for optional fields to satisfy the QuizAnswers type
      age: 'unknown',
      weight: 'unknown',
      height: 'unknown',
      motivation_type: 'unknown',
      training_barrier: 'unknown'
    };
    
    // Find the best base plan for user preferences
    const basePlan = planFinder.findBestWorkoutPlan(
      quizAnswers
    );
    
    if (!basePlan) {
      throw new Error('Não foi possível encontrar um plano adequado');
    }
    
    // Adapt the plan to user preferences
    const adaptedPlan = planAdaptation.adaptPlan(basePlan, preferences);
    
    // Generate a personalized message
    const message = generatePersonalizedMessage(
      preferences.objetivo,
      preferences.nivel
    );
    
    // Return the complete workout plan with message
    return {
      ...adaptedPlan,
      personalizedMessage: message
    };
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw error;
  }
};
