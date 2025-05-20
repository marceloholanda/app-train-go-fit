
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser, loading } = useAuth();
  
  // Show loading indicator while auth state is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  // Use Navigate component instead of programmatic navigation
  return currentUser ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/landing" replace />
  );
};

export default Index;
