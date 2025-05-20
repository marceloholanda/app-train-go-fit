
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser } = useAuth();
  
  // Automatically redirect to Dashboard for logged-in users or Landing for guests
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/landing" replace />;
  }
};

export default Index;
