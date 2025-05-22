
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { findBestWorkoutPlan, generatePersonalizedMessage } from '@/utils/workoutRecommendation';
import { QuizAnswers } from '@/utils/workoutRecommendation/types';
import { useAuth } from '@/contexts/AuthContext';
import { weightRangeToNumber, heightRangeToNumber, ageRangeToNumber } from '@/utils/userUtils';
import { quizQuestions } from '@/components/quiz/QuizData';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, register } = useAuth();

  // State variables
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<any | null>(null);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>({});

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

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) e.preventDefault();
    
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
      
      let userId = currentUser?.id;
      
      // Se não estiver autenticado, criar uma conta com as informações do formulário
      if (!userId) {
        if (!registrationData.email || !registrationData.password) {
          throw new Error("Por favor, preencha seu email e senha para continuar");
        }
        
        console.log("[TrainGO] Registrando novo usuário:", registrationData.email);
        
        // Usar a função register do AuthContext para criar o usuário
        try {
          // Garantir que o registro retorna corretamente e armazenar o resultado
          const registerResult = await register(
            registrationData.email,
            registrationData.password,
            registrationData.name || registrationData.email.split('@')[0]
          );
          
          // Verificar se temos dados do usuário após o registro
          if (!registerResult || !registerResult.data || !registerResult.data.user) {
            throw new Error("Não foi possível criar sua conta. Tente novamente.");
          }
          
          // Extrair o ID do usuário do resultado do registro
          userId = registerResult.data.user.id;
          
          console.log("[TrainGO] Usuário registrado com sucesso:", userId);
        } catch (error: any) {
          console.error("[TrainGO] Erro ao registrar usuário:", error);
          throw new Error("Erro ao criar conta: " + (error.message || "Tente novamente"));
        }
      }
      
      // A partir daqui, temos certeza que userId existe
      if (!userId) {
        throw new Error("Erro durante o processo de registro. Por favor, tente novamente.");
      }
      
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
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
        
      if (profileError) {
        console.error("[TrainGO] Erro ao atualizar perfil:", profileError);
        throw profileError;
      }
      
      // Verificar se já existe um plano de treino
      const { data: existingPlan, error: planCheckError } = await supabase
        .from('user_workouts')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
        
      if (planCheckError && planCheckError.code !== 'PGRST116') {
        console.error("[TrainGO] Erro ao verificar plano existente:", planCheckError);
        throw planCheckError;
      }
      
      // Transformar plan para compatibilidade com Json do Supabase
      const planJson = JSON.parse(JSON.stringify(recommendedPlan.plan));
      const tagsJson = JSON.parse(JSON.stringify(recommendedPlan.tags));
      
      if (existingPlan) {
        // Atualizar plano existente
        console.log("[TrainGO] Atualizando plano existente para usuário:", userId);
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
            updated_at: new Date().toISOString()
          })
          .eq('id', existingPlan.id);
          
        if (planUpdateError) {
          console.error("[TrainGO] Erro ao atualizar plano:", planUpdateError);
          throw planUpdateError;
        }
      } else {
        // Criar novo plano
        console.log("[TrainGO] Criando novo plano para usuário:", userId);
        const { error: planInsertError } = await supabase
          .from('user_workouts')
          .insert({
            user_id: userId,
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
          
        if (planInsertError) {
          console.error("[TrainGO] Erro ao criar plano:", planInsertError);
          throw planInsertError;
        }
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

      // Exibir o plano de treino após o registro bem-sucedido
      setShowResults(true);
      
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
    registrationData,
    isSubmitting,
    workoutPlan,
    personalizedMessage,
    showResults,
    quizQuestions,
    handleOptionSelect,
    handleRegistrationChange,
    handlePreviousStep,
    handleSubmit
  };
};
