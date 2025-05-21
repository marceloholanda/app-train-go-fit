
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="pt-6">
      <Button 
        variant="secondary" 
        className="w-full" 
        onClick={handleLogout}
      >
        <LogOut className="mr-2" size={18} />
        Sair da conta
      </Button>
    </div>
  );
};

export default LogoutButton;
