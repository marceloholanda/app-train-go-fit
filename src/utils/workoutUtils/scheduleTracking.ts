
/**
 * Calcula os dias esperados de treino com base na configuração do usuário
 */
export const getExpectedWorkoutDays = (): {date: string, missed: boolean}[] => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return [];
    
    const user = JSON.parse(userData);
    if (!user.workoutPlan || !user.workoutPlan.days_per_week) return [];
    
    const daysPerWeek = user.workoutPlan.days_per_week;
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Obtém todos os dias treinados do mês atual
    const trainedDays = new Set(
      (user.workoutHistory || [])
        .map((workout: {date: string}) => workout.date)
        .filter((date: string) => {
          const workoutDate = new Date(date);
          return workoutDate.getMonth() === today.getMonth() && 
                 workoutDate.getFullYear() === today.getFullYear();
        })
    );
    
    const expectedDays: {date: string, missed: boolean}[] = [];
    
    // Define quais dias da semana devem ser dias de treino com base em days_per_week
    // Assumindo: 1=segunda, 2=terça, etc. Distribui os dias uniformemente na semana.
    const workoutDays = getWorkoutDaysOfWeek(daysPerWeek);
    
    // Para cada dia do mês atual até hoje
    const currentDate = new Date(startOfMonth);
    while (currentDate <= today) {
      const dayOfWeek = currentDate.getDay(); // 0=domingo, 1=segunda, etc.
      
      // Se esse dia da semana é um dia de treino esperado
      if (workoutDays.includes(dayOfWeek)) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const wasTrained = trainedDays.has(dateStr);
        
        // Só considera "missed" se a data já passou e não houve treino
        if (currentDate < today && !wasTrained) {
          expectedDays.push({
            date: dateStr,
            missed: true
          });
        }
      }
      
      // Avança para o próximo dia
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return expectedDays;
  } catch (error) {
    console.error('Erro ao obter dias esperados de treino:', error);
    return [];
  }
};

/**
 * Converte o número de dias por semana em dias específicos da semana
 * Distribui os dias uniformemente durante a semana
 */
export const getWorkoutDaysOfWeek = (daysPerWeek: number): number[] => {
  // Limita entre 3-5 dias por semana
  const normalizedDays = Math.min(5, Math.max(3, daysPerWeek));
  
  switch (normalizedDays) {
    case 3:
      return [1, 3, 5]; // Segunda, Quarta, Sexta
    case 4:
      return [1, 2, 4, 5]; // Segunda, Terça, Quinta, Sexta
    case 5:
      return [1, 2, 3, 4, 5]; // Segunda a Sexta
    default:
      return [1, 3, 5]; // Padrão: 3 dias (segunda, quarta, sexta)
  }
};
