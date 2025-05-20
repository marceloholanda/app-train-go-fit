
import { Exercise, WorkoutPlan } from "@/types/workout";

export const fatLossAdvancedGym: WorkoutPlan = {
  id: "treino_103",
  name: "Queima Avançada na Academia",
  tags: ["lose_fat", "advanced", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano intenso para praticantes avançados focado na perda de gordura",
  plan: {
    dia1: [
      { name: "Agachamento com barra", nome: "Agachamento com barra", reps: "4x10", sets: 4 },
      { name: "Supino reto", nome: "Supino reto", reps: "4x10", sets: 4 },
      { name: "Remada curvada", nome: "Remada curvada", reps: "4x12", sets: 4 },
      { name: "Elevação lateral", nome: "Elevação lateral", reps: "3x15", sets: 3 },
      { name: "Prancha com peso", nome: "Prancha com peso", reps: "3x30s", sets: 3 }
    ],
    dia2: [
      { name: "Levantamento terra", nome: "Levantamento terra", reps: "4x8", sets: 4 },
      { name: "Desenvolvimento com halteres", nome: "Desenvolvimento com halteres", reps: "4x10", sets: 4 },
      { name: "Leg press", nome: "Leg press", reps: "4x12", sets: 4 },
      { name: "Tríceps corda", nome: "Tríceps corda", reps: "3x15", sets: 3 },
      { name: "Abdominal oblíquo", nome: "Abdominal oblíquo", reps: "3x20", sets: 3 }
    ],
    dia3: [
      { name: "HIIT na esteira", nome: "HIIT na esteira", reps: "10x30s (30s descanso)", sets: 10 },
      { name: "Afundo com halteres", nome: "Afundo com halteres", reps: "3x12 (cada perna)", sets: 3 },
      { name: "Puxada frontal", nome: "Puxada frontal", reps: "3x12", sets: 3 },
      { name: "Rosca alternada", nome: "Rosca alternada", reps: "3x12", sets: 3 },
      { name: "Abdominal na roda", nome: "Abdominal na roda", reps: "3x12", sets: 3 }
    ]
  },
  level: "advanced",
  goal: "lose_fat"
};
