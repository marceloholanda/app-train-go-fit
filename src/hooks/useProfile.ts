
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Definir a interface para o perfil do usuário
export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  objective?: string;
  level?: string;
  days_per_week?: string;
  environment?: string;
  age?: string;
  weight?: string;
  height?: string;
  age_exact?: number;
  weight_exact?: number;
  height_exact?: number;
  motivation_type?: string;
  training_barrier?: string;
  created_at?: string;
  updated_at?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Buscar perfil do usuário quando o componente montar ou o usuário mudar
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', currentUser.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfile(data as UserProfile);
        } else {
          console.log('Nenhum perfil encontrado para o usuário');
          setProfile(null);
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        toast({
          title: 'Erro ao carregar perfil',
          description: 'Não foi possível carregar seus dados de perfil.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, toast]);

  // Função para atualizar o perfil do usuário
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não está autenticado',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', currentUser.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...data } : data);
      
      toast({
        title: 'Perfil atualizado',
        description: 'Seus dados foram atualizados com sucesso.',
      });
      
      return data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar seus dados de perfil.',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Função para criar um novo perfil
  const createProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser?.id) {
      toast({
        title: 'Erro',
        description: 'Usuário não está autenticado',
        variant: 'destructive',
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ ...profileData, user_id: currentUser.id }])
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      
      toast({
        title: 'Perfil criado',
        description: 'Seu perfil foi criado com sucesso.',
      });
      
      return data;
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      toast({
        title: 'Erro ao criar perfil',
        description: 'Não foi possível criar seu perfil.',
        variant: 'destructive',
      });
      return null;
    }
  };

  return {
    profile,
    isLoading,
    updateProfile,
    createProfile,
    setProfile,
  };
};
