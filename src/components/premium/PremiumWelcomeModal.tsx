
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Diamond } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumWelcomeModal: React.FC<PremiumWelcomeModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  const handleExplore = () => {
    onClose();
    navigate('/dashboard');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-traingo-primary/20 p-3 rounded-full">
              <Diamond className="h-8 w-8 text-traingo-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Bem-vindo ao TrainGO PRO 💎</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Agora você desbloqueou vídeos dos exercícios, substituições personalizadas, desafios exclusivos e muito mais!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h4 className="font-medium">Benefícios desbloqueados:</h4>
          <ul className="space-y-2 list-disc pl-5">
            <li>Vídeos detalhados de todos os exercícios</li>
            <li>Substituições personalizadas para cada exercício</li>
            <li>Desafios exclusivos para membros PRO</li>
            <li>Estatísticas avançadas de progresso</li>
            <li>Treinos 100% personalizados</li>
            <li>Suporte prioritário</li>
          </ul>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleExplore}
            className="w-full bg-traingo-primary hover:bg-traingo-primary/90"
          >
            Explorar meu plano PRO
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumWelcomeModal;
