
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { getAchievementsFromSupabase, checkNewAchievements } from '@/utils/workoutUtils/achievementsService';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workoutCount, setWorkoutCount] = useState(0);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadAchievements();
  }, [currentUser]);

  const loadAchievements = async () => {
    try {
      if (!currentUser?.id) return;
      
      // Carregar conquistas do Supabase
      const achievementsList = await getAchievementsFromSupabase(currentUser.id);
      setAchievements(achievementsList);
      
      // Definir contagem de treinos (para exibição do progresso)
      if (achievementsList.length > 0) {
        const firstAchievement = achievementsList.find(a => a.id === 'bronze');
        if (firstAchievement) {
          setWorkoutCount(firstAchievement.unlocked ? firstAchievement.threshold : 0);
        }
      }
      
      // Verificar se há novas conquistas desbloqueadas
      const newAchievement = await checkNewAchievements(currentUser.id);
      if (newAchievement) {
        showNewAchievementToast(newAchievement);
      }
    } catch (error) {
      console.error("Erro ao carregar conquistas:", error);
    }
  };

  const showNewAchievementToast = (achievement: any) => {
    toast({
      title: "🎉 Nova Conquista Desbloqueada!",
      description: `Parabéns! Você desbloqueou: ${achievement.name}`,
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

  return {
    achievements,
    selectedAchievement,
    isDialogOpen,
    setIsDialogOpen,
    workoutCount,
    openAchievementDetails
  };
};
