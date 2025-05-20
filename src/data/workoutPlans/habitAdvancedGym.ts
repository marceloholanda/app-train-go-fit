
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitAdvancedGym: WorkoutPlan = {
  id: "treino_403",
  name: "Rotina Avançada para Consistência",
  tags: ["create_habit", "advanced", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para praticantes avançados criarem consistência na academia",
  plan: {
    dia1: [
      { nome: "Esteira intervalada", reps: "10 minutos" },
      { nome: "Agachamento frontal", reps: "3x10" },
      { nome: "Supino reto", reps: "3x10" },
      { nome: "Pull-down", reps: "3x12" },
      { nome: "Abdominal infra", reps: "3x15" }
    ],
    dia2: [
      { nome: "Remo ergômetro", reps: "10 minutos" },
      { nome: "Stiff", reps: "3x10" },
      { nome: "Desenvolvimento", reps: "3x10" },
      { nome: "Remada sentada", reps: "3x12" },
      { nome: "Prancha lateral", reps: "3x30s (cada lado)" }
    ],
    dia3: [
      { nome: "Pular corda", reps: "10 minutos" },
      { nome: "Leg press", reps: "3x12" },
      { nome: "Crucifixo", reps: "3x12" },
      { nome: "Puxada alta", reps: "3x12" },
      { nome: "Abdominal bicicleta", reps: "3x20" }
    ]
  }
};
