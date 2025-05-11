
import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import Card from '@/components/Card';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getAchievements } from '@/utils/workoutUtils';

const achievementIcons: Record<string, React.ReactNode> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '🔥'
};

interface AchievementsListProps {
  userData: any;
}

const AchievementsList = ({ userData }: AchievementsListProps) => {
  const [achievements, setAchievements] = useState<{id: string, name: string, description: string, unlocked: boolean}[]>([]);

  useEffect(() => {
    // Carregar conquistas
    const achievementsData = getAchievements();
    setAchievements(achievementsData);
  }, [userData]);

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Award className="text-traingo-primary mr-2" size={20} />
        <h2 className="font-bold text-lg">Conquistas</h2>
      </div>
      
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center p-4 rounded-lg border transition-colors",
                achievement.unlocked 
                  ? "border-traingo-primary/30 bg-traingo-primary/10" 
                  : "border-gray-800 bg-gray-900/50 opacity-50"
              )}
            >
              <div className="mb-2 text-3xl">{achievementIcons[achievement.id]}</div>
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
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AchievementsList;
