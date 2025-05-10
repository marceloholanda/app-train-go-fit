
export interface Exercise {
  nome: string;
  reps: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  tags: string[];
  days: number;
  plan: Record<string, Exercise[]>;
  description?: string;
}

// Lista de planos de treino pré-definidos
export const workoutPlans: WorkoutPlan[] = [
  {
    id: "treino_001",
    name: "Queima Iniciante em Casa",
    tags: ["lose_fat", "beginner", "home", "20_30", "3", "full_body"],
    days: 3,
    description: "Plano ideal para iniciantes que desejam perder gordura corporal treinando em casa",
    plan: {
      dia1: [
        { nome: "Polichinelo", reps: "3x30s" },
        { nome: "Agachamento", reps: "3x15" },
        { nome: "Prancha", reps: "3x20s" },
        { nome: "Flexão de braço no joelho", reps: "3x10" }
      ],
      dia2: [
        { nome: "Corrida estacionária", reps: "3x30s" },
        { nome: "Afundo", reps: "3x12 (cada perna)" },
        { nome: "Mountain climber", reps: "3x20s" },
        { nome: "Flexão de quadril", reps: "3x15" }
      ],
      dia3: [
        { nome: "Jumping jack", reps: "3x30s" },
        { nome: "Agachamento sumô", reps: "3x15" },
        { nome: "Prancha lateral", reps: "3x20s (cada lado)" },
        { nome: "Elevação de pelvis", reps: "3x15" }
      ]
    }
  },
  {
    id: "treino_002",
    name: "Hipertrofia Academia",
    tags: ["gain_muscle", "advanced", "gym", "60+", "5_plus", "upper_body"],
    days: 5,
    description: "Plano avançado para ganho de massa muscular com foco na parte superior do corpo",
    plan: {
      dia1: [
        { nome: "Supino reto", reps: "4x10-12" },
        { nome: "Remada curvada", reps: "4x10-12" },
        { nome: "Desenvolvimento com halteres", reps: "3x12" },
        { nome: "Tríceps corda", reps: "3x12-15" }
      ],
      dia2: [
        { nome: "Agachamento", reps: "4x10-12" },
        { nome: "Leg press", reps: "4x12-15" },
        { nome: "Cadeira extensora", reps: "3x12-15" },
        { nome: "Panturrilha em pé", reps: "4x15-20" }
      ],
      dia3: [
        { nome: "Puxada frontal", reps: "4x10-12" },
        { nome: "Crucifixo", reps: "3x12" },
        { nome: "Remada baixa", reps: "3x12" },
        { nome: "Rosca direta", reps: "3x12" }
      ],
      dia4: [
        { nome: "Cadeira flexora", reps: "4x12-15" },
        { nome: "Stiff", reps: "3x12" },
        { nome: "Abdução", reps: "3x15" },
        { nome: "Adução", reps: "3x15" }
      ],
      dia5: [
        { nome: "Desenvolvimento máquina", reps: "4x10-12" },
        { nome: "Elevação lateral", reps: "3x12-15" },
        { nome: "Tríceps frances", reps: "3x12" },
        { nome: "Abdominal infra", reps: "3x20" }
      ]
    }
  },
  {
    id: "treino_003",
    name: "Saúde e Disposição",
    tags: ["health_energy", "returning", "outdoor", "30_45", "4", "full_body"],
    days: 4,
    description: "Plano para melhorar a disposição e saúde geral com treinos ao ar livre",
    plan: {
      dia1: [
        { nome: "Caminhada rápida", reps: "20 minutos" },
        { nome: "Agachamento livre", reps: "3x15" },
        { nome: "Flexão de braço no banco", reps: "3x10" },
        { nome: "Prancha", reps: "3x30s" }
      ],
      dia2: [
        { nome: "Corrida leve", reps: "15 minutos" },
        { nome: "Afundo andando", reps: "3x10 (cada perna)" },
        { nome: "Flexão de braço no joelho", reps: "3x12" },
        { nome: "Russian twist", reps: "3x20" }
      ],
      dia3: [
        { nome: "Treino intervalado", reps: "15 minutos" },
        { nome: "Agachamento com salto", reps: "3x12" },
        { nome: "Tríceps no banco", reps: "3x12" },
        { nome: "Prancha com elevação", reps: "3x10 (cada lado)" }
      ],
      dia4: [
        { nome: "Caminhada em terreno inclinado", reps: "20 minutos" },
        { nome: "Ponte de glúteos", reps: "3x15" },
        { nome: "Flexões diamante", reps: "3x10" },
        { nome: "Abdominal bicicleta", reps: "3x20" }
      ]
    }
  },
  {
    id: "treino_004",
    name: "Rotina Consistente",
    tags: ["create_habit", "beginner", "home", "15", "2", "full_body"],
    days: 2,
    description: "Plano simples para iniciantes criarem o hábito de exercício em casa com treinos curtos",
    plan: {
      dia1: [
        { nome: "Marcha estacionária", reps: "3x30s" },
        { nome: "Agachamento na parede", reps: "3x20s" },
        { nome: "Flexão na parede", reps: "3x10" },
        { nome: "Prancha no joelho", reps: "3x15s" }
      ],
      dia2: [
        { nome: "Alongamento dinâmico", reps: "5 minutos" },
        { nome: "Agachamento livre", reps: "3x10" },
        { nome: "Rotação de tronco", reps: "3x10 (cada lado)" },
        { nome: "Abdominal curto", reps: "3x10" }
      ]
    }
  },
  {
    id: "treino_005",
    name: "Plano Genérico para Iniciantes",
    tags: ["beginner", "full_body"],
    days: 3,
    description: "Plano básico para iniciantes que desejam melhorar a condição física geral",
    plan: {
      dia1: [
        { nome: "Caminhada", reps: "15 minutos" },
        { nome: "Agachamento livre", reps: "3x10" },
        { nome: "Flexão modificada", reps: "3x8" },
        { nome: "Ponte de glúteos", reps: "3x10" }
      ],
      dia2: [
        { nome: "Alongamento dinâmico", reps: "10 minutos" },
        { nome: "Afundo estático", reps: "3x8 (cada perna)" },
        { nome: "Prancha", reps: "3x15s" },
        { nome: "Superman", reps: "3x10" }
      ],
      dia3: [
        { nome: "Exercício cardio leve", reps: "15 minutos" },
        { nome: "Elevação de panturrilha", reps: "3x15" },
        { nome: "Elevação lateral de braços", reps: "3x12" },
        { nome: "Abdominal curto", reps: "3x10" }
      ]
    }
  },
  {
    id: "treino_006",
    name: "Plano Genérico Intermediário",
    tags: ["returning", "full_body"],
    days: 4,
    description: "Plano para praticantes que estão retornando à atividade física",
    plan: {
      dia1: [
        { nome: "Cardio moderado", reps: "20 minutos" },
        { nome: "Agachamento", reps: "3x12" },
        { nome: "Flexão de braço", reps: "3x10" },
        { nome: "Prancha", reps: "3x30s" }
      ],
      dia2: [
        { nome: "Mobilidade articular", reps: "10 minutos" },
        { nome: "Afundo", reps: "3x10 (cada lado)" },
        { nome: "Remada com elástico", reps: "3x12" },
        { nome: "Abdominal completo", reps: "3x15" }
      ],
      dia3: [
        { nome: "Treino intervalado", reps: "15 minutos" },
        { nome: "Stiff", reps: "3x12" },
        { nome: "Elevação lateral", reps: "3x12" },
        { nome: "Prancha lateral", reps: "3x20s (cada lado)" }
      ],
      dia4: [
        { nome: "Cardio leve", reps: "20 minutos" },
        { nome: "Agachamento búlgaro", reps: "3x10 (cada lado)" },
        { nome: "Tríceps mergulho", reps: "3x12" },
        { nome: "Russian twist", reps: "3x20" }
      ]
    }
  },
  {
    id: "treino_007",
    name: "Plano Genérico Avançado",
    tags: ["advanced", "full_body"],
    days: 5,
    description: "Plano intenso para praticantes avançados",
    plan: {
      dia1: [
        { nome: "HIIT", reps: "20 minutos" },
        { nome: "Agachamento com salto", reps: "4x15" },
        { nome: "Flexão com apoio elevado", reps: "4x12" },
        { nome: "Prancha com rotação", reps: "4x10 (cada lado)" }
      ],
      dia2: [
        { nome: "Treino em circuito", reps: "25 minutos" },
        { nome: "Afundo com salto", reps: "4x12 (cada lado)" },
        { nome: "Flexão hindu", reps: "3x10" },
        { nome: "Abdominal completo", reps: "4x20" }
      ],
      dia3: [
        { nome: "Sprints", reps: "10x30s (30s descanso)" },
        { nome: "Pistol squat", reps: "3x8 (cada perna)" },
        { nome: "Flexão archer", reps: "3x8 (cada lado)" },
        { nome: "Prancha com shoulder tap", reps: "3x20" }
      ],
      dia4: [
        { nome: "Treino tabata", reps: "20 minutos" },
        { nome: "Jump lunge", reps: "4x10 (cada perna)" },
        { nome: "Pull-up", reps: "4x8" },
        { nome: "L-sit", reps: "4x15s" }
      ],
      dia5: [
        { nome: "Cardio misto", reps: "30 minutos" },
        { nome: "Burpee", reps: "5x10" },
        { nome: "Muscle-up", reps: "3x5" },
        { nome: "Prancha com drag", reps: "3x10 (cada lado)" }
      ]
    }
  }
];
