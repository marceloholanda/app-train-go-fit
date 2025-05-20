
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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
  
  // Return null while effect handles navigation
  return null;
};

export default Index;
