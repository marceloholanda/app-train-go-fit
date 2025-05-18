
import React from 'react';
import { ChevronRight, Diamond } from 'lucide-react';
import Card from '@/components/Card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface SubscriptionSectionProps {
  isPremium: boolean;
  onOpenSubscriptionModal: () => void;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ 
  isPremium, 
  onOpenSubscriptionModal 
}) => {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className="font-bold text-lg mb-4">Assinatura</h2>
      
      {isPremium ? (
        <Card 
          className="bg-gradient-to-r from-traingo-primary/20 to-traingo-primary/5 flex items-center justify-between"
          onClick={onOpenSubscriptionModal}
        >
          <div className="flex items-center">
            <div className="bg-traingo-primary/30 p-2 rounded-full mr-3">
              <Diamond className="text-traingo-primary" size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Plano PRO</span>
                <Badge variant="premium" className="text-xs">Ativo</Badge>
              </div>
              <p className="text-sm text-gray-300">Gerenciar assinatura</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-traingo-primary" />
        </Card>
      ) : (
        <Card 
          className="bg-gradient-to-r from-traingo-primary/20 to-traingo-primary/5 flex items-center justify-between"
          onClick={() => navigate('/upgrade')}
        >
          <div>
            <span className="font-bold">Faça upgrade para o plano PRO</span>
            <p className="text-sm text-gray-300">Desbloqueie recursos exclusivos</p>
          </div>
          <ChevronRight size={18} className="text-traingo-primary" />
        </Card>
      )}
    </section>
  );
};

export default SubscriptionSection;
