
/**
 * Utilitários para gerenciar as imagens dos exercícios
 * Este arquivo centraliza a lógica de normalização e geração de URLs para imagens de exercícios
 */

// URL base para o bucket Supabase
const SUPABASE_IMAGE_BASE_URL = "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/public/images2";

// URL de fallback para quando a imagem não for encontrada
export const FALLBACK_IMAGE_URL = "/fallback-exercise.png";

/**
 * Normaliza o nome do exercício para uso em URLs
 * - Converte para minúsculas
 * - Remove acentos
 * - Remove caracteres especiais
 * - Substitui espaços por underlines
 * 
 * @param name Nome do exercício
 * @returns Nome normalizado
 */
export function normalizeExerciseName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s]/gi, "")        // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, "_");           // Substitui espaços por underlines
}

/**
 * Gera a URL da imagem para um exercício específico
 * 
 * @param exerciseName Nome do exercício
 * @returns URL da imagem
 */
export const getExerciseImageUrl = (exerciseName: string): string => {
  if (!exerciseName) {
    return FALLBACK_IMAGE_URL;
  }

  const normalizedName = normalizeExerciseName(exerciseName);
  return `${SUPABASE_IMAGE_BASE_URL}/${normalizedName}.png`;
};

/**
 * Função para manipular erros de carregamento de imagens
 * @param event Evento de erro
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = event.currentTarget;
  if (img.src !== FALLBACK_IMAGE_URL) {
    img.src = FALLBACK_IMAGE_URL;
    img.classList.add("fallback-image");
  }
};
