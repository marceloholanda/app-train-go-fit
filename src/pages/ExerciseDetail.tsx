
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Exercise } from '@/types/workout';
import { isPremiumUser, hasSeenPremiumWelcome, markPremiumWelcomeSeen } from '@/utils/userUtils';
import ExerciseDetailHeader from '@/components/workout/ExerciseDetailHeader';
import ExerciseCard from '@/components/workout/ExerciseCard';
import ExerciseVideoModal from '@/components/workout/ExerciseVideoModal';
import ExerciseReplaceModal from '@/components/workout/ExerciseReplaceModal';
import FreePlanUpgradeCard from '@/components/premium/FreePlanUpgradeCard';
import PremiumWelcomeModal from '@/components/premium/PremiumWelcomeModal';
import { useWorkoutData } from '@/hooks/useWorkoutData';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ExerciseAddModal from '@/components/workout/ExerciseAddModal';

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isPremium, setIsPremium] = useState(isPremiumUser());
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(-1);
  const [showPremiumWelcome, setShowPremiumWelcome] = useState(false);
  
  const {
    workoutDay,
    exercises,
    isLoading,
    isCompleted,
    setExercises,
    handleExerciseToggle,
    handleToggleWorkout,
    userLevel
  } = useWorkoutData(id);
  
  // Limitar o número de exercícios com base no plano e nível
  const [visibleExercises, setVisibleExercises] = useState<Exercise[]>([]);
  
  useEffect(() => {
    if (exercises.length) {
      let limit = 4; // Limite padrão para plano Free
      
      if (isPremium) {
        // Limites para usuários premium com base no nível
        switch(userLevel) {
          case 'beginner':
            limit = 6;
            break;
          case 'intermediate':
            limit = 7;
            break;
          case 'advanced':
            limit = 8;
            break;
          default:
            limit = 6;
        }
      }
      
      // Aplicar limitação
      setVisibleExercises(exercises.slice(0, limit));
    }
  }, [exercises, isPremium, userLevel]);

  // Revalidate premium status when component mounts
  useEffect(() => {
    const checkPremiumStatus = () => {
      const premiumStatus = isPremiumUser();
      setIsPremium(premiumStatus);
      
      // Mostrar o modal de boas-vindas se o usuário é premium e não viu a mensagem
      if (premiumStatus && !hasSeenPremiumWelcome()) {
        setShowPremiumWelcome(true);
      }
    };
    
    // Verificar status inicial
    checkPremiumStatus();
    
    // Configurar evento de storage para detectar mudanças no localStorage
    const handleStorageChange = () => {
      checkPremiumStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClosePremiumWelcome = () => {
    setShowPremiumWelcome(false);
    markPremiumWelcomeSeen();
  };

  const handleOpenVideoModal = (exerciseIndex: number) => {
    setSelectedExerciseIndex(exerciseIndex);
    setIsVideoModalOpen(true);
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

  const handleAddExercises = (newExercises: Exercise[]) => {
    if (!newExercises.length) return;
    
    const updatedExercises = [...exercises, ...newExercises.map(ex => ({ ...ex, completed: false }))];
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
      console.error('Erro ao adicionar exercícios:', error);
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
          {visibleExercises.map((exercise, index) => (
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

        {/* Mensagem quando há exercícios limitados para usuários free */}
        {!isPremium && exercises.length > visibleExercises.length && (
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <p className="text-sm text-yellow-400 text-center">
              🔒 O plano gratuito exibe apenas {visibleExercises.length} exercícios. 
              Faça upgrade para o plano PRO para acessar todos os {exercises.length} exercícios.
            </p>
          </div>
        )}
        
        {/* Add Exercise Button - Premium Only */}
        {isPremium && (
          <div className="mt-6">
            <Button
              onClick={() => setIsAddExerciseModalOpen(true)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-6"
            >
              <Plus size={20} />
              Adicionar novo exercício
            </Button>
          </div>
        )}
        
        {/* Upgrade card para usuários free */}
        {!isPremium && <FreePlanUpgradeCard />}
      </section>

      {/* Modals */}
      {selectedExerciseIndex !== -1 && (
        <>
          <ExerciseVideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            exerciseName={visibleExercises[selectedExerciseIndex]?.nome || ""}
            videoUrl={visibleExercises[selectedExerciseIndex]?.video_url || ""}
            isPremium={isPremium}
          />

          <ExerciseReplaceModal
            isOpen={isReplaceModalOpen}
            onClose={() => setIsReplaceModalOpen(false)}
            isPremium={isPremium}
            currentExercise={visibleExercises[selectedExerciseIndex]}
            alternativeExercises={visibleExercises[selectedExerciseIndex]?.substituicoes || []}
            onReplaceExercise={handleReplaceExercise}
          />
        </>
      )}
      
      {/* Add Exercise Modal */}
      <ExerciseAddModal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setIsAddExerciseModalOpen(false)}
        isPremium={isPremium}
        onAddExercises={handleAddExercises}
      />
      
      {/* Modal de boas-vindas ao premium */}
      <PremiumWelcomeModal
        isOpen={showPremiumWelcome}
        onClose={handleClosePremiumWelcome}
      />
    </div>
  );
};

export default ExerciseDetail;
