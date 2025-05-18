
import React from 'react';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import ExerciseDetail from './pages/ExerciseDetail';
import Upgrade from './pages/Upgrade';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

// Import our diagnostic component
import ExerciseImageDiagnostic from './components/workout/ExerciseImageDiagnostic';

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
        
        {/* Add diagnostic route */}
        <Route 
          path="/admin/image-diagnostic" 
          element={
            <ExerciseImageDiagnostic />
          } 
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
