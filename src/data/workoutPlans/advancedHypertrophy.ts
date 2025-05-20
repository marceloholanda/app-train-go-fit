
import { Exercise, WorkoutPlan } from "@/types/workout";

export const advancedHypertrophy: WorkoutPlan = {
  id: "treino_002",
  name: "Hipertrofia Academia",
  tags: ["gain_muscle", "advanced", "gym", "60+", "5_plus", "upper_body"],
  days: 5,
  description: "Plano avançado para ganho de massa muscular com divisão otimizada por grupos musculares",
  plan: {
    dia1: [
      { nome: "Supino reto", reps: "4x10-12" },
      { nome: "Crucifixo", reps: "3x12" },
      { nome: "Tríceps corda", reps: "3x12-15" },
      { nome: "Mergulho entre bancos", reps: "3x10-12" }
    ],
    dia2: [
      { nome: "Agachamento", reps: "4x10-12" },
      { nome: "Leg press", reps: "4x12-15" },
      { nome: "Cadeira extensora", reps: "3x12-15" },
      { nome: "Panturrilha em pé", reps: "4x15-20" }
    ],
    dia3: [
      { nome: "Puxada frontal", reps: "4x10-12" },
      { nome: "Remada curvada", reps: "4x10-12" },
      { nome: "Rosca direta", reps: "3x12" },
      { nome: "Rosca alternada", reps: "3x12" }
    ],
    dia4: [
      { nome: "Desenvolvimento com halteres", reps: "3x12" },
      { nome: "Elevação lateral", reps: "3x15" },
      { nome: "Prancha", reps: "3x30s" },
      { nome: "Elevação de pernas", reps: "3x15" }
    ],
    dia5: [
      { nome: "Agachamento com halteres", reps: "3x15" },
      { nome: "Flexão de braço", reps: "3x10" },
      { nome: "Remada baixa com barra", reps: "3x12" },
      { nome: "Abdominal remador", reps: "3x20" }
    ]
  }
};
