
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isPremiumUser } from '@/utils/userUtils';

const SubscriptionBanner: React.FC = () => {
  const navigate = useNavigate();
  const isPremium = isPremiumUser();

  if (isPremium) {
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
  }

  return (
    <div 
      className="mt-8 bg-gradient-to-r from-traingo-primary/30 to-traingo-primary/10 rounded-xl p-5 relative overflow-hidden cursor-pointer"
      onClick={() => navigate('/upgrade')}
    >
      <div className="absolute top-0 right-0 opacity-10">
        <span className="text-6xl">✨</span>
      </div>
      <h3 className="font-bold text-lg mb-2">Desbloqueie Mais Treinos</h3>
      <p className="text-gray-300 text-sm mb-3">
        Acesse o plano PRO e tenha um treino D exclusivo + exercícios adicionais.
      </p>
      <div className="text-traingo-primary font-bold text-sm">Saiba mais →</div>
    </div>
  );
};

export default SubscriptionBanner;
