
import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import Card from '@/components/Card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getAchievements } from '@/utils/workoutUtils';
import { Achievement } from '@/types/workout';
import { supabase } from '@/integrations/supabase/client';

const AchievementsList = ({ userData }: { userData: any }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadAchievements = async () => {
      // Get fresh session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      const activeUser = currentSession?.user || currentUser;
      
      if (!activeUser) {
        console.log('[TrainGO] No user found for achievements');
        return;
      }

      console.log('[TrainGO] Loading achievements for user:', activeUser.id);

      try {
        setIsLoading(true);
        const userAchievements = await getAchievements(activeUser.id);
        setAchievements(userAchievements);
        console.log('[TrainGO] Achievements loaded for user:', activeUser.id, userAchievements.length);
      } catch (error) {
        console.error('[TrainGO] Error loading achievements for user', activeUser.id, ':', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar suas conquistas',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAchievements();
  }, [currentUser, session, toast]);

  if (isLoading) {
    return <p>Carregando conquistas...</p>;
  }

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <Trophy className="text-traingo-primary mr-2" size={20} />
        <h2 className="font-bold text-lg">Conquistas</h2>
      </div>
      
      {achievements.length === 0 ? (
        <Card className="text-center py-4">
          Nenhuma conquista desbloqueada ainda. Continue treinando!
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="p-4">
              <h3 className="font-semibold text-md">{achievement.name}</h3>
              <p className="text-sm text-gray-400">{achievement.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Desbloqueado em: {new Date(achievement.unlocked_at).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsList;
