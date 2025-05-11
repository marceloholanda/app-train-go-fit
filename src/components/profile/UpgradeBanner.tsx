
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeBannerProps {
  isPremium: boolean;
}

const UpgradeBanner = ({ isPremium }: UpgradeBannerProps) => {
  const navigate = useNavigate();
  
  if (isPremium) {
    return null;
  }
  
  return (
    <div 
      className="mt-8 bg-gradient-to-r from-traingo-primary/20 to-traingo-primary/5 p-5 rounded-xl flex justify-between items-center cursor-pointer"
      onClick={() => navigate('/upgrade')}
    >
      <div>
        <h3 className="font-bold mb-1">Melhore sua experiência</h3>
        <p className="text-sm text-gray-300">Desbloqueie recursos premium</p>
      </div>
      <ChevronRight className="text-traingo-primary" />
    </div>
  );
};

export default UpgradeBanner;
