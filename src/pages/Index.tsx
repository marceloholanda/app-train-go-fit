
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Automatically redirect to Dashboard for logged-in users or Landing for guests
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-4">
        <div className="w-12 h-12 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-lg text-gray-400">Carregando...</p>
      </div>
    </div>
  );
};

export default Index;
