
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import PrimaryButton from '@/components/PrimaryButton';
import { Dumbbell, Zap, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Landing = () => {
  const { currentUser, loading } = useAuth();
  
  // Show loading indicator while auth state is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to dashboard if user is logged in
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Logo size="medium" />
        <div className="flex space-x-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center mt-8 mb-12">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">
            Seu treino personalizado na <span className="text-traingo-primary">palma da mão</span>
          </h1>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Acompanhe seu progresso, personalize seus treinos e alcance seus objetivos com o TrainGO.
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <Link to="/onboarding">
              <PrimaryButton>
                Começar Agora
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-traingo-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Por que escolher o TrainGO?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-6 rounded-xl">
              <div className="bg-traingo-primary/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Dumbbell className="text-traingo-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Treinos Personalizados</h3>
              <p className="text-gray-400">Planos de treino adaptados ao seu perfil, objetivos e disponibilidade.</p>
            </div>
            
            <div className="bg-black p-6 rounded-xl">
              <div className="bg-traingo-primary/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="text-traingo-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Progresso Contínuo</h3>
              <p className="text-gray-400">Acompanhe sua evolução e mantenha-se motivado com métricas claras.</p>
            </div>
            
            <div className="bg-black p-6 rounded-xl">
              <div className="bg-traingo-primary/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-traingo-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Para Todos os Níveis</h3>
              <p className="text-gray-400">Iniciante ou avançado, temos o treino certo para você evoluir.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/onboarding">
              <PrimaryButton className="mx-auto">
                Descubra Seu Perfil
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400 text-sm">
        <p>© 2025 TrainGO. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;
