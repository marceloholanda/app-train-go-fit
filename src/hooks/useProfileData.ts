
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
  const { currentUser, session } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Always get fresh user session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const activeUser = currentSession?.user || currentUser;
      
      if (!activeUser) {
        console.log('[TrainGO] No user found, clearing profile data');
        setProfile(null);
        setIsPremium(false);
        setIsLoading(false);
        return;
      }

      console.log('[TrainGO] Fetching profile data for user:', activeUser.id);

      try {
        setIsLoading(true);
        
        // Fetch profile data with explicit user ID
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', activeUser.id)
          .single();
          
        if (profileError) {
          console.error('[TrainGO] Error fetching profile:', profileError);
          if (profileError.code !== 'PGRST116') { // Not found is ok for new users
            throw profileError;
          }
        }

        if (profileData) {
          console.log('[TrainGO] Profile data loaded for user:', activeUser.id, profileData.name);
          setProfile(profileData);
        } else {
          console.log('[TrainGO] No profile found for user:', activeUser.id);
          setProfile(null);
        }

        // Fetch premium status with explicit user ID
        const { data: premiumData, error: premiumError } = await supabase
          .from('premium')
          .select('*')
          .eq('user_id', activeUser.id)
          .single();
          
        if (premiumError && premiumError.code !== 'PGRST116') {
          console.error('[TrainGO] Error fetching premium status:', premiumError);
          throw premiumError;
        }

        if (premiumData) {
          setIsPremium(premiumData.plan_type === 'pro');
          console.log('[TrainGO] Premium status for user', activeUser.id, ':', premiumData.plan_type);
        } else {
          setIsPremium(false);
          console.log('[TrainGO] No premium data found for user:', activeUser.id);
        }
      } catch (error) {
        console.error('[TrainGO] Error fetching profile data for user', activeUser.id, ':', error);
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
  }, [currentUser, session, toast]);

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    // Get fresh session
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const activeUser = currentSession?.user || currentUser;
    
    if (!activeUser || !profile) {
      console.error('[TrainGO] No user or profile found for update');
      return false;
    }

    console.log('[TrainGO] Updating profile for user:', activeUser.id);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', activeUser.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updatedData } : null);

      console.log('[TrainGO] Profile updated successfully for user:', activeUser.id);
      toast({
        title: "Perfil atualizado",
        description: "Seus dados foram salvos com sucesso!",
      });

      return true;
    } catch (error) {
      console.error('[TrainGO] Error updating profile for user', activeUser.id, ':', error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível salvar suas alterações.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateWorkoutPlan = async (quizAnswers: any) => {
    // Get fresh session
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const activeUser = currentSession?.user || currentUser;
    
    if (!activeUser) {
      console.error('[TrainGO] No user found for workout plan update');
      return false;
    }

    console.log('[TrainGO] Updating workout plan for user:', activeUser.id);

    try {
      // Generate new workout plan based on updated answers
      const recommendedPlan = findBestWorkoutPlan(quizAnswers);
      
      // Transformar plan para compatibilidade com Json do Supabase
      const planJson = JSON.parse(JSON.stringify(recommendedPlan.plan));
      const tagsJson = JSON.parse(JSON.stringify(recommendedPlan.tags));
      
      // Check if a workout plan already exists for this user
      const { data: existingPlan } = await supabase
        .from('user_workouts')
        .select('*')
        .eq('user_id', activeUser.id)
        .maybeSingle();
      
      if (existingPlan) {
        // Update existing plan
        const { error } = await supabase
          .from('user_workouts')
          .update({
            plan_id: recommendedPlan.id,
            name: recommendedPlan.name,
            description: recommendedPlan.description || '',
            days: recommendedPlan.days,
            level: recommendedPlan.level,
            environment: recommendedPlan.environment,
            objective: recommendedPlan.objective,
            tags: tagsJson,
            plan: planJson,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingPlan.id);
          
        if (error) throw error;
        console.log('[TrainGO] Workout plan updated for user:', activeUser.id);
      } else {
        // Create new plan
        const { error } = await supabase
          .from('user_workouts')
          .insert({
            user_id: activeUser.id,
            plan_id: recommendedPlan.id,
            name: recommendedPlan.name,
            description: recommendedPlan.description || '',
            days: recommendedPlan.days,
            level: recommendedPlan.level,
            environment: recommendedPlan.environment,
            objective: recommendedPlan.objective,
            tags: tagsJson,
            plan: planJson
          });
          
        if (error) throw error;
        console.log('[TrainGO] New workout plan created for user:', activeUser.id);
      }
      
      toast({
        title: "Plano atualizado",
        description: "Seu plano de treino foi atualizado com sucesso!",
      });
      
      return true;
    } catch (error) {
      console.error('[TrainGO] Error updating workout plan for user', activeUser.id, ':', error);
      toast({
        title: "Erro ao atualizar plano",
        description: "Não foi possível atualizar seu plano de treino.",
        variant: "destructive",
      });
      return false;
    }
  };

  const upgradeToPremium = async () => {
    // Get fresh session
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const activeUser = currentSession?.user || currentUser;
    
    if (!activeUser) {
      console.error('[TrainGO] No user found for premium upgrade');
      return false;
    }

    console.log('[TrainGO] Upgrading to premium for user:', activeUser.id);

    try {
      const now = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      const { error } = await supabase
        .from('premium')
        .update({ 
          plan_type: 'pro',
          subscribed_at: now.toISOString(),
          expires_at: nextYear.toISOString(), 
          updated_at: now.toISOString()
        })
        .eq('user_id', activeUser.id);

      if (error) throw error;

      setIsPremium(true);
      console.log('[TrainGO] Premium upgrade successful for user:', activeUser.id);

      toast({
        title: "Upgrade realizado",
        description: "Parabéns! Você agora é um usuário premium.",
      });

      return true;
    } catch (error) {
      console.error('[TrainGO] Error upgrading to premium for user', activeUser.id, ':', error);
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
