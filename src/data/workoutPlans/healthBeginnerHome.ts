
import { Exercise, WorkoutPlan } from "@/types/workout";

export const healthBeginnerHome: WorkoutPlan = {
  id: "treino_301",
  name: "Saúde e Energia para Iniciantes",
  tags: ["health_energy", "beginner", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano leve para melhorar sua saúde e disposição diária",
  plan: {
    dia1: [
      { name: "Alongamento dinâmico", nome: "Alongamento dinâmico", reps: "5 minutos", sets: 1 },
      { name: "Caminhada no lugar", nome: "Caminhada no lugar", reps: "5 minutos", sets: 1 },
      { name: "Agachamento livre", nome: "Agachamento livre", reps: "3x10", sets: 3 },
      { name: "Flexão na parede", nome: "Flexão na parede", reps: "3x10", sets: 3 },
      { name: "Rotação de tronco", nome: "Rotação de tronco", reps: "3x10 (cada lado)", sets: 3 }
    ],
    dia2: [
      { name: "Mobilidade articular", nome: "Mobilidade articular", reps: "5 minutos", sets: 1 },
      { name: "Marcha estacionária", nome: "Marcha estacionária", reps: "5 minutos", sets: 1 },
      { name: "Ponte de glúteos", nome: "Ponte de glúteos", reps: "3x12", sets: 3 },
      { name: "Remada em pé com elástico", nome: "Remada em pé com elástico", reps: "3x12", sets: 3 },
      { name: "Gato-vaca", nome: "Gato-vaca", reps: "3x10", sets: 3 }
    ],
    dia3: [
      { name: "Respiração profunda", nome: "Respiração profunda", reps: "3 minutos", sets: 1 },
      { name: "Elevação de calcanhar", nome: "Elevação de calcanhar", reps: "3x15", sets: 3 },
      { name: "Abdução de quadril", nome: "Abdução de quadril", reps: "3x12 (cada lado)", sets: 3 },
      { name: "Superman", nome: "Superman", reps: "3x10", sets: 3 },
      { name: "Alongamento passivo", nome: "Alongamento passivo", reps: "5 minutos", sets: 1 }
    ]
  },
  level: "beginner",
  goal: "health_energy"
};
