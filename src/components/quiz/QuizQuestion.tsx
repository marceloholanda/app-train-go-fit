
import React from 'react';

interface QuizOption {
  value: string;
  label: string;
  image: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  currentAnswer: string | undefined;
  onSelect: (value: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  options, 
  currentAnswer, 
  onSelect 
}) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-8 text-center">{question}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all 
              ${currentAnswer === option.value 
                ? 'bg-traingo-primary text-black' 
                : 'bg-traingo-gray hover:bg-gray-800'}`}
          >
            <span className="text-4xl mb-3">{option.image}</span>
            <span className="font-medium text-center">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
