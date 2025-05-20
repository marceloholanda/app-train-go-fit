
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleIntermediateGym: WorkoutPlan = {
  id: "treino_202",
  name: "Hipertrofia Intermediária na Academia",
  tags: ["gain_muscle", "returning", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para praticantes de nível intermediário focados em ganho muscular",
  plan: {
    dia1: [
      { name: "Supino reto", nome: "Supino reto", reps: "4x10", sets: 4 },
      { name: "Crucifixo", nome: "Crucifixo", reps: "3x12", sets: 3 },
      { name: "Tríceps corda", nome: "Tríceps corda", reps: "3x12", sets: 3 },
      { name: "Tríceps francês", nome: "Tríceps francês", reps: "3x12", sets: 3 }
    ],
    dia2: [
      { name: "Agachamento livre", nome: "Agachamento livre", reps: "4x10", sets: 4 },
      { name: "Leg press 45°", nome: "Leg press 45°", reps: "4x12", sets: 4 },
      { name: "Stiff", nome: "Stiff", reps: "4x10", sets: 4 },
      { name: "Panturrilha em pé", nome: "Panturrilha em pé", reps: "3x15", sets: 3 }
    ],
    dia3: [
      { name: "Puxada aberta", nome: "Puxada aberta", reps: "4x10", sets: 4 },
      { name: "Remada baixa", nome: "Remada baixa", reps: "4x10", sets: 4 },
      { name: "Remada cavalinho", nome: "Remada cavalinho", reps: "3x12", sets: 3 },
      { name: "Rosca scott", nome: "Rosca scott", reps: "3x12", sets: 3 },
      { name: "Abdominal infra", nome: "Abdominal infra", reps: "3x15", sets: 3 }
    ]
  },
  level: "intermediate",
  goal: "gain_muscle"
};
