
import React from 'react';
import { Edit2 } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { calculateIMC, getIMCClassification } from '@/utils/userUtils';

// Mapeia os valores do quiz para textos legíveis
const ageMap: Record<string, string> = {
  under_18: 'Menos de 18 anos',
  '18_29': 'Entre 18 e 29 anos',
  '30_44': 'Entre 30 e 44 anos',
  '45_59': 'Entre 45 e 59 anos',
  '60_plus': '60 anos ou mais'
};

const weightMap: Record<string, string> = {
  under_60: 'Abaixo de 60kg',
  '60_75': 'Entre 60kg e 75kg',
  '75_90': 'Entre 75kg e 90kg',
  '90_110': 'Entre 90kg e 110kg',
  above_110: 'Acima de 110kg'
};

const heightMap: Record<string, string> = {
  under_160: 'Abaixo de 1,60m',
  '160_175': 'Entre 1,60m e 1,75m',
  '175_185': 'Entre 1,75m e 1,85m',
  above_185: 'Acima de 1,85m'
};

interface PhysicalDataCardProps {
  userData: any;
  physicalData: {
    age: number;
    weight: number;
    height: number;
  };
  onEditClick: () => void;
}

const PhysicalDataCard = ({ userData, physicalData, onEditClick }: PhysicalDataCardProps) => {
  // Calculate IMC
  const imc = calculateIMC(physicalData.weight, physicalData.height);
  const imcClassification = getIMCClassification(imc);

  return (
    <Card className="mb-6">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-md mb-3">Dados Físicos</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<Edit2 size={16} />}
          onClick={onEditClick}
        >
          Editar
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Idade</h3>
          <p className="font-medium">
            {physicalData.age ? `${physicalData.age} anos` : 
            ageMap[userData?.profile?.age] || 'Não definido'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Peso</h3>
          <p className="font-medium">
            {physicalData.weight ? `${physicalData.weight} kg` : 
            weightMap[userData?.profile?.weight] || 'Não definido'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Altura</h3>
          <p className="font-medium">
            {physicalData.height ? `${physicalData.height.toFixed(2)}m` : 
            heightMap[userData?.profile?.height] || 'Não definido'}
          </p>
        </div>
        
        <div>
          <h3 className="text-sm text-gray-400 mb-1">IMC</h3>
          <p className="font-medium">
            {imc ? `${imc.toFixed(1)} (${imcClassification})` : 'Não calculado'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PhysicalDataCard;
