
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <div className="pt-6">
      <Button 
        variant="secondary" 
        className="w-full" 
        onClick={onLogout}
      >
        <LogOut className="mr-2" size={18} />
        Sair da conta
      </Button>
    </div>
  );
};

export default LogoutButton;
