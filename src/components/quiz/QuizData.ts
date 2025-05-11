import { QuizQuestionType } from './Quiz';

export const quizQuestions: QuizQuestionType[] = [
  {
    id: 'objective',
    question: 'Qual é seu principal objetivo com os treinos?',
    options: [
      { value: 'lose_weight', label: 'Perder Peso', image: '🔥' },
      { value: 'gain_muscle', label: 'Ganhar Músculo', image: '💪' },
      { value: 'maintain', label: 'Manter a Forma', image: '⚖️' },
      { value: 'health_energy', label: 'Melhorar disposição e saúde', image: '⚡' }
    ]
  },
  {
    id: 'environment',
    question: 'Onde você pretende treinar?',
    options: [
      { value: 'gym', label: 'Academia', image: '🏋️' },
      { value: 'home_with_equipment', label: 'Casa com equipamentos', image: '🏠' },
      { value: 'home_no_equipment', label: 'Casa sem equipamentos', image: '🧘' },
      { value: 'outdoor', label: 'Ao ar livre', image: '🏞️' }
    ]
  },
  {
    id: 'level',
    question: 'Como você se define em relação aos exercícios?',
    options: [
      { value: 'beginner', label: 'Iniciante', image: '🌱' },
      { value: 'intermediate', label: 'Intermediário', image: '🌿' },
      { value: 'advanced', label: 'Avançado', image: '🌳' }
    ]
  },
  {
    id: 'days_per_week',
    question: 'Quantos dias por semana você planeja treinar?',
    options: [
      { value: '2', label: '2 dias', image: '✌️' },
      { value: '3', label: '3 dias', image: '👌' },
      { value: '4', label: '4 dias', image: '🖖' },
      { value: '5+', label: '5 ou mais dias', image: '🖐️' }
    ]
  },
  {
    id: 'age',
    question: 'Qual sua idade?',
    options: [
      { value: 'under_18', label: 'Tenho menos de 18', image: '👦' },
      { value: '18_29', label: 'Tenho entre 18 e 29', image: '🧑' },
      { value: '30_44', label: 'Tenho entre 30 e 44', image: '👨' },
      { value: '45_59', label: 'Tenho entre 45 e 59', image: '👨‍🦳' },
      { value: '60_plus', label: 'Tenho 60+', image: '👴' }
    ]
  },
  {
    id: 'weight',
    question: 'Qual seu peso?',
    options: [
      { value: 'under_60', label: 'Abaixo de 60kg', image: '⚖️' },
      { value: '60_75', label: 'Entre 60kg e 75kg', image: '⚖️' },
      { value: '75_90', label: 'Entre 75kg e 90kg', image: '⚖️' },
      { value: '90_110', label: 'Entre 90kg e 110kg', image: '⚖️' },
      { value: 'above_110', label: 'Acima de 110kg', image: '⚖️' }
    ]
  },
  {
    id: 'height',
    question: 'Qual sua altura?',
    options: [
      { value: 'under_160', label: 'Abaixo de 1,60m', image: '📏' },
      { value: '160_175', label: 'Entre 1,60m e 1,75m', image: '📏' },
      { value: '175_185', label: 'Entre 1,75m e 1,85m', image: '📏' },
      { value: 'above_185', label: 'Acima de 1,85m', image: '📏' }
    ]
  },
  {
    id: 'motivation_type',
    question: 'Qual dessas frases mais te representa?',
    options: [
      { value: 'fast_results', label: 'Quero ver resultados rápidos', image: '🚀' },
      { value: 'discipline', label: 'Prefiro seguir uma rotina constante', image: '📅' },
      { value: 'fun', label: 'Quero me divertir enquanto treino', image: '😄' },
      { value: 'challenge', label: 'Gosto de desafios físicos', image: '🔥' }
    ]
  },
  {
    id: 'training_barrier',
    question: 'O que mais te atrapalha em manter uma rotina de treino?',
    options: [
      { value: 'time', label: 'Falta de tempo', image: '⏰' },
      { value: 'motivation', label: 'Falta de motivação', image: '😴' },
      { value: 'discipline', label: 'Falta de disciplina', image: '🔁' },
      { value: 'pain', label: 'Desconforto físico', image: '😣' }
    ]
  }
];
