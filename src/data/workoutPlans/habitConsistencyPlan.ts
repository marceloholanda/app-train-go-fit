
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitConsistencyPlan: WorkoutPlan = {
  id: "treino_004",
  name: "Rotina Consistente",
  tags: ["create_habit", "beginner", "home", "15", "2", "full_body"],
  days: 2,
  description: "Plano simples para iniciantes criarem o hábito de exercício em casa com treinos curtos",
  plan: {
    dia1: [
      { nome: "Marcha estacionária", reps: "3x30s" },
      { nome: "Agachamento na parede", reps: "3x20s" },
      { nome: "Flexão na parede", reps: "3x10" },
      { nome: "Prancha no joelho", reps: "3x15s" }
    ],
    dia2: [
      { nome: "Alongamento dinâmico", reps: "5 minutos" },
      { nome: "Agachamento livre", reps: "3x10" },
      { nome: "Rotação de tronco", reps: "3x10 (cada lado)" },
      { nome: "Abdominal curto", reps: "3x10" }
    ]
  }
};
