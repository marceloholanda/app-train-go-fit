
import { getWorkoutName } from './history';

/**
 * Atualiza o progresso de treino do usuário
 */
export const updateWorkoutProgress = (workoutId: number, completed: boolean): number => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return 0;
    
    const user = JSON.parse(userData);
    
    if (!user.workoutProgress) {
      user.workoutProgress = { completedWorkouts: [], lastWeekProgress: 0 };
    }
    
    // Atualiza o status do treino
    if (completed) {
      if (!user.workoutProgress.completedWorkouts.includes(workoutId)) {
        user.workoutProgress.completedWorkouts.push(workoutId);
        
        // Registra a data de conclusão do treino
        if (!user.workoutHistory) {
          user.workoutHistory = [];
        }
        
        // Busca o nome do treino
        const workoutName = getWorkoutName(user, workoutId);
          
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
      }
    } else {
      user.workoutProgress.completedWorkouts = user.workoutProgress.completedWorkouts.filter(
        (id: number) => id !== workoutId
      );
      
      // Se desfez a conclusão, remove o registro do histórico para o treino atual
      if (user.workoutHistory) {
        const todayDate = new Date().toISOString().split('T')[0];
        // Busca o nome do treino
        const workoutName = getWorkoutName(user, workoutId);
          
        user.workoutHistory = user.workoutHistory.filter(
          (entry: {date: string, nome: string}) => !(entry.date === todayDate && entry.nome === workoutName)
        );
      }
    }
    
    // Calcula a porcentagem de progresso
    const totalWorkouts = user.workoutPlan?.days || 3;
    const completedCount = user.workoutProgress.completedWorkouts.length;
    const progress = Math.round((completedCount / totalWorkouts) * 100);
    
    user.workoutProgress.lastWeekProgress = progress;
    
    // Salva os dados atualizados
    localStorage.setItem('traingo-user', JSON.stringify(user));
    
    return progress;
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    return 0;
  }
};
