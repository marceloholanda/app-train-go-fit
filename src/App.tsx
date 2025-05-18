
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import ExerciseDetail from './pages/ExerciseDetail';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import BottomNav from './components/layout/BottomNav';

const App = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Verificar se acabamos de completar o onboarding
  useEffect(() => {
    const completedOnboarding = localStorage.getItem('onboarding-completed');
    if (completedOnboarding === 'true' && currentUser) {
      console.log("[TrainGO] Auto-redirecting to dashboard after onboarding");
      localStorage.removeItem('onboarding-completed');
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className="bg-background text-foreground">
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/onboarding" /> : <Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Páginas protegidas */}
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/exercise/:id" element={currentUser ? <ExerciseDetail /> : <Navigate to="/login" />} />
        <Route path="/upgrade" element={currentUser ? <Upgrade /> : <Navigate to="/login" />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Navigate to="/login" />} />
      </Routes>
      
      {/* Só mostrar a navegação inferior quando o usuário estiver logado */}
      {currentUser && <BottomNav />}
      
      <Toaster />
    </div>
  );
};

export default App;
