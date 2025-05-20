
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import PrimaryButton from '@/components/PrimaryButton';

interface FitRecipesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FitRecipesModal: React.FC<FitRecipesModalProps> = ({ isOpen, onClose }) => {
  const handleBuyNow = () => {
    // Here you would handle the payment redirect
    // For now, we'll just simulate it with an alert
    window.open('https://payment.link/fit-recipes', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-traingo-gray border border-gray-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Receitas Fit para seu Resultado</DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Você está prestes a desbloquear um guia exclusivo com receitas nutritivas e saborosas 
            que acompanham seu ritmo de treino.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 space-y-4">
          <div className="bg-gradient-to-r from-traingo-primary/20 to-transparent p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Benefícios:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-traingo-primary mr-2">✅</span>
                <span>Receitas saudáveis e simples de preparar</span>
              </li>
              <li className="flex items-start">
                <span className="text-traingo-primary mr-2">✅</span>
                <span>Foco em emagrecimento, energia e recuperação muscular</span>
              </li>
              <li className="flex items-start">
                <span className="text-traingo-primary mr-2">✅</span>
                <span>Entregue via e-book diretamente no seu e-mail</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-400">Pagamento único</div>
            <div className="text-2xl font-bold text-traingo-primary mt-1">R$ 19,90</div>
            <div className="text-xs text-gray-400 mt-1">Acesso vitalício ao e-book</div>
          </div>
        </div>
        
        <DialogFooter>
          <PrimaryButton 
            onClick={handleBuyNow}
            className="w-full py-3"
          >
            Quero Receber Agora
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FitRecipesModal;
