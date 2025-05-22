import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingState } from '@/hooks/useOnboardingState';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import WorkoutPlanResult from '@/components/onboarding/WorkoutPlanResult';
import Quiz from '@/components/quiz/Quiz';
import RegistrationForm from '@/components/quiz/RegistrationForm';
import { quizQuestions } from '@/components/quiz/QuizData';
import { useAuth } from '@/contexts/auth';

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
    handleSubmit,
    handleQuizCompleted
  } = useOnboardingState();

  // Debug logs
  useEffect(() => {
    console.log("[TrainGO] Onboarding: Auth state", { currentUser, isLoading });
    console.log("[TrainGO] Onboarding: Current step", currentStep);
    console.log("[TrainGO] Onboarding: Show results", showResults);
  }, [currentUser, isLoading, currentStep, showResults]);

  // Redirect to dashboard if user is already authenticated and has completed onboarding
  useEffect(() => {
    if (currentUser && !isLoading && currentUser.user_metadata?.onboarded) {
      console.log("[TrainGO] Redirecionando para dashboard, usuário já fez onboarding");
      navigate('/dashboard');
    }
  }, [currentUser, isLoading, navigate]);

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
          onCompleted={handleQuizCompleted}
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
