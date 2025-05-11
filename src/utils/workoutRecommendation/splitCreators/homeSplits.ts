
/**
 * Creates a one-day full body workout plan for home environment
 */
export function createHomeSplitOneDayPlan(objective: string) {
  // For 1 day per week at home, we create a full body workout
  return {
    "dia1": [
      { nome: "Agachamento livre", reps: "3x15" },
      { nome: "Flexão de braço", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Agachamento com salto", reps: "3x12" },
      { nome: "Tríceps no banco", reps: "3x12" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Polichinelo", reps: "3x30s" }
    ]
  };
}

/**
 * Creates a two-day upper/lower split plan for home environment
 */
export function createHomeSplitTwoDaysPlan(objective: string) {
  // For 2 days at home, we do upper/lower split
  return {
    "dia1": [ // Upper body
      { nome: "Flexão de braço", reps: "4x máximo" },
      { nome: "Flexão inclinada (pés elevados)", reps: "3x máximo" },
      { nome: "Tríceps no banco", reps: "3x12" },
      { nome: "Remada com garrafa", reps: "3x15 cada" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Elevação lateral com garrafas", reps: "3x15" }
    ],
    "dia2": [ // Lower body + cardio
      { nome: "Agachamento livre", reps: "4x15" },
      { nome: "Avanço no lugar", reps: "3x12 cada" },
      { nome: "Elevação de quadril", reps: "3x15" },
      { nome: "Panturrilha em pé", reps: "3x20" },
      { nome: "Abdominal", reps: "3x20" },
      objective === 'lose_weight' ? { nome: "Polichinelo", reps: "4x30s" } : { nome: "Prancha lateral", reps: "3x20s cada" }
    ]
  };
}

/**
 * Creates a three-day split plan for home environment
 */
export function createHomeSplitThreeDaysPlan(objective: string) {
  // For 3 days at home
  return {
    "dia1": [ // Upper body
      { nome: "Flexão de braço", reps: "3x máximo" },
      { nome: "Flexão inclinada (pés elevados)", reps: "3x máximo" },
      { nome: "Tríceps no banco", reps: "3x15" },
      { nome: "Remada com garrafa", reps: "3x15 cada" },
      { nome: "Elevação lateral com garrafas", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" }
    ],
    "dia2": [ // Lower body
      { nome: "Agachamento livre", reps: "4x15" },
      { nome: "Avanço no lugar", reps: "3x12 cada" },
      { nome: "Elevação de quadril", reps: "3x15" },
      { nome: "Agachamento sumô", reps: "3x15" },
      { nome: "Panturrilha em pé", reps: "3x20" },
      { nome: "Abdominal canivete", reps: "3x15" }
    ],
    "dia3": [ // Core + cardio
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x45s" },
      { nome: "Mountain climber", reps: "3x30s" },
      { nome: "Corrida estacionária", reps: "4x30s" },
      { nome: "Burpee", reps: "3x10" },
      { nome: "Polichinelo", reps: "3x45s" }
    ]
  };
}

/**
 * Creates a four or more days split plan for home environment
 */
export function createHomeSplitFourPlusDaysPlan(objective: string, days: number) {
  // For 4+ days at home
  const basePlan = {
    "dia1": [ // Chest + triceps focus
      { nome: "Flexão de braço", reps: "4x máximo" },
      { nome: "Flexão inclinada (pés elevados)", reps: "3x máximo" },
      { nome: "Flexão fechada (diamante)", reps: "3x máximo" },
      { nome: "Tríceps no banco", reps: "3x15" },
      { nome: "Dips entre cadeiras", reps: "3x máximo" }
    ],
    "dia2": [ // Legs focus
      { nome: "Agachamento livre", reps: "4x20" },
      { nome: "Avanço no lugar", reps: "3x15 cada" },
      { nome: "Elevação de quadril", reps: "3x20" },
      { nome: "Panturrilha em pé", reps: "4x30" },
      { nome: "Agachamento com salto", reps: "3x12" }
    ],
    "dia3": [ // Back + biceps focus (with substitutes)
      { nome: "Remada com garrafa", reps: "4x15 cada" },
      { nome: "Flexão invertida na mesa", reps: "3x máximo" },
      { nome: "Superman", reps: "3x15" },
      { nome: "Rosca com garrafas", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" }
    ],
    "dia4": [ // Shoulders + core
      { nome: "Elevação lateral com garrafas", reps: "3x15" },
      { nome: "Elevação frontal com garrafas", reps: "3x15" },
      { nome: "Pike push-up (flexão para ombro)", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x45s" },
      { nome: "Mountain climber", reps: "3x30s" }
    ]
  };
  
  // For 5 days or more, add cardio + mobility
  if (days >= 5) {
    basePlan["dia5"] = [
      { nome: "Polichinelo", reps: "4x45s" },
      { nome: "Corrida estacionária", reps: "4x45s" },
      { nome: "Burpee", reps: "3x12" },
      { nome: "Pular corda (ou simular)", reps: "3x1 min" },
      { nome: "Alongamento geral", reps: "15 min" }
    ];
  }
  
  // For 6 days or more, add a light full body + cardio day
  if (days >= 6) {
    basePlan["dia6"] = [
      { nome: "Flexão de braço", reps: "2x máximo" },
      { nome: "Agachamento", reps: "2x20" },
      { nome: "Prancha", reps: "2x30s" },
      { nome: "Remada com garrafa", reps: "2x15 cada" },
      { nome: "Polichinelo", reps: "3x45s" },
      { nome: "Alongamento", reps: "10 min" }
    ];
  }
  
  // For 7 days, add active recovery day
  if (days >= 7) {
    basePlan["dia7"] = [
      { nome: "Caminhada leve", reps: "30 min" },
      { nome: "Alongamento completo", reps: "15 min" },
      { nome: "Mobilidade articular", reps: "10 min" },
      { nome: "Respiração e relaxamento", reps: "5 min" }
    ];
  }
  
  return basePlan;
}
