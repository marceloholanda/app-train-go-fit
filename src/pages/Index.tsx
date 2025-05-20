
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';

const Index: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="p-4 flex justify-between items-center">
        <Logo size="medium" />
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-6">TrainGO</h1>
          <p className="text-xl text-gray-300 mb-8">Seu companheiro de treino personalizado</p>
          
          <div className="space-y-4">
            {currentUser ? (
              <Link 
                to="/dashboard" 
                className="inline-block px-6 py-3 rounded-lg bg-traingo-primary text-black font-medium hover:bg-yellow-300 transition-colors"
              >
                Ir para Dashboard
              </Link>
            ) : (
              <div className="space-y-4">
                <Link 
                  to="/landing" 
                  className="block w-full px-6 py-3 rounded-lg bg-traingo-primary text-black font-medium hover:bg-yellow-300 transition-colors"
                >
                  Conheça o TrainGO
                </Link>
                <Link 
                  to="/login" 
                  className="block w-full px-6 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
                >
                  Entrar
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full px-6 py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition-colors"
                >
                  Registrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
