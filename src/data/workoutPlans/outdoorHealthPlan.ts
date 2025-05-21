
import { Exercise, WorkoutPlan } from "@/types/workout";

export const outdoorHealthPlan: WorkoutPlan = {
  id: "treino_003",
  name: "Saúde e Disposição",
  tags: ["health_energy", "returning", "outdoor", "30_45", "4", "full_body"],
  days: 4,
  description: "Plano para melhorar a disposição e saúde geral com treinos ao ar livre",
  level: "returning",
  environment: "outdoor",
  objective: "health_energy",
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
};
