
import { Exercise, WorkoutPlan } from "@/types/workout";

export const beginnerFatLoss: WorkoutPlan = {
  id: "treino_001",
  name: "Queima Iniciante em Casa",
  tags: ["lose_fat", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ideal para iniciantes que desejam perder gordura corporal treinando em casa",
  plan: {
    dia1: [
      { name: "Polichinelo", nome: "Polichinelo", reps: "3x30s", sets: 3 },
      { name: "Agachamento", nome: "Agachamento", reps: "3x15", sets: 3 },
      { name: "Prancha", nome: "Prancha", reps: "3x20s", sets: 3 },
      { name: "Flexão de braço no joelho", nome: "Flexão de braço no joelho", reps: "3x10", sets: 3 }
    ],
    dia2: [
      { name: "Corrida estacionária", nome: "Corrida estacionária", reps: "3x30s", sets: 3 },
      { name: "Afundo", nome: "Afundo", reps: "3x12 (cada perna)", sets: 3 },
      { name: "Mountain climber", nome: "Mountain climber", reps: "3x20s", sets: 3 },
      { name: "Flexão de quadril", nome: "Flexão de quadril", reps: "3x15", sets: 3 }
    ],
    dia3: [
      { name: "Jumping jack", nome: "Jumping jack", reps: "3x30s", sets: 3 },
      { name: "Agachamento sumô", nome: "Agachamento sumô", reps: "3x15", sets: 3 },
      { name: "Prancha lateral", nome: "Prancha lateral", reps: "3x20s (cada lado)", sets: 3 },
      { name: "Elevação de pelvis", nome: "Elevação de pelvis", reps: "3x15", sets: 3 }
    ]
  },
  level: "beginner",
  goal: "lose_fat"
};
