
import { QuizAnswers } from '@/utils/workoutRecommendation/types';

export interface RegistrationData {
  email: string;
  password: string;
  name?: string;
}

export interface OnboardingState {
  currentStep: number;
  answers: Partial<QuizAnswers>;
  isSubmitting: boolean;
  workoutPlan: any | null;
  personalizedMessage: string;
  showResults: boolean;
  registrationData: RegistrationData;
}

export type OnboardingAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_ANSWER'; payload: { questionId: keyof QuizAnswers; value: string } }
  | { type: 'SET_REGISTATION_DATA'; payload: Partial<RegistrationData> }
  | { type: 'SET_IS_SUBMITTING'; payload: boolean }
  | { type: 'SET_WORKOUT_PLAN'; payload: any }
  | { type: 'SET_PERSONALIZED_MESSAGE'; payload: string }
  | { type: 'SET_SHOW_RESULTS'; payload: boolean };
