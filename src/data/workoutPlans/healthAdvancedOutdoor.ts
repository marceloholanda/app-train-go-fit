
import { Exercise, WorkoutPlan } from "@/types/workout";

export const healthAdvancedOutdoor: WorkoutPlan = {
  id: "treino_303",
  name: "Saúde e Disposição Outdoor",
  tags: ["health_energy", "advanced", "outdoor", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ao ar livre para otimizar energia e bem-estar",
  plan: {
    dia1: [
      { name: "Corrida intervalar", nome: "Corrida intervalar", reps: "15 minutos (1 min rápido, 1 min lento)", sets: 1 },
      { name: "Agachamento com salto", nome: "Agachamento com salto", reps: "3x15", sets: 3 },
      { name: "Flexão com apoio elevado", nome: "Flexão com apoio elevado", reps: "3x15", sets: 3 },
      { name: "Prancha com rotação", nome: "Prancha com rotação", reps: "3x10 (cada lado)", sets: 3 },
      { name: "Alongamento ativo", nome: "Alongamento ativo", reps: "5 minutos", sets: 1 }
    ],
    dia2: [
      { name: "Corrida em ladeira", nome: "Corrida em ladeira", reps: "10 minutos", sets: 1 },
      { name: "Afundo com salto", nome: "Afundo com salto", reps: "3x12 (cada perna)", sets: 3 },
      { name: "Flexão declinada", nome: "Flexão declinada", reps: "3x12", sets: 3 },
      { name: "Escalador", nome: "Escalador", reps: "3x30s", sets: 3 },
      { name: "Meditação em movimento", nome: "Meditação em movimento", reps: "5 minutos", sets: 1 }
    ],
    dia3: [
      { name: "Sprint e caminhada", nome: "Sprint e caminhada", reps: "15 minutos (15s sprint, 45s caminhada)", sets: 1 },
      { name: "Salto em caixa ou banco", nome: "Salto em caixa ou banco", reps: "3x12", sets: 3 },
      { name: "Mergulho em barras", nome: "Mergulho em barras", reps: "3x12", sets: 3 },
      { name: "Abdominal completo", nome: "Abdominal completo", reps: "3x20", sets: 3 },
      { name: "Respiração e recuperação", nome: "Respiração e recuperação", reps: "5 minutos", sets: 1 }
    ]
  },
  level: "advanced",
  goal: "health_energy"
};
