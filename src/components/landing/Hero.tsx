
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/PrimaryButton';

const Hero = () => {
  const navigate = useNavigate();
  
  const startOnboarding = () => {
    navigate('/onboarding');
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 text-center mt-8 mb-12">
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">
          Seu treino personalizado na <span className="text-traingo-primary">palma da mão</span>
        </h1>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          Acompanhe seu progresso, personalize seus treinos e alcance seus objetivos com o TrainGO.
        </p>
        
        <div className="flex flex-col items-center justify-center">
          <PrimaryButton onClick={startOnboarding}>
            Começar Agora
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
