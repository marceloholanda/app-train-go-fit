
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleIntermediateGym: WorkoutPlan = {
  id: "treino_202",
  name: "Hipertrofia Intermediária na Academia",
  tags: ["gain_muscle", "returning", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para praticantes de nível intermediário focados em ganho muscular",
  level: "returning",
  environment: "gym",
  objective: "gain_muscle",
  plan: {
    dia1: [
      { nome: "Supino reto", reps: "4x10" },
      { nome: "Crucifixo", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Tríceps francês", reps: "3x12" }
    ],
    dia2: [
      { nome: "Agachamento livre", reps: "4x10" },
      { nome: "Leg press 45°", reps: "4x12" },
      { nome: "Stiff", reps: "4x10" },
      { nome: "Panturrilha em pé", reps: "3x15" }
    ],
    dia3: [
      { nome: "Puxada aberta", reps: "4x10" },
      { nome: "Remada baixa", reps: "4x10" },
      { nome: "Remada cavalinho", reps: "3x12" },
      { nome: "Rosca scott", reps: "3x12" },
      { nome: "Abdominal infra", reps: "3x15" }
    ]
  }
};
