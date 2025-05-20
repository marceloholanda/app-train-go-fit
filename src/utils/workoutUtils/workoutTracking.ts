
import { getWorkoutName } from './history';
import { supabase } from '@/integrations/supabase/client';
import { recordExerciseCompletion, removeExerciseCompletion } from './progressTracking';

/**
 * Atualiza o progresso de treino do usuário
 */
export const updateWorkoutProgress = async (workoutId: number, completed: boolean): Promise<number> => {
  try {
    // Obter o usuário atual para atualizações no Supabase
    const { currentUser } = await import('@/contexts/AuthContext').then(module => module.useAuth());
    
    if (!currentUser?.id) {
      console.error("Usuário não autenticado");
      return 0;
    }
    
    // Obter o usuário atual do localStorage para fins de exibição na interface
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return 0;
    
    const user = JSON.parse(userData);
    
    // Inicializa objeto de progresso se não existir
    if (!user.workoutProgress) {
      user.workoutProgress = { completedWorkouts: [], lastWeekProgress: 0 };
    }
    
    // Busca o nome do treino
    const workoutName = getWorkoutName(user, workoutId);
    
    // Atualiza o status do treino no Supabase
    if (completed) {
      // Adiciona o treino à lista de completados, se não estiver lá
      if (!user.workoutProgress.completedWorkouts.includes(workoutId)) {
        user.workoutProgress.completedWorkouts.push(workoutId);
        
        // Registra a data de conclusão do treino
        if (!user.workoutHistory) {
          user.workoutHistory = [];
        }
          
        // Salva a data atual como data do treino
        const todayDate = new Date().toISOString().split('T')[0];
        
        // Verifica se já existe um registro para hoje com este treino
        const existingEntryForToday = user.workoutHistory.find(
          (entry: {date: string, nome: string}) => 
            entry.date === todayDate && entry.nome === workoutName
        );
        
        if (!existingEntryForToday) {
          user.workoutHistory.push({
            date: todayDate,
            nome: workoutName
          });
        }
        
        // Registra o treino completo no Supabase
        // Buscar exercícios deste treino
        let exercises = [];
        if (user.workoutPlan?.plan) {
          const dayKey = `dia${workoutId}`;
          exercises = user.workoutPlan.plan[dayKey] || [];
        }
        
        // Se há exercícios específicos deste treino, registra cada um
        if (exercises.length > 0) {
          for (const exercise of exercises) {
            await recordExerciseCompletion(
              currentUser.id,
              exercise.id || workoutId,
              exercise.nome,
              exercise.muscle_group
            );
          }
        } else {
          // Caso não tenha detalhes dos exercícios, registra apenas o treino
          await recordExerciseCompletion(
            currentUser.id,
            workoutId,
            workoutName || `Treino ${workoutId}`,
            null
          );
        }
      }
    } else {
      // Remove o treino da lista de completados
      user.workoutProgress.completedWorkouts = user.workoutProgress.completedWorkouts.filter(
        (id: number) => id !== workoutId
      );
      
      // Remove o registro do histórico para o treino atual
      if (user.workoutHistory) {
        const todayDate = new Date().toISOString().split('T')[0];
          
        user.workoutHistory = user.workoutHistory.filter(
          (entry: {date: string, nome: string}) => !(entry.date === todayDate && entry.nome === workoutName)
        );
      }
      
      // Remover o registro de conclusão do treino no Supabase
      let exercises = [];
      if (user.workoutPlan?.plan) {
        const dayKey = `dia${workoutId}`;
        exercises = user.workoutPlan.plan[dayKey] || [];
      }
      
      // Se há exercícios específicos deste treino, remove cada um
      if (exercises.length > 0) {
        for (const exercise of exercises) {
          await removeExerciseCompletion(
            currentUser.id,
            exercise.id || workoutId,
            exercise.nome
          );
        }
      } else {
        // Caso não tenha detalhes dos exercícios, remove apenas o treino
        await removeExerciseCompletion(
          currentUser.id,
          workoutId,
          workoutName || `Treino ${workoutId}`
        );
      }
    }
    
    // Calcula a porcentagem de progresso
    const totalWorkouts = user.workoutPlan?.days || 3;
    const completedCount = user.workoutProgress.completedWorkouts.length;
    const progress = Math.round((completedCount / totalWorkouts) * 100);
    
    user.workoutProgress.lastWeekProgress = progress;
    
    // Salva os dados atualizados no localStorage para manter a consistência da UI
    localStorage.setItem('traingo-user', JSON.stringify(user));
    
    return progress;
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    return 0;
  }
};
