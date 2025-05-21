
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

// Define the Auth context type
interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  session: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
});

// Custom hook to use the Auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Handle auth state changes
  useEffect(() => {
    // Setup auth listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("[TrainGO] Auth state changed:", event);
        setSession(newSession);
        setCurrentUser(newSession?.user ?? null);
        
        // Redirect to onboarding for new sign-ups
        if (event === 'SIGNED_IN' && newSession) {
          // Use setTimeout to prevent potential event loops
          setTimeout(() => {
            const isNewUser = newSession.user.app_metadata.provider === 'email' && 
                             !newSession.user.app_metadata.onboarded;
            if (isNewUser) {
              console.log("[TrainGO] New user detected, redirecting to onboarding");
              navigate('/onboarding');
            }
          }, 0);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setCurrentUser(data.session?.user ?? null);
      } catch (error) {
        console.error("[TrainGO] Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      console.log("[TrainGO] Attempting to login:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // User data is automatically handled by the onAuthStateChange listener
      console.log("[TrainGO] Login successful");
      
      // Migration function: If localStorage has user data, migrate it to Supabase
      if (data.user) {
        migrateUserDataIfNeeded(data.user.id);
      }
      
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

  // Register function
  const register = async (email: string, password: string, name: string) => {
    try {
      console.log("[TrainGO] Registering new user:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso!",
      });
      
      console.log("[TrainGO] Registration successful");
      
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

  // Logout function
  const logout = async () => {
    try {
      console.log("[TrainGO] Logging out user");
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setCurrentUser(null);
      setSession(null);
      
      // Redirecionar para a página de login após logout
      console.log("[TrainGO] Redirecting to login page after logout");
      navigate('/login');
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

  // Forgot password function
  const forgotPassword = async (email: string) => {
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

  // Reset password function
  const resetPassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi redefinida com sucesso",
      });
      
      // Redirect to login page
      navigate('/login');
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

  // Helper function to migrate user data from localStorage to Supabase if needed
  const migrateUserDataIfNeeded = async (userId: string) => {
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

  // Define the value object to be provided to consumers
  const value = {
    currentUser,
    session,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
