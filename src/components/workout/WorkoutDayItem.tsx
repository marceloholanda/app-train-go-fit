
import React from 'react';
import { Exercise } from '@/types/workout';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import ExerciseItem from './ExerciseItem';

interface WorkoutDayItemProps {
  dayId: string;
  dayNumber: number;
  exercises: Exercise[];
  isExpanded: boolean;
  onToggleExpand: (dayId: string) => void;
}

const WorkoutDayItem: React.FC<WorkoutDayItemProps> = ({ 
  dayId, 
  dayNumber,
  exercises,
  isExpanded,
  onToggleExpand
}) => {
  return (
    <Collapsible 
      key={dayId}
      open={isExpanded}
      onOpenChange={(isOpen) => onToggleExpand(isOpen ? dayId : null)}
      className="border border-gray-700 rounded-lg overflow-hidden"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
        <span className="font-medium">Dia {dayNumber}</span>
        <span className="text-xs bg-gray-800 py-1 px-2 rounded-full">
          {exercises.length} exercícios
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 pt-0 border-t border-gray-700 space-y-3">
          {exercises.map((exercise, exIndex) => (
            <ExerciseItem 
              key={exIndex}
              exercise={exercise}
              index={exIndex}
              dayId={dayId}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default WorkoutDayItem;
