
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
import { Badge } from '@/components/ui/badge';
import { CreditCard, XCircle, Diamond } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionManagementModal: React.FC<SubscriptionManagementModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  
  // Datas mockadas para a assinatura
  const startDate = new Date(2023, 10, 15); // 15 de Novembro de 2023
  const renewalDate = new Date(2024, 10, 15); // 15 de Novembro de 2024
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Seu Plano PRO <Badge variant="premium">Ativo</Badge>
          </DialogTitle>
          <DialogDescription>
            Gerencie sua assinatura e forma de pagamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Data de início</span>
              <span className="font-medium">{formatDate(startDate)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Próxima renovação</span>
              <span className="font-medium">{formatDate(renewalDate)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Valor</span>
              <span className="font-medium">R$ 29,90/mês</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Forma de pagamento</span>
              <span className="font-medium flex items-center gap-1">
                <CreditCard size={16} />
                •••• 4242
              </span>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Button 
              variant="secondary"
              className="w-full"
              onClick={() => {}}
            >
              <CreditCard size={16} className="mr-2" /> Alterar forma de pagamento
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full text-red-400 hover:text-red-500 hover:bg-red-500/10"
              onClick={() => {}}
            >
              <XCircle size={16} className="mr-2" /> Cancelar assinatura
            </Button>
            
            <Button 
              variant="ghost"
              className="w-full"
              onClick={() => navigate('/upgrade')}
            >
              <Diamond size={16} className="mr-2" /> Ver mais benefícios do plano PRO
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionManagementModal;
