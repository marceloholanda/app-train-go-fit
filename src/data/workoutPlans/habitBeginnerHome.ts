
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitBeginnerHome: WorkoutPlan = {
  id: "treino_401",
  name: "Treino Leve para Criar Hábito",
  tags: ["create_habit", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano simples para iniciantes criarem o hábito de exercício em casa",
  plan: {
    dia1: [
      { name: "Marcha estacionária", nome: "Marcha estacionária", reps: "3x30s", sets: 3 },
      { name: "Agachamento na parede", nome: "Agachamento na parede", reps: "3x20s", sets: 3 },
      { name: "Flexão na parede", nome: "Flexão na parede", reps: "3x10", sets: 3 },
      { name: "Prancha no joelho", nome: "Prancha no joelho", reps: "3x15s", sets: 3 },
      { name: "Alongamento leve", nome: "Alongamento leve", reps: "3 minutos", sets: 1 }
    ],
    dia2: [
      { name: "Alongamento dinâmico", nome: "Alongamento dinâmico", reps: "5 minutos", sets: 1 },
      { name: "Agachamento livre", nome: "Agachamento livre", reps: "3x10", sets: 3 },
      { name: "Rotação de tronco", nome: "Rotação de tronco", reps: "3x10 (cada lado)", sets: 3 },
      { name: "Abdominal curto", nome: "Abdominal curto", reps: "3x10", sets: 3 },
      { name: "Respiração profunda", nome: "Respiração profunda", reps: "2 minutos", sets: 1 }
    ],
    dia3: [
      { name: "Caminhada no lugar", nome: "Caminhada no lugar", reps: "5 minutos", sets: 1 },
      { name: "Elevação de joelhos", nome: "Elevação de joelhos", reps: "3x10 (cada perna)", sets: 3 },
      { name: "Ponte de glúteos", nome: "Ponte de glúteos", reps: "3x10", sets: 3 },
      { name: "Bird dog", nome: "Bird dog", reps: "3x8 (cada lado)", sets: 3 },
      { name: "Alongamento global", nome: "Alongamento global", reps: "3 minutos", sets: 1 }
    ]
  },
  level: "beginner",
  goal: "create_habit"
};
