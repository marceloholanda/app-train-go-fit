
import { supabase } from '@/integrations/supabase/client';
import { WorkoutDate } from '@/types/workout';

/**
 * Get workout dates for the specified month and year
 */
export const getWorkoutDatesForMonth = async (
  month: number, 
  year: number,
  userId: string
): Promise<string[]> => {
  try {
    // Month in JS is 0-indexed, but we need to adjust for the database query
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0); // Last day of the month
    
    const { data, error } = await supabase
      .from('progress')
      .select('completed_date')
      .eq('user_id', userId)
      .gte('completed_date', startDate.toISOString().split('T')[0])
      .lte('completed_date', endDate.toISOString().split('T')[0]);
      
    if (error) {
      console.error('Error fetching workout dates:', error);
      return [];
    }
    
    // Extract just the dates from the response
    return data.map(item => item.completed_date);
  } catch (error) {
    console.error('Error fetching workout dates:', error);
    return [];
  }
};
