
import React from 'react';

const PremiumStatusBanner: React.FC = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-traingo-primary/30 to-traingo-primary/10 rounded-xl p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10">
        <span className="text-6xl">✨</span>
      </div>
      <h3 className="font-bold text-lg mb-2 flex items-center">
        <span className="text-traingo-primary mr-2">PRO</span> Plano Premium Ativo
      </h3>
      <p className="text-gray-300 text-sm">
        Você tem acesso a todos os recursos premium do TrainGO.
      </p>
    </div>
  );
};

export default PremiumStatusBanner;
