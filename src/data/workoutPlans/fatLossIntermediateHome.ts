
import { Exercise, WorkoutPlan } from "@/types/workout";

export const fatLossIntermediateHome: WorkoutPlan = {
  id: "treino_102",
  name: "Queima Intermediária em Casa",
  tags: ["lose_fat", "returning", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano de intensidade média para perda de gordura com treinos domiciliares",
  plan: {
    dia1: [
      { name: "Burpee", nome: "Burpee", reps: "3x10", sets: 3 },
      { name: "Agachamento com salto", nome: "Agachamento com salto", reps: "3x12", sets: 3 },
      { name: "Flexão de braço", nome: "Flexão de braço", reps: "3x12", sets: 3 },
      { name: "Abdominal bicicleta", nome: "Abdominal bicicleta", reps: "3x20", sets: 3 },
      { name: "Prancha com toque no ombro", nome: "Prancha com toque no ombro", reps: "3x10 (cada lado)", sets: 3 }
    ],
    dia2: [
      { name: "Jumping jacks", nome: "Jumping jacks", reps: "3x40s", sets: 3 },
      { name: "Afundo com salto", nome: "Afundo com salto", reps: "3x10 (cada perna)", sets: 3 },
      { name: "Flexão diamante", nome: "Flexão diamante", reps: "3x10", sets: 3 },
      { name: "Russian twist", nome: "Russian twist", reps: "3x20", sets: 3 },
      { name: "Mountain climber rápido", nome: "Mountain climber rápido", reps: "3x30s", sets: 3 }
    ],
    dia3: [
      { name: "Skipping alto", nome: "Skipping alto", reps: "3x30s", sets: 3 },
      { name: "Agachamento búlgaro", nome: "Agachamento búlgaro", reps: "3x12 (cada perna)", sets: 3 },
      { name: "Flexão declinada", nome: "Flexão declinada", reps: "3x10", sets: 3 },
      { name: "Abdominal infra", nome: "Abdominal infra", reps: "3x15", sets: 3 },
      { name: "Prancha com elevação de perna", nome: "Prancha com elevação de perna", reps: "3x10 (cada perna)", sets: 3 }
    ]
  },
  level: "intermediate",
  goal: "lose_fat"
};
