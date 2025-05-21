
import { Exercise, WorkoutPlan } from "@/types/workout";

export const beginnerFatLoss: WorkoutPlan = {
  id: "treino_001",
  name: "Queima Iniciante em Casa",
  tags: ["lose_fat", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ideal para iniciantes que desejam perder gordura corporal treinando em casa",
  level: "beginner",
  environment: "home",
  objective: "lose_fat",
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
};
