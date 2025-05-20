
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { findBestWorkoutPlan, generatePersonalizedMessage, QuizAnswers } from '@/utils/workoutRecommendation';
import { WorkoutPlan } from '@/data/workoutPlans';
import { useAuth } from '@/contexts/AuthContext';
import { weightRangeToNumber, heightRangeToNumber, ageRangeToNumber, saveUserData } from '@/utils/userUtils';
import { quizQuestions } from '@/components/quiz/QuizData';
import { supabase } from '@/integrations/supabase/client';

export const useOnboardingState = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, currentUser } = useAuth();

  // State variables
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
  });
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
    } else {
      setCurrentStep(quizQuestions.length); // Go to registration form
    }
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Verificamos que todas as perguntas foram respondidas
      const quizAnswers = answers as QuizAnswers;
      
      if (Object.keys(quizAnswers).length !== quizQuestions.length) {
        throw new Error("Por favor, responda todas as perguntas do quiz");
      }

      // Registro do usuário no Supabase
      await signup(registrationData.email, registrationData.password, {
        name: registrationData.name
      });

      // Encontrar o plano de treino mais adequado
      const recommendedPlan = findBestWorkoutPlan(quizAnswers);
      const message = generatePersonalizedMessage(quizAnswers, recommendedPlan);
      
      console.log("[TrainGO] Recommended workout plan:", recommendedPlan);
      
      // Convert weight and height ranges to approximate numbers for IMC calculation
      const weight_exact = weightRangeToNumber(quizAnswers.weight);
      const height_exact = heightRangeToNumber(quizAnswers.height);
      const age_exact = ageRangeToNumber(quizAnswers.age);
      
      // Pegar o ID do usuário atual
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        throw new Error("Erro ao obter ID do usuário");
      }

      // Salvar perfil do usuário no Supabase
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            nome: registrationData.name,
            objetivo: quizAnswers.objective,
            nivel_experiencia: quizAnswers.level,
            frequencia_treino: quizAnswers.days_per_week,
            local_treino: quizAnswers.environment,
          })
          .eq('user_id', userId);

        if (profileError) throw profileError;
      } catch (error: any) {
        console.error("[TrainGO] Erro ao atualizar perfil:", error.message);
      }

      // Salvar plano de treino no Supabase
      try {
        const { error: workoutError } = await supabase
          .from('user_workouts')
          .insert({
            user_id: userId,
            workout_plan: recommendedPlan
          });

        if (workoutError) throw workoutError;
      } catch (error: any) {
        console.error("[TrainGO] Erro ao salvar plano de treino:", error.message);
      }
      
      setWorkoutPlan(recommendedPlan);
      setPersonalizedMessage(message);
      
      toast({
        title: "Cadastro concluído!",
        description: "Seu plano de treino foi criado com sucesso.",
      });

      setShowResults(true);
    } catch (error: any) {
      console.error("[TrainGO] Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Não foi possível concluir o cadastro. Tente novamente.",
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
