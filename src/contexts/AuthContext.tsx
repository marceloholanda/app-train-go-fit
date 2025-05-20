import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Mock login function (simulação enquanto não usamos Supabase Auth)
  const login = async (email: string, password: string) => {
    try {
      console.log("[TrainGO] Attempting to login:", email);
      
      // Check if user exists in localStorage (from onboarding)
      const existingUserData = localStorage.getItem('traingo-user');
      
      if (existingUserData) {
        const userData = JSON.parse(existingUserData);
        // If the email matches, use that user data
        if (userData.email === email) {
          console.log("[TrainGO] Found existing user data, using it");
          setCurrentUser(userData);
          return;
        }
      }
      
      // Otherwise create a new basic user
      const user = { 
        email, 
        id: 'mock-user-id',
        name: email.split('@')[0] 
      };
      
      console.log("[TrainGO] Creating new user:", user.name);
      
      // Store in localStorage as a simple auth mechanism
      localStorage.setItem('traingo-user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error('[TrainGO] Login error:', error);
      throw error;
    }
  };

  // Mock logout function
  const logout = async () => {
    try {
      console.log("[TrainGO] Logging out user");
      localStorage.removeItem('traingo-user');
      setCurrentUser(null);
      
      // Redirecionar para a página de login após logout
      console.log("[TrainGO] Redirecting to login page after logout");
      navigate('/login');
    } catch (error) {
      console.error('[TrainGO] Logout error:', error);
      throw error;
    }
  };

  // Check for existing user session on initial load
  useEffect(() => {
    const checkAuthState = () => {
      try {
        console.log("[TrainGO] Checking auth state...");
        const userData = localStorage.getItem('traingo-user');
        if (userData) {
          console.log("[TrainGO] Found user data in localStorage");
          setCurrentUser(JSON.parse(userData));
        } else {
          console.log("[TrainGO] No user data found in localStorage");
        }
      } catch (error) {
        console.error('[TrainGO] Auth state check error:', error);
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
