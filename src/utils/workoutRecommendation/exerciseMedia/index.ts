
/**
 * Ponto de entrada para o módulo de mídia de exercícios
 * Este arquivo combina todos os mapas e expõe funções de utilidade para acesso fácil
 */

import { exerciseImageMap } from './imageMap';
import { exerciseImageMapPart2 } from './imageMapPart2';
import { exerciseVideoMap } from './videoMap';
import { exerciseVideoMapPart2 } from './videoMapPart2';
import { FALLBACK_IMAGE_URL } from './constants';

// Combinando os mapas para uso interno
const combinedImageMap = { ...exerciseImageMap, ...exerciseImageMapPart2 };
const combinedVideoMap = { ...exerciseVideoMap, ...exerciseVideoMapPart2 };

/**
 * Função para obter a URL da imagem de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL da imagem específica ou URL de fallback
 */
export const getExerciseImageUrl = (exerciseName: string): string => {
  // Verifica se existe uma imagem específica para o exercício
  if (combinedImageMap[exerciseName]) {
    return combinedImageMap[exerciseName];
  }
  
  // Fallback para URL genérica baseada no nome do exercício
  return `${FALLBACK_IMAGE_URL}?${encodeURIComponent(exerciseName.replace(' ', '-'))}`;
};

/**
 * Função para obter a URL do vídeo de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL do vídeo ou null se não existir
 */
export const getExerciseVideoUrl = (exerciseName: string): string | null => {
  return combinedVideoMap[exerciseName] || null;
};

// Expor os mapas combinados para acesso direto se necessário
export const allExerciseImages = combinedImageMap;
export const allExerciseVideos = combinedVideoMap;

// Re-exportar constantes úteis
export * from './constants';

