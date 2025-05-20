
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitIntermediateHome: WorkoutPlan = {
  id: "treino_402",
  name: "Rotina Consistente para Intermediários",
  tags: ["create_habit", "returning", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para quem está retornando aos treinos e quer criar consistência",
  plan: {
    dia1: [
      { name: "Mobilidade articular", nome: "Mobilidade articular", reps: "5 minutos", sets: 1 },
      { name: "Agachamento", nome: "Agachamento", reps: "3x12", sets: 3 },
      { name: "Flexão de braço", nome: "Flexão de braço", reps: "3x8", sets: 3 },
      { name: "Prancha", nome: "Prancha", reps: "3x30s", sets: 3 },
      { name: "Alongamento de isquiotibiais", nome: "Alongamento de isquiotibiais", reps: "3x20s", sets: 3 }
    ],
    dia2: [
      { name: "Aquecimento dinâmico", nome: "Aquecimento dinâmico", reps: "5 minutos", sets: 1 },
      { name: "Afundo", nome: "Afundo", reps: "3x10 (cada perna)", sets: 3 },
      { name: "Remada com elástico", nome: "Remada com elástico", reps: "3x12", sets: 3 },
      { name: "Russian twist", nome: "Russian twist", reps: "3x20", sets: 3 },
      { name: "Alongamento de ombros", nome: "Alongamento de ombros", reps: "3x20s", sets: 3 }
    ],
    dia3: [
      { name: "Jumping jacks", nome: "Jumping jacks", reps: "3x30s", sets: 3 },
      { name: "Agachamento sumô", nome: "Agachamento sumô", reps: "3x15", sets: 3 },
      { name: "Push-up plus", nome: "Push-up plus", reps: "3x10", sets: 3 },
      { name: "Ponte de glúteos com elevação de perna", nome: "Ponte de glúteos com elevação de perna", reps: "3x10 (cada perna)", sets: 3 },
      { name: "Relaxamento guiado", nome: "Relaxamento guiado", reps: "3 minutos", sets: 1 }
    ]
  },
  level: "intermediate",
  goal: "create_habit"
};
