
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleBeginnerGym: WorkoutPlan = {
  id: "treino_201",
  name: "Hipertrofia Iniciante na Academia",
  tags: ["gain_muscle", "beginner", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ideal para iniciantes ganharem massa muscular na academia",
  plan: {
    dia1: [
      { nome: "Supino máquina", reps: "3x12" },
      { nome: "Crucifixo máquina", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12" },
      { nome: "Desenvolvimento máquina", reps: "3x12" }
    ],
    dia2: [
      { nome: "Leg press", reps: "3x12" },
      { nome: "Cadeira extensora", reps: "3x12" },
      { nome: "Agachamento Smith", reps: "3x12" },
      { nome: "Panturrilha em pé", reps: "3x15" }
    ],
    dia3: [
      { nome: "Puxada alta", reps: "3x12" },
      { nome: "Remada baixa", reps: "3x12" },
      { nome: "Remada sentada", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Abdominal máquina", reps: "3x15" }
    ]
  }
};
