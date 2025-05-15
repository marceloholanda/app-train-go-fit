
/**
 * Utilitário para geração de URLs de imagens de exercícios usando o bucket público do Supabase
 */

// URL base do bucket público
export const SUPABASE_IMAGE_BASE_URL = "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/public/images2";

/**
 * Retorna a URL da imagem de um exercício com base no nome
 * @param exerciseName Nome do exercício
 * @returns URL da imagem no bucket público do Supabase
 */
export function getExerciseImageUrl(exerciseName: string): string {
  if (!exerciseName) return "";
  
  const normalizedName = exerciseName
    .normalize("NFD")                           // remove acentos
    .replace(/[\u0300-\u036f]/g, "")           // remove diacríticos
    .replace(/\s+/g, "_")                      // substitui espaços por "_"
    .replace(/[^a-zA-Z0-9_]/g, "")             // remove caracteres especiais
    .toLowerCase();                            // lowercase

  return `${SUPABASE_IMAGE_BASE_URL}/${normalizedName}.png`;
}

/**
 * Caminho para imagem de fallback caso a imagem do exercício não seja encontrada
 */
export const FALLBACK_IMAGE_URL = "/fallback-exercise.png";
