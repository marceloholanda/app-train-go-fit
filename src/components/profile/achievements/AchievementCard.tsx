
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface AchievementCardProps {
  achievement: any;
  onClick: (achievement: any) => void;
  achievementIcons: Record<string, React.ReactNode>;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Ainda não desbloqueada';
  try {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (e) {
    return dateString;
  }
};

const AchievementCard = ({ achievement, onClick, achievementIcons }: AchievementCardProps) => (
  <div
    className={cn(
      "flex flex-col items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105",
      achievement.unlocked 
        ? "border-traingo-primary/30 bg-traingo-primary/10" 
        : "border-gray-800 bg-gray-900/50 opacity-50"
    )}
    onClick={() => onClick(achievement)}
  >
    <div className={cn(
      "mb-2 text-3xl",
      achievement.unlocked && "animate-bounce"
    )}>
      {achievementIcons[achievement.id] || '🏅'}
    </div>
    <Badge 
      className={cn(
        "mb-2",
        achievement.unlocked 
          ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30" 
          : "bg-gray-800"
      )}
    >
      {achievement.unlocked ? "Desbloqueado" : "Bloqueado"}
    </Badge>
    <h3 className="text-base font-bold mb-1">{achievement.name}</h3>
    <p className="text-xs text-center text-gray-400">{achievement.description}</p>
    {achievement.unlocked && achievement.unlockedDate && (
      <p className="text-xs text-traingo-primary mt-2">{formatDate(achievement.unlockedDate)}</p>
    )}
  </div>
);

export default AchievementCard;
