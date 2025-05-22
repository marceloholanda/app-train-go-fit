
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Zap, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';
import PrimaryButton from '@/components/PrimaryButton';

const Features = () => {
  const navigate = useNavigate();
  
  const startOnboarding = () => {
    navigate('/onboarding');
  };

  const features = [
    {
      icon: Dumbbell,
      title: "Treinos Personalizados",
      description: "Planos de treino adaptados ao seu perfil, objetivos e disponibilidade."
    },
    {
      icon: Zap,
      title: "Progresso Contínuo",
      description: "Acompanhe sua evolução e mantenha-se motivado com métricas claras."
    },
    {
      icon: Users,
      title: "Para Todos os Níveis",
      description: "Iniciante ou avançado, temos o treino certo para você evoluir."
    }
  ];

  return (
    <section id="features" className="py-16 px-6 bg-traingo-gray">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Por que escolher o TrainGO?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <PrimaryButton 
            onClick={startOnboarding}
            className="mx-auto"
          >
            Descubra Seu Perfil
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Features;
