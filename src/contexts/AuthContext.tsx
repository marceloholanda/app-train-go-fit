
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define the Auth context type
interface AuthContextType {
  currentUser: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: async () => {}
});

// Custom hook to use the Auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock login function (simulação enquanto não usamos Supabase Auth)
  const login = async (email: string, password: string) => {
    try {
      // For now, just create a mock user object
      const user = { email, id: 'mock-user-id' };
      
      // Store in localStorage as a simple auth mechanism
      localStorage.setItem('traingo-user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Mock logout function
  const logout = async () => {
    try {
      localStorage.removeItem('traingo-user');
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Check for existing user session on initial load
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const userData = localStorage.getItem('traingo-user');
        if (userData) {
          setCurrentUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Auth state check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Define the value object to be provided to consumers
  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
