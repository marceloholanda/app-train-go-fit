
/**
 * Mapeamento de exercícios para URLs de imagens específicas
 * Este arquivo centraliza as associações entre exercícios e suas imagens correspondentes
 */

// Mapeamento de nomes de exercícios para URLs de imagens
export const exerciseImageMap: Record<string, string> = {
  "Abdominal bicicleta": "https://ipzrgpmsmasuzlaomuxj.supabase.co/storage/v1/object/sign/images/Abdominal_bicicleta.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2U2MGFmMDBhLTg5OGEtNDFjZC1iODJmLWY5ZWU0MzA3OWMzNiJ9.eyJ1cmwiOiJpbWFnZXMvQWJkb21pbmFsX2JpY2ljbGV0YS5wbmciLCJpYXQiOjE3NDcxMDExMjEsImV4cCI6MTc2OTI5NTgxMTIxfQ.G_oXIGomaWs9oSD890DKRt-QLtmluUEnaLNrWgWA888",
  // Aqui você pode adicionar mais mapeamentos no futuro para outros exercícios
};

/**
 * Função para obter a URL da imagem de um exercício
 * @param exerciseName Nome do exercício
 * @returns URL da imagem específica ou URL de fallback
 */
export const getExerciseImageUrl = (exerciseName: string): string => {
  // Verifica se existe uma imagem específica para o exercício
  if (exerciseImageMap[exerciseName]) {
    return exerciseImageMap[exerciseName];
  }
  
  // Fallback para URL genérica baseada no nome do exercício
  return `https://source.unsplash.com/random/400x300/?${encodeURIComponent(exerciseName.replace(' ', '-'))}&fitness`;
};
