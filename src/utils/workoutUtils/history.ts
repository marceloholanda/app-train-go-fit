
import { generateWorkoutName } from './mapping';

/**
 * Obtém o nome do treino com base no ID
 */
export const getWorkoutName = (user: any, workoutId: number): string => {
  return user.workoutPlan?.plan?.[`dia${workoutId}`] 
    ? generateWorkoutName(workoutId, user.workoutPlan.plan[`dia${workoutId}`])
    : `Treino ${workoutId}`;
};

/**
 * Retorna datas com treinos concluídos para um determinado mês
 */
export const getWorkoutDatesForMonth = (month: number, year: number): string[] => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return [];
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory) return [];
    
    // Filtra os treinos realizados no mês especificado
    return user.workoutHistory
      .filter((workout: {date: string}) => {
        const date = new Date(workout.date);
        return date.getMonth() === month && date.getFullYear() === year;
      })
      .map((workout: {date: string}) => workout.date);
  } catch (error) {
    console.error('Erro ao obter datas de treino do mês:', error);
    return [];
  }
};
