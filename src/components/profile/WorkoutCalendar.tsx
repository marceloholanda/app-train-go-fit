import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Flame, Flag } from 'lucide-react';
import Card from '@/components/Card';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { getWorkoutDatesForMonth } from '@/utils/workoutUtils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ptBR } from 'date-fns/locale';

interface WorkoutCalendarProps {
  userData: any;
}

const WorkoutCalendar = ({ userData }: WorkoutCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [missedDates, setMissedDates] = useState<string[]>([]);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  // Dados simulados de progresso semanal e streaks
  const [weekProgress, setWeekProgress] = useState({ completed: 0, total: 0 });
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    if (!currentUser) return;
    
    const refreshCalendarData = async () => {
      const month = date.getMonth();
      const year = date.getFullYear();
      
      try {
        // Obter datas de treino
        const dates = await getWorkoutDatesForMonth(month, year, currentUser.id);
        setWorkoutDates(dates);
        
        // Configurar progresso semanal e streaks com dados estáticos por enquanto
        setWeekProgress({ completed: 2, total: 3 });
        setStreaks({ current: 2, longest: 5 });
        
        // Datas perdidas (simuladas)
        setMissedDates(['2023-05-15', '2023-05-22']);
      } catch (error) {
        console.error('Erro ao atualizar dados do calendário:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar seu histórico de treinos.",
          variant: "destructive",
        });
      }
    };

    refreshCalendarData();
  }, [currentUser, date, toast]);

  const handleMonthChange = (newDate: Date) => {
    setDate(newDate);
  };

  const getModifierStyles = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    if (workoutDates.includes(dateString)) {
      return "bg-traingo-primary text-black";
    } else if (missedDates.includes(dateString)) {
      return "bg-gray-500/30 text-gray-400 line-through";
    }
    return "";
  };

  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center mb-4">
        <CalendarIcon className="text-traingo-primary mr-2" size={20} />
        <h2 className="font-bold text-lg">Histórico de Treinos</h2>
      </div>

      <Card className="mb-4">
        <div className="text-center mb-3">
          <p className="text-sm text-gray-400">
            Você treinou <span className="text-traingo-primary font-bold">{weekProgress.completed}</span> de {weekProgress.total} dias esta semana
          </p>
        </div>
        
        <div className="flex justify-center">
          <CalendarComponent
            mode="single"
            selected={date}
            onMonthChange={handleMonthChange}
            className="p-3 pointer-events-auto"
            modifiers={{
              workout: workoutDates.map(date => new Date(date)),
              missed: missedDates.map(date => new Date(date))
            }}
            modifiersClassNames={{
              workout: "bg-traingo-primary text-black",
              missed: "bg-gray-500/30 text-gray-400 line-through"
            }}
            locale={ptBR}
            weekStartsOn={0} // 0 = domingo
          />
        </div>
        
        <div className="flex justify-around mt-6 gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Flame className="text-traingo-primary mr-1" size={18} />
              <span className="text-sm font-medium">Sequência Atual</span>
            </div>
            <p className="text-xl font-bold">{streaks.current} {streaks.current === 1 ? 'dia' : 'dias'}</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Flag className="text-traingo-primary mr-1" size={18} />
              <span className="text-sm font-medium">Melhor Sequência</span>
            </div>
            <p className="text-xl font-bold">{streaks.longest} {streaks.longest === 1 ? 'dia' : 'dias'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkoutCalendar;
