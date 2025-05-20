
import React from 'react';
import { Award } from 'lucide-react';
import Card from '@/components/Card';
import AchievementCard from './achievements/AchievementCard';
import AchievementDetailsDialog from './achievements/AchievementDetailsDialog';
import { useAchievements } from '@/hooks/useAchievements';

const achievementIcons: Record<string, React.ReactNode> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '🔥',
  consistency_pro: '🏆'
};

interface AchievementsListProps {
  userData: any;
}

const AchievementsList = ({ userData }: AchievementsListProps) => {
  const { 
    achievements, 
    selectedAchievement,
    isDialogOpen,
    setIsDialogOpen,
    workoutCount,
    openAchievementDetails
  } = useAchievements();

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Award className="text-traingo-primary mr-2" size={20} />
        <h2 className="font-bold text-lg">Conquistas</h2>
      </div>
      
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <AchievementCard 
              key={achievement.id}
              achievement={achievement}
              onClick={openAchievementDetails}
              achievementIcons={achievementIcons}
            />
          ))}
        </div>

        <AchievementDetailsDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          achievement={selectedAchievement}
          achievementIcons={achievementIcons}
          workoutCount={workoutCount}
        />
      </Card>
    </div>
  );
};

export default AchievementsList;
