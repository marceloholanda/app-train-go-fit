
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Flame, Flag } from 'lucide-react';
import Card from '@/components/Card';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { getWorkoutDatesForMonth } from '@/utils/workoutUtils';
import { getWorkoutsThisWeek } from '@/utils/workoutUtils/weeklyProgress';
import { getWorkoutStreaks, getExpectedWorkoutDays } from '@/utils/workoutUtils';
import { useToast } from '@/hooks/use-toast';
import { ptBR } from 'date-fns/locale';

interface WorkoutCalendarProps {
  userData: any;
}

const WorkoutCalendar = ({ userData }: WorkoutCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [missedDates, setMissedDates] = useState<string[]>([]);
  const [weekProgress, setWeekProgress] = useState({ completed: 0, total: 0 });
  const [streaks, setStreaks] = useState({ current: 0, longest: 0 });

  useEffect(() => {
    refreshCalendarData(new Date());
    
    // Carregar dados de progresso semanal
    const weekStats = getWorkoutsThisWeek();
    setWeekProgress(weekStats);
    
    // Carregar dados de streaks
    const streakStats = getWorkoutStreaks();
    setStreaks(streakStats);
  }, [userData]);

  const refreshCalendarData = (selectedDate: Date) => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const dates = getWorkoutDatesForMonth(month, year);
    setWorkoutDates(dates);
    
    // Obter dias esperados de treino que foram perdidos
    const expectedDays = getExpectedWorkoutDays();
    const missed = expectedDays
      .filter(day => day.missed)
      .map(day => day.date);
    setMissedDates(missed);
  };

  const handleMonthChange = (newDate: Date) => {
    setDate(newDate);
    refreshCalendarData(newDate);
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
