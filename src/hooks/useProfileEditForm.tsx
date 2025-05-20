
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { findBestWorkoutPlan } from '@/utils/workoutRecommendation';
import { QuizAnswers } from '@/utils/workoutRecommendation/types';
import { useAuth } from '@/contexts/AuthContext';
import { saveWorkoutPlanToSupabase } from '@/utils/workoutUtils/progress';
import { supabase } from '@/integrations/supabase/client'; // Added missing import

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
    setIsSubmitting(true);

    try {
      // Verificar se o usuário é premium antes de permitir a atualização
      const isPremium = userData?.premium?.active || false;
      
      if (!isPremium) {
        toast({
          title: "Recurso Premium",
          description: "A atualização do plano de treino é exclusiva para usuários premium.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      if (!currentUser?.id) {
        toast({
          title: "Erro de Autenticação",
          description: "Você precisa estar logado para atualizar seu perfil.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

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
      const newWorkoutPlan = findBestWorkoutPlan(quizAnswers);
      
      // Update user data with new profile and workout plan
      const updatedUserData = {
        ...userData,
        profile: {
          ...userData.profile,
          ...formData
        },
        workoutPlan: newWorkoutPlan
      };
      
      // Atualizar o perfil no Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          objective: formData.objective,
          level: formData.level,
          days_per_week: formData.days_per_week,
          environment: formData.environment,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', currentUser.id);
      
      if (profileError) {
        throw profileError;
      }
      
      // Salvar o plano de treino atualizado no Supabase
      await saveWorkoutPlanToSupabase(currentUser.id, newWorkoutPlan);
      
      // Save updated user data in localStorage for current session
      localStorage.setItem('traingo-user', JSON.stringify(updatedUserData));
      
      // Notify parent component about the update
      onSave(updatedUserData);
      
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil e plano de treino foram atualizados com sucesso!",
      });
      
      // Auto-redirect to dashboard to see the new plan
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: error.message || "Não foi possível atualizar seu perfil. Tente novamente.",
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
