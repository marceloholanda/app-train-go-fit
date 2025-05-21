
import { Exercise } from '@/types/workout';

// Lista de exercícios disponíveis organizados por grupo muscular
export const availableExercises: Record<string, Exercise[]> = {
  "Peito": [
    { nome: "Supino reto com barra", reps: "4x10-12", image: "/assets/gifs/supino-reto.gif" },
    { nome: "Supino inclinado com halteres", reps: "3x10-12", image: "/assets/gifs/supino-inclinado.gif" },
    { nome: "Crucifixo na máquina", reps: "3x12-15", image: "/assets/gifs/crucifixo.gif" },
    { nome: "Flexão de braço", reps: "3x até falha", image: "/assets/gifs/flexao.gif" },
  ],
  "Costas": [
    { nome: "Puxada frontal", reps: "4x10-12", image: "/assets/gifs/puxada-frontal.gif" },
    { nome: "Remada curvada", reps: "4x10-12", image: "/assets/gifs/remada-curvada.gif" },
    { nome: "Remada unilateral com haltere", reps: "3x10-12 (cada lado)", image: "/assets/gifs/remada-unilateral.gif" },
    { nome: "Pull-up (barra fixa)", reps: "3x até falha", image: "/assets/gifs/pull-up.gif" },
  ],
  "Pernas": [
    { nome: "Agachamento livre", reps: "4x8-12", image: "/assets/gifs/agachamento.gif" },
    { nome: "Leg press 45°", reps: "4x10-15", image: "/assets/gifs/leg-press.gif" },
    { nome: "Cadeira extensora", reps: "3x12-15", image: "/assets/gifs/cadeira-extensora.gif" },
    { nome: "Cadeira flexora", reps: "3x12-15", image: "/assets/gifs/cadeira-flexora.gif" },
    { nome: "Elevação pélvica", reps: "3x15-20", image: "/assets/gifs/elevacao-pelvica.gif" },
  ],
  "Ombros": [
    { nome: "Desenvolvimento com halteres", reps: "4x10-12", image: "/assets/gifs/desenvolvimento.gif" },
    { nome: "Elevação lateral", reps: "3x12-15", image: "/assets/gifs/elevacao-lateral.gif" },
    { nome: "Elevação frontal", reps: "3x12-15", image: "/assets/gifs/elevacao-frontal.gif" },
    { nome: "Face pull", reps: "3x15-20", image: "/assets/gifs/face-pull.gif" },
  ],
  "Braços": [
    { nome: "Rosca direta com barra", reps: "3x10-12", image: "/assets/gifs/rosca-direta.gif" },
    { nome: "Rosca alternada com halteres", reps: "3x10-12", image: "/assets/gifs/rosca-alternada.gif" },
    { nome: "Tríceps corda", reps: "3x12-15", image: "/assets/gifs/triceps-corda.gif" },
    { nome: "Tríceps francês", reps: "3x10-12", image: "/assets/gifs/triceps-frances.gif" },
  ],
  "Abdômen": [
    { nome: "Crunch abdominal", reps: "3x15-20", image: "/assets/gifs/crunch.gif" },
    { nome: "Prancha frontal", reps: "3x30-60s", image: "/assets/gifs/prancha.gif" },
    { nome: "Elevação de pernas", reps: "3x12-15", image: "/assets/gifs/elevacao-pernas.gif" },
    { nome: "Russian twist", reps: "3x20 (alternados)", image: "/assets/gifs/russian-twist.gif" },
  ],
};

// Muscle groups for tabs
export const muscleGroups = Object.keys(availableExercises);
