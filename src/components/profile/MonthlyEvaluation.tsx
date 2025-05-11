
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { isFirstAccessOfMonth, getUnlockedLevels } from '@/utils/workoutUtils/levelTracking';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MonthlyEvaluation = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [previousLevel, setPreviousLevel] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [hasLeveledUp, setHasLeveledUp] = useState(false);
  
  useEffect(() => {
    // Verificar se é o primeiro acesso do mês
    if (isFirstAccessOfMonth()) {
      const unlockedLevels = getUnlockedLevels();
      
      if (unlockedLevels.length > 0) {
        const currentLevel = unlockedLevels[unlockedLevels.length - 1]?.nivel || "";
        setCurrentLevel(currentLevel);
        
        // Se houver um nível anterior para comparar
        if (unlockedLevels.length > 1) {
          const previousLevel = unlockedLevels[unlockedLevels.length - 2]?.nivel || "";
          setPreviousLevel(previousLevel);
          
          // Verificar se houve evolução de nível no último mês
          const currentDate = new Date();
          const lastMonth = new Date();
          lastMonth.setMonth(currentDate.getMonth() - 1);
          
          const lastLevelDate = new Date(unlockedLevels[unlockedLevels.length - 1]?.date || "");
          
          if (lastLevelDate > lastMonth && currentLevel !== previousLevel) {
            setHasLeveledUp(true);
            const monthName = format(lastLevelDate, 'MMMM', { locale: ptBR });
            setMessage(`Você evoluiu de ${previousLevel} para ${currentLevel} em ${monthName}! Parabéns pela consistência 🔥`);
          } else {
            setMessage(`Você manteve o nível ${currentLevel}. Continue assim!`);
          }
          
          setOpen(true);
        } else if (unlockedLevels.length === 1) {
          // Se for o primeiro nível, apenas mostrar mensagem de boas-vindas ao nível
          setMessage(`Você está no nível ${currentLevel}. Vamos continuar evoluindo?`);
          setOpen(true);
        }
      }
    }
  }, []);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-center">
            {hasLeveledUp ? "Evolução de Nível! 🎉" : "Avaliação Mensal 📊"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6">
          {hasLeveledUp ? (
            <>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                  {previousLevel === "Iniciante" && "🍀"}
                  {previousLevel === "Intermediário" && "⭐"}
                  {previousLevel === "Avançado" && "🔥"}
                  {previousLevel === "Atleta" && "🏆"}
                </div>
                <div className="text-2xl">→</div>
                <div className="w-12 h-12 rounded-full bg-traingo-primary/20 flex items-center justify-center text-2xl animate-bounce">
                  {currentLevel === "Iniciante" && "🍀"}
                  {currentLevel === "Intermediário" && "⭐"}
                  {currentLevel === "Avançado" && "🔥"}
                  {currentLevel === "Atleta" && "🏆"}
                </div>
              </div>
            </>
          ) : (
            <div className="w-16 h-16 rounded-full bg-traingo-primary/20 flex items-center justify-center text-3xl mb-6">
              {currentLevel === "Iniciante" && "🍀"}
              {currentLevel === "Intermediário" && "⭐"}
              {currentLevel === "Avançado" && "🔥"}
              {currentLevel === "Atleta" && "🏆"}
            </div>
          )}
          
          <p className="text-center text-lg">
            {message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyEvaluation;
