
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { getRecommendedWorkoutPlan } from '@/utils/workoutRecommendation';
import { generateWorkoutPlanType } from '@/utils/workoutRecommendation/types';

// Define a proper JSON type that Supabase can accept
type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[];
type Json = JsonValue;

export interface OnboardingFormData {
  name: string;
  goal: string;
  experience: string;
  frequency: string;
  location: string;
}

export const useOnboardingState = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    name: '',
    goal: '',
    experience: '',
    frequency: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<any>(null);
  // Add missing state variables needed by Onboarding.tsx
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  const updateFormData = useCallback((data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  }, []);

  // Add the missing handler functions
  const handleOptionSelect = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    nextStep();
  }, [nextStep]);

  const handleRegistrationChange = useCallback((field: string, value: string) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handlePreviousStep = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const generateWorkoutPlan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const plan = await getRecommendedWorkoutPlan({
        objetivo: formData.goal,
        nivel: formData.experience,
        frequencia: formData.frequency,
        local: formData.location
      });
      
      setWorkoutPlan(plan);
      if (plan.personalizedMessage) {
        setPersonalizedMessage(plan.personalizedMessage);
      }
      setShowResults(true);
      return plan;
    } catch (err) {
      console.error('Error generating workout plan:', err);
      setError('Não foi possível gerar o plano de treino. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const saveUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    setIsSubmitting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session found');
      }
      
      // Save profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          nome: formData.name,
          objetivo: formData.goal,
          nivel_experiencia: formData.experience,
          frequencia_treino: formData.frequency,
          local_treino: formData.location
        });
      
      if (profileError) throw profileError;
      
      // Save workout plan if available
      if (workoutPlan) {
        // Convert workout plan to a format that can be stored as JSON
        const workoutPlanJson = JSON.parse(JSON.stringify(workoutPlan)) as Json;
        
        const { error: workoutError } = await supabase
          .from('user_workouts')
          .upsert({
            user_id: session.user.id,
            workout_plan: workoutPlanJson
          });
        
        if (workoutError) throw workoutError;
      }
      
      // Mark onboarding as completed
      localStorage.setItem('onboarding-completed', 'true');
      
      // Navigate to dashboard
      navigate('/dashboard');
      
      toast({
        title: "Perfil criado com sucesso!",
        description: "Bem-vindo(a) ao TrainGO. Seu plano de treino está pronto."
      });
      
      return true;
    } catch (err: any) {
      console.error('Error saving user profile:', err);
      setError(err.message || 'Não foi possível salvar seu perfil. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  }, [formData, workoutPlan, navigate]);

  const handleSubmit = useCallback(() => {
    generateWorkoutPlan();
  }, [generateWorkoutPlan]);

  return {
    step,
    formData,
    loading,
    error,
    workoutPlan,
    nextStep,
    prevStep,
    updateFormData,
    generateWorkoutPlan,
    saveUserProfile,
    // Add the missing properties needed by Onboarding.tsx
    answers,
    registrationData,
    isSubmitting,
    personalizedMessage,
    showResults,
    handleOptionSelect,
    handleRegistrationChange,
    handlePreviousStep,
    handleSubmit,
    currentStep: step - 1 // Convert 1-based to 0-based index
  };
};

export default useOnboardingState;
