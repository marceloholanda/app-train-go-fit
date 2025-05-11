
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import Card from '@/components/Card';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { getWorkoutDatesForMonth, getWorkoutsThisWeek } from '@/utils/workoutUtils';

interface WorkoutCalendarProps {
  userData: any;
}

const WorkoutCalendar = ({ userData }: WorkoutCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [weekProgress, setWeekProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    refreshCalendarData(new Date());
    
    // Carregar dados de progresso semanal
    const weekStats = getWorkoutsThisWeek();
    setWeekProgress(weekStats);
  }, [userData]);

  const refreshCalendarData = (selectedDate: Date) => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const dates = getWorkoutDatesForMonth(month, year);
    setWorkoutDates(dates);
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
              workout: workoutDates.map(date => new Date(date))
            }}
            modifiersClassNames={{
              workout: "bg-traingo-primary text-black"
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default WorkoutCalendar;
