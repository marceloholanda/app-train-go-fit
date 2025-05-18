
import React from 'react';
import Button from '@/components/Button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <div className="pt-6">
      <Button 
        variant="secondary" 
        fullWidth 
        leftIcon={<LogOut size={18} />}
        onClick={onLogout}
      >
        Sair da conta
      </Button>
    </div>
  );
};

export default LogoutButton;
