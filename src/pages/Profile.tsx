
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import WorkoutCalendar from '@/components/profile/WorkoutCalendar';
import AchievementsList from '@/components/profile/AchievementsList';
import UserLevel from '@/components/profile/UserLevel';
import UpgradeBanner from '@/components/profile/UpgradeBanner';
import MonthlyEvaluation from '@/components/profile/MonthlyEvaluation';
import LevelOnboardingBanner from '@/components/profile/LevelOnboardingBanner';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Carregar dados do usuário
    const loadUserData = () => {
      try {
        const user = localStorage.getItem('traingo-user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar seu perfil.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isPremium = userData?.isPremium || false;

  return (
    <div className="min-h-screen pb-16">
      <ProfileHeader userData={userData} setUserData={setUserData} />

      {/* Avaliação Mensal e Banner de Onboarding */}
      <MonthlyEvaluation />
      <LevelOnboardingBanner />

      {!isEditing && (
        <div className="p-6">
          <ProfileInfo userData={userData} setIsEditing={setIsEditing} />
          <UserLevel userData={userData} />
          <WorkoutCalendar userData={userData} />
          <AchievementsList userData={userData} />
          <UpgradeBanner isPremium={isPremium} />
        </div>
      )}
    </div>
  );
};

export default Profile;
