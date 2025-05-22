
// Export functions for calculating workout streaks

export function calculateStreak(dates: Date[]): number {
  if (!dates || dates.length === 0) return 0;
  
  // Sort dates in ascending order
  const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
  
  // Calculate current streak
  let currentStreak = 1;
  const today = new Date();
  
  // Check if the most recent workout was today or yesterday
  const mostRecent = sortedDates[sortedDates.length - 1];
  const diffDays = Math.floor((today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));
  
  // If the most recent workout was more than 1 day ago, streak is broken
  if (diffDays > 1) {
    return 0;
  }
  
  // Calculate consecutive days
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const current = sortedDates[i];
    const previous = sortedDates[i - 1];
    
    // Calculate difference in days
    const diffTime = current.getTime() - previous.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // If consecutive days, increment streak
    if (diffDays === 1) {
      currentStreak++;
    } else {
      break; // Break if not consecutive
    }
  }
  
  return currentStreak;
}

export function getWorkoutStreaks(workoutDates: Date[]): { 
  current: number; 
  longest: number; 
} {
  if (!workoutDates || workoutDates.length === 0) {
    return { current: 0, longest: 0 };
  }
  
  const current = calculateStreak(workoutDates);
  
  // Calculate longest streak
  let longest = current;
  let tempStreak = 1;
  
  // Sort dates in ascending order
  const sortedDates = [...workoutDates].sort((a, b) => a.getTime() - b.getTime());
  
  for (let i = 1; i < sortedDates.length; i++) {
    const current = sortedDates[i];
    const previous = sortedDates[i - 1];
    
    // Calculate difference in days
    const diffTime = current.getTime() - previous.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      tempStreak++;
      longest = Math.max(longest, tempStreak);
    } else if (diffDays > 1) {
      tempStreak = 1;
    }
  }
  
  return { current, longest };
}
