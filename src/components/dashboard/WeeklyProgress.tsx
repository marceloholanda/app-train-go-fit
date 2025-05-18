
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WeeklyProgressProps {
  progress: number;
  completedWorkouts: number;
  totalWorkouts: number;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ 
  progress, 
  completedWorkouts, 
  totalWorkouts 
}) => {
  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold flex items-center">
          <BarChart3 size={18} className="mr-2 text-traingo-primary" />
          Progresso da Semana
        </h2>
        <span className="text-gray-400 text-sm">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-traingo-primary rounded-full" 
          style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }} 
        />
      </div>
      <p className="text-gray-400 text-xs mt-2">
        {completedWorkouts} de {totalWorkouts} treinos concluídos
      </p>
    </section>
  );
};

export default WeeklyProgress;
