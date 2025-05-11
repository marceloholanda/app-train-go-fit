
import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FreePlanUpgradeCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-4 mt-6 border-traingo-primary/30 bg-traingo-primary/5">
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          <div className="bg-traingo-primary/20 p-2 rounded-full">
            <Lock className="text-traingo-primary" size={18} />
          </div>
          <div>
            <p className="font-medium">Quer adicionar mais exercícios ao seu treino?</p>
            <p className="text-sm text-gray-400">
              Desbloqueie essa funcionalidade no plano PRO e monte treinos 100% personalizados.
            </p>
          </div>
        </div>
        <Button 
          onClick={() => navigate('/upgrade')}
          className="whitespace-nowrap"
          variant="default"
        >
          Fazer upgrade <ArrowRight size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default FreePlanUpgradeCard;
