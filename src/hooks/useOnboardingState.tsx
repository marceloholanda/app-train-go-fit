
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { findBestWorkoutPlan, generatePersonalizedMessage, QuizAnswers } from '@/utils/workoutRecommendation';
import { WorkoutPlan } from '@/data/workoutPlans';
import { useAuth } from '@/contexts/AuthContext';
import { weightRangeToNumber, heightRangeToNumber, ageRangeToNumber } from '@/utils/userUtils';
import { quizQuestions } from '@/components/quiz/QuizData';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // State variables
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Quiz navigation handlers
  const handleOptionSelect = (questionId: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Automatic advance to next question unless it's the last one
    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para continuar.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Verificamos que todas as perguntas foram respondidas
      const quizAnswers = answers as QuizAnswers;
      
      if (Object.keys(quizAnswers).length !== quizQuestions.length) {
        throw new Error("Por favor, responda todas as perguntas do quiz");
      }

      // Encontrar o plano de treino mais adequado
      const recommendedPlan = findBestWorkoutPlan(quizAnswers);
      const message = generatePersonalizedMessage(quizAnswers, recommendedPlan);
      
      console.log("[TrainGO] Recommended workout plan:", recommendedPlan);
      
      // Convert weight and height ranges to approximate numbers for IMC calculation
      const weight_exact = weightRangeToNumber(quizAnswers.weight);
      const height_exact = heightRangeToNumber(quizAnswers.height);
      const age_exact = ageRangeToNumber(quizAnswers.age);
      
      // Atualizar perfil do usuário no Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          ...quizAnswers,
          weight_exact,
          height_exact,
          age_exact,
          updated_at: new Date()
        })
        .eq('id', currentUser.id);
        
      if (profileError) throw profileError;
      
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
            tags: recommendedPlan.tags || [],
            plan: recommendedPlan.plan,
            updated_at: new Date()
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
            tags: recommendedPlan.tags || [],
            plan: recommendedPlan.plan
          });
          
        if (planInsertError) throw planInsertError;
      }
      
      // Atualizar metadados do usuário para marcar onboarding como concluído
      await supabase.auth.updateUser({
        data: {
          onboarded: true
        }
      });

      setWorkoutPlan(recommendedPlan);
      setPersonalizedMessage(message);
      
      toast({
        title: "Perfil criado!",
        description: "Seu plano de treino foi criado com sucesso.",
      });

      setShowResults(true);
      
      // Quando o onboarding for concluído, redirecionar para o dashboard
      localStorage.setItem('onboarding-completed', 'true');
    } catch (error: any) {
      console.error("[TrainGO] Erro no onboarding:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível completar o onboarding. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    answers,
    isSubmitting,
    workoutPlan,
    personalizedMessage,
    showResults,
    quizQuestions,
    handleOptionSelect,
    handlePreviousStep,
    handleSubmit
  };
};
