
import React, { useState } from 'react';
import { WorkoutPlan } from '@/types/workout';
import WorkoutDayItem from './WorkoutDayItem';

interface WorkoutDaysListProps {
  plan: WorkoutPlan;
}

const WorkoutDaysList: React.FC<WorkoutDaysListProps> = ({ plan }) => {
  const [expandedDay, setExpandedDay] = useState<string | null>("dia1");
  
  const handleToggleExpand = (dayId: string | null) => {
    setExpandedDay(dayId);
  };
  
  return (
    <div className="space-y-4 mt-6">
      {Object.entries(plan.plan).map(([dayId, exercises], index) => (
        <WorkoutDayItem 
          key={dayId}
          dayId={dayId}
          dayNumber={index + 1}
          exercises={exercises}
          isExpanded={expandedDay === dayId}
          onToggleExpand={handleToggleExpand}
        />
      ))}
    </div>
  );
};

export default WorkoutDaysList;
