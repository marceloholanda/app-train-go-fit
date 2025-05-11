
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExerciseDetailHeaderProps {
  workoutDay: string;
}

const ExerciseDetailHeader: React.FC<ExerciseDetailHeaderProps> = ({ workoutDay }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-traingo-gray p-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{workoutDay}</h1>
      </div>
    </header>
  );
};

export default ExerciseDetailHeader;
