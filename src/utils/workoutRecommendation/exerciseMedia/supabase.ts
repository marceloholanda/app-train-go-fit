
/**
 * Utilitário para geração de URLs de imagens de exercícios usando o bucket público do Supabase
 */

// URL base do bucket público
export const SUPABASE_IMAGE_BASE_URL = "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/public/images2";

/**
 * Normaliza o nome do exercício para o formato usado no bucket
 * @param name Nome do exercício
 * @returns Nome normalizado (sem acentos, caracteres especiais, espaços substituídos por underscore)
 */
function normalizeExerciseName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim()
    .replace(/\s+/g, "_");
}

/**
 * Retorna a URL da imagem de um exercício com base no nome
 * @param exerciseName Nome do exercício
 * @returns URL da imagem no bucket público do Supabase
 */
export function getExerciseImageUrl(exerciseName: string): string {
  if (!exerciseName) return "";
  
  const normalized = normalizeExerciseName(exerciseName);
  return `${SUPABASE_IMAGE_BASE_URL}/${normalized}.png`;
}

/**
 * Caminho para imagem de fallback caso a imagem do exercício não seja encontrada
 */
export const FALLBACK_IMAGE_URL = "/fallback-exercise.png";
