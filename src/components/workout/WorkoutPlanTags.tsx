
import React from 'react';

interface WorkoutPlanTagsProps {
  tags: string[];
  daysPerWeek: number;
}

const WorkoutPlanTags: React.FC<WorkoutPlanTagsProps> = ({ tags, daysPerWeek }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="text-xs py-1 px-2 bg-traingo-primary/20 text-traingo-primary rounded-full">
        {daysPerWeek} dias por semana
      </span>
      {tags.map(tag => (
        <span 
          key={tag} 
          className="text-xs py-1 px-2 bg-gray-800 text-gray-300 rounded-full"
        >
          {tag.replace(/_/g, ' ')}
        </span>
      ))}
    </div>
  );
};

export default WorkoutPlanTags;
