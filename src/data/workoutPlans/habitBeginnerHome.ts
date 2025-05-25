
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitBeginnerHome: WorkoutPlan = {
  id: "treino_401",
  name: "Treino Leve para Criar Hábito",
  tags: ["create_habit", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano simples para iniciantes criarem o hábito de exercício em casa",
  plan: {
    dia1: [
      { nome: "Marcha estacionária", reps: "3x30s" },
      { nome: "Agachamento na parede", reps: "3x20s" },
      { nome: "Flexão na parede", reps: "3x10" },
      { nome: "Prancha no joelho", reps: "3x15s" },
      { nome: "Alongamento leve", reps: "3 minutos" }
    ],
    dia2: [
      { nome: "Alongamento dinâmico", reps: "5 minutos" },
      { nome: "Agachamento livre", reps: "3x10" },
      { nome: "Rotação de tronco", reps: "3x10 (cada lado)" },
      { nome: "Abdominal curto", reps: "3x10" },
      { nome: "Respiração profunda", reps: "2 minutos" }
    ],
    dia3: [
      { nome: "Caminhada no lugar", reps: "5 minutos" },
      { nome: "Elevação de joelhos", reps: "3x10 (cada perna)" },
      { nome: "Ponte de glúteos", reps: "3x10" },
      { nome: "Bird dog", reps: "3x8 (cada lado)" },
      { nome: "Alongamento global", reps: "3 minutos" }
    ]
  }
};
