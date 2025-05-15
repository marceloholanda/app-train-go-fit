
/**
 * Ponto de entrada para o módulo de mídia de exercícios
 * Este arquivo combina todos os mapas e expõe funções de utilidade para acesso fácil
 */

import { exerciseImageMap } from './imageMap';
import { exerciseImageMapPart2 } from './imageMapPart2';
import { exerciseVideoMap } from './videoMap';
import { exerciseVideoMapPart2 } from './videoMapPart2';
import { SUPABASE_PUBLIC_URL, FALLBACK_IMAGE_URL } from './constants';

// Combinando os mapas para uso interno
const combinedImageMap = { ...exerciseImageMap, ...exerciseImageMapPart2 };
const combinedVideoMap = { ...exerciseVideoMap, ...exerciseVideoMapPart2 };

/**
 * Função para obter a URL da imagem de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL da imagem específica ou URL construída automaticamente
 */
export const getExerciseImageUrl = (exerciseName: string): string => {
  // Verifica se existe uma imagem específica no mapeamento manual (temporariamente vazio)
  if (combinedImageMap[exerciseName]) {
    return combinedImageMap[exerciseName];
  }
  
  // Constrói URL automática baseada no nome do exercício
  // Formato padronizado para acesso público no Supabase Storage
  const formattedName = exerciseName.replace(/ /g, '_').normalize('NFD');
  return `${SUPABASE_PUBLIC_URL}/images/${encodeURIComponent(formattedName)}.png`;
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
