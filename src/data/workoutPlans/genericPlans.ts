
import { Exercise, WorkoutPlan } from "@/types/workout";

// Planos genéricos para diferentes níveis

export const genericBeginnerPlan: WorkoutPlan = {
  id: "treino_005",
  name: "Plano Genérico para Iniciantes",
  tags: ["beginner", "full_body"],
  days: 3,
  description: "Plano básico para iniciantes que desejam melhorar a condição física geral",
  plan: {
    dia1: [
      { name: "Caminhada", nome: "Caminhada", reps: "15 minutos", sets: 1 },
      { name: "Agachamento livre", nome: "Agachamento livre", reps: "3x10", sets: 3 },
      { name: "Flexão modificada", nome: "Flexão modificada", reps: "3x8", sets: 3 },
      { name: "Ponte de glúteos", nome: "Ponte de glúteos", reps: "3x10", sets: 3 }
    ],
    dia2: [
      { name: "Alongamento dinâmico", nome: "Alongamento dinâmico", reps: "10 minutos", sets: 1 },
      { name: "Afundo estático", nome: "Afundo estático", reps: "3x8 (cada perna)", sets: 3 },
      { name: "Prancha", nome: "Prancha", reps: "3x15s", sets: 3 },
      { name: "Superman", nome: "Superman", reps: "3x10", sets: 3 }
    ],
    dia3: [
      { name: "Exercício cardio leve", nome: "Exercício cardio leve", reps: "15 minutos", sets: 1 },
      { name: "Elevação de panturrilha", nome: "Elevação de panturrilha", reps: "3x15", sets: 3 },
      { name: "Elevação lateral de braços", nome: "Elevação lateral de braços", reps: "3x12", sets: 3 },
      { name: "Abdominal curto", nome: "Abdominal curto", reps: "3x10", sets: 3 }
    ]
  },
  level: "beginner",
  goal: "create_habit"
};

export const genericIntermediatePlan: WorkoutPlan = {
  id: "treino_006",
  name: "Plano Genérico Intermediário",
  tags: ["returning", "full_body"],
  days: 4,
  description: "Plano para praticantes que estão retornando à atividade física",
  plan: {
    dia1: [
      { name: "Cardio moderado", nome: "Cardio moderado", reps: "20 minutos", sets: 1 },
      { name: "Agachamento", nome: "Agachamento", reps: "3x12", sets: 3 },
      { name: "Flexão de braço", nome: "Flexão de braço", reps: "3x10", sets: 3 },
      { name: "Prancha", nome: "Prancha", reps: "3x30s", sets: 3 }
    ],
    dia2: [
      { name: "Mobilidade articular", nome: "Mobilidade articular", reps: "10 minutos", sets: 1 },
      { name: "Afundo", nome: "Afundo", reps: "3x10 (cada lado)", sets: 3 },
      { name: "Remada com elástico", nome: "Remada com elástico", reps: "3x12", sets: 3 },
      { name: "Abdominal completo", nome: "Abdominal completo", reps: "3x15", sets: 3 }
    ],
    dia3: [
      { name: "Treino intervalado", nome: "Treino intervalado", reps: "15 minutos", sets: 1 },
      { name: "Stiff", nome: "Stiff", reps: "3x12", sets: 3 },
      { name: "Elevação lateral", nome: "Elevação lateral", reps: "3x12", sets: 3 },
      { name: "Prancha lateral", nome: "Prancha lateral", reps: "3x20s (cada lado)", sets: 3 }
    ],
    dia4: [
      { name: "Cardio leve", nome: "Cardio leve", reps: "20 minutos", sets: 1 },
      { name: "Agachamento búlgaro", nome: "Agachamento búlgaro", reps: "3x10 (cada lado)", sets: 3 },
      { name: "Tríceps mergulho", nome: "Tríceps mergulho", reps: "3x12", sets: 3 },
      { name: "Russian twist", nome: "Russian twist", reps: "3x20", sets: 3 }
    ]
  },
  level: "intermediate",
  goal: "create_habit"
};

export const genericAdvancedPlan: WorkoutPlan = {
  id: "treino_007",
  name: "Plano Genérico Avançado",
  tags: ["advanced", "full_body"],
  days: 5,
  description: "Plano intenso para praticantes avançados",
  plan: {
    dia1: [
      { name: "HIIT", nome: "HIIT", reps: "20 minutos", sets: 1 },
      { name: "Agachamento com salto", nome: "Agachamento com salto", reps: "4x15", sets: 4 },
      { name: "Flexão com apoio elevado", nome: "Flexão com apoio elevado", reps: "4x12", sets: 4 },
      { name: "Prancha com rotação", nome: "Prancha com rotação", reps: "4x10 (cada lado)", sets: 4 }
    ],
    dia2: [
      { name: "Treino em circuito", nome: "Treino em circuito", reps: "25 minutos", sets: 1 },
      { name: "Afundo com salto", nome: "Afundo com salto", reps: "4x12 (cada lado)", sets: 4 },
      { name: "Flexão hindu", nome: "Flexão hindu", reps: "3x10", sets: 3 },
      { name: "Abdominal completo", nome: "Abdominal completo", reps: "4x20", sets: 4 }
    ],
    dia3: [
      { name: "Sprints", nome: "Sprints", reps: "10x30s (30s descanso)", sets: 10 },
      { name: "Pistol squat", nome: "Pistol squat", reps: "3x8 (cada perna)", sets: 3 },
      { name: "Flexão archer", nome: "Flexão archer", reps: "3x8 (cada lado)", sets: 3 },
      { name: "Prancha com shoulder tap", nome: "Prancha com shoulder tap", reps: "3x20", sets: 3 }
    ],
    dia4: [
      { name: "Treino tabata", nome: "Treino tabata", reps: "20 minutos", sets: 1 },
      { name: "Jump lunge", nome: "Jump lunge", reps: "4x10 (cada perna)", sets: 4 },
      { name: "Pull-up", nome: "Pull-up", reps: "4x8", sets: 4 },
      { name: "L-sit", nome: "L-sit", reps: "4x15s", sets: 4 }
    ],
    dia5: [
      { name: "Cardio misto", nome: "Cardio misto", reps: "30 minutos", sets: 1 },
      { name: "Burpee", nome: "Burpee", reps: "5x10", sets: 5 },
      { name: "Muscle-up", nome: "Muscle-up", reps: "3x5", sets: 3 },
      { name: "Prancha com drag", nome: "Prancha com drag", reps: "3x10 (cada lado)", sets: 3 }
    ]
  },
  level: "advanced",
  goal: "create_habit"
};
