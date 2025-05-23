
import React from 'react';

const ExerciseDetailLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">Carregando treino...</p>
          <p className="text-sm text-gray-400 mt-1">Buscando exercícios do dia</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailLoading;
