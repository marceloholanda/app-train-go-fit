
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitIntermediateHome: WorkoutPlan = {
  id: "treino_402",
  name: "Rotina Consistente para Intermediários",
  tags: ["create_habit", "returning", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para quem está retornando aos treinos e quer criar consistência",
  level: "returning",
  environment: "home",
  objective: "create_habit",
  plan: {
    dia1: [
      { nome: "Mobilidade articular", reps: "5 minutos" },
      { nome: "Agachamento", reps: "3x12" },
      { nome: "Flexão de braço", reps: "3x8" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Alongamento de isquiotibiais", reps: "3x20s" }
    ],
    dia2: [
      { nome: "Aquecimento dinâmico", reps: "5 minutos" },
      { nome: "Afundo", reps: "3x10 (cada perna)" },
      { nome: "Remada com elástico", reps: "3x12" },
      { nome: "Russian twist", reps: "3x20" },
      { nome: "Alongamento de ombros", reps: "3x20s" }
    ],
    dia3: [
      { nome: "Jumping jacks", reps: "3x30s" },
      { nome: "Agachamento sumô", reps: "3x15" },
      { nome: "Push-up plus", reps: "3x10" },
      { nome: "Ponte de glúteos com elevação de perna", reps: "3x10 (cada perna)" },
      { nome: "Relaxamento guiado", reps: "3 minutos" }
    ]
  }
};
