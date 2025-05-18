
/**
 * Utility functions for handling exercise images
 */

export const SUPABASE_IMAGE_BASE_URL = "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/public/images2";
export const FALLBACK_IMAGE_URL = "/fallback-exercise.png";

/**
 * Normalizes an exercise name for use in image URLs
 * - Converts to lowercase
 * - Removes accents
 * - Removes special characters
 * - Replaces spaces with underscores
 */
export function normalizeExerciseName(name: string): string {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")       // Remove accents
    .replace(/[^\w\s]/gi, "")              // Remove special characters
    .trim()
    .replace(/\s+/g, "_");                 // Replace spaces with underscores
}

/**
 * Returns the URL for an exercise image based on the exercise name
 */
export function getExerciseImageUrl(exerciseName: string): string {
  if (!exerciseName) return FALLBACK_IMAGE_URL;
  
  const normalized = normalizeExerciseName(exerciseName);
  return `${SUPABASE_IMAGE_BASE_URL}/${normalized}.png`;
}

/**
 * Handles image loading errors by using the fallback image
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
  console.log(`[TrainGO] Erro ao carregar imagem, usando fallback`);
  event.currentTarget.src = FALLBACK_IMAGE_URL;
}
