
import { Exercise } from '@/types/workout';
import { normalizeExerciseName, getExerciseImageUrl } from './exerciseImages';

/**
 * Checks if an image exists at the provided URL
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.error("[TrainGO] Erro ao verificar imagem:", url, error);
    return false;
  }
}

/**
 * Diagnostic tool to check if all exercises have corresponding images
 * @returns Promise with the diagnostic results
 */
export async function diagnoseExerciseImages(exercises: Exercise[]): Promise<{
  total: number;
  found: number;
  missing: string[];
  results: Array<{ 
    name: string; 
    normalized: string; 
    url: string; 
    exists: boolean;
  }>
}> {
  const results = [];
  const missing = [];
  let found = 0;

  console.log(`[TrainGO] Iniciando diagnóstico de ${exercises.length} exercícios...`);
  
  for (const exercise of exercises) {
    const url = getExerciseImageUrl(exercise.nome);
    const normalized = normalizeExerciseName(exercise.nome);
    const exists = await checkImageExists(url);
    
    if (exists) {
      found++;
    } else {
      missing.push(exercise.nome);
    }
    
    results.push({
      name: exercise.nome,
      normalized,
      url,
      exists
    });
  }
  
  return {
    total: exercises.length,
    found,
    missing,
    results
  };
}

/**
 * Get all unique exercises from a workout plan
 */
export function getAllUniqueExercises(workoutPlan: any): Exercise[] {
  if (!workoutPlan || !workoutPlan.plan) {
    return [];
  }
  
  const uniqueExercises = new Map<string, Exercise>();
  
  // Iterate through each day in the plan
  Object.values(workoutPlan.plan).forEach((dayExercises: any) => {
    if (Array.isArray(dayExercises)) {
      dayExercises.forEach((exercise: Exercise) => {
        // Add main exercise if not already added
        if (!uniqueExercises.has(exercise.nome)) {
          uniqueExercises.set(exercise.nome, exercise);
        }
        
        // Also check substitution exercises if they exist
        if (exercise.substituicoes && Array.isArray(exercise.substituicoes)) {
          exercise.substituicoes.forEach((subExercise: Exercise) => {
            if (!uniqueExercises.has(subExercise.nome)) {
              uniqueExercises.set(subExercise.nome, subExercise);
            }
          });
        }
      });
    }
  });
  
  return Array.from(uniqueExercises.values());
}
