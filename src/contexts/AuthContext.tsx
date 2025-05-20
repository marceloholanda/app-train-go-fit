
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
  authError: string | null;
  isAuthLoading: boolean;
}

// Create the Auth context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  session: null,
  login: async () => {},
  signup: async () => null,
  logout: async () => {},
  authError: null,
  isAuthLoading: true
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
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Login com Supabase Auth
  const login = async (email: string, password: string) => {
    try {
      setAuthError(null);
      console.log("[TrainGO] Authenticating with Supabase:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      console.log("[TrainGO] Login successful:", data?.user?.email);
      return;
    } catch (error) {
      console.error('[TrainGO] Login error:', error);
      setAuthError(error instanceof Error ? error.message : 'Erro de autenticação');
      throw error;
    }
  };

  // Cadastro com Supabase Auth
  const signup = async (email: string, password: string) => {
    try {
      setAuthError(null);
      console.log("[TrainGO] Signing up with Supabase:", email);
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) throw error;
      
      console.log("[TrainGO] Signup successful:", data?.user?.email);
      return data.user;
    } catch (error) {
      console.error('[TrainGO] Signup error:', error);
      setAuthError(error instanceof Error ? error.message : 'Erro no cadastro');
      throw error;
    }
  };

  // Logout com Supabase Auth
  const logout = async () => {
    try {
      setAuthError(null);
      console.log("[TrainGO] Logging out user");
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      console.log("[TrainGO] Logout successful");
      navigate('/login');
    } catch (error) {
      console.error('[TrainGO] Logout error:', error);
      setAuthError(error instanceof Error ? error.message : 'Erro ao sair');
      throw error;
    }
  };

  // Verificar e manter o estado de autenticação
  useEffect(() => {
    try {
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
        console.log("[TrainGO] Initial session check:", session ? "Session found" : "No session");
        setSession(session);
        setCurrentUser(session?.user || null);
        setLoading(false);
      }).catch(error => {
        console.error("[TrainGO] Error checking session:", error);
        setAuthError("Erro ao verificar sessão");
        setLoading(false);
      });

      // Limpar o listener quando o componente desmontar
      return () => {
        console.log("[TrainGO] Cleaning up auth listener");
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("[TrainGO] Error in auth setup:", error);
      setAuthError("Erro na configuração de autenticação");
      setLoading(false);
    }
  }, []);

  // Define the value object to be provided to consumers
  const value = {
    currentUser,
    session,
    login,
    signup,
    logout,
    authError,
    isAuthLoading: loading
  };

  // Adicionar componente de fallback para erros de autenticação
  if (authError && !loading) {
    console.log("[TrainGO] Rendering auth error state");
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md w-full">
          <h2 className="font-bold text-lg mb-2">Erro de Autenticação</h2>
          <p>{authError}</p>
          <button 
            onClick={() => {
              setAuthError(null);
              window.location.reload();
            }} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
          <p className="text-lg">Carregando autenticação...</p>
        </div>
      )}
    </AuthContext.Provider>
  );
};
