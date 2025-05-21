
import { Exercise, WorkoutPlan } from "@/types/workout";

export const healthAdvancedOutdoor: WorkoutPlan = {
  id: "treino_303",
  name: "Saúde e Disposição Outdoor",
  tags: ["health_energy", "advanced", "outdoor", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano ao ar livre para otimizar energia e bem-estar",
  level: "advanced",
  environment: "outdoor",
  objective: "health_energy",
  plan: {
    dia1: [
      { nome: "Corrida intervalar", reps: "15 minutos (1 min rápido, 1 min lento)" },
      { nome: "Agachamento com salto", reps: "3x15" },
      { nome: "Flexão com apoio elevado", reps: "3x15" },
      { nome: "Prancha com rotação", reps: "3x10 (cada lado)" },
      { nome: "Alongamento ativo", reps: "5 minutos" }
    ],
    dia2: [
      { nome: "Corrida em ladeira", reps: "10 minutos" },
      { nome: "Afundo com salto", reps: "3x12 (cada perna)" },
      { nome: "Flexão declinada", reps: "3x12" },
      { nome: "Escalador", reps: "3x30s" },
      { nome: "Meditação em movimento", reps: "5 minutos" }
    ],
    dia3: [
      { nome: "Sprint e caminhada", reps: "15 minutos (15s sprint, 45s caminhada)" },
      { nome: "Salto em caixa ou banco", reps: "3x12" },
      { nome: "Mergulho em barras", reps: "3x12" },
      { nome: "Abdominal completo", reps: "3x20" },
      { nome: "Respiração e recuperação", reps: "5 minutos" }
    ]
  }
};
