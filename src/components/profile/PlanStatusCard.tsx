
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';

interface PlanStatusCardProps {
  isPremium: boolean;
}

const PlanStatusCard = ({ isPremium }: PlanStatusCardProps) => {
  return (
    <Card className="mb-6 border border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {isPremium ? 'PRO - Plano Premium Ativo' : 'Plano Free'}
          </h2>
          <Badge variant={isPremium ? 'premium' : 'default'}>
            {isPremium ? 'PRO' : 'FREE'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300">
          {isPremium 
            ? 'Você tem acesso a todos os recursos premium do TrainGO, incluindo vídeos demonstrativos de exercícios.'
            : 'Faça upgrade para o plano premium para desbloquear todos os recursos do TrainGO.'}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PlanStatusCard;
