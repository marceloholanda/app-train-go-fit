
import { Exercise, WorkoutPlan } from "@/types/workout";

export const healthIntermediateGym: WorkoutPlan = {
  id: "treino_302",
  name: "Saúde e Energia na Academia",
  tags: ["health_energy", "returning", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano equilibrado para melhorar condicionamento e bem-estar geral",
  plan: {
    dia1: [
      { nome: "Bicicleta ergométrica", reps: "10 minutos" },
      { nome: "Supino sentado", reps: "3x15" },
      { nome: "Crucifixo máquina", reps: "3x15" },
      { nome: "Tríceps corda", reps: "3x15" }
    ],
    dia2: [
      { nome: "Esteira", reps: "10 minutos" },
      { nome: "Leg press", reps: "3x15" },
      { nome: "Cadeira extensora", reps: "3x15" },
      { nome: "Cadeira flexora", reps: "3x15" }
    ],
    dia3: [
      { nome: "Elíptico", reps: "10 minutos" },
      { nome: "Remada sentada", reps: "3x15" },
      { nome: "Puxada alta", reps: "3x15" },
      { nome: "Abdominal na máquina", reps: "3x15" },
      { nome: "Alongamento final", reps: "5 minutos" }
    ]
  }
};
