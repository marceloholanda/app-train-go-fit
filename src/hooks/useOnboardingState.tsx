
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
  const { signup } = useAuth();

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

      // Encontrar o plano de treino mais adequado
      const recommendedPlan = findBestWorkoutPlan(quizAnswers);
      const message = generatePersonalizedMessage(quizAnswers, recommendedPlan);
      
      console.log("[TrainGO] Recommended workout plan:", recommendedPlan);
      
      // Convert weight and height ranges to approximate numbers for IMC calculation
      const weight_exact = weightRangeToNumber(quizAnswers.weight);
      const height_exact = heightRangeToNumber(quizAnswers.height);
      const age_exact = ageRangeToNumber(quizAnswers.age);
      
      // 1. Criar o usuário no Supabase Auth
      const user = await signup(registrationData.email, registrationData.password);
      
      if (!user) {
        throw new Error("Erro ao criar usuário");
      }
      
      // 2. Criar perfil no Supabase
      const profileData = {
        user_id: user.id,
        name: registrationData.name,
        email: registrationData.email,
        objective: quizAnswers.objective,
        level: quizAnswers.level,
        days_per_week: quizAnswers.days_per_week,
        environment: quizAnswers.environment,
        age: quizAnswers.age,
        weight: quizAnswers.weight,
        height: quizAnswers.height,
        age_exact: age_exact,
        weight_exact: weight_exact,
        height_exact: height_exact,
        motivation_type: quizAnswers.motivation_type,
        training_barrier: quizAnswers.training_barrier
      };

      const { data: profileResult, error: profileError } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();
      
      if (profileError) {
        throw profileError;
      }
      
      // 3. Inserir o plano de treino na tabela user_workouts
      const workoutData = {
        user_id: user.id,
        data: recommendedPlan
      };
      
      const { error: workoutError } = await supabase
        .from('user_workouts')
        .insert([workoutData]);
      
      if (workoutError) {
        throw workoutError;
      }
      
      // 4. Inicializar o progresso do usuário na tabela progress
      const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const progressData = {
        user_id: user.id,
        workout_date: today,
        completed_exercises: [] as any[],
        streak: 0
      };
      
      const { error: progressError } = await supabase
        .from('progress')
        .insert([progressData]);
      
      if (progressError) {
        throw progressError;
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
