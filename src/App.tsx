
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import BottomNav from './components/layout/BottomNav';
import AuthLayout from './layouts/AuthLayout';
import Index from './pages/Index';

const App = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Check if onboarding was completed
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
        {/* Root path uses Index component to handle redirects */}
        <Route path="/" element={<Index />} />
        
        {/* Public pages */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Protected pages */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      
      {/* Only show bottom navigation when user is logged in */}
      {currentUser && <BottomNav />}
    </div>
  );
};

export default App;
