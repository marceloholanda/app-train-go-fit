
import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import Card from '@/components/Card';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getUserAchievements } from '@/utils/workoutUtils/achievements';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

const achievementIcons: Record<string, React.ReactNode> = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '🔥',
  first_workout: '🎯',
  streak_3days: '🔥',
  streak_7days: '🏆',
  complete_plan: '🌟',
  profile_complete: '📝'
};

// Static achievements for display
const staticAchievements = [
  {
    id: 'first_workout',
    name: 'Primeiro Treino',
    description: 'Completou seu primeiro treino. O início de uma jornada incrível!',
    unlocked: false,
    threshold: 1
  },
  {
    id: 'streak_3days',
    name: 'Consistente',
    description: 'Treinou por 3 dias consecutivos. A consistência é a chave!',
    unlocked: false,
    threshold: 3
  },
  {
    id: 'streak_7days',
    name: 'Semana Perfeita',
    description: 'Uma semana inteira de treinos consecutivos. Impressionante!',
    unlocked: false,
    threshold: 7
  },
  {
    id: 'complete_plan',
    name: 'Plano Completo',
    description: 'Completou todos os treinos do seu plano. Muito bem!',
    unlocked: false,
    threshold: 30
  }
];

interface AchievementsListProps {
  userData: any;
}

const AchievementsList = ({ userData }: AchievementsListProps) => {
  const [achievements, setAchievements] = useState<any[]>(staticAchievements);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load achievements - mix of static data and any unlocked achievements from DB
    const loadAchievements = async () => {
      try {
        // Get unlocked achievements from database
        const unlockedAchievements = await getUserAchievements();
        
        // Map DB achievements to our format
        const unlockedMap = new Map();
        unlockedAchievements.forEach(achievement => {
          unlockedMap.set(achievement.badge_id, {
            unlocked: true,
            unlockedDate: achievement.unlocked_at
          });
        });
        
        // Combine static and unlocked achievements
        const combinedAchievements = staticAchievements.map(achievement => {
          const unlocked = unlockedMap.get(achievement.id);
          return {
            ...achievement,
            unlocked: !!unlocked,
            unlockedDate: unlocked?.unlockedDate || null
          };
        });
        
        setAchievements(combinedAchievements);
      } catch (error) {
        console.error("Error loading achievements:", error);
      }
    };
    
    loadAchievements();
  }, [userData]);

  const showNewAchievementToast = (achievement: any) => {
    toast({
      title: "🎉 Nova Conquista Desbloqueada!",
      description: `Parabéns! Você desbloqueou: ${achievement.badge_name || achievement.name}`,
      variant: "default",
      className: "bg-traingo-primary/20 border-traingo-primary text-white",
      duration: 5000,
    });
    
    // Seleciona e abre o diálogo da nova conquista
    setTimeout(() => {
      setSelectedAchievement(achievement);
      setIsDialogOpen(true);
    }, 1000);
  };

  const openAchievementDetails = (achievement: any) => {
    setSelectedAchievement(achievement);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Ainda não desbloqueada';
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
        <Award className="text-traingo-primary mr-2" size={20} />
        <h2 className="font-bold text-lg">Conquistas</h2>
      </div>
      
      <Card className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-105",
                achievement.unlocked 
                  ? "border-traingo-primary/30 bg-traingo-primary/10" 
                  : "border-gray-800 bg-gray-900/50 opacity-50"
              )}
              onClick={() => openAchievementDetails(achievement)}
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
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-gray-900 border border-gray-800">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center text-xl">
                <span className="text-3xl mr-2">{selectedAchievement && (achievementIcons[selectedAchievement.id] || '🏅')}</span>
                {selectedAchievement?.name || "Conquista"}
              </DialogTitle>
              <DialogDescription className="text-center pt-4">
                {selectedAchievement?.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center space-y-4">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center text-5xl",
                selectedAchievement?.unlocked
                  ? "bg-traingo-primary/20 border-2 border-traingo-primary"
                  : "bg-gray-800/30 border-2 border-gray-700"
              )}>
                {selectedAchievement && (achievementIcons[selectedAchievement.id] || '🏅')}
              </div>
              
              <div className="text-center">
                <Badge 
                  className={cn(
                    "mb-4",
                    selectedAchievement?.unlocked 
                      ? "bg-green-500/20 text-green-300 hover:bg-green-500/30" 
                      : "bg-gray-800 text-gray-400"
                  )}
                >
                  {selectedAchievement?.unlocked ? "Conquista Desbloqueada" : "Conquista Bloqueada"}
                </Badge>
                
                <p className="text-sm text-gray-300">
                  <strong>Regra:</strong> {selectedAchievement?.description}
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  <strong>Progresso:</strong> {userData?.workoutHistory?.length || 0} / {selectedAchievement?.threshold || 0} dias de treino
                </p>
                
                {selectedAchievement?.unlocked ? (
                  <p className="mt-4 text-sm text-traingo-primary">
                    Desbloqueada em: {selectedAchievement?.unlockedDate && formatDate(selectedAchievement.unlockedDate)}
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-gray-400">
                    Faltam {selectedAchievement?.threshold - (userData?.workoutHistory?.length || 0)} dias para desbloquear
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

export default AchievementsList;
