
import React from 'react';
import { ChevronRight, Bell, Globe, Key } from 'lucide-react';
import Card from '@/components/Card';
import { Switch } from '@/components/ui/switch';
import { useToast } from "@/hooks/use-toast";

interface AccountSettingsProps {
  notifications: boolean;
  onToggleNotifications: () => void;
  onChangePassword: () => void;
  onChangeLanguage: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ 
  notifications, 
  onToggleNotifications, 
  onChangePassword, 
  onChangeLanguage 
}) => {
  return (
    <section>
      <h2 className="font-bold text-lg mb-4">Conta</h2>
      
      <div className="space-y-3">
        <Card 
          className="flex items-center justify-between" 
          onClick={onChangePassword}
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
          <Switch 
            checked={notifications}
            onCheckedChange={onToggleNotifications}
            className="data-[state=checked]:bg-traingo-primary"
          />
        </Card>
        
        <Card 
          className="flex items-center justify-between" 
          onClick={onChangeLanguage}
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
  );
};

export default AccountSettings;
