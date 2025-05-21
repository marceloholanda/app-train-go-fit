
import { supabase } from '@/integrations/supabase/client';

/**
 * Obtém o nível do usuário com base nas estatísticas
 * @param userId ID do usuário
 * @returns Nível do usuário (beginner, intermediate, advanced)
 */
export const getUserLevel = async (userId: string): Promise<string> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('level')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error('Erro ao obter nível do usuário:', error);
      return 'beginner';
    }
    
    return data?.level || 'beginner';
  } catch (error) {
    console.error('Erro ao obter nível do usuário:', error);
    return 'beginner';
  }
};
