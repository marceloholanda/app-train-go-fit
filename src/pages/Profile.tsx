
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import WorkoutCalendar from '@/components/profile/WorkoutCalendar';
import AchievementsList from '@/components/profile/AchievementsList';
import UserLevel from '@/components/profile/UserLevel';
import UpgradeBanner from '@/components/profile/UpgradeBanner';
import MonthlyEvaluation from '@/components/profile/MonthlyEvaluation';
import LevelOnboardingBanner from '@/components/profile/LevelOnboardingBanner';
import PlanStatusCard from '@/components/profile/PlanStatusCard';
import { useProfileData } from '@/hooks/useProfileData';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser, session, isLoading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading, isPremium } = useProfileData();
  const [isEditing, setIsEditing] = useState(false);

  // Redirect to login if not authenticated, but wait for auth to load first
  useEffect(() => {
    if (!authLoading && !currentUser && !session) {
      console.log('[TrainGO] No authenticated user found, redirecting to login');
      navigate('/login');
      return;
    }

    if (currentUser) {
      console.log('[TrainGO] Authenticated user found for profile:', currentUser.id);
    }
  }, [currentUser, session, authLoading, navigate]);

  // Show loading while authentication or profile is loading
  if (authLoading || profileLoading) {
    console.log('[TrainGO] Loading profile page - auth:', authLoading, 'profile:', profileLoading);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if no user (will redirect above)
  if (!currentUser) {
    return null;
  }

  // Use profile data from Supabase, fallback to basic user data
  const userData = profile ? {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    plan: isPremium ? 'premium' : 'free',
    profile: profile
  } : {
    id: currentUser.id,
    name: currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'Usuário',
    email: currentUser.email,
    plan: 'free',
    profile: null
  };

  console.log('[TrainGO] Rendering profile for user:', userData.id, 'with data:', userData);

  return (
    <div className="min-h-screen pb-24">
      <ProfileHeader userData={userData} setUserData={() => {/* Profile updates handled by useProfileData */}} />

      {/* Avaliação Mensal e Banner de Onboarding */}
      <MonthlyEvaluation />
      <LevelOnboardingBanner />

      <div className="p-6">
        {/* Status do Plano */}
        <PlanStatusCard isPremium={isPremium} />
        
        <ProfileInfo userData={userData} setIsEditing={setIsEditing} />
        <UserLevel userData={userData} />
        <WorkoutCalendar userData={userData} />
        <AchievementsList userData={userData} />
        <UpgradeBanner isPremium={isPremium} />
      </div>
    </div>
  );
};

export default Profile;
