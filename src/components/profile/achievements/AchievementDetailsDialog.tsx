
import React from 'react';
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface AchievementDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  achievement: any | null;
  achievementIcons: Record<string, React.ReactNode>;
  workoutCount: number;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Ainda não desbloqueada';
  try {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (e) {
    return dateString;
  }
};

const AchievementDetailsDialog = ({ 
  isOpen, 
  onOpenChange, 
  achievement, 
  achievementIcons, 
  workoutCount 
}: AchievementDetailsDialogProps) => {
  if (!achievement) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-xl">
            <span className="text-3xl mr-2">{achievementIcons[achievement.id] || '🏅'}</span>
            {achievement.name || "Conquista"}
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            {achievement.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center text-5xl",
            achievement.unlocked
              ? "bg-traingo-primary/20 border-2 border-traingo-primary"
              : "bg-gray-800/30 border-2 border-gray-700"
          )}>
            {achievementIcons[achievement.id] || '🏅'}
          </div>
          
          <div className="text-center">
            <Badge 
              className={cn(
                "mb-4",
                achievement.unlocked 
                  ? "bg-green-500/20 text-green-300 hover:bg-green-500/30" 
                  : "bg-gray-800 text-gray-400"
              )}
            >
              {achievement.unlocked ? "Conquista Desbloqueada" : "Conquista Bloqueada"}
            </Badge>
            
            <p className="text-sm text-gray-300">
              <strong>Regra:</strong> {achievement.description}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Progresso:</strong> {workoutCount} / {achievement.threshold || 0} dias de treino
            </p>
            
            {achievement.unlocked ? (
              <p className="mt-4 text-sm text-traingo-primary">
                Desbloqueada em: {achievement.unlockedDate && formatDate(achievement.unlockedDate)}
              </p>
            ) : (
              <p className="mt-4 text-sm text-gray-400">
                Faltam {achievement.threshold - workoutCount} dias para desbloquear
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementDetailsDialog;
