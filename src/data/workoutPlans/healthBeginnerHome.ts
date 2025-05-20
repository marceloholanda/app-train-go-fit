
import { Exercise, WorkoutPlan } from "@/types/workout";

export const healthBeginnerHome: WorkoutPlan = {
  id: "treino_301",
  name: "Saúde e Energia para Iniciantes",
  tags: ["health_energy", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano leve para melhorar sua saúde e disposição diária",
  plan: {
    dia1: [
      { nome: "Alongamento dinâmico", reps: "5 minutos" },
      { nome: "Caminhada no lugar", reps: "5 minutos" },
      { nome: "Agachamento livre", reps: "3x10" },
      { nome: "Flexão na parede", reps: "3x10" },
      { nome: "Rotação de tronco", reps: "3x10 (cada lado)" }
    ],
    dia2: [
      { nome: "Mobilidade articular", reps: "5 minutos" },
      { nome: "Marcha estacionária", reps: "5 minutos" },
      { nome: "Ponte de glúteos", reps: "3x12" },
      { nome: "Remada em pé com elástico", reps: "3x12" },
      { nome: "Gato-vaca", reps: "3x10" }
    ],
    dia3: [
      { nome: "Respiração profunda", reps: "3 minutos" },
      { nome: "Elevação de calcanhar", reps: "3x15" },
      { nome: "Abdução de quadril", reps: "3x12 (cada lado)" },
      { nome: "Superman", reps: "3x10" },
      { nome: "Alongamento passivo", reps: "5 minutos" }
    ]
  }
};
