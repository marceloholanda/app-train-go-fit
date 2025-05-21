
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingState } from '@/hooks/useOnboardingState';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import WorkoutPlanResult from '@/components/onboarding/WorkoutPlanResult';
import Quiz from '@/components/quiz/Quiz';
import RegistrationForm from '@/components/quiz/RegistrationForm';
import { quizQuestions } from '@/components/quiz/QuizData';
import { useAuth } from '@/contexts/AuthContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  const {
    currentStep,
    answers,
    registrationData,
    isSubmitting,
    workoutPlan,
    personalizedMessage,
    showResults,
    handleOptionSelect,
    handleRegistrationChange,
    handlePreviousStep,
    handleSubmit
  } = useOnboardingState();

  // Se usuário não estiver autenticado, permitir continuar mesmo assim
  // O sistema deve criar uma conta para o usuário no final do onboarding
  useEffect(() => {
    // Apenas para debug
    console.log("[TrainGO] Onboarding: Auth state", { currentUser, isLoading });
  }, [currentUser, isLoading]);

  const isLastQuestion = currentStep === quizQuestions.length;

  // Show results screen when the workout plan is generated
  if (showResults && workoutPlan) {
    return (
      <OnboardingLayout>
        <WorkoutPlanResult 
          workoutPlan={workoutPlan}
          personalizedMessage={personalizedMessage}
        />
      </OnboardingLayout>
    );
  }

  // Show quiz or registration form based on current step
  return (
    <OnboardingLayout 
      currentStep={currentStep} 
      totalSteps={quizQuestions.length}
    >
      {!isLastQuestion ? (
        <Quiz
          questions={quizQuestions}
          answers={answers}
          onAnswerChange={handleOptionSelect}
          currentStep={currentStep}
          onPrevStep={handlePreviousStep}
        />
      ) : (
        <RegistrationForm
          data={registrationData}
          onChange={handleRegistrationChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
