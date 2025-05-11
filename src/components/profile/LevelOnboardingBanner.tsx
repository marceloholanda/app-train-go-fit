
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { shouldShowLevelOnboarding } from '@/utils/workoutUtils';
import { cn } from '@/lib/utils';

const LevelOnboardingBanner = () => {
  const [visible, setVisible] = useState(false);
  const [currentLevel, setCurrentLevel] = useState("");
  
  useEffect(() => {
    // Verificar se deve mostrar o banner de onboarding
    if (shouldShowLevelOnboarding()) {
      const storedLevel = localStorage.getItem('traingo-nivel-atual');
      if (storedLevel) {
        setCurrentLevel(storedLevel);
        setVisible(true);
      }
    }
  }, []);
  
  if (!visible) return null;
  
  const getLevelEmoji = () => {
    switch (currentLevel) {
      case "Iniciante": return "🍀";
      case "Intermediário": return "💪";
      case "Avançado": return "🔥";
      case "Atleta": return "🏆";
      default: return "💪";
    }
  };
  
  const getBannerColor = () => {
    switch (currentLevel) {
      case "Iniciante": return "from-green-500/20 to-green-700/10";
      case "Intermediário": return "from-blue-500/20 to-blue-700/10";
      case "Avançado": return "from-purple-500/20 to-purple-700/10";
      case "Atleta": return "from-yellow-500/20 to-yellow-700/10";
      default: return "from-traingo-primary/20 to-traingo-primary/5";
    }
  };
  
  return (
    <div className={cn(
      "fixed bottom-20 left-0 right-0 mx-4 z-50 p-4 rounded-lg shadow-lg animate-slide-up",
      `bg-gradient-to-r ${getBannerColor()} border border-gray-800`
    )}>
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-white" 
        onClick={() => setVisible(false)}
      >
        <X size={16} />
      </button>
      
      <div className="flex items-center">
        <div className="mr-3 text-3xl">{getLevelEmoji()}</div>
        <div>
          <h3 className="font-bold text-sm">Você já está no nível {currentLevel}!</h3>
          <p className="text-xs text-gray-300">Continue evoluindo com o TrainGO!</p>
        </div>
      </div>
    </div>
  );
};

export default LevelOnboardingBanner;
