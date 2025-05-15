
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
  if (!name) return "";
  
  const normalized = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, "")
    .trim()
    .replace(/\s+/g, "_");
  
  console.log(`Nome original: "${name}" → Normalizado: "${normalized}"`);
  return normalized;
}

/**
 * Retorna a URL da imagem de um exercício com base no nome
 * @param exerciseName Nome do exercício
 * @returns URL da imagem no bucket público do Supabase
 */
export function getExerciseImageUrl(exerciseName: string): string {
  if (!exerciseName) {
    console.warn("Nome do exercício vazio ao gerar URL da imagem");
    return FALLBACK_IMAGE_URL;
  }
  
  const normalized = normalizeExerciseName(exerciseName);
  const imageUrl = `${SUPABASE_IMAGE_BASE_URL}/${normalized}.png`;
  
  console.log(`URL gerada para "${exerciseName}": ${imageUrl}`);
  return imageUrl;
}

/**
 * Caminho para imagem de fallback caso a imagem do exercício não seja encontrada
 */
export const FALLBACK_IMAGE_URL = "/fallback-exercise.png";

/**
 * Verifica se uma URL existe (para uso em debug)
 * @param url URL da imagem a verificar
 * @returns Promise que resolve para true se a imagem existe, false caso contrário
 */
export async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Erro ao verificar existência da imagem: ${url}`, error);
    return false;
  }
}
