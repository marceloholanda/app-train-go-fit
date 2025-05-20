
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from "@/hooks/use-toast";

// Define the Auth context type
interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  loading: boolean;
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  session: null,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  loading: true,
});

// Custom hook to use the Auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Login function using Supabase
  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log("[TrainGO] Attempting to login:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      console.log("[TrainGO] Login successful for:", email);
    } catch (error: any) {
      console.error('[TrainGO] Login error:', error.message);
      throw error;
    }
  };

  // Signup function using Supabase
  const signup = async (email: string, password: string, userData: any): Promise<void> => {
    try {
      console.log("[TrainGO] Attempting to sign up:", email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
          }
        }
      });

      if (error) throw error;

      console.log("[TrainGO] Signup successful for:", email);
    } catch (error: any) {
      console.error('[TrainGO] Signup error:', error.message);
      throw error;
    }
  };

  // Logout function using Supabase
  const logout = async (): Promise<void> => {
    try {
      console.log("[TrainGO] Logging out user");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      console.log("[TrainGO] Successfully logged out");
    } catch (error: any) {
      console.error('[TrainGO] Logout error:', error.message);
      throw error;
    }
  };

  // Check for existing session on initial load and set up auth state change listener
  useEffect(() => {
    // First set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("[TrainGO] Auth state changed:", event);
        setSession(currentSession);
        setCurrentUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for an existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("[TrainGO] Got existing session:", currentSession ? "Yes" : "No");
      setSession(currentSession);
      setCurrentUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Define the value object to be provided to consumers
  const value: AuthContextType = {
    currentUser,
    session,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
