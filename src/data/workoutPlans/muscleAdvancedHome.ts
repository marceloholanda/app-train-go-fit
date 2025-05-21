
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleAdvancedHome: WorkoutPlan = {
  id: "treino_203",
  name: "Hipertrofia Avançada em Casa",
  tags: ["gain_muscle", "advanced", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano desafiador para ganho muscular em ambiente doméstico",
  level: "advanced",
  environment: "home",
  objective: "gain_muscle",
  plan: {
    dia1: [
      { nome: "Flexão declinada", reps: "4x12" },
      { nome: "Afundo búlgaro", reps: "4x10 (cada perna)" },
      { nome: "Pike push-up (flexão elevada)", reps: "4x10" },
      { nome: "Australian pull-up", reps: "4x10" },
      { nome: "Handstand push-up na parede", reps: "3x8" }
    ],
    dia2: [
      { nome: "Pistol squat assistido", reps: "3x8 (cada perna)" },
      { nome: "Flexão com palma", reps: "4x12" },
      { nome: "Remada invertida", reps: "4x12" },
      { nome: "Dips em cadeira", reps: "4x12" },
      { nome: "Hollow hold", reps: "3x30s" }
    ],
    dia3: [
      { nome: "Jump squat", reps: "4x12" },
      { nome: "Flexão archer", reps: "3x8 (cada lado)" },
      { nome: "Pull-up negativa", reps: "4x6" },
      { nome: "Pseudo planche push-up", reps: "3x8" },
      { nome: "Dragon flag", reps: "3x8" }
    ]
  }
};
