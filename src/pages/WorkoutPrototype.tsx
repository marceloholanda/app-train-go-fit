
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { ArrowLeft, Check, Dumbbell, Plus } from 'lucide-react';

// Mock data for workouts
const workouts = [
  {
    id: 1,
    name: 'Treino A - Pernas e Glúteos',
    icon: '🏋️',
    exercises: [
      { id: 101, name: 'Agachamento', series: 3, reps: 10, completed: false },
      { id: 102, name: 'Leg Press', series: 3, reps: 12, completed: false },
      { id: 103, name: 'Cadeira Extensora', series: 3, reps: 15, completed: true }
    ]
  },
  {
    id: 2,
    name: 'Treino B - Parte Superior',
    icon: '💪',
    exercises: [
      { id: 201, name: 'Supino', series: 3, reps: 10, completed: false },
      { id: 202, name: 'Flexões', series: 3, reps: 10, completed: false },
      { id: 203, name: 'Puxada Alta', series: 3, reps: 12, completed: false }
    ]
  },
  {
    id: 3,
    name: 'Treino C - Core',
    icon: '🔄',
    exercises: [
      { id: 301, name: 'Prancha', series: 3, reps: 30, completed: false, isTime: true },
      { id: 302, name: 'Abdominal', series: 3, reps: 15, completed: false },
      { id: 303, name: 'Russian Twist', series: 3, reps: 20, completed: false }
    ]
  }
];

const WorkoutPrototype = () => {
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState<typeof workouts[0] | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  const handleWorkoutClick = (workout: typeof workouts[0]) => {
    setSelectedWorkout(workout);
    setExercises(workout.exercises);
  };

  const handleBackClick = () => {
    setSelectedWorkout(null);
  };

  const toggleExerciseCompletion = (exerciseId: number) => {
    setExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, completed: !ex.completed } 
          : ex
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        {!selectedWorkout ? (
          // Workout List View
          <>
            <h1 className="text-2xl font-bold text-black mb-6">Seus Treinos</h1>
            <div className="space-y-4">
              {workouts.map(workout => (
                <Card 
                  key={workout.id} 
                  variant="default"
                  onClick={() => handleWorkoutClick(workout)}
                  className="animate-fade-in"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4 text-2xl">
                      {workout.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-black">{workout.name}</h2>
                      <p className="text-gray-600">{workout.exercises.length} exercícios</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          // Exercise List View
          <>
            <div className="mb-6">
              <Button 
                variant="ghost"
                leftIcon={<ArrowLeft />}
                onClick={handleBackClick}
                className="text-black mb-4"
              >
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-black">{selectedWorkout.name}</h1>
              <p className="text-gray-600">{exercises.length} exercícios</p>
            </div>

            <div className="space-y-6">
              {exercises.map(exercise => (
                <Card 
                  key={exercise.id} 
                  variant="exercise"
                  className="animate-fade-in"
                >
                  <div className="flex flex-col">
                    <div className="aspect-video bg-gray-200 mb-3 rounded flex items-center justify-center">
                      <span className="text-4xl text-gray-400">X</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-1">{exercise.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {exercise.series} séries de {exercise.reps} {exercise.isTime ? 'segundos' : 'repetições'}
                    </p>
                    
                    <Button 
                      variant={exercise.completed ? "primary" : "outline"}
                      leftIcon={exercise.completed ? <Check /> : null}
                      onClick={() => toggleExerciseCompletion(exercise.id)}
                      className="w-full justify-center"
                    >
                      {exercise.completed ? 'Exercício concluído' : 'Marcar como concluído'}
                    </Button>
                  </div>
                </Card>
              ))}
              
              {/* Add Exercise Card */}
              <Card variant="exercise" className="border-dashed border-2 border-gray-300">
                <div className="flex flex-col items-center justify-center py-4">
                  <h3 className="text-xl font-bold text-black mb-4">Adicionar Exercício</h3>
                  <Button 
                    variant="ghost"
                    leftIcon={<Plus />}
                    className="border border-gray-300"
                  >
                    Adicionar exercício
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutPrototype;
