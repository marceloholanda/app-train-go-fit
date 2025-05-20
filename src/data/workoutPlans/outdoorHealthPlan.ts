
import { Exercise, WorkoutPlan } from "@/types/workout";

export const outdoorHealthPlan: WorkoutPlan = {
  id: "treino_003",
  name: "Saúde e Disposição",
  tags: ["health_energy", "returning", "outdoor", "30_45", "4", "full_body"],
  days: 4,
  description: "Plano para melhorar a disposição e saúde geral com treinos ao ar livre",
  plan: {
    dia1: [
      { name: "Caminhada rápida", nome: "Caminhada rápida", reps: "20 minutos", sets: 1 },
      { name: "Agachamento livre", nome: "Agachamento livre", reps: "3x15", sets: 3 },
      { name: "Flexão de braço no banco", nome: "Flexão de braço no banco", reps: "3x10", sets: 3 },
      { name: "Prancha", nome: "Prancha", reps: "3x30s", sets: 3 }
    ],
    dia2: [
      { name: "Corrida leve", nome: "Corrida leve", reps: "15 minutos", sets: 1 },
      { name: "Afundo andando", nome: "Afundo andando", reps: "3x10 (cada perna)", sets: 3 },
      { name: "Flexão de braço no joelho", nome: "Flexão de braço no joelho", reps: "3x12", sets: 3 },
      { name: "Russian twist", nome: "Russian twist", reps: "3x20", sets: 3 }
    ],
    dia3: [
      { name: "Treino intervalado", nome: "Treino intervalado", reps: "15 minutos", sets: 1 },
      { name: "Agachamento com salto", nome: "Agachamento com salto", reps: "3x12", sets: 3 },
      { name: "Tríceps no banco", nome: "Tríceps no banco", reps: "3x12", sets: 3 },
      { name: "Prancha com elevação", nome: "Prancha com elevação", reps: "3x10 (cada lado)", sets: 3 }
    ],
    dia4: [
      { name: "Caminhada em terreno inclinado", nome: "Caminhada em terreno inclinado", reps: "20 minutos", sets: 1 },
      { name: "Ponte de glúteos", nome: "Ponte de glúteos", reps: "3x15", sets: 3 },
      { name: "Flexões diamante", nome: "Flexões diamante", reps: "3x10", sets: 3 },
      { name: "Abdominal bicicleta", nome: "Abdominal bicicleta", reps: "3x20", sets: 3 }
    ]
  },
  level: "intermediate",
  goal: "health_energy"
};
