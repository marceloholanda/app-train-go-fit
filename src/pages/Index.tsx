
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        navigate('/dashboard');
      } else {
        navigate('/landing');
      }
    }
  }, [currentUser, isLoading, navigate]);

  // Enquanto verifica a autenticação, mostre um loader
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Index;
