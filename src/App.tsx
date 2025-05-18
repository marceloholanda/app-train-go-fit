
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import ExerciseDetail from './pages/ExerciseDetail';
import Upgrade from './pages/Upgrade';
import Profile from './pages/Profile';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import BottomNav from './components/layout/BottomNav';

const App = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  return (
    <div className="bg-background text-foreground">
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={currentUser ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={currentUser ? <Onboarding /> : <Navigate to="/login" />} />
        <Route path="/exercise/:id" element={currentUser ? <ExerciseDetail /> : <Navigate to="/login" />} />
        <Route path="/upgrade" element={currentUser ? <Upgrade /> : <Navigate to="/login" />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      
      {/* Only show bottom navigation when user is logged in */}
      {currentUser && <BottomNav />}
      
      <Toaster />
    </div>
  );
};

export default App;
