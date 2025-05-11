
/**
 * Creates a one-day full body workout plan for outdoor environment
 */
export function createOutdoorSplitOneDayPlan(objective: string) {
  // For 1 day outdoors
  return {
    "dia1": [
      { nome: "Agachamento livre", reps: "3x15" },
      { nome: "Flexão no banco", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x15" },
      { nome: "Dips no banco", reps: "3x máximo" },
      { nome: "Elevação de pernas no banco", reps: "3x12" },
      { nome: objective === 'lose_weight' ? "Corrida leve" : "Caminhada", reps: "15 min" }
    ]
  };
}

/**
 * Creates a two-day split plan for outdoor environment
 */
export function createOutdoorSplitTwoDaysPlan(objective: string) {
  // For 2 days outdoors
  return {
    "dia1": [ // Inferiores + cardio
      { nome: "Agachamento livre", reps: "4x15" },
      { nome: "Avanço com banco", reps: "3x12 cada" },
      { nome: "Step-up no banco", reps: "3x15 cada" },
      { nome: "Elevação de quadril", reps: "3x15" },
      { nome: objective === 'lose_weight' ? "Corrida em intervalos" : "Corrida leve", reps: "20 min" }
    ],
    "dia2": [ // Superiores + abdômen
      { nome: "Flexão no banco", reps: "3x máximo" },
      { nome: "Dips no banco", reps: "3x máximo" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Remada invertida no banco", reps: "3x máximo" },
      { nome: "Polichinelo", reps: "3x45s" }
    ]
  };
}

/**
 * Creates a three or more days split plan for outdoor environment
 */
export function createOutdoorSplitThreePlusDaysPlan(objective: string, days: number) {
  const basePlan = {
    "dia1": [ // Push (chest, triceps, shoulders)
      { nome: "Flexão no banco", reps: "3x máximo" },
      { nome: "Flexão declinada (mãos no banco)", reps: "3x máximo" },
      { nome: "Dips no banco", reps: "3x máximo" },
      { nome: "Elevações de braço em Y com peso corporal", reps: "3x15" },
      { nome: "Prancha com toque no ombro", reps: "3x12 cada" }
    ],
    "dia2": [ // Pull (back) + legs
      { nome: "Remada invertida no banco", reps: "3x máximo" },
      { nome: "Remada com objeto do parque", reps: "3x12" },
      { nome: "Agachamento livre", reps: "3x20" },
      { nome: "Avanço com banco", reps: "3x12 cada" },
      { nome: "Elevação de quadril", reps: "3x15" }
    ],
    "dia3": [ // Cardio + core
      { nome: objective === 'lose_weight' ? "Corrida em intervalos" : "Corrida leve", reps: "25 min" },
      { nome: "Abdominal", reps: "3x20" },
      { nome: "Prancha", reps: "3x45s" },
      { nome: "Mountain climber", reps: "3x30s" },
      { nome: "Burpee", reps: "3x10" }
    ]
  };
  
  // If we have more days, add additional splits
  if (days >= 4) {
    basePlan["dia4"] = [ // Upper body focus
      { nome: "Flexão no banco variações", reps: "4x10 cada" },
      { nome: "Dips no banco profundo", reps: "3x máximo" },
      { nome: "Remada invertida no banco", reps: "3x máximo" },
      { nome: "Elevação lateral simulada", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" }
    ];
  }
  
  if (days >= 5) {
    basePlan["dia5"] = [ // Lower body focus
      { nome: "Agachamento com salto", reps: "3x12" },
      { nome: "Avanço com banco alternado", reps: "3x15 cada" },
      { nome: "Elevação de quadril unilateral", reps: "3x12 cada" },
      { nome: "Step-up no banco", reps: "3x15 cada" },
      { nome: "Panturrilha no degrau", reps: "3x20" }
    ];
  }
  
  if (days >= 6) {
    basePlan["dia6"] = [ // Cardio intensive
      { nome: "Corrida em intervalos", reps: "6x (30s sprint + 1min lento)" },
      { nome: "Burpee", reps: "3x12" },
      { nome: "Mountain climber", reps: "3x40s" },
      { nome: "Polichinelo", reps: "3x45s" },
      { nome: "Prancha", reps: "3x45s" }
    ];
  }
  
  if (days >= 7) {
    basePlan["dia7"] = [ // Active recovery
      { nome: "Caminhada", reps: "30 min" },
      { nome: "Alongamento completo", reps: "20 min" },
      { nome: "Mobilidade articular", reps: "10 min" }
    ];
  }
  
  return basePlan;
}
