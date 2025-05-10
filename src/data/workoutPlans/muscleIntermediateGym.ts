
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleIntermediateGym: WorkoutPlan = {
  id: "treino_202",
  name: "Hipertrofia Intermediária na Academia",
  tags: ["gain_muscle", "returning", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para praticantes de nível intermediário focados em ganho muscular",
  plan: {
    dia1: [
      { nome: "Agachamento livre", reps: "4x10" },
      { nome: "Supino reto", reps: "4x10" },
      { nome: "Puxada aberta", reps: "4x10" },
      { nome: "Desenvolvimento halteres", reps: "3x12" },
      { nome: "Rosca scott", reps: "3x12" }
    ],
    dia2: [
      { nome: "Leg press 45°", reps: "4x12" },
      { nome: "Supino inclinado", reps: "4x10" },
      { nome: "Remada baixa", reps: "4x10" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    dia3: [
      { nome: "Stiff", reps: "4x10" },
      { nome: "Crucifixo", reps: "3x12" },
      { nome: "Remada cavalinho", reps: "4x10" },
      { nome: "Face pull", reps: "3x15" },
      { nome: "Abdominal infra", reps: "3x15" }
    ]
  }
};
