
import { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { useToast } from '@/hooks/use-toast';
import { updateWorkoutProgress } from '@/utils/workoutUtils';

export const useExerciseCompletion = (
  id: string | undefined,
  initialExercises: Exercise[],
  initialCompletionStatus: boolean,
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>,
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();
  
  const handleExerciseToggle = (index: number) => {
    const updatedExercises = initialExercises.map((exercise, i) => 
      i === index ? { ...exercise, completed: !exercise.completed } : exercise
    );
    
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
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Verificar se todos exercícios estão concluídos
    const allCompleted = updatedExercises.every(ex => ex.completed);
    if (allCompleted && !initialCompletionStatus) {
      markWorkoutAsCompleted();
    } else if (!allCompleted && initialCompletionStatus) {
      markWorkoutAsPending();
    }
  };

  const markWorkoutAsCompleted = () => {
    if (!id) return;
    
    setIsCompleted(true);
    updateWorkoutProgress(parseInt(id), true);
    
    toast({
      title: "Treino concluído!",
      description: "Parabéns! Seu progresso foi atualizado.",
    });
  };
  
  const markWorkoutAsPending = () => {
    if (!id) return;
    
    setIsCompleted(false);
    updateWorkoutProgress(parseInt(id), false);
  };
  
  const handleToggleWorkout = () => {
    if (!id) return;
    
    const newStatus = !initialCompletionStatus;
    setIsCompleted(newStatus);
    
    // Atualizar status de todos os exercícios
    const updatedExercises = initialExercises.map(exercise => ({ 
      ...exercise, 
      completed: newStatus 
    }));
    
    setExercises(updatedExercises);
    
    // Salvar estado dos exercícios
    try {
      const userData = localStorage.getItem('traingo-user');
      if (userData) {
        const user = JSON.parse(userData);
        user[`exercises_day${id}`] = updatedExercises;
        localStorage.setItem('traingo-user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Erro ao salvar estado dos exercícios:', error);
    }
    
    // Atualizar progresso
    updateWorkoutProgress(parseInt(id), newStatus);
    
    toast({
      title: newStatus ? "Treino concluído!" : "Treino desmarcado",
      description: newStatus 
        ? "Parabéns! Seu progresso foi atualizado."
        : "O treino foi marcado como pendente.",
    });
  };

  return {
    handleExerciseToggle,
    handleToggleWorkout
  };
};
