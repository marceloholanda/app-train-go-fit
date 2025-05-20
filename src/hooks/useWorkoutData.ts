import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Exercise, WorkoutPlan } from '@/types/workout';
import { toast } from "@/hooks/use-toast";
import { standardizeExercise } from '@/utils/exerciseFormatter';

export const useWorkoutData = (workoutId: string | number) => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercisesState, setExercisesState] = useState<boolean[]>([]);
  const [dayName, setDayName] = useState('');
  const [dayIndex, setDayIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setError('Sessão não encontrada');
          return;
        }
        
        // Buscar plano de treino do usuário
        const { data: userData, error: userError } = await supabase
          .from('user_workouts')
          .select('workout_plan')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (userError) throw userError;
        if (!userData || !userData.workout_plan) {
          setError('Plano de treino não encontrado');
          return;
        }
        
        // Parse workout plan - cast to WorkoutPlan type with safety checks
        const workoutPlanData = userData.workout_plan as any;
        const workoutPlan = workoutPlanData as WorkoutPlan;
        
        // Find day by ID
        const dayId = parseInt(String(workoutId));
        if (isNaN(dayId)) {
          setError('ID de treino inválido');
          return;
        }
        
        // Safety check for the type of workout_plan
        if (typeof workoutPlan === 'object' && workoutPlan !== null) {
          let foundDay = null;
          
          // Check if workoutPlan has 'days' property (new format)
          if ('days' in workoutPlan && Array.isArray(workoutPlan.days)) {
            // For array-based days format in newer plans
            foundDay = workoutPlan.days.find((day: any) => day.id === dayId);
          } else if ('days' in workoutPlan && typeof workoutPlan.days === 'number') {
            // Days is just a number, use plan object
            if ('plan' in workoutPlan && typeof workoutPlan.plan === 'object') {
              const dayKey = String(dayId);
              const exercises = workoutPlan.plan[dayKey];
              if (exercises) {
                foundDay = {
                  id: dayId,
                  name: `Dia ${dayId}`,
                  exercises: exercises
                };
              }
            }
          }
          
          // Otherwise use the plan object (old format)
          if (!foundDay && 'plan' in workoutPlan && typeof workoutPlan.plan === 'object') {
            const dayKey = String(dayId);
            const exercises = workoutPlan.plan[dayKey];
            if (exercises) {
              foundDay = {
                id: dayId,
                name: `Dia ${dayId}`,
                exercises: exercises
              };
            }
          }
          
          if (!foundDay) {
            setError('Dia de treino não encontrado');
            return;
          }
          
          setDayName(foundDay.name || `Dia ${dayId}`);
          setDayIndex(dayId);
          
          // Ensure all exercises have nome property by standardizing them
          const standardizedExercises = (foundDay.exercises || []).map((ex: any) => 
            standardizeExercise(ex as Partial<Exercise>)
          );
          
          setExercises(standardizedExercises);
          
          // Get completion state for exercises
          const { data: progressData } = await supabase
            .from('progress')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('date', new Date().toISOString().split('T')[0])
            .like('exercise_name', `day${dayId}_ex%`);
          
          if (progressData && progressData.length > 0) {
            // Create a map of exercise index to completion state
            const completionState = progressData.reduce((acc: {[key: string]: boolean}, curr) => {
              const exIndex = parseInt(curr.exercise_name.split('_ex')[1]);
              acc[exIndex] = curr.completed;
              return acc;
            }, {});
            
            // Apply completion state to exercises
            const newExercisesState = standardizedExercises.map((_: any, index: number) => 
              completionState[index] || false
            );
            
            setExercisesState(newExercisesState);
          } else {
            // Initialize all as incomplete
            setExercisesState(new Array(standardizedExercises.length).fill(false));
          }
        } else {
          setError('Formato de plano de treino inválido');
        }
      } catch (err: any) {
        console.error('Error fetching workout data:', err);
        setError(err.message || 'Erro ao carregar dados do treino');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [workoutId]);

  return {
    loading,
    exercises,
    exercisesState,
    setExercisesState,
    dayName,
    dayIndex,
    error
  };
};

export default useWorkoutData;
