
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
    await loginUser(email, password);
  };

  // Register function
  const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    return registerUser(email, password, name);
  };

  // Logout function
  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setSession(null);
    
    // Redirecionar para a página de login após logout
    console.log("[TrainGO] Redirecting to login page after logout");
    navigate('/login');
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
