
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Diamond } from 'lucide-react';

interface PremiumRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumRestrictionModal = ({ isOpen, onClose }: PremiumRestrictionModalProps) => {
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    onClose();
    navigate('/upgrade');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="bg-traingo-primary/20 p-3 rounded-full">
              <Diamond className="text-traingo-primary h-8 w-8" />
            </div>
          </div>
          <DialogTitle className="text-xl text-center">Recurso Premium</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Para alterar seus objetivos e receber novos treinos personalizados, 
            faça upgrade para o plano PRO.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Fechar
          </Button>
          <Button onClick={handleUpgrade} className="flex-1">
            Fazer upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumRestrictionModal;
