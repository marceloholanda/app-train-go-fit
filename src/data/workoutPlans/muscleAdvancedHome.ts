
import { Exercise, WorkoutPlan } from "@/types/workout";

export const muscleAdvancedHome: WorkoutPlan = {
  id: "treino_203",
  name: "Hipertrofia Avançada em Casa",
  tags: ["gain_muscle", "advanced", "home", "20_30", "3", "full_body"],
  days: 3,
  description: "Plano desafiador para ganho muscular em ambiente doméstico",
  plan: {
    dia1: [
      { name: "Flexão declinada", nome: "Flexão declinada", reps: "4x12", sets: 4 },
      { name: "Afundo búlgaro", nome: "Afundo búlgaro", reps: "4x10 (cada perna)", sets: 4 },
      { name: "Pike push-up", nome: "Pike push-up (flexão elevada)", reps: "4x10", sets: 4 },
      { name: "Australian pull-up", nome: "Australian pull-up", reps: "4x10", sets: 4 },
      { name: "Handstand push-up na parede", nome: "Handstand push-up na parede", reps: "3x8", sets: 3 }
    ],
    dia2: [
      { name: "Pistol squat assistido", nome: "Pistol squat assistido", reps: "3x8 (cada perna)", sets: 3 },
      { name: "Flexão com palma", nome: "Flexão com palma", reps: "4x12", sets: 4 },
      { name: "Remada invertida", nome: "Remada invertida", reps: "4x12", sets: 4 },
      { name: "Dips em cadeira", nome: "Dips em cadeira", reps: "4x12", sets: 4 },
      { name: "Hollow hold", nome: "Hollow hold", reps: "3x30s", sets: 3 }
    ],
    dia3: [
      { name: "Jump squat", nome: "Jump squat", reps: "4x12", sets: 4 },
      { name: "Flexão archer", nome: "Flexão archer", reps: "3x8 (cada lado)", sets: 3 },
      { name: "Pull-up negativa", nome: "Pull-up negativa", reps: "4x6", sets: 4 },
      { name: "Pseudo planche push-up", nome: "Pseudo planche push-up", reps: "3x8", sets: 3 },
      { name: "Dragon flag", nome: "Dragon flag", reps: "3x8", sets: 3 }
    ]
  },
  level: "advanced",
  goal: "gain_muscle"
};
