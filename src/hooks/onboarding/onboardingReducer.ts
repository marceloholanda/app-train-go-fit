
import { OnboardingState, OnboardingAction } from './types';

export const initialOnboardingState: OnboardingState = {
  currentStep: 0,
  answers: {},
  isSubmitting: false,
  workoutPlan: null,
  personalizedMessage: '',
  showResults: false,
  registrationData: {
    email: '',
    password: '',
    name: '',
  },
};

export function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.value,
        },
      };
    case 'SET_REGISTATION_DATA':
      return {
        ...state,
        registrationData: {
          ...state.registrationData,
          ...action.payload,
        },
      };
    case 'SET_IS_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'SET_WORKOUT_PLAN':
      return {
        ...state,
        workoutPlan: action.payload,
      };
    case 'SET_PERSONALIZED_MESSAGE':
      return {
        ...state,
        personalizedMessage: action.payload,
      };
    case 'SET_SHOW_RESULTS':
      return {
        ...state,
        showResults: action.payload,
      };
    default:
      return state;
  }
}
