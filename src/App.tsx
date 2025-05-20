
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileProvider } from '@/contexts/ProfileContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import ExerciseDetail from './pages/ExerciseDetail';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Landing from './pages/Landing';
import SimpleLanding from './pages/SimpleLanding'; // Import our simplified landing
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import BottomNav from './components/layout/BottomNav';

const App = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Verificar se acabamos de completar o onboarding
  useEffect(() => {
    try {
      const completedOnboarding = localStorage.getItem('onboarding-completed');
      if (completedOnboarding === 'true' && currentUser) {
        console.log("[TrainGO] Auto-redirecting to dashboard after onboarding");
        localStorage.removeItem('onboarding-completed');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error("[TrainGO] Error in onboarding redirect:", err);
      setError("Erro na verificação de onboarding");
    }
  }, [currentUser, navigate]);

  // Adicionar tratamento de erro global
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md w-full">
          <h2 className="font-bold text-lg mb-2">Erro na aplicação</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Recarregar aplicativo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <ErrorBoundary>
        <ProfileProvider>
          <Routes>
            {/* Usar a página simplificada temporariamente */}
            <Route path="/" element={<SimpleLanding />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={currentUser ? <Navigate to="/onboarding" /> : <Register />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Páginas protegidas */}
            <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/exercise/:id" element={currentUser ? <ExerciseDetail /> : <Navigate to="/login" />} />
            <Route path="/upgrade" element={currentUser ? <Upgrade /> : <Navigate to="/login" />} />
            <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/settings" element={currentUser ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
          
          {/* Só mostrar a navegação inferior quando o usuário estiver logado */}
          {currentUser && <BottomNav />}
          
          <Toaster />
        </ProfileProvider>
      </ErrorBoundary>
    </div>
  );
};

// Componente ErrorBoundary para capturar erros em componentes filhos
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[TrainGO] Erro capturado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md w-full">
            <h2 className="font-bold text-lg mb-2">Algo deu errado</h2>
            <p>{this.state.error?.message || "Erro desconhecido na aplicação"}</p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default App;
