
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import Card from '@/components/Card';
import { Badge } from '@/components/ui/badge';
import { WorkoutDisplay } from '@/types/dashboard';

interface WorkoutItemProps {
  workout: WorkoutDisplay;
  isPremium: boolean;
  onWorkoutClick: (workoutId: number) => void;
  onToggleCompletion: (e: React.MouseEvent, workoutId: number, currentStatus: 'completed' | 'pending') => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  workout,
  isPremium,
  onWorkoutClick,
  onToggleCompletion
}) => {
  return (
    <Card 
      key={workout.id} 
      onClick={() => onWorkoutClick(workout.id)}
      className="animate-fade-in relative"
    >
      {workout.isPremium && isPremium && (
        <Badge 
          variant="default" 
          className="absolute top-2 right-2 bg-traingo-primary text-xs text-black"
        >
          PRO
        </Badge>
      )}
      <div className="flex items-center">
        <div className="p-3 bg-traingo-primary/20 rounded-lg mr-4">
          <span className="text-2xl">{workout.icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold">{workout.name}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>{workout.day}</span>
            <span className="mx-2">•</span>
            <span>{workout.exercises} exercícios</span>
          </div>
        </div>
        <div 
          onClick={(e) => onToggleCompletion(e, workout.id, workout.status)}
          className="cursor-pointer p-2"
        >
          {workout.status === 'completed' ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
          )}
        </div>
      </div>
    </Card>
  );
};

export default WorkoutItem;
