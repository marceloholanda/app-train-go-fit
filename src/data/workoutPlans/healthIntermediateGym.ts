
import { Exercise, WorkoutPlan } from "@/types/workout";

export const healthIntermediateGym: WorkoutPlan = {
  id: "treino_302",
  name: "Saúde e Energia na Academia",
  tags: ["health_energy", "returning", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano equilibrado para melhorar condicionamento e bem-estar geral",
  plan: {
    dia1: [
      { name: "Bicicleta ergométrica", nome: "Bicicleta ergométrica", reps: "10 minutos", sets: 1 },
      { name: "Supino sentado", nome: "Supino sentado", reps: "3x15", sets: 3 },
      { name: "Crucifixo máquina", nome: "Crucifixo máquina", reps: "3x15", sets: 3 },
      { name: "Tríceps corda", nome: "Tríceps corda", reps: "3x15", sets: 3 }
    ],
    dia2: [
      { name: "Esteira", nome: "Esteira", reps: "10 minutos", sets: 1 },
      { name: "Leg press", nome: "Leg press", reps: "3x15", sets: 3 },
      { name: "Cadeira extensora", nome: "Cadeira extensora", reps: "3x15", sets: 3 },
      { name: "Cadeira flexora", nome: "Cadeira flexora", reps: "3x15", sets: 3 }
    ],
    dia3: [
      { name: "Elíptico", nome: "Elíptico", reps: "10 minutos", sets: 1 },
      { name: "Remada sentada", nome: "Remada sentada", reps: "3x15", sets: 3 },
      { name: "Puxada alta", nome: "Puxada alta", reps: "3x15", sets: 3 },
      { name: "Abdominal na máquina", nome: "Abdominal na máquina", reps: "3x15", sets: 3 },
      { name: "Alongamento final", nome: "Alongamento final", reps: "5 minutos", sets: 1 }
    ]
  },
  level: "intermediate",
  goal: "health_energy"
};
