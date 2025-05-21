
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { findBestWorkoutPlan } from '@/utils/workoutRecommendation';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age_exact?: number;
  height_exact?: number;
  weight_exact?: number;
  objective?: string;
  level?: string;
  days_per_week?: string;
  environment?: string;
  motivation_type?: string;
  training_barrier?: string;
  avatar_url?: string;
}

export const useProfileData = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();
          
        if (profileError) {
          throw profileError;
        }

        if (profileData) {
          setProfile(profileData);
          console.log('[TrainGO] Profile data loaded:', profileData);
        }

        // Fetch premium status
        const { data: premiumData, error: premiumError } = await supabase
          .from('premium')
          .select('*')
          .eq('user_id', currentUser.id)
          .single();
          
        if (premiumError && premiumError.code !== 'PGRST116') {
          throw premiumError;
        }

        if (premiumData) {
          setIsPremium(premiumData.plan_type === 'pro');
          console.log('[TrainGO] Premium status:', premiumData.plan_type);
        }
      } catch (error) {
        console.error('[TrainGO] Error fetching profile:', error);
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar os dados do seu perfil.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser, toast]);

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!currentUser || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', currentUser.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updatedData } : null);

      toast({
        title: "Perfil atualizado",
        description: "Seus dados foram salvos com sucesso!",
      });

      return true;
    } catch (error) {
      console.error('[TrainGO] Error updating profile:', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível salvar suas alterações.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateWorkoutPlan = async (quizAnswers: any) => {
    if (!currentUser) return false;

    try {
      // Generate new workout plan based on updated answers
      const newWorkoutPlan = findBestWorkoutPlan(quizAnswers);
      
      // Check if a workout plan already exists for this user
      const { data: existingPlan } = await supabase
        .from('user_workouts')
        .select('*')
        .eq('user_id', currentUser.id)
        .maybeSingle();
      
      if (existingPlan) {
        // Update existing plan
        const { error } = await supabase
          .from('user_workouts')
          .update({
            plan_id: newWorkoutPlan.id,
            name: newWorkoutPlan.name,
            description: newWorkoutPlan.description || '',
            days: newWorkoutPlan.days,
            level: newWorkoutPlan.level,
            environment: newWorkoutPlan.environment,
            objective: newWorkoutPlan.objective,
            tags: newWorkoutPlan.tags || [],
            plan: newWorkoutPlan.plan,
            updated_at: new Date()
          })
          .eq('id', existingPlan.id);
          
        if (error) throw error;
      } else {
        // Create new plan
        const { error } = await supabase
          .from('user_workouts')
          .insert({
            user_id: currentUser.id,
            plan_id: newWorkoutPlan.id,
            name: newWorkoutPlan.name,
            description: newWorkoutPlan.description || '',
            days: newWorkoutPlan.days,
            level: newWorkoutPlan.level,
            environment: newWorkoutPlan.environment,
            objective: newWorkoutPlan.objective,
            tags: newWorkoutPlan.tags || [],
            plan: newWorkoutPlan.plan
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Plano atualizado",
        description: "Seu plano de treino foi atualizado com sucesso!",
      });
      
      return true;
    } catch (error) {
      console.error('[TrainGO] Error updating workout plan:', error);
      toast({
        title: "Erro ao atualizar plano",
        description: "Não foi possível atualizar seu plano de treino.",
        variant: "destructive",
      });
      return false;
    }
  };

  const upgradeToPremium = async () => {
    if (!currentUser) return false;

    try {
      const { error } = await supabase
        .from('premium')
        .update({ 
          plan_type: 'pro',
          subscribed_at: new Date(),
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
          updated_at: new Date()
        })
        .eq('user_id', currentUser.id);

      if (error) throw error;

      setIsPremium(true);

      toast({
        title: "Upgrade realizado",
        description: "Parabéns! Você agora é um usuário premium.",
      });

      return true;
    } catch (error) {
      console.error('[TrainGO] Error upgrading to premium:', error);
      toast({
        title: "Erro no upgrade",
        description: "Não foi possível atualizar seu plano.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    profile,
    isLoading,
    isPremium,
    updateProfile,
    updateWorkoutPlan,
    upgradeToPremium
  };
};
