
import { Exercise, WorkoutPlan } from "@/types/workout";

export const advancedHypertrophy: WorkoutPlan = {
  id: "treino_002",
  name: "Hipertrofia Academia",
  tags: ["gain_muscle", "advanced", "gym", "60+", "5_plus", "upper_body"],
  days: 5,
  description: "Plano avançado para ganho de massa muscular com foco na parte superior do corpo",
  plan: {
    dia1: [
      { nome: "Supino reto", reps: "4x10-12" },
      { nome: "Remada curvada", reps: "4x10-12" },
      { nome: "Desenvolvimento com halteres", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12-15" }
    ],
    dia2: [
      { nome: "Agachamento", reps: "4x10-12" },
      { nome: "Leg press", reps: "4x12-15" },
      { nome: "Cadeira extensora", reps: "3x12-15" },
      { nome: "Panturrilha em pé", reps: "4x15-20" }
    ],
    dia3: [
      { nome: "Puxada frontal", reps: "4x10-12" },
      { nome: "Crucifixo", reps: "3x12" },
      { nome: "Remada baixa", reps: "3x12" },
      { nome: "Rosca direta", reps: "3x12" }
    ],
    dia4: [
      { nome: "Cadeira flexora", reps: "4x12-15" },
      { nome: "Stiff", reps: "3x12" },
      { nome: "Abdução", reps: "3x15" },
      { nome: "Adução", reps: "3x15" }
    ],
    dia5: [
      { nome: "Desenvolvimento máquina", reps: "4x10-12" },
      { nome: "Elevação lateral", reps: "3x12-15" },
      { nome: "Tríceps frances", reps: "3x12" },
      { nome: "Abdominal infra", reps: "3x20" }
    ]
  }
};
