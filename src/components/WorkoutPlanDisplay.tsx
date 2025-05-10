
import React from 'react';
import { Exercise, WorkoutPlan } from '@/data/workoutPlans';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
  personalizedMessage: string;
}

const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan, personalizedMessage }) => {
  const [expandedDay, setExpandedDay] = React.useState<string | null>("dia1");
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Seu Plano de Treino Personalizado</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{personalizedMessage}</p>
      </div>
      
      <div className="grid gap-6 mt-8">
        <Card className="bg-traingo-gray border border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Dumbbell className="h-6 w-6 text-traingo-primary" />
              <div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs py-1 px-2 bg-traingo-primary/20 text-traingo-primary rounded-full">
                {plan.days} dias por semana
              </span>
              {plan.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs py-1 px-2 bg-gray-800 text-gray-300 rounded-full"
                >
                  {tag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
            
            <div className="space-y-4 mt-6">
              {Object.entries(plan.plan).map(([day, exercises], index) => (
                <Collapsible 
                  key={day}
                  open={expandedDay === day}
                  onOpenChange={(isOpen) => setExpandedDay(isOpen ? day : null)}
                  className="border border-gray-700 rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                    <span className="font-medium">Dia {index + 1}</span>
                    <span className="text-xs bg-gray-800 py-1 px-2 rounded-full">
                      {exercises.length} exercícios
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0 border-t border-gray-700 space-y-3">
                      {exercises.map((exercise: Exercise, exIndex: number) => (
                        <div 
                          key={exIndex} 
                          className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center h-5">
                              <Checkbox id={`${day}-ex-${exIndex}`} />
                            </div>
                            <div>
                              <label 
                                htmlFor={`${day}-ex-${exIndex}`} 
                                className="font-medium cursor-pointer"
                              >
                                {exercise.nome}
                              </label>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">{exercise.reps}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkoutPlanDisplay;
