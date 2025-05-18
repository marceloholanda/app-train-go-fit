
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { ChevronRight, Bell, Globe, Key, Trash2, LogOut, AlertTriangle, Diamond } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { isPremiumUser, resetPremiumWelcomeStatus } from '@/utils/userUtils';
import SubscriptionManagementModal from '@/components/premium/SubscriptionManagementModal';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

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
    // Em uma aplicação real, isso abriria um modal ou navegaria para uma página de alteração de senha
    toast({
      title: "Recurso em desenvolvimento",
      description: "A alteração de senha estará disponível em breve.",
    });
  };

  const handleChangeLanguage = () => {
    // Em uma aplicação real, isso abriria um modal para escolher o idioma
    toast({
      title: "Recurso em desenvolvimento",
      description: "A troca de idioma estará disponível em breve.",
    });
  };

  const handleDeleteAccount = () => {
    // Primeiro mostramos a confirmação
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    // Quando confirmado, apagamos a conta
    localStorage.removeItem('traingo-user');
    resetPremiumWelcomeStatus(); // Reset premium welcome status
    toast({
      title: "Conta excluída",
      description: "Todos os seus dados foram removidos.",
    });
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      // Usar o método de logout do contexto de autenticação
      await logout();
      
      // Remover qualquer dado adicional que não seja limpo pelo logout
      resetPremiumWelcomeStatus();
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta.",
      });
      
      // Não precisamos redirecionar aqui já que o AuthContext agora faz isso automaticamente
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
      {/* Header */}
      <header className="bg-traingo-gray p-6">
        <h1 className="text-2xl font-bold">Configurações</h1>
      </header>

      <div className="p-6 space-y-6">
        {/* Account Settings */}
        <section>
          <h2 className="font-bold text-lg mb-4">Conta</h2>
          
          <div className="space-y-3">
            <Card 
              className="flex items-center justify-between" 
              onClick={handleChangePassword}
            >
              <div className="flex items-center">
                <div className="bg-traingo-primary/10 p-2 rounded-full mr-3">
                  <Key className="text-traingo-primary" size={18} />
                </div>
                <span>Alterar senha</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </Card>
            
            <Card className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-traingo-primary/10 p-2 rounded-full mr-3">
                  <Bell className="text-traingo-primary" size={18} />
                </div>
                <span>Notificações</span>
              </div>
              <button 
                className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? 'bg-traingo-primary' : 'bg-gray-700'}`}
                onClick={handleToggleNotifications}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'left-7' : 'left-1'}`}
                />
              </button>
            </Card>
            
            <Card 
              className="flex items-center justify-between" 
              onClick={handleChangeLanguage}
            >
              <div className="flex items-center">
                <div className="bg-traingo-primary/10 p-2 rounded-full mr-3">
                  <Globe className="text-traingo-primary" size={18} />
                </div>
                <div>
                  <span>Idioma</span>
                  <p className="text-sm text-gray-400">Português (BR)</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </Card>
          </div>
        </section>

        {/* Subscription */}
        <section>
          <h2 className="font-bold text-lg mb-4">Assinatura</h2>
          
          {isPremium ? (
            <Card 
              className="bg-gradient-to-r from-traingo-primary/20 to-traingo-primary/5 flex items-center justify-between"
              onClick={openSubscriptionModal}
            >
              <div className="flex items-center">
                <div className="bg-traingo-primary/30 p-2 rounded-full mr-3">
                  <Diamond className="text-traingo-primary" size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Plano PRO</span>
                    <Badge variant="premium" className="text-xs">Ativo</Badge>
                  </div>
                  <p className="text-sm text-gray-300">Gerenciar assinatura</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-traingo-primary" />
            </Card>
          ) : (
            <Card 
              className="bg-gradient-to-r from-traingo-primary/20 to-traingo-primary/5 flex items-center justify-between"
              onClick={() => navigate('/upgrade')}
            >
              <div>
                <span className="font-bold">Faça upgrade para o plano PRO</span>
                <p className="text-sm text-gray-300">Desbloqueie recursos exclusivos</p>
              </div>
              <ChevronRight size={18} className="text-traingo-primary" />
            </Card>
          )}
        </section>

        {/* Privacy */}
        <section>
          <h2 className="font-bold text-lg mb-4">Privacidade</h2>
          
          <div className="space-y-3">
            <Card className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Termos de uso</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </Card>
            
            <Card className="flex items-center justify-between">
              <div className="flex items-center">
                <span>Política de privacidade</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </Card>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-4">
          <h2 className="font-bold text-lg mb-4 text-red-500">Zona de perigo</h2>
          
          {showDeleteConfirm ? (
            <Card className="border border-red-500/50 bg-red-500/10 p-4">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-red-500 mr-2" size={20} />
                <h3 className="font-bold text-red-500">Confirmar exclusão</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente.
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={handleDeleteAccount}
                >
                  Sim, excluir
                </Button>
              </div>
            </Card>
          ) : (
            <Card 
              onClick={handleDeleteAccount}
              className="flex items-center justify-between text-red-400 hover:bg-red-500/10"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full mr-3">
                  <Trash2 size={18} />
                </div>
                <span>Excluir minha conta</span>
              </div>
              <ChevronRight size={18} />
            </Card>
          )}
        </section>

        {/* Logout */}
        <div className="pt-6">
          <Button 
            variant="secondary" 
            fullWidth 
            leftIcon={<LogOut size={18} />}
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </div>
      </div>
      
      {/* Modal de gerenciamento de assinatura */}
      <SubscriptionManagementModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </div>
  );
};

export default Settings;
