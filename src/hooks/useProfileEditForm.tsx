
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { findBestWorkoutPlan } from '@/utils/workoutRecommendation';
import { QuizAnswers } from '@/utils/workoutRecommendation/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UseProfileEditFormProps {
  userData: any;
  onSave: (updatedUser: any) => void;
}

export const useProfileEditForm = ({ userData, onSave }: UseProfileEditFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    objective: userData?.profile?.objective || 'lose_weight',
    level: userData?.profile?.level || 'beginner',
    days_per_week: userData?.profile?.days_per_week || '3',
    environment: userData?.profile?.environment || 'gym',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const now = new Date().toISOString();
      
      // Atualizar perfil no Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          objective: formData.objective,
          level: formData.level,
          days_per_week: formData.days_per_week,
          environment: formData.environment,
          updated_at: now
        })
        .eq('id', currentUser.id);
        
      if (profileError) throw profileError;

      // Create answers object from form data
      const quizAnswers: QuizAnswers = {
        ...formData,
        age: userData?.profile?.age || 'unknown',
        weight: userData?.profile?.weight || 'unknown',
        height: userData?.profile?.height || 'unknown',
        motivation_type: userData?.profile?.motivation_type || 'unknown',
        training_barrier: userData?.profile?.training_barrier || 'unknown',
      };

      // Generate new workout plan based on updated answers
      const recommendedPlan = findBestWorkoutPlan(quizAnswers);
      
      // Transformar plan para compatibilidade com Json do Supabase
      const planJson = JSON.parse(JSON.stringify(recommendedPlan.plan));
      const tagsJson = JSON.parse(JSON.stringify(recommendedPlan.tags));
      
      // Verificar se já existe um plano de treino
      const { data: existingPlan, error: planCheckError } = await supabase
        .from('user_workouts')
        .select('id')
        .eq('user_id', currentUser.id)
        .maybeSingle();
        
      if (planCheckError && planCheckError.code !== 'PGRST116') {
        throw planCheckError;
      }
      
      if (existingPlan) {
        // Atualizar plano existente
        const { error: planUpdateError } = await supabase
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
            updated_at: now
          })
          .eq('id', existingPlan.id);
          
        if (planUpdateError) throw planUpdateError;
      } else {
        // Criar novo plano
        const { error: planInsertError } = await supabase
          .from('user_workouts')
          .insert({
            user_id: currentUser.id,
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
          
        if (planInsertError) throw planInsertError;
      }
      
      // Update user data with new profile and workout plan
      const updatedUserData = {
        ...userData,
        profile: {
          ...userData.profile,
          ...formData
        },
        workoutPlan: recommendedPlan
      };
      
      // Notify parent component about the update
      onSave(updatedUserData);
      
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil e plano de treino foram atualizados com sucesso!",
      });
      
      // Auto-redirect to dashboard to see the new plan
      localStorage.setItem('onboarding-completed', 'true');
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit
  };
};
