
import { Exercise, WorkoutPlan } from "@/types/workout";

export const fatLossBeginnerHome: WorkoutPlan = {
  id: "treino_101",
  name: "Queima Iniciante em Casa",
  tags: ["lose_fat", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ideal para iniciantes que desejam perder gordura corporal treinando em casa",
  plan: {
    dia1: [
      { nome: "Polichinelo", reps: "3x30s" },
      { nome: "Agachamento livre", reps: "3x15" },
      { nome: "Prancha", reps: "3x20s" },
      { nome: "Flexão de braço no joelho", reps: "3x10" },
      { nome: "Abdominal curto", reps: "3x15" }
    ],
    dia2: [
      { nome: "Corrida estacionária", reps: "3x30s" },
      { nome: "Afundo", reps: "3x12 (cada perna)" },
      { nome: "Mountain climber", reps: "3x20s" },
      { nome: "Flexão de quadril", reps: "3x15" },
      { nome: "Elevação lateral de braços", reps: "3x12" }
    ],
    dia3: [
      { nome: "Jumping jack", reps: "3x30s" },
      { nome: "Agachamento sumô", reps: "3x15" },
      { nome: "Prancha lateral", reps: "3x20s (cada lado)" },
      { nome: "Elevação de pelvis", reps: "3x15" },
      { nome: "Superman", reps: "3x15" }
    ]
  }
};
