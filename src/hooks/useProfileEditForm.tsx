
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { findBestWorkoutPlan } from '@/utils/workoutRecommendation';
import { QuizAnswers } from '@/utils/workoutRecommendation/types';

interface UseProfileEditFormProps {
  userData: any;
  onSave: (updatedUser: any) => void;
}

export const useProfileEditForm = ({ userData, onSave }: UseProfileEditFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
      
      // Save updated user data
      localStorage.setItem('traingo-user', JSON.stringify(updatedUserData));
      
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
