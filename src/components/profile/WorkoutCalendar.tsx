
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Flame, Flag } from 'lucide-react';
import Card from '@/components/Card';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { getUserProgress, getWorkoutDatesForMonth } from '@/utils/workoutUtils/progressTracking';
import { useToast } from '@/hooks/use-toast';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '@/contexts/AuthContext';

interface WorkoutCalendarProps {
  userData: any;
}

const WorkoutCalendar = ({ userData }: WorkoutCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [missedDates, setMissedDates] = useState<string[]>([]);
  const [weekProgress, setWeekProgress] = useState({ completed: 0, total: 0 });
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 });
  const { currentUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser?.id) {
      refreshCalendarData(new Date());
      
      // Carregar dados de streaks
      loadStreakData();
    }
  }, [userData, currentUser]);

  const loadStreakData = async () => {
    try {
      if (!currentUser?.id) return;
      
      // Buscar progresso do usuário incluindo streaks
      const progress = await getUserProgress(currentUser.id);
      
      setStreaks({
        current: progress.currentStreak,
        longest: progress.longestStreak
      });
      
      // Calcular progresso semanal com base na semana atual
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Domingo como início da semana
      
      const daysThisWeek = userData?.profile?.days_per_week 
        ? parseInt(userData.profile.days_per_week) 
        : 3;
        
      // Contar quantos dias foram completados esta semana
      const completedThisWeek = progress.workoutDates.filter(date => {
        const workoutDate = new Date(date);
        return workoutDate >= startOfWeek && workoutDate <= today;
      }).length;
      
      setWeekProgress({
        completed: completedThisWeek,
        total: daysThisWeek
      });
      
    } catch (error) {
      console.error("Erro ao carregar dados de streak:", error);
    }
  };

  const refreshCalendarData = async (selectedDate: Date) => {
    try {
      if (!currentUser?.id) return;
      
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      
      // Buscar datas de treino do mês selecionado
      const dates = await getWorkoutDatesForMonth(currentUser.id, month, year);
      setWorkoutDates(dates);
      
      // No futuro, podemos implementar a lógica para mostrar dias esperados que foram perdidos
      setMissedDates([]);
    } catch (error) {
      console.error("Erro ao carregar dados do calendário:", error);
      toast({
        title: "Erro ao carregar calendário",
        description: "Não foi possível carregar seu histórico de treinos.",
        variant: "destructive"
      });
    }
  };

  const handleMonthChange = (newDate: Date) => {
    setDate(newDate);
    refreshCalendarData(newDate);
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
