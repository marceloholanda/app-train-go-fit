
/**
 * Mapeia dias da semana para treinos com base no número de dias disponíveis
 */
export const mapWorkoutDays = (totalDays: number): string[] => {
  // Mapeamento baseado no número de dias por semana
  const weekDayMappings: Record<number, string[]> = {
    1: ['Segunda'],
    2: ['Segunda', 'Quinta'],
    3: ['Segunda', 'Quarta', 'Sexta'],
    4: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
    5: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    6: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    7: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  };
  
  return weekDayMappings[totalDays] || [];
};

/**
 * Gera um ícone representativo baseado nos exercícios do dia
 */
export const getWorkoutIcon = (exercises: { nome: string; reps: string }[]): string => {
  const lowerExercises = exercises.map(ex => ex.nome.toLowerCase());
  
  // Lógica para determinar o ícone baseado em grupos musculares
  if (lowerExercises.some(ex => ex.includes('supino') || ex.includes('peitoral') || ex.includes('crucifixo'))) {
    return '💪';
  }
  
  if (lowerExercises.some(ex => ex.includes('costa') || ex.includes('remada') || ex.includes('puxada'))) {
    return '🏋️';
  }
  
  if (lowerExercises.some(ex => ex.includes('perna') || ex.includes('agachamento') || ex.includes('leg'))) {
    return '🦵';
  }
  
  if (lowerExercises.some(ex => ex.includes('abdominal') || ex.includes('prancha'))) {
    return '🔥';
  }
  
  if (lowerExercises.some(ex => ex.includes('ombro') || ex.includes('desenvolvimento'))) {
    return '🏆';
  }
  
  return '🏃';
};

/**
 * Gera nomes para os treinos baseados nos exercícios
 */
export const generateWorkoutName = (dayNumber: number, exercises: { nome: string; reps: string }[]): string => {
  const lowerExercises = exercises.map(ex => ex.nome.toLowerCase());
  let focusName = 'Full Body';
  
  // Identifica o foco do treino com base nos exercícios
  if (lowerExercises.some(ex => ex.includes('supino') || ex.includes('peitoral') || ex.includes('crucifixo'))) {
    focusName = 'Peitoral e Tríceps';
  } else if (lowerExercises.some(ex => ex.includes('costa') || ex.includes('remada') || ex.includes('puxada'))) {
    focusName = 'Costas e Bíceps';
  } else if (lowerExercises.some(ex => ex.includes('perna') || ex.includes('agachamento') || ex.includes('leg'))) {
    focusName = 'Pernas';
  } else if (lowerExercises.some(ex => ex.includes('ombro') || ex.includes('desenvolvimento'))) {
    focusName = 'Ombros';
  } else if (lowerExercises.some(ex => ex.includes('abdominal') || ex.includes('prancha'))) {
    focusName = 'Core';
  }
  
  return `Treino ${String.fromCharCode(64 + dayNumber)} - ${focusName}`;
};

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
        
        // Registra a data de conclusão do treino (NOVA FUNCIONALIDADE)
        if (!user.workoutHistory) {
          user.workoutHistory = [];
        }
        
        // Busca o nome do treino
        const workoutName = user.workoutPlan?.plan?.[`dia${workoutId}`] 
          ? generateWorkoutName(workoutId, user.workoutPlan.plan[`dia${workoutId}`])
          : `Treino ${workoutId}`;
          
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
        const workoutName = user.workoutPlan?.plan?.[`dia${workoutId}`] 
          ? generateWorkoutName(workoutId, user.workoutPlan.plan[`dia${workoutId}`])
          : `Treino ${workoutId}`;
          
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

/**
 * Calcula a quantidade de dias treinados na semana atual
 */
export const getWorkoutsThisWeek = (): { completed: number, total: number } => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return { completed: 0, total: 0 };
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory) return { completed: 0, total: 0 };
    
    // Determina o primeiro e último dia da semana atual (domingo a sábado)
    const now = new Date();
    const currentDay = now.getDay(); // 0 = domingo, 6 = sábado
    
    // Cria uma data para o início da semana (domingo)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Cria uma data para o fim da semana (sábado)
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (6 - currentDay));
    endOfWeek.setHours(23, 59, 59, 999);
    
    // Filtra os treinos realizados nesta semana
    const workoutsThisWeek = user.workoutHistory.filter((workout: {date: string}) => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
    });
    
    // Conta dias únicos treinados na semana
    const uniqueDays = new Set(workoutsThisWeek.map((workout: {date: string}) => workout.date));
    
    // Total de dias na semana é 7 ou o total de dias do plano do usuário, o que for menor
    const totalDays = Math.min(7, user.workoutPlan?.days || 7);
    
    return {
      completed: uniqueDays.size,
      total: totalDays
    };
  } catch (error) {
    console.error('Erro ao obter treinos da semana:', error);
    return { completed: 0, total: 0 };
  }
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

/**
 * Calcula e retorna as conquistas desbloqueadas
 */
export const getAchievements = (): {id: string, name: string, description: string, unlocked: boolean}[] => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return [];
    
    const user = JSON.parse(userData);
    if (!user.workoutHistory) return [];
    
    // Conta dias únicos treinados (total)
    const uniqueDays = new Set(user.workoutHistory.map((workout: {date: string}) => workout.date));
    const totalDays = uniqueDays.size;
    
    // Define as conquistas
    const achievements = [
      {
        id: 'bronze',
        name: 'Primeiros Passos',
        description: 'Complete 3 dias de treino',
        threshold: 3,
        unlocked: totalDays >= 3
      },
      {
        id: 'silver',
        name: 'Em Ritmo',
        description: 'Complete 7 dias de treino',
        threshold: 7,
        unlocked: totalDays >= 7
      },
      {
        id: 'gold',
        name: 'Consistência Total',
        description: 'Complete 12 dias de treino',
        threshold: 12,
        unlocked: totalDays >= 12
      },
      {
        id: 'platinum',
        name: 'Foco Implacável',
        description: 'Complete 20 dias de treino',
        threshold: 20,
        unlocked: totalDays >= 20
      }
    ];
    
    return achievements;
  } catch (error) {
    console.error('Erro ao obter conquistas:', error);
    return [];
  }
};
