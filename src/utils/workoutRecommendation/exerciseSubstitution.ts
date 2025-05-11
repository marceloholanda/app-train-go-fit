
import { Exercise } from '@/types/workout';

/**
 * Replaces an exercise with an alternative suitable for a specific environment
 */
export const replaceExerciseForEnvironment = (exerciseName: string, environment: string, reps: string): Exercise => {
  // List of machine exercises that need replacement
  const machineExercises = [
    'supino máquina', 'crucifixo máquina', 'desenvolvimento máquina', 'leg press', 
    'cadeira extensora', 'cadeira flexora', 'puxada alta', 'remada sentada',
    'abdominal máquina', 'pec deck', 'hack squat', 'leg curl', 'leg extension',
    'smith', 'agachamento smith', 'crossover', 'graviton', 'pulldown'
  ];
  
  // Check if it's a machine exercise
  const needsReplacement = machineExercises.some(machine => 
    exerciseName.toLowerCase().includes(machine.toLowerCase())
  );
  
  if (!needsReplacement) {
    // If not a machine exercise, return the same exercise
    return { nome: exerciseName, reps };
  }
  
  // Mapping of replacements for common exercises
  const replacements: Record<string, Record<string, string>> = {
    home: {
      'supino máquina': 'Flexão de braço',
      'crucifixo máquina': 'Flexão com braços abertos',
      'desenvolvimento máquina': 'Elevação lateral com garrafas',
      'leg press': 'Agachamento livre',
      'cadeira extensora': 'Agachamento isométrico',
      'cadeira flexora': 'Ponte de glúteos',
      'puxada alta': 'Remada com elástico',
      'remada sentada': 'Remada curvada com garrafas',
      'abdominal máquina': 'Abdominal tradicional',
      'pec deck': 'Flexão hindu',
      'hack squat': 'Agachamento sumô',
      'smith': 'Afundo estacionário',
      'agachamento smith': 'Agachamento com pausa',
      'crossover': 'Flexão diamante'
    },
    outdoor: {
      'supino máquina': 'Flexão no banco',
      'crucifixo máquina': 'Flexão aberta no banco',
      'desenvolvimento máquina': 'Flexão pike',
      'leg press': 'Agachamento com salto',
      'cadeira extensora': 'Agachamento unilateral',
      'cadeira flexora': 'Elevação de quadril unilateral',
      'puxada alta': 'Barra fixa (se disponível)',
      'remada sentada': 'Remada invertida no banco',
      'abdominal máquina': 'Abdominal completo',
      'pec deck': 'Flexão com rotação',
      'hack squat': 'Agachamento búlgaro',
      'smith': 'Afundo com salto',
      'agachamento smith': 'Agachamento sumo',
      'crossover': 'Flexão com elevação'
    }
  };
  
  // Find specific substitution or use a generic one
  const replacement = replacements[environment][exerciseName.toLowerCase()] || 
    (environment === 'home' ? 'Exercício com peso corporal' : 'Exercício ao ar livre');
  
  return { nome: replacement, reps };
};
