
import { Exercise, WorkoutPlan } from "@/types/workout";

// Planos genéricos para diferentes níveis

export const genericBeginnerPlan: WorkoutPlan = {
  id: "treino_005",
  name: "Plano Genérico para Iniciantes",
  tags: ["beginner", "full_body"],
  days: 3,
  description: "Plano básico para iniciantes que desejam melhorar a condição física geral",
  level: "beginner",
  environment: "home",
  objective: "health_energy",
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
};

export const genericIntermediatePlan: WorkoutPlan = {
  id: "treino_006",
  name: "Plano Genérico Intermediário",
  tags: ["returning", "full_body"],
  days: 4,
  description: "Plano para praticantes que estão retornando à atividade física",
  level: "returning",
  environment: "gym",
  objective: "health_energy",
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
};

export const genericAdvancedPlan: WorkoutPlan = {
  id: "treino_007",
  name: "Plano Genérico Avançado",
  tags: ["advanced", "full_body"],
  days: 5,
  description: "Plano intenso para praticantes avançados",
  level: "advanced",
  environment: "gym",
  objective: "gain_muscle",
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
};
