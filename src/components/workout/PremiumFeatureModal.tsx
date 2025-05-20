
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const PremiumFeatureModal: React.FC<PremiumFeatureModalProps> = ({
  isOpen,
  onClose,
  title = "Recurso Premium",
  description = "Este recurso está disponível apenas para usuários Premium. Faça o upgrade para acessar recursos adicionais."
}) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="secondary">Fechar</Button>
          </DialogClose>
          <Button 
            variant="default" 
            onClick={() => navigate('/upgrade')}
          >
            Fazer upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFeatureModal;
