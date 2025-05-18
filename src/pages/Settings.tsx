
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { isPremiumUser, resetPremiumWelcomeStatus } from '@/utils/userUtils';
import SubscriptionManagementModal from '@/components/premium/SubscriptionManagementModal';
import { useAuth } from '@/contexts/AuthContext';

// Componentes refatorados
import SettingsHeader from '@/components/settings/SettingsHeader';
import AccountSettings from '@/components/settings/AccountSettings';
import SubscriptionSection from '@/components/settings/SubscriptionSection';
import PrivacySection from '@/components/settings/PrivacySection';
import DangerZoneSection from '@/components/settings/DangerZoneSection';
import LogoutButton from '@/components/settings/LogoutButton';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  const isPremium = isPremiumUser();

  const handleToggleNotifications = () => {
    setNotifications(prev => !prev);
    toast({
      title: notifications ? "Notificações desativadas" : "Notificações ativadas",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Recurso em desenvolvimento",
      description: "A alteração de senha estará disponível em breve.",
    });
  };

  const handleChangeLanguage = () => {
    toast({
      title: "Recurso em desenvolvimento",
      description: "A troca de idioma estará disponível em breve.",
    });
  };

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    localStorage.removeItem('traingo-user');
    resetPremiumWelcomeStatus();
    toast({
      title: "Conta excluída",
      description: "Todos os seus dados foram removidos.",
    });
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await logout();
      resetPremiumWelcomeStatus();
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
      });
    } catch (error) {
      console.error('[TrainGO] Error during logout:', error);
      toast({
        title: "Erro ao sair",
        description: "Não foi possível finalizar o logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  const openSubscriptionModal = () => {
    setShowSubscriptionModal(true);
  };

  return (
    <div className="min-h-screen pb-16">
      <SettingsHeader />

      <div className="p-6 space-y-6">
        <AccountSettings 
          notifications={notifications}
          onToggleNotifications={handleToggleNotifications}
          onChangePassword={handleChangePassword}
          onChangeLanguage={handleChangeLanguage}
        />

        <SubscriptionSection 
          isPremium={isPremium}
          onOpenSubscriptionModal={openSubscriptionModal}
        />

        <PrivacySection />

        <DangerZoneSection 
          showDeleteConfirm={showDeleteConfirm}
          onDeleteAccount={handleDeleteAccount}
          onCancelDelete={() => setShowDeleteConfirm(false)}
        />

        <LogoutButton onLogout={handleLogout} />
      </div>
      
      <SubscriptionManagementModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </div>
  );
};

export default Settings;
