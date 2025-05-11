
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Exercise } from '@/types/workout';
import { isPremiumUser } from '@/utils/userUtils';
import ExerciseDetailHeader from '@/components/workout/ExerciseDetailHeader';
import ExerciseCard from '@/components/workout/ExerciseCard';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import { useWorkoutData } from '@/hooks/useWorkoutData';

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isPremium = isPremiumUser();
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(-1);
  
  const {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    handleExerciseToggle,
    handleToggleWorkout
  } = useWorkoutData(id);

  const handleOpenVideoModal = (exerciseIndex: number) => {
    if (isPremium && exercises[exerciseIndex]?.video_url) {
      setSelectedExerciseIndex(exerciseIndex);
      setIsVideoModalOpen(true);
    }
  };

  const handleOpenReplaceModal = (exerciseIndex: number) => {
    setSelectedExerciseIndex(exerciseIndex);
    setIsReplaceModalOpen(true);
  };

  const handleReplaceExercise = (newExercise: Exercise) => {
    if (selectedExerciseIndex === -1) return;

    const updatedExercises = [...exercises];
    updatedExercises[selectedExerciseIndex] = {
      ...newExercise,
      completed: updatedExercises[selectedExerciseIndex].completed
    };
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData && id) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar exercício substituído:', error);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-16">
      <ExerciseDetailHeader workoutDay={workoutDay} />
      
      {/* Exercises List */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Exercícios</h2>
          <button 
            onClick={handleToggleWorkout}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              isCompleted 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-traingo-primary text-black'
            }`}
          >
            {isCompleted ? 'Concluído' : 'Marcar todos'}
          </button>
        </div>
        
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              exercise={exercise}
              index={index}
              isPremium={isPremium}
              onToggleComplete={handleExerciseToggle}
              onOpenVideoModal={handleOpenVideoModal}
              onOpenReplaceModal={handleOpenReplaceModal}
            />
          ))}
        </div>
      </section>

      {/* Modals */}
      {selectedExerciseIndex !== -1 && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            exerciseName={exercises[selectedExerciseIndex]?.nome || ""}
            videoUrl={exercises[selectedExerciseIndex]?.video_url || ""}
          />

          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={() => setIsReplaceModalOpen(false)}
            isPremium={isPremium}
            currentExercise={exercises[selectedExerciseIndex]}
            alternativeExercises={exercises[selectedExerciseIndex]?.substituicoes || []}
            onReplaceExercise={handleReplaceExercise}
          />
        </>
      )}
    </div>
  );
};

export default ExerciseDetail;
