
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

// Define the Auth context type
interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  session: null,
  login: async () => {},
  signup: async () => null,
  logout: async () => {}
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
  const navigate = useNavigate();

  // Login com Supabase Auth
  const login = async (email: string, password: string) => {
    try {
      console.log("[TrainGO] Authenticating with Supabase:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      console.log("[TrainGO] Login successful:", data?.user?.email);
      return;
    } catch (error) {
      console.error('[TrainGO] Login error:', error);
      throw error;
    }
  };

  // Cadastro com Supabase Auth - modificado para autenticar imediatamente
  const signup = async (email: string, password: string) => {
    try {
      console.log("[TrainGO] Signing up with Supabase:", email);
      
      // Configuração para cadastro sem confirmação de e-mail
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            confirmed: true
          }
        }
      });
      
      if (error) throw error;
      
      console.log("[TrainGO] Signup successful:", data?.user?.email);
      
      // Após o cadastro bem-sucedido, fazemos login automaticamente
      if (data.user) {
        console.log("[TrainGO] Auto-login after signup");
        await login(email, password);
      }
      
      return data.user;
    } catch (error) {
      console.error('[TrainGO] Signup error:', error);
      throw error;
    }
  };

  // Logout com Supabase Auth
  const logout = async () => {
    try {
      console.log("[TrainGO] Logging out user");
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      console.log("[TrainGO] Logout successful");
      navigate('/login');
    } catch (error) {
      console.error('[TrainGO] Logout error:', error);
      throw error;
    }
  };

  // Verificar e manter o estado de autenticação
  useEffect(() => {
    console.log("[TrainGO] Setting up auth state listener");
    
    // Primeiro configuramos o listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("[TrainGO] Auth state changed:", event);
        setSession(session);
        setCurrentUser(session?.user || null);
      }
    );

    // Então verificamos se já existe uma sessão
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCurrentUser(session?.user || null);
      setLoading(false);
    });

    // Limpar o listener quando o componente desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Define the value object to be provided to consumers
  const value = {
    currentUser,
    session,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
