
import React from 'react';
import { WorkoutPlan } from '@/types/workout';
import { Dumbbell } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkoutPlanHeaderProps {
  plan: WorkoutPlan;
}

const WorkoutPlanHeader: React.FC<WorkoutPlanHeaderProps> = ({ plan }) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <Dumbbell className="h-6 w-6 text-traingo-primary" />
        <div>
          <CardTitle>{plan.name}</CardTitle>
          {plan.description && <CardDescription>{plan.description}</CardDescription>}
        </div>
      </div>
    </CardHeader>
  );
};

export default WorkoutPlanHeader;
