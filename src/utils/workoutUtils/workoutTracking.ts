
import { getWorkoutName } from './history';
import { supabase } from '@/integrations/supabase/client';

/**
 * Atualiza o progresso de treino do usuário
 */
export const updateWorkoutProgress = async (workoutId: number, completed: boolean): Promise<number> => {
  try {
    // Obter o usuário atual do localStorage para atualizações locais
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return 0;
    
    const user = JSON.parse(userData);
    
    // Inicializa objeto de progresso se não existir
    if (!user.workoutProgress) {
      user.workoutProgress = { completedWorkouts: [], lastWeekProgress: 0 };
    }
    
    // Atualiza o status do treino localmente
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
    
    // Salva os dados atualizados no localStorage
    localStorage.setItem('traingo-user', JSON.stringify(user));
    
    // Atualiza o progresso no Supabase
    try {
      const { currentUser } = await import('@/contexts/AuthContext').then(module => module.useAuth());
      
      if (currentUser?.id) {
        // Buscar registro atual de progresso
        const { data: progressData, error: fetchError } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', currentUser.id)
          .order('workout_date', { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (fetchError) {
          console.error("Erro ao buscar progresso no Supabase:", fetchError);
        } else {
          const todayDate = new Date().toISOString().split('T')[0];
          
          // Determinar quais exercícios foram completados
          const completedExercises = user.workoutProgress.completedWorkouts.map((id: number) => ({
            id,
            completed_at: todayDate
          }));
          
          // Se já existe um registro para hoje, atualiza
          if (progressData) {
            const { error: updateError } = await supabase
              .from('progress')
              .update({
                completed_exercises: completedExercises,
                updated_at: new Date().toISOString()
              })
              .eq('id', progressData.id);
              
            if (updateError) {
              console.error("Erro ao atualizar progresso no Supabase:", updateError);
            }
          } else {
            // Senão, cria um novo registro
            const { error: insertError } = await supabase
              .from('progress')
              .insert([{
                user_id: currentUser.id,
                workout_date: todayDate,
                completed_exercises: completedExercises,
                streak: user.workoutProgress.streak || 0
              }]);
              
            if (insertError) {
              console.error("Erro ao inserir progresso no Supabase:", insertError);
            }
          }
        }
      }
    } catch (supabaseError) {
      console.error("Erro ao sincronizar progresso com Supabase:", supabaseError);
    }
    
    return progress;
  } catch (error) {
    console.error('Erro ao atualizar progresso:', error);
    return 0;
  }
};
