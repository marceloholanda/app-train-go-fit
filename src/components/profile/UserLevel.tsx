
import React from 'react';
import { Trophy } from 'lucide-react';
import Card from '@/components/Card';
import { Progress } from '@/components/ui/progress';
import { getUserLevel } from '@/utils/workoutUtils';
import { cn } from '@/lib/utils';

interface UserLevelProps {
  userData: any;
}

const UserLevel = ({ userData }: UserLevelProps) => {
  const { level, nextLevel, progress } = getUserLevel();

  // Define cores e ícones para cada nível
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante": return "text-green-400";
      case "Intermediário": return "text-blue-400";
      case "Avançado": return "text-purple-500";
      case "Atleta": return "text-yellow-500";
      default: return "text-green-400";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Iniciante": return "🍀";
      case "Intermediário": return "⭐";
      case "Avançado": return "🔥";
      case "Atleta": return "🏆";
      default: return "🍀";
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Trophy className="text-traingo-primary mr-2" size={20} />
        <h2 className="font-bold text-lg">Nível de Consistência</h2>
      </div>
      
      <Card className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{getLevelIcon(level)}</span>
            <div>
              <h3 className={cn("font-bold text-lg", getLevelColor(level))}>
                {level}
              </h3>
              <p className="text-xs text-gray-400">Nível de consistência</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm">
              Próximo nível: <span className="font-semibold">{nextLevel}</span>
            </span>
            <span className="text-xs text-gray-400">{progress}% concluído</span>
          </div>
        </div>
        
        {/* Barra de Progresso */}
        <div className="mb-1">
          <Progress value={progress} className="h-2" />
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-4">
          Continue treinando para subir de nível e desbloquear novas conquistas!
        </p>
      </Card>
    </div>
  );
};

export default UserLevel;
