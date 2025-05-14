
import React from 'react';
import Card from '@/components/Card';
import { Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkoutCardProps {
  id: number;
  name: string;
  day: string;
  status: 'completed' | 'pending';
  exercises: number;
  icon: string;
  isPremium?: boolean;
  showPremiumBadge: boolean;
  onCardClick: (id: number) => void;
  onToggleStatus: (e: React.MouseEvent, id: number, status: string) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  id,
  name,
  day,
  status,
  exercises,
  icon,
  isPremium,
  showPremiumBadge,
  onCardClick,
  onToggleStatus
}) => {
  return (
    <Card 
      key={id} 
      onClick={() => onCardClick(id)}
      className="animate-fade-in relative"
    >
      {isPremium && showPremiumBadge && (
        <Badge 
          variant="default" 
          className="absolute top-2 right-2 bg-traingo-primary text-xs text-black"
        >
          PRO
        </Badge>
      )}
      <div className="flex items-center">
        <div className="p-3 bg-traingo-primary/20 rounded-lg mr-4">
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold">{name}</h3>
          <div className="flex items-center text-sm text-gray-400">
            <Clock size={14} className="mr-1" />
            <span>{day}</span>
            <span className="mx-2">•</span>
            <span>{exercises} exercícios</span>
          </div>
        </div>
        <div 
          onClick={(e) => onToggleStatus(e, id, status)}
          className="cursor-pointer p-2"
        >
          {status === 'completed' ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-700" />
          )}
        </div>
      </div>
    </Card>
  );
};

export default WorkoutCard;
