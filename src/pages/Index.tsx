
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Use useEffect to handle navigation after component mounts
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/landing', { replace: true });
    }
  }, [currentUser, navigate]);
  
  // Return loading indicator while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Index;
