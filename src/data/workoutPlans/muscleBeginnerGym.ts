
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleBeginnerGym: WorkoutPlan = {
  id: "treino_201",
  name: "Hipertrofia Iniciante na Academia",
  tags: ["gain_muscle", "beginner", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ideal para iniciantes ganharem massa muscular na academia",
  plan: {
    dia1: [
      { name: "Supino máquina", nome: "Supino máquina", reps: "3x12", sets: 3 },
      { name: "Crucifixo máquina", nome: "Crucifixo máquina", reps: "3x12", sets: 3 },
      { name: "Tríceps corda", nome: "Tríceps corda", reps: "3x12", sets: 3 },
      { name: "Desenvolvimento máquina", nome: "Desenvolvimento máquina", reps: "3x12", sets: 3 }
    ],
    dia2: [
      { name: "Leg press", nome: "Leg press", reps: "3x12", sets: 3 },
      { name: "Cadeira extensora", nome: "Cadeira extensora", reps: "3x12", sets: 3 },
      { name: "Agachamento Smith", nome: "Agachamento Smith", reps: "3x12", sets: 3 },
      { name: "Panturrilha em pé", nome: "Panturrilha em pé", reps: "3x15", sets: 3 }
    ],
    dia3: [
      { name: "Puxada alta", nome: "Puxada alta", reps: "3x12", sets: 3 },
      { name: "Remada baixa", nome: "Remada baixa", reps: "3x12", sets: 3 },
      { name: "Remada sentada", nome: "Remada sentada", reps: "3x12", sets: 3 },
      { name: "Rosca direta", nome: "Rosca direta", reps: "3x12", sets: 3 },
      { name: "Abdominal máquina", nome: "Abdominal máquina", reps: "3x15", sets: 3 }
    ]
  },
  level: "beginner",
  goal: "gain_muscle"
};
