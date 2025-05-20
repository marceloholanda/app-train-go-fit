
import { useOnboardingState } from '@/hooks/useOnboardingState';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';
import WorkoutPlanResult from '@/components/onboarding/WorkoutPlanResult';
import Quiz from '@/components/quiz/Quiz';
import RegistrationForm from '@/components/quiz/RegistrationForm';
import { quizQuestions } from '@/components/quiz/QuizData';
import { ChangeEvent } from 'react';

const Onboarding = () => {
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

  // Create an adapter function to convert our handler to match expected ChangeEvent signature
  const handleRegistrationChangeAdapter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleRegistrationChange(name, value);
  };

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
          onChange={handleRegistrationChangeAdapter}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
