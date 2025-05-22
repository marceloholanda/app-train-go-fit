import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
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
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import BottomNav from './components/layout/BottomNav';
import { useState, useEffect } from 'react';

const App = () => {
  const { currentUser, isLoading } = useAuth();
  const [showNav, setShowNav] = useState(false);

  // Ensure BottomNav is only rendered after checking auth state
  useEffect(() => {
    if (!isLoading && currentUser) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [currentUser, isLoading]);

  return (
    <div className="bg-background text-foreground">
      <Routes>
        {/* Página Inicial com Redirecionamento */}
        <Route path="/" element={<Index />} />
        
        {/* Páginas públicas */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
        {/* Página de onboarding (não requer autenticação prévia) */}
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Páginas protegidas */}
        <Route 
          path="/dashboard" 
          element={isLoading ? <div>Carregando...</div> : currentUser ? <Dashboard /> : <Login />} 
        />
        <Route 
          path="/exercise/:id" 
          element={isLoading ? <div>Carregando...</div> : currentUser ? <ExerciseDetail /> : <Login />} 
        />
        <Route 
          path="/upgrade" 
          element={isLoading ? <div>Carregando...</div> : currentUser ? <Upgrade /> : <Login />} 
        />
        <Route 
          path="/profile" 
          element={isLoading ? <div>Carregando...</div> : currentUser ? <Profile /> : <Login />} 
        />
        <Route 
          path="/settings" 
          element={isLoading ? <div>Carregando...</div> : currentUser ? <Settings /> : <Login />} 
        />
        
        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Só mostrar a navegação inferior quando o usuário estiver logado e carregado */}
      {showNav && <BottomNav />}
      
      <Toaster />
    </div>
  );
};

export default App;
