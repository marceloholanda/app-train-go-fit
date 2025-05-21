
import { Exercise, WorkoutPlan } from "@/types/workout";

export const fatLossAdvancedGym: WorkoutPlan = {
  id: "treino_103",
  name: "Queima Avançada na Academia",
  tags: ["lose_fat", "advanced", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano intenso para praticantes avançados focado na perda de gordura",
  level: "advanced",
  environment: "gym",
  objective: "lose_fat",
  plan: {
    dia1: [
      { nome: "Agachamento com barra", reps: "4x10" },
      { nome: "Supino reto", reps: "4x10" },
      { nome: "Remada curvada", reps: "4x12" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Prancha com peso", reps: "3x30s" }
    ],
    dia2: [
      { nome: "Levantamento terra", reps: "4x8" },
      { nome: "Desenvolvimento com halteres", reps: "4x10" },
      { nome: "Leg press", reps: "4x12" },
      { nome: "Tríceps corda", reps: "3x15" },
      { nome: "Abdominal oblíquo", reps: "3x20" }
    ],
    dia3: [
      { nome: "HIIT na esteira", reps: "10x30s (30s descanso)" },
      { nome: "Afundo com halteres", reps: "3x12 (cada perna)" },
      { nome: "Puxada frontal", reps: "3x12" },
      { nome: "Rosca alternada", reps: "3x12" },
      { nome: "Abdominal na roda", reps: "3x12" }
    ]
  }
};
