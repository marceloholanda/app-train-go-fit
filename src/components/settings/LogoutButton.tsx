
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => Promise<void>;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <Button 
      variant="destructive" 
      className="w-full mt-6 flex items-center justify-center gap-2"
      onClick={onLogout}
    >
      <LogOut size={18} />
      Sair da Conta
    </Button>
  );
};

export default LogoutButton;
