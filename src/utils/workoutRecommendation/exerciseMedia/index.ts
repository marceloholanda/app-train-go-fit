
/**
 * Ponto de entrada para o módulo de mídia de exercícios
 * Toda a lógica relacionada a imagens foi removida conforme solicitado
 */

import { exerciseVideoMap } from './videoMap';
import { exerciseVideoMapPart2 } from './videoMapPart2';

// Combinando os mapas de vídeos para uso interno
const combinedVideoMap = { ...exerciseVideoMap, ...exerciseVideoMapPart2 };

/**
 * Função para obter a URL do vídeo de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL do vídeo ou null se não existir
 */
export const getExerciseVideoUrl = (exerciseName: string): string | null => {
  return combinedVideoMap[exerciseName] || null;
};

// Expor o mapa combinado para acesso direto se necessário
export const allExerciseVideos = combinedVideoMap;

// Re-exportar constantes úteis
export { FALLBACK_IMAGE_URL } from './supabase';
