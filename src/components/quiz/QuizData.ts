
import { QuizQuestionType } from './Quiz';

// Define quiz questions
export const quizQuestions: QuizQuestionType[] = [
  {
    id: 'objective',
    question: 'Qual é o seu principal objetivo com os treinos?',
    options: [
      { value: 'lose_fat', label: 'Perder gordura corporal', image: '🔥' },
      { value: 'gain_muscle', label: 'Ganhar massa muscular', image: '💪' },
      { value: 'health_energy', label: 'Melhorar disposição e saúde', image: '⚡' },
      { value: 'create_habit', label: 'Criar uma rotina consistente', image: '🧠' },
    ]
  },
  {
    id: 'environment',
    question: 'Onde você prefere treinar?',
    options: [
      { value: 'gym', label: 'Na academia', image: '🏋️' },
      { value: 'home', label: 'Em casa', image: '🏠' },
      { value: 'outdoor', label: 'Ao ar livre', image: '🌳' },
      { value: 'anywhere', label: 'Onde for mais prático', image: '📍' },
    ]
  },
  {
    id: 'level',
    question: 'Qual é o seu nível atual de atividade física?',
    options: [
      { value: 'beginner', label: 'Iniciante (não pratico nada)', image: '🌱' },
      { value: 'returning', label: 'Intermediário (estou parado)', image: '🌿' },
      { value: 'advanced', label: 'Avançado (treino com frequência)', image: '🌳' },
    ]
  },
  {
    id: 'days_per_week',
    question: 'Quantos dias por semana você quer treinar?',
    options: [
      { value: '2', label: '2 dias', image: '2️⃣' },
      { value: '3', label: '3 dias', image: '3️⃣' },
      { value: '4', label: '4 dias', image: '4️⃣' },
      { value: '5_plus', label: '5 ou mais', image: '5️⃣' },
    ]
  },
  {
    id: 'time_per_session',
    question: 'Quanto tempo por dia você pode dedicar aos treinos?',
    options: [
      { value: '15', label: 'Até 15 minutos', image: '🕒' },
      { value: '20_30', label: '20 a 30 minutos', image: '⏱️' },
      { value: '30_45', label: '30 a 45 minutos', image: '⌛' },
      { value: '60+', label: 'Mais de 1 hora', image: '🕐' },
    ]
  },
  {
    id: 'personality',
    question: 'Como você se descreveria quando o assunto é treino?',
    options: [
      { value: 'focused', label: 'Focado, só preciso de um plano', image: '🎯' },
      { value: 'needs_motivation', label: 'Preciso de motivação pra começar', image: '💡' },
      { value: 'procrastinator', label: 'Procrastino, mas quero mudar', image: '⏳' },
      { value: 'busy', label: 'Tenho rotina apertada', image: '📆' },
    ]
  },
  {
    id: 'body_focus',
    question: 'Qual área do corpo você mais quer melhorar?',
    options: [
      { value: 'abs', label: 'Abdômen', image: '🧍‍♂️' },
      { value: 'legs_glutes', label: 'Pernas e glúteos', image: '🦵' },
      { value: 'upper_body', label: 'Peito e braços', image: '💪' },
      { value: 'full_body', label: 'Corpo inteiro', image: '🏋️' },
    ]
  },
  {
    id: 'training_history',
    question: 'Você já tentou seguir um plano de treino antes?',
    options: [
      { value: 'yes_gave_up', label: 'Sim, mas parei no meio', image: '🛑' },
      { value: 'yes_no_results', label: 'Sim, mas não tive resultados', image: '❌' },
      { value: 'no_first_time', label: 'Não, será minha primeira vez', image: '✨' },
      { value: 'yes_still_doing', label: 'Sim, mas quero algo melhor', image: '✅' },
    ]
  }
];
