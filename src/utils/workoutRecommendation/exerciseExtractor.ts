
import { workoutPlans } from '@/data/workoutPlans';
import { Exercise } from '@/types/workout';
import { normalizeExerciseName } from './exerciseImages';

export interface ExtendedExerciseInfo {
  nome: string;
  normalized: string;
  grupoMuscular?: string;
  ambiente?: string;
  imagePath?: string;
}

/**
 * Extracts all unique exercises from the workout plans
 * and returns detailed information for each
 */
export function extractAllExercises(): ExtendedExerciseInfo[] {
  const exercisesMap = new Map<string, ExtendedExerciseInfo>();
  
  // Process all workout plans to extract exercises
  workoutPlans.forEach(plan => {
    // Determine the environment based on plan tags
    const ambiente = plan.tags.find(tag => 
      ['gym', 'home', 'outdoor'].includes(tag)
    );
    
    // Get environment in Portuguese
    const ambienteLabel = getAmbienteLabel(ambiente);
    
    // Process each day in the plan
    Object.values(plan.plan).forEach(dayExercises => {
      dayExercises.forEach(exercise => {
        const normalizedName = normalizeExerciseName(exercise.nome);
        
        // If this exercise is not already in our map, add it
        if (!exercisesMap.has(normalizedName)) {
          exercisesMap.set(normalizedName, {
            nome: exercise.nome,
            normalized: normalizedName,
            ambiente: ambienteLabel,
            grupoMuscular: inferGrupoMuscular(exercise.nome),
            imagePath: `${normalizedName}.png`
          });
        }
        
        // Also add any substitute exercises
        if (exercise.substituicoes) {
          exercise.substituicoes.forEach(sub => {
            const normalizedSubName = normalizeExerciseName(sub.nome);
            if (!exercisesMap.has(normalizedSubName)) {
              exercisesMap.set(normalizedSubName, {
                nome: sub.nome,
                normalized: normalizedSubName,
                ambiente: ambienteLabel,
                grupoMuscular: inferGrupoMuscular(sub.nome),
                imagePath: `${normalizedSubName}.png`
              });
            }
          });
        }
      });
    });
  });
  
  // Convert map to array and sort alphabetically by name
  return Array.from(exercisesMap.values()).sort((a, b) => 
    a.nome.localeCompare(b.nome, 'pt-BR')
  );
}

/**
 * Maps environment tag to Portuguese label
 */
function getAmbienteLabel(tag?: string): string {
  switch (tag) {
    case 'gym':
      return 'Academia';
    case 'home':
      return 'Casa';
    case 'outdoor':
      return 'Ar livre';
    default:
      return 'Todos';
  }
}

/**
 * Infers the muscle group based on exercise name
 * This is a simple inference and may not be 100% accurate
 */
function inferGrupoMuscular(exerciseName: string): string {
  const lowerName = exerciseName.toLowerCase();
  
  // Check for specific muscle groups
  if (/supino|peitoral|crucifixo|fly|chest/.test(lowerName)) {
    return 'Peitoral';
  } else if (/costa|dorsal|puxada|remada|pull|lat|trapézio|trapezio/.test(lowerName)) {
    return 'Costas';
  } else if (/ombro|desenvolvimento|elevação lateral|arnold|deltóide|deltoide|shoulder/.test(lowerName)) {
    return 'Ombros';
  } else if (/bíceps|biceps|rosca|curl|preacher|martelo/.test(lowerName)) {
    return 'Bíceps';
  } else if (/tríceps|triceps|frances|corda|banco|dip|mergulho/.test(lowerName)) {
    return 'Tríceps';
  } else if (/agachamento|leg|press|cadeira|extensora|flexora|panturrilha|calf|stiff|posterior|gluteo|glúteo|afundo/.test(lowerName)) {
    return 'Pernas';
  } else if (/abdom|abs|prancha|plank|crunch|infra/.test(lowerName)) {
    return 'Abdômen';
  } else if (/alongamento|mobilidade|stretching|flexibility/.test(lowerName)) {
    return 'Mobilidade';
  } else if (/cardio|corrida|esteira|bicicleta|bike|jump|pular|corda|aeróbic/.test(lowerName)) {
    return 'Cardiovascular';
  } else {
    return 'Corpo inteiro';
  }
}

/**
 * Generates an HTML table with all exercises
 */
export function generateExerciseTable(): string {
  const exercises = extractAllExercises();
  
  let html = `
    <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #333; color: white;">
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Nome do Exercício</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Grupo Muscular</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Ambiente</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Nome Normalizado</th>
          <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Caminho da Imagem</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  exercises.forEach(ex => {
    html += `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${ex.nome}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${ex.grupoMuscular || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${ex.ambiente || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${ex.normalized}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${ex.imagePath}</td>
      </tr>
    `;
  });
  
  html += `
      </tbody>
    </table>
    <p>Total de exercícios: ${exercises.length}</p>
  `;
  
  return html;
}

/**
 * Returns a CSV string with all exercises
 */
export function generateExerciseCSV(): string {
  const exercises = extractAllExercises();
  
  let csv = 'Nome do Exercício,Grupo Muscular,Ambiente,Nome Normalizado,Caminho da Imagem\n';
  
  exercises.forEach(ex => {
    csv += `"${ex.nome}","${ex.grupoMuscular || ''}","${ex.ambiente || ''}","${ex.normalized}","${ex.imagePath}"\n`;
  });
  
  return csv;
}
