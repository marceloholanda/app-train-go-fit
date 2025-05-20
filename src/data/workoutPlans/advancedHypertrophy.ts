
import { Exercise, WorkoutPlan } from "@/types/workout";

export const advancedHypertrophy: WorkoutPlan = {
  id: "treino_002",
  name: "Hipertrofia Academia",
  tags: ["gain_muscle", "advanced", "gym", "60+", "5_plus", "upper_body"],
  days: 5,
  description: "Plano avançado para ganho de massa muscular com divisão otimizada por grupos musculares",
  plan: {
    dia1: [
      { name: "Supino reto", nome: "Supino reto", reps: "4x10-12" },
      { name: "Crucifixo", nome: "Crucifixo", reps: "3x12" },
      { name: "Tríceps corda", nome: "Tríceps corda", reps: "3x12-15" },
      { name: "Mergulho entre bancos", nome: "Mergulho entre bancos", reps: "3x10-12" }
    ],
    dia2: [
      { name: "Agachamento", nome: "Agachamento", reps: "4x10-12" },
      { name: "Leg press", nome: "Leg press", reps: "4x12-15" },
      { name: "Cadeira extensora", nome: "Cadeira extensora", reps: "3x12-15" },
      { name: "Panturrilha em pé", nome: "Panturrilha em pé", reps: "4x15-20" }
    ],
    dia3: [
      { name: "Puxada frontal", nome: "Puxada frontal", reps: "4x10-12" },
      { name: "Remada curvada", nome: "Remada curvada", reps: "4x10-12" },
      { name: "Rosca direta", nome: "Rosca direta", reps: "3x12" },
      { name: "Rosca alternada", nome: "Rosca alternada", reps: "3x12" }
    ],
    dia4: [
      { name: "Desenvolvimento com halteres", nome: "Desenvolvimento com halteres", reps: "3x12" },
      { name: "Elevação lateral", nome: "Elevação lateral", reps: "3x15" },
      { name: "Prancha", nome: "Prancha", reps: "3x30s" },
      { name: "Elevação de pernas", nome: "Elevação de pernas", reps: "3x15" }
    ],
    dia5: [
      { name: "Agachamento com halteres", nome: "Agachamento com halteres", reps: "3x15" },
      { name: "Flexão de braço", nome: "Flexão de braço", reps: "3x10" },
      { name: "Remada baixa com barra", nome: "Remada baixa com barra", reps: "3x12" },
      { name: "Abdominal remador", nome: "Abdominal remador", reps: "3x20" }
    ]
  }
};
