
import { Exercise, WorkoutPlan } from "@/types/workout";

export const fatLossIntermediateHome: WorkoutPlan = {
  id: "treino_102",
  name: "Queima Intermediária em Casa",
  tags: ["lose_fat", "returning", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano de intensidade média para perda de gordura com treinos domiciliares",
  plan: {
    dia1: [
      { nome: "Burpee", reps: "3x10" },
      { nome: "Agachamento com salto", reps: "3x12" },
      { nome: "Flexão de braço", reps: "3x12" },
      { nome: "Abdominal bicicleta", reps: "3x20" },
      { nome: "Prancha com toque no ombro", reps: "3x10 (cada lado)" }
    ],
    dia2: [
      { nome: "Jumping jacks", reps: "3x40s" },
      { nome: "Afundo com salto", reps: "3x10 (cada perna)" },
      { nome: "Flexão diamante", reps: "3x10" },
      { nome: "Russian twist", reps: "3x20" },
      { nome: "Mountain climber rápido", reps: "3x30s" }
    ],
    dia3: [
      { nome: "Skipping alto", reps: "3x30s" },
      { nome: "Agachamento búlgaro", reps: "3x12 (cada perna)" },
      { nome: "Flexão declinada", reps: "3x10" },
      { nome: "Abdominal infra", reps: "3x15" },
      { nome: "Prancha com elevação de perna", reps: "3x10 (cada perna)" }
    ]
  }
};
