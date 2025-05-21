
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém o nível atual de consistência do usuário
 */
export const getUserLevel = () => {
  // Valores padrão para o nível inicial
  return {
    level: "Iniciante", 
    nextLevel: "Intermediário",
    progress: 15
  };
};

