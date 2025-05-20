
import React from 'react';
import QuizQuestion from './QuizQuestion';
import { ArrowLeft } from 'lucide-react';
import { QuizAnswers } from '@/utils/workoutRecommendation';

// Definição dos tipos para as perguntas do quiz
export interface QuizQuestionType {
  id: keyof QuizAnswers;
  question: string;
  options: {
    value: string;
    label: string;
    image: string;
  }[];
}

interface QuizProps {
  questions: QuizQuestionType[];
  answers: Partial<QuizAnswers>;
  onAnswerChange: (questionId: keyof QuizAnswers, value: string) => void;
  currentStep: number;
  onPrevStep: () => void;
}

const Quiz: React.FC<QuizProps> = ({ 
  questions, 
  answers, 
  onAnswerChange, 
  currentStep, 
  onPrevStep 
}) => {
  const currentQuestion = questions[currentStep];
  
  if (!currentQuestion) return null;

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="flex justify-start mb-4">
        {currentStep > 0 && (
          <button
            onClick={onPrevStep}
            className="p-2 rounded-full hover:bg-gray-800"
            aria-label="Voltar para pergunta anterior"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      </div>

      <QuizQuestion
        question={currentQuestion.question}
        options={currentQuestion.options}
        currentAnswer={answers[currentQuestion.id]}
        onSelect={(value) => onAnswerChange(currentQuestion.id, value)}
      />
    </div>
  );
};

export default Quiz;
