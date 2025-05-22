
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Helper function to migrate user data from localStorage to Supabase if needed
export const migrateUserDataIfNeeded = async (userId: string) => {
  try {
    const localData = localStorage.getItem('traingo-user');
    if (!localData) return;
    
    const userData = JSON.parse(localData);
    
    // Check if user already has data in Supabase
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    // If profile exists but is missing some data, update it
    if (profile) {
      if (userData.profile) {
        await supabase
          .from('profiles')
          .update({
            objective: userData.profile.objective || profile.objective,
            level: userData.profile.level || profile.level,
            days_per_week: userData.profile.days_per_week || profile.days_per_week,
            environment: userData.profile.environment || profile.environment,
            motivation_type: userData.profile.motivation_type || profile.motivation_type,
            training_barrier: userData.profile.training_barrier || profile.training_barrier,
            age_exact: userData.profile.age_exact || profile.age_exact,
            height_exact: userData.profile.height_exact || profile.height_exact,
            weight_exact: userData.profile.weight_exact || profile.weight_exact
          })
          .eq('id', userId);
      }
    }
    
    // Migrate workout plan if exists
    if (userData.workoutPlan) {
      const { data: existingPlan } = await supabase
        .from('user_workouts')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (!existingPlan) {
        await supabase
          .from('user_workouts')
          .insert({
            user_id: userId,
            plan_id: userData.workoutPlan.id,
            name: userData.workoutPlan.name,
            description: userData.workoutPlan.description || '',
            days: userData.workoutPlan.days,
            level: userData.workoutPlan.level,
            environment: userData.workoutPlan.environment,
            objective: userData.workoutPlan.objective,
            tags: userData.workoutPlan.tags || [],
            plan: userData.workoutPlan.plan
          });
      }
    }
    
    // Migrate workout progress if exists
    if (userData.workoutProgress?.completedWorkouts?.length > 0) {
      // For each completed workout, add entry to progress table
      const today = new Date();
      for (const workoutDay of userData.workoutProgress.completedWorkouts) {
        await supabase
          .from('progress')
          .insert({
            user_id: userId,
            workout_day: workoutDay,
            completed_date: today.toISOString().split('T')[0],
            exercises: userData[`exercises_day${workoutDay}`] || null
          });
      }
    }
    
    // Migration complete, remove from localStorage to avoid duplications
    console.log("[TrainGO] User data migration complete");
    
  } catch (error) {
    console.error('[TrainGO] Error migrating user data:', error);
    // Don't throw error here to avoid blocking login flow
  }
};

// Auth actions

export const loginUser = async (email: string, password: string) => {
  try {
    console.log("[TrainGO] Attempting to login:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    console.log("[TrainGO] Login successful");
    
    // Migration function: If localStorage has user data, migrate it to Supabase
    if (data.user) {
      migrateUserDataIfNeeded(data.user.id);
    }
    
    return data;
    
  } catch (error: any) {
    console.error('[TrainGO] Login error:', error);
    toast({
      title: "Falha no login",
      description: error.message || "Email ou senha incorretos",
      variant: "destructive",
    });
    throw error;
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    console.log("[TrainGO] Registering new user:", email);
    
    const authResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    });
    
    if (authResponse.error) throw authResponse.error;
    
    toast({
      title: "Cadastro realizado",
      description: "Sua conta foi criada com sucesso!",
    });
    
    console.log("[TrainGO] Registration successful");
    
    return authResponse;
    
  } catch (error: any) {
    console.error('[TrainGO] Registration error:', error);
    toast({
      title: "Falha no cadastro",
      description: error.message || "Não foi possível criar sua conta",
      variant: "destructive",
    });
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    console.log("[TrainGO] Logging out user");
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    console.log("[TrainGO] Logout successful");
    
  } catch (error: any) {
    console.error('[TrainGO] Logout error:', error);
    toast({
      title: "Erro ao sair",
      description: error.message || "Não foi possível fazer logout",
      variant: "destructive",
    });
    throw error;
  }
};

export const forgotUserPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });
    
    if (error) throw error;
    
    toast({
      title: "Email enviado",
      description: "Verifique sua caixa de entrada para redefinir sua senha",
    });
    
  } catch (error: any) {
    console.error('[TrainGO] Forgot password error:', error);
    toast({
      title: "Erro",
      description: error.message || "Não foi possível enviar o email de redefinição",
      variant: "destructive",
    });
    throw error;
  }
};

export const resetUserPassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
    
    toast({
      title: "Senha atualizada",
      description: "Sua senha foi redefinida com sucesso",
    });
    
  } catch (error: any) {
    console.error('[TrainGO] Reset password error:', error);
    toast({
      title: "Erro",
      description: error.message || "Não foi possível redefinir sua senha",
      variant: "destructive",
    });
    throw error;
  }
};
