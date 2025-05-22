
import { useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { QuizAnswers } from '@/utils/workoutRecommendation/types';
import { useAuth } from '@/contexts/AuthContext';
import { quizQuestions } from '@/components/quiz/QuizData';
import { 
  processRegistration, 
  updateUserProfile, 
  createOrUpdateWorkoutPlan, 
  markUserAsOnboarded,
  generateWorkoutPlan
} from './onboardingUtils';
import { initialOnboardingState, onboardingReducer } from './onboardingReducer';

export const useOnboardingState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, register } = useAuth();
  
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState);
  
  // Quiz navigation handlers
  const handleOptionSelect = useCallback((questionId: keyof QuizAnswers, value: string) => {
    dispatch({ type: 'SET_ANSWER', payload: { questionId, value } });
    
    // Automatic advance to next question unless it's the last one
    if (state.currentStep < quizQuestions.length - 1) {
      setTimeout(() => {
        dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
      }, 500);
    }
  }, [state.currentStep]);

  const handlePreviousStep = useCallback(() => {
    dispatch({ type: 'SET_STEP', payload: Math.max(0, state.currentStep - 1) });
  }, [state.currentStep]);

  const handleRegistrationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ 
      type: 'SET_REGISTATION_DATA', 
      payload: { [name]: value } 
    });
  }, []);

  // Form submission
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) e.preventDefault();
    
    dispatch({ type: 'SET_IS_SUBMITTING', payload: true });

    try {
      // Verificamos que todas as perguntas foram respondidas
      const quizAnswers = state.answers as QuizAnswers;
      
      if (Object.keys(quizAnswers).length !== quizQuestions.length) {
        throw new Error("Por favor, responda todas as perguntas do quiz");
      }

      // Generate workout plan and personalized message
      const { recommendedPlan, message } = generateWorkoutPlan(quizAnswers);
      
      let userId = currentUser?.id;
      
      // Se não estiver autenticado, criar uma conta com as informações do formulário
      if (!userId) {
        if (!state.registrationData.email || !state.registrationData.password) {
          throw new Error("Por favor, preencha seu email e senha para continuar");
        }
        
        // Usar a função register do AuthContext para criar o usuário
        try {
          // Garantir que o registro retorna corretamente e armazenar o resultado
          const registerResult = await register(
            state.registrationData.email,
            state.registrationData.password,
            state.registrationData.name || state.registrationData.email.split('@')[0]
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
      
      // Update profile
      await updateUserProfile(userId, quizAnswers);
      
      // Create or update workout plan
      await createOrUpdateWorkoutPlan(userId, recommendedPlan);
      
      // Mark user as onboarded
      await markUserAsOnboarded();

      // Update state with workout plan and message
      dispatch({ type: 'SET_WORKOUT_PLAN', payload: recommendedPlan });
      dispatch({ type: 'SET_PERSONALIZED_MESSAGE', payload: message });
      
      toast({
        title: "Perfil criado!",
        description: "Seu plano de treino foi criado com sucesso.",
      });

      // Show results screen
      dispatch({ type: 'SET_SHOW_RESULTS', payload: true });
      
    } catch (error: any) {
      console.error("[TrainGO] Erro no onboarding:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível completar o onboarding. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
    }
  }, [state.answers, state.registrationData, currentUser, register, toast]);

  return {
    currentStep: state.currentStep,
    answers: state.answers,
    registrationData: state.registrationData,
    isSubmitting: state.isSubmitting,
    workoutPlan: state.workoutPlan,
    personalizedMessage: state.personalizedMessage,
    showResults: state.showResults,
    quizQuestions,
    handleOptionSelect,
    handleRegistrationChange,
    handlePreviousStep,
    handleSubmit
  };
};
