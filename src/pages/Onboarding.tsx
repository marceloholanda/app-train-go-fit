
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Define quiz questions
const quizQuestions = [
  {
    id: 'objective',
    question: 'Qual é o seu principal objetivo?',
    options: [
      { value: 'lose_weight', label: 'Perder peso', image: '🏃' },
      { value: 'gain_muscle', label: 'Ganhar massa muscular', image: '💪' },
      { value: 'maintain', label: 'Manter a forma', image: '⚖️' },
      { value: 'home_training', label: 'Treinar em casa', image: '🏠' },
    ]
  },
  {
    id: 'level',
    question: 'Qual é o seu nível de experiência?',
    options: [
      { value: 'beginner', label: 'Iniciante', image: '🌱' },
      { value: 'intermediate', label: 'Intermediário', image: '🌿' },
      { value: 'advanced', label: 'Avançado', image: '🌳' },
    ]
  },
  {
    id: 'days_per_week',
    question: 'Quantos dias por semana você quer treinar?',
    options: [
      { value: '2', label: '2 dias', image: '2️⃣' },
      { value: '3', label: '3 dias', image: '3️⃣' },
      { value: '4', label: '4 dias', image: '4️⃣' },
      { value: '5+', label: '5 ou mais', image: '5️⃣' },
    ]
  },
  {
    id: 'environment',
    question: 'Onde você prefere treinar?',
    options: [
      { value: 'gym', label: 'Academia', image: '🏋️' },
      { value: 'home_with_equipment', label: 'Casa com equipamentos', image: '🏠' },
      { value: 'home_no_equipment', label: 'Casa sem equipamentos', image: '🧘' },
      { value: 'outdoor', label: 'Ar livre', image: '🌳' },
    ]
  },
  {
    id: 'time_per_session',
    question: 'Quanto tempo você tem para cada treino?',
    options: [
      { value: '15_30', label: '15-30 minutos', image: '⏱️' },
      { value: '30_45', label: '30-45 minutos', image: '⏱️' },
      { value: '45_60', label: '45-60 minutos', image: '⏱️' },
      { value: '60+', label: 'Mais de 60 minutos', image: '⏱️' },
    ]
  },
  {
    id: 'limitations',
    question: 'Você tem alguma lesão ou limitação?',
    options: [
      { value: 'none', label: 'Nenhuma', image: '✅' },
      { value: 'back', label: 'Problemas nas costas', image: '🔄' },
      { value: 'knees', label: 'Problemas nos joelhos', image: '🦵' },
      { value: 'shoulders', label: 'Problemas nos ombros', image: '🧍' },
    ]
  },
  {
    id: 'motivation',
    question: 'Qual frase mais combina com você?',
    options: [
      { value: 'results', label: 'Quero ver resultados rápidos', image: '🚀' },
      { value: 'consistency', label: 'Prefiro progredir consistentemente', image: '📈' },
      { value: 'enjoyment', label: 'Quero me divertir treinando', image: '😊' },
      { value: 'challenge', label: 'Busco desafios constantes', image: '🏆' },
    ]
  },
  {
    id: 'routine',
    question: 'Você já tem uma rotina de treinos?',
    options: [
      { value: 'yes', label: 'Sim, mas quero melhorar', image: '👍' },
      { value: 'inconsistent', label: 'Sim, mas sou inconsistente', image: '📅' },
      { value: 'no_experience', label: 'Não, sou iniciante', image: '🆕' },
      { value: 'returning', label: 'Estou retornando após uma pausa', image: '🔄' },
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

      toast({
        title: "Cadastro concluído!",
        description: "Seu plano de treino foi criado com sucesso.",
      });

      navigate('/dashboard');
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

  const isLastQuestion = currentStep === quizQuestions.length;
  const currentQuestion = quizQuestions[currentStep];

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
          <span className="text-sm text-gray-400">
            {isLastQuestion ? 'Finalizar' : `${currentStep + 1}/${quizQuestions.length}`}
          </span>
        </div>
      </header>

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
