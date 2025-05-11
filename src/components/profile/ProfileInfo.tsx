
import React from 'react';
import { Edit2 } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

// Mapeia os valores do quiz para textos legíveis
const objectiveMap: Record<string, string> = {
  lose_weight: 'Perder peso',
  gain_muscle: 'Ganhar massa muscular',
  maintain: 'Manter a forma',
  home_training: 'Treinar em casa'
};

const levelMap: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado'
};

const daysMap: Record<string, string> = {
  '2': '2 dias por semana',
  '3': '3 dias por semana',
  '4': '4 dias por semana',
  '5+': '5 ou mais dias por semana'
};

const environmentMap: Record<string, string> = {
  gym: 'Academia',
  home_with_equipment: 'Casa com equipamentos',
  home_no_equipment: 'Casa sem equipamentos',
  outdoor: 'Ar livre'
};

interface ProfileInfoProps {
  userData: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileInfo = ({ userData, setIsEditing }: ProfileInfoProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Seu Perfil</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<Edit2 size={16} />}
          onClick={() => setIsEditing(true)}
        >
          Editar
        </Button>
      </div>

      <Card className="mb-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Objetivo Principal</h3>
            <p className="font-medium">{objectiveMap[userData?.profile?.objective] || 'Não definido'}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Nível de Experiência</h3>
            <p className="font-medium">{levelMap[userData?.profile?.level] || 'Não definido'}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Frequência de Treino</h3>
            <p className="font-medium">{daysMap[userData?.profile?.days_per_week] || 'Não definido'}</p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Local de Treino</h3>
            <p className="font-medium">{environmentMap[userData?.profile?.environment] || 'Não definido'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileInfo;
