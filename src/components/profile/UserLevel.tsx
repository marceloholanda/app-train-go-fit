
import React from 'react';
import { Trophy, Clock } from 'lucide-react';
import Card from '@/components/Card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserLevelProps {
  userData: any;
}

const UserLevel = ({ userData }: UserLevelProps) => {
  // Dados simulados para o nível do usuário
  const levelData = {
    level: "Iniciante", 
    nextLevel: "Intermediário",
    progress: 15
  };

  const unlockedLevels = [
    { nivel: "Iniciante", date: "2023-05-01" }
  ];

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
  
  const getLevelMedal = (level: string) => {
    switch (level) {
      case "Iniciante": return "🥉";
      case "Intermediário": return "🥈";
      case "Avançado": return "🥇";
      case "Atleta": return "🏅";
      default: return "🥉";
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      return dateString;
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
            <span className="text-2xl mr-2">{getLevelIcon(levelData.level)}</span>
            <div>
              <h3 className={cn("font-bold text-lg", getLevelColor(levelData.level))}>
                {levelData.level}
              </h3>
              <p className="text-xs text-gray-400">Nível de consistência</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm">
              Próximo nível: <span className="font-semibold">{levelData.nextLevel}</span>
            </span>
            <span className="text-xs text-gray-400">{levelData.progress}% concluído</span>
          </div>
        </div>
        
        {/* Barra de Progresso */}
        <div className="mb-1">
          <Progress value={levelData.progress} className="h-2" />
        </div>
        
        <p className="text-center text-xs text-gray-400 mt-4 mb-6">
          Continue treinando para subir de nível e desbloquear novas conquistas!
        </p>
        
        {/* Nova seção: Evolução de Nível */}
        {unlockedLevels.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center mb-4">
              <Clock className="text-traingo-primary mr-2" size={16} />
              <h3 className="font-semibold text-sm">Evolução de Nível</h3>
            </div>
            
            <div className="space-y-3">
              {unlockedLevels.map((item: {nivel: string, date: string}, index: number) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2">{getLevelMedal(item.nivel)}</span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                    <span className={cn("text-sm font-medium", getLevelColor(item.nivel))}>
                      {item.nivel}
                    </span>
                    <span className="text-xs text-gray-400">
                      desbloqueado em {formatDate(item.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserLevel;
