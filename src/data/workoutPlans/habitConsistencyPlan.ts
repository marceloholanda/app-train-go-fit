
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitConsistencyPlan: WorkoutPlan = {
  id: "treino_004",
  name: "Rotina Consistente",
  tags: ["create_habit", "beginner", "home", "15", "2", "full_body"],
  days: 2,
  description: "Plano simples para iniciantes criarem o hábito de exercício em casa com treinos curtos",
  plan: {
    dia1: [
      { name: "Marcha estacionária", nome: "Marcha estacionária", reps: "3x30s", sets: 3 },
      { name: "Agachamento na parede", nome: "Agachamento na parede", reps: "3x20s", sets: 3 },
      { name: "Flexão na parede", nome: "Flexão na parede", reps: "3x10", sets: 3 },
      { name: "Prancha no joelho", nome: "Prancha no joelho", reps: "3x15s", sets: 3 }
    ],
    dia2: [
      { name: "Alongamento dinâmico", nome: "Alongamento dinâmico", reps: "5 minutos", sets: 1 },
      { name: "Agachamento livre", nome: "Agachamento livre", reps: "3x10", sets: 3 },
      { name: "Rotação de tronco", nome: "Rotação de tronco", reps: "3x10 (cada lado)", sets: 3 },
      { name: "Abdominal curto", nome: "Abdominal curto", reps: "3x10", sets: 3 }
    ]
  },
  level: "beginner",
  goal: "create_habit"
};
