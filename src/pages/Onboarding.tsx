
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import WorkoutPlanDisplay from '@/components/WorkoutPlanDisplay';
import { QuizAnswers, findBestWorkoutPlan, generatePersonalizedMessage } from '@/utils/workoutRecommendation';
import { WorkoutPlan } from '@/data/workoutPlans';

// Define quiz questions
const quizQuestions = [
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


const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Automatic advance to next question unless it's the last one
    if (currentStep < quizQuestions.length) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    }
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulação de cadastro
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Salvar dados do usuário e respostas do quiz
      const userData = {
        ...registrationData,
        profile: answers,
      };

      localStorage.setItem('traingo-user', JSON.stringify(userData));

      // Encontrar o plano de treino mais adequado
      const quizAnswers = answers as QuizAnswers;
      const recommendedPlan = findBestWorkoutPlan(quizAnswers);
      const message = generatePersonalizedMessage(quizAnswers, recommendedPlan);
      
      setWorkoutPlan(recommendedPlan);
      setPersonalizedMessage(message);
      
      toast({
        title: "Cadastro concluído!",
        description: "Seu plano de treino foi criado com sucesso.",
      });

      setShowResults(true);
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível concluir o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  }

  const isLastQuestion = currentStep === quizQuestions.length;
  const currentQuestion = quizQuestions[currentStep];

  if (showResults && workoutPlan) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center">
          <Logo size="small" />
        </header>
        
        <div className="flex-1 flex flex-col justify-center px-4 py-8 max-w-4xl mx-auto w-full">
          <WorkoutPlanDisplay 
            plan={workoutPlan}
            personalizedMessage={personalizedMessage}
          />
          
          <div className="mt-10 text-center">
            <Button 
              onClick={goToDashboard}
              rightIcon={<ArrowRight />}
              fullWidth
            >
              Ir para o Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Logo size="small" />
        <div className="flex space-x-2 items-center">
          {currentStep > 0 && !isLastQuestion && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="p-2 rounded-full hover:bg-gray-800"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full px-4 mt-2">
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-traingo-primary h-2 transition-all duration-300"
            style={{ width: `${(currentStep / quizQuestions.length) * 100}%` }}
          />
        </div>
        <div className="text-sm text-gray-400 text-center mt-2">
          Etapa {Math.min(currentStep + 1, quizQuestions.length)} de {quizQuestions.length} (
          {Math.round((currentStep / quizQuestions.length) * 100)}%)
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        {!isLastQuestion ? (
          <div className="max-w-md mx-auto w-full animate-fade-in">
            <h2 className="text-2xl font-bold mb-8 text-center">{currentQuestion.question}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl transition-all 
                    ${answers[currentQuestion.id] === option.value 
                      ? 'bg-traingo-primary text-black' 
                      : 'bg-traingo-gray hover:bg-gray-800'}`}
                >
                  <span className="text-4xl mb-3">{option.image}</span>
                  <span className="font-medium text-center">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto w-full animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-center">Criar sua conta</h2>
            <p className="text-center text-gray-400 mb-8">
              Seu perfil está quase pronto! Complete seu cadastro para ver seu plano personalizado.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nome completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={registrationData.name}
                  onChange={handleRegistrationChange}
                  className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
                  className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={registrationData.password}
                  onChange={handleRegistrationChange}
                  className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                  placeholder="Crie uma senha forte"
                  minLength={6}
                />
              </div>
              
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isSubmitting}
                rightIcon={!isSubmitting && <ArrowRight />}
              >
                Finalizar e Ver Meu Plano
              </Button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Ao criar uma conta, você concorda com nossos termos de uso e política de privacidade.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
