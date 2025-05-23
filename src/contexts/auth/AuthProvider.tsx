
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session, AuthResponse } from '@supabase/supabase-js';
import { AuthContextType } from './types';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  forgotUserPassword, 
  resetUserPassword 
} from './authUtils';

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  session: null,
  isLoading: true,
  login: async () => {},
  register: async () => {
    throw new Error('Not implemented');
  },
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

  // Clear all cached data function
  const clearUserData = () => {
    console.log("[TrainGO] Clearing user data from localStorage and memory");
    
    // Clear any user-specific data from localStorage
    const keysToRemove = [
      'traingo-user',
      'traingo-profile',
      'traingo-workout-plan',
      'traingo-progress',
      'traingo-stats'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    // Reset state
    setCurrentUser(null);
    setSession(null);
  };

  // Handle auth state changes
  useEffect(() => {
    console.log("[TrainGO] Setting up auth state listener");
    
    // Setup auth listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("[TrainGO] Auth state changed:", event, "User ID:", newSession?.user?.id || 'none');
        
        // Clear data on sign out
        if (event === 'SIGNED_OUT') {
          clearUserData();
          return;
        }
        
        // Update session and user
        setSession(newSession);
        setCurrentUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          console.log("[TrainGO] User authenticated with ID:", newSession.user.id);
          console.log("[TrainGO] User email:", newSession.user.email);
        }
        
        // Redirect to onboarding for new sign-ups
        if (event === 'SIGNED_IN' && newSession) {
          // Use setTimeout to prevent potential event loops
          setTimeout(() => {
            const isNewUser = newSession.user.app_metadata.provider === 'email' && 
                             !newSession.user.app_metadata.onboarded;
            if (isNewUser) {
              console.log("[TrainGO] New user detected, redirecting to onboarding");
              navigate('/onboarding');
            } else {
              console.log("[TrainGO] Existing user, redirecting to dashboard");
              navigate('/dashboard');
            }
          }, 0);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        console.log("[TrainGO] Initializing auth - checking for existing session");
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          console.log("[TrainGO] Found existing session for user:", data.session.user.id);
          setSession(data.session);
          setCurrentUser(data.session.user);
        } else {
          console.log("[TrainGO] No existing session found");
          clearUserData();
        }
      } catch (error) {
        console.error("[TrainGO] Error initializing auth:", error);
        clearUserData();
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
    console.log("[TrainGO] Attempting login for email:", email);
    try {
      await loginUser(email, password);
      // Get the fresh session after login
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        console.log("[TrainGO] Login successful for user:", data.session.user.id);
        setSession(data.session);
        setCurrentUser(data.session.user);
      }
    } catch (error) {
      console.error("[TrainGO] Login failed:", error);
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    console.log("[TrainGO] Attempting registration for email:", email);
    try {
      const result = await registerUser(email, password, name);
      console.log("[TrainGO] Registration successful for user:", result.data.user?.id);
      return result;
    } catch (error) {
      console.error("[TrainGO] Registration failed:", error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    console.log("[TrainGO] Logging out user:", currentUser?.id);
    try {
      await logoutUser();
      clearUserData();
      
      // Redirecionar para a página de login após logout
      console.log("[TrainGO] Redirecting to login page after logout");
      navigate('/login');
    } catch (error) {
      console.error("[TrainGO] Logout failed:", error);
      // Even if logout fails, clear local data
      clearUserData();
      navigate('/login');
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    await forgotUserPassword(email);
  };

  // Reset password function
  const resetPassword = async (newPassword: string) => {
    await resetUserPassword(newPassword);
    
    // Redirect to login page
    navigate('/login');
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
