
import { Exercise, WorkoutPlan } from "@/types/workout";

export const habitAdvancedGym: WorkoutPlan = {
  id: "treino_403",
  name: "Rotina Avançada para Consistência",
  tags: ["create_habit", "advanced", "gym", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano para praticantes avançados criarem consistência na academia",
  plan: {
    dia1: [
      { name: "Esteira intervalada", nome: "Esteira intervalada", reps: "10 minutos", sets: 1 },
      { name: "Agachamento frontal", nome: "Agachamento frontal", reps: "3x10", sets: 3 },
      { name: "Supino reto", nome: "Supino reto", reps: "3x10", sets: 3 },
      { name: "Pull-down", nome: "Pull-down", reps: "3x12", sets: 3 },
      { name: "Abdominal infra", nome: "Abdominal infra", reps: "3x15", sets: 3 }
    ],
    dia2: [
      { name: "Remo ergômetro", nome: "Remo ergômetro", reps: "10 minutos", sets: 1 },
      { name: "Stiff", nome: "Stiff", reps: "3x10", sets: 3 },
      { name: "Desenvolvimento", nome: "Desenvolvimento", reps: "3x10", sets: 3 },
      { name: "Remada sentada", nome: "Remada sentada", reps: "3x12", sets: 3 },
      { name: "Prancha lateral", nome: "Prancha lateral", reps: "3x30s (cada lado)", sets: 3 }
    ],
    dia3: [
      { name: "Pular corda", nome: "Pular corda", reps: "10 minutos", sets: 1 },
      { name: "Leg press", nome: "Leg press", reps: "3x12", sets: 3 },
      { name: "Crucifixo", nome: "Crucifixo", reps: "3x12", sets: 3 },
      { name: "Puxada alta", nome: "Puxada alta", reps: "3x12", sets: 3 },
      { name: "Abdominal bicicleta", nome: "Abdominal bicicleta", reps: "3x20", sets: 3 }
    ]
  },
  level: "advanced",
  goal: "create_habit"
};
