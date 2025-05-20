
import { Exercise } from '@/types/workout';

// Lista de exercícios disponíveis organizados por grupo muscular
export const availableExercises: Record<string, Exercise[]> = {
  "Peito": [
    { name: "Supino reto com barra", nome: "Supino reto com barra", reps: "4x10-12", sets: 4, gif_url: "/assets/gifs/supino-reto.gif" },
    { name: "Supino inclinado com halteres", nome: "Supino inclinado com halteres", reps: "3x10-12", sets: 3, gif_url: "/assets/gifs/supino-inclinado.gif" },
    { name: "Crucifixo na máquina", nome: "Crucifixo na máquina", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/crucifixo.gif" },
    { name: "Flexão de braço", nome: "Flexão de braço", reps: "3x até falha", sets: 3, gif_url: "/assets/gifs/flexao.gif" },
  ],
  "Costas": [
    { name: "Puxada frontal", nome: "Puxada frontal", reps: "4x10-12", sets: 4, gif_url: "/assets/gifs/puxada-frontal.gif" },
    { name: "Remada curvada", nome: "Remada curvada", reps: "4x10-12", sets: 4, gif_url: "/assets/gifs/remada-curvada.gif" },
    { name: "Remada unilateral com haltere", nome: "Remada unilateral com haltere", reps: "3x10-12 (cada lado)", sets: 3, gif_url: "/assets/gifs/remada-unilateral.gif" },
    { name: "Pull-up (barra fixa)", nome: "Pull-up (barra fixa)", reps: "3x até falha", sets: 3, gif_url: "/assets/gifs/pull-up.gif" },
  ],
  "Pernas": [
    { name: "Agachamento livre", nome: "Agachamento livre", reps: "4x8-12", sets: 4, gif_url: "/assets/gifs/agachamento.gif" },
    { name: "Leg press 45°", nome: "Leg press 45°", reps: "4x10-15", sets: 4, gif_url: "/assets/gifs/leg-press.gif" },
    { name: "Cadeira extensora", nome: "Cadeira extensora", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/cadeira-extensora.gif" },
    { name: "Cadeira flexora", nome: "Cadeira flexora", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/cadeira-flexora.gif" },
    { name: "Elevação pélvica", nome: "Elevação pélvica", reps: "3x15-20", sets: 3, gif_url: "/assets/gifs/elevacao-pelvica.gif" },
  ],
  "Ombros": [
    { name: "Desenvolvimento com halteres", nome: "Desenvolvimento com halteres", reps: "4x10-12", sets: 4, gif_url: "/assets/gifs/desenvolvimento.gif" },
    { name: "Elevação lateral", nome: "Elevação lateral", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/elevacao-lateral.gif" },
    { name: "Elevação frontal", nome: "Elevação frontal", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/elevacao-frontal.gif" },
    { name: "Face pull", nome: "Face pull", reps: "3x15-20", sets: 3, gif_url: "/assets/gifs/face-pull.gif" },
  ],
  "Braços": [
    { name: "Rosca direta com barra", nome: "Rosca direta com barra", reps: "3x10-12", sets: 3, gif_url: "/assets/gifs/rosca-direta.gif" },
    { name: "Rosca alternada com halteres", nome: "Rosca alternada com halteres", reps: "3x10-12", sets: 3, gif_url: "/assets/gifs/rosca-alternada.gif" },
    { name: "Tríceps corda", nome: "Tríceps corda", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/triceps-corda.gif" },
    { name: "Tríceps francês", nome: "Tríceps francês", reps: "3x10-12", sets: 3, gif_url: "/assets/gifs/triceps-frances.gif" },
  ],
  "Abdômen": [
    { name: "Crunch abdominal", nome: "Crunch abdominal", reps: "3x15-20", sets: 3, gif_url: "/assets/gifs/crunch.gif" },
    { name: "Prancha frontal", nome: "Prancha frontal", reps: "3x30-60s", sets: 3, gif_url: "/assets/gifs/prancha.gif" },
    { name: "Elevação de pernas", nome: "Elevação de pernas", reps: "3x12-15", sets: 3, gif_url: "/assets/gifs/elevacao-pernas.gif" },
    { name: "Russian twist", nome: "Russian twist", reps: "3x20 (alternados)", sets: 3, gif_url: "/assets/gifs/russian-twist.gif" },
  ],
};
