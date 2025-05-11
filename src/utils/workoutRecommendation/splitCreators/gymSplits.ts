
import { isPremiumUser } from '@/utils/userUtils';

/**
 * Creates a one-day full body workout plan for gym environment
 */
export function createGymSplitOneDayPlan(objective: string) {
  // For 1 day per week, we create a full body workout focused on major muscle groups
  return {
    "dia1": [
      { nome: "Agachamento livre", reps: "3x12" },
      { nome: "Supino reto com barra", reps: "3x10-12" },
      { nome: "Remada curvada", reps: "3x12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Prancha", reps: "3x30s" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Panturrilha em pé", reps: "3x15" }
    ]
  };
}

/**
 * Creates a two-day upper/lower split plan for gym environment
 */
export function createGymSplitTwoDaysPlan(objective: string) {
  // For 2 days, we do upper/lower split
  return {
    "dia1": [ // Upper body
      { nome: "Supino reto com barra", reps: "3x10-12" },
      { nome: "Remada curvada", reps: "3x10-12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" },
      { nome: "Puxada alta", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" }
    ],
    "dia2": [ // Lower body + core
      { nome: "Agachamento livre", reps: "3x12" },
      { nome: "Leg press", reps: "3x15" },
      { nome: "Cadeira extensora", reps: "3x15" },
      { nome: "Cadeira flexora", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "3x15" },
      { nome: "Abdominal máquina", reps: "3x15" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Prancha", reps: "3x30s" }
    ]
  };
}

/**
 * Creates a three-day push/pull/legs split plan for gym environment
 */
export function createGymSplitThreeDaysPlan(objective: string) {
  // For 3 days, we do push/pull/legs split
  return {
    "dia1": [ // Push (chest, shoulders, triceps)
      { nome: "Supino reto com barra", reps: "4x10-12" },
      { nome: "Supino inclinado com halteres", reps: "3x12" },
      { nome: "Crucifixo máquina", reps: "3x12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    "dia2": [ // Pull (back, biceps)
      { nome: "Puxada alta", reps: "4x10-12" },
      { nome: "Remada curvada", reps: "3x12" },
      { nome: "Remada sentada na polia", reps: "3x12" },
      { nome: "Pull down", reps: "3x12" },
      { nome: "Rosca direta barra", reps: "3x12" },
      { nome: "Rosca martelo", reps: "3x12" },
      { nome: "Abdominal infra", reps: "3x15" }
    ],
    "dia3": [ // Legs + core
      { nome: "Agachamento livre", reps: "4x10-12" },
      { nome: "Leg press", reps: "3x15" },
      { nome: "Cadeira extensora", reps: "3x15" },
      { nome: "Cadeira flexora", reps: "3x15" },
      { nome: "Stiff", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "4x15" },
      { nome: "Abdominal máquina", reps: "3x15" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Prancha", reps: "3x30s" }
    ]
  };
}

/**
 * Creates a four-day upper/lower split plan for gym environment
 */
export function createGymSplitFourDaysPlan(objective: string) {
  // For 4 days, we can do a upper/lower split twice a week
  return {
    "dia1": [ // Upper body (strength focus)
      { nome: "Supino reto com barra", reps: "4x8-10" },
      { nome: "Remada curvada", reps: "4x8-10" },
      { nome: "Desenvolvimento máquina", reps: "3x10-12" },
      { nome: "Puxada alta", reps: "3x10-12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" }
    ],
    "dia2": [ // Lower body (strength focus)
      { nome: "Agachamento livre", reps: "4x8-10" },
      { nome: "Leg press", reps: "4x10-12" },
      { nome: "Cadeira extensora", reps: "3x12" },
      { nome: "Cadeira flexora", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "4x15" },
      { nome: "Abdominal máquina", reps: "3x15" }
    ],
    "dia3": [ // Upper body (volume focus)
      { nome: "Supino inclinado com halteres", reps: "3x12-15" },
      { nome: "Crucifixo máquina", reps: "3x12-15" },
      { nome: "Pull down", reps: "3x12-15" },
      { nome: "Remada sentada na polia", reps: "3x12-15" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Rosca martelo", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    "dia4": [ // Lower body (volume focus) + cardio for weight loss
      { nome: "Hack squat", reps: "3x12-15" },
      { nome: "Stiff", reps: "3x12" },
      { nome: "Avanço com halteres", reps: "3x10 cada" },
      { nome: "Mesa flexora", reps: "3x15" },
      { nome: "Panturrilha sentado", reps: "3x20" },
      { nome: "Abdominal infra", reps: "3x15" },
      objective === 'lose_weight' ? { nome: "Esteira", reps: "20min" } : { nome: "Prancha", reps: "3x45s" }
    ]
  };
}

/**
 * Creates a five or more days muscle group split plan for gym environment
 */
export function createGymSplitFivePlusDaysPlan(objective: string, days: number) {
  // For 5+ days, we do a muscle group split
  const basePlan = {
    "dia1": [ // Chest + triceps
      { nome: "Supino reto com barra", reps: "4x8-10" },
      { nome: "Supino inclinado com halteres", reps: "3x10-12" },
      { nome: "Crucifixo máquina", reps: "3x12" },
      { nome: "Crossover", reps: "3x12-15" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    "dia2": [ // Back + biceps
      { nome: "Puxada alta", reps: "4x8-10" },
      { nome: "Remada curvada", reps: "4x8-10" },
      { nome: "Remada sentada na polia", reps: "3x12" },
      { nome: "Pull down", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Rosca martelo", reps: "3x12" }
    ],
    "dia3": [ // Legs
      { nome: "Agachamento livre", reps: "4x8-10" },
      { nome: "Leg press", reps: "4x10-12" },
      { nome: "Cadeira extensora", reps: "3x12" },
      { nome: "Cadeira flexora", reps: "3x12" },
      { nome: "Stiff", reps: "3x10-12" },
      { nome: "Panturrilha em pé", reps: "4x15" }
    ],
    "dia4": [ // Shoulders + abs
      { nome: "Desenvolvimento máquina", reps: "4x8-10" },
      { nome: "Elevação lateral", reps: "3x12-15" },
      { nome: "Elevação frontal", reps: "3x12" },
      { nome: "Face pull", reps: "3x15" },
      { nome: "Abdominal máquina", reps: "3x15" },
      { nome: "Prancha", reps: "3x45s" }
    ],
    "dia5": [ // Cardio + light fullbody
      { nome: objective === 'lose_weight' ? "Esteira" : "Corrida leve", reps: "25min" },
      { nome: "Supino máquina", reps: "2x15" },
      { nome: "Puxada alta", reps: "2x15" },
      { nome: "Desenvolvimento máquina", reps: "2x15" },
      { nome: "Leg press leve", reps: "2x20" },
      { nome: "Prancha", reps: "2x30s" }
    ]
  };
  
  // For 6 days, add an arm focus day
  if (days >= 6) {
    basePlan["dia6"] = [
      { nome: "Rosca scott", reps: "3x12" },
      { nome: "Rosca concentrada", reps: "3x12" },
      { nome: "Tríceps mergulho", reps: "3x12" },
      { nome: "Tríceps testa", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Abdominal infra", reps: "3x15" },
      { nome: objective === 'lose_weight' ? "Esteira" : "Corrida leve", reps: "20min" }
    ];
  }
  
  // For 7 days, add a rest/recovery/light day
  if (days >= 7) {
    basePlan["dia7"] = [
      { nome: "Caminhada leve", reps: "30min" },
      { nome: "Alongamento geral", reps: "15min" },
      { nome: "Mobilidade articular", reps: "10min" },
      { nome: "Abdominais", reps: "3x20" }
    ];
  }
  
  return basePlan;
}
