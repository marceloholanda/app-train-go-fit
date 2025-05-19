
import React from 'react';
import Button from '@/components/Button';
import { ArrowLeft } from 'lucide-react';

interface ProfileEditHeaderProps {
  onCancel: () => void;
}

const ProfileEditHeader = ({ onCancel }: ProfileEditHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        leftIcon={<ArrowLeft size={16} />}
        onClick={onCancel}
      >
        Voltar
      </Button>
      <h2 className="font-bold text-lg ml-2">Editar Perfil</h2>
    </div>
  );
};

export default ProfileEditHeader;
