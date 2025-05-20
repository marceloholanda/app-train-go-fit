
import React from 'react';
import { WorkoutPlan } from '@/types/workout';
import { Card, CardContent } from '@/components/ui/card';
import WorkoutPlanHeader from './workout/WorkoutPlanHeader';
import WorkoutPlanTags from './workout/WorkoutPlanTags';
import WorkoutDaysList from './workout/WorkoutDaysList';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
  personalizedMessage: string;
}

const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan, personalizedMessage }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Seu Plano de Treino Personalizado</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{personalizedMessage}</p>
      </div>
      
      <div className="grid gap-6 mt-8">
        <Card className="bg-traingo-gray border border-gray-700">
          <WorkoutPlanHeader plan={plan} />
          <CardContent>
            {plan.tags && <WorkoutPlanTags tags={plan.tags} daysPerWeek={plan.days} />}
            <WorkoutDaysList plan={plan} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutPlanDisplay;
