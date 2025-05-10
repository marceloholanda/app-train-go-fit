
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
    question: 'Qual é o seu principal objetivo com os treinos?',
    options: [
      { value: 'lose_fat', label: 'Perder gordura corporal', image: '🔥', image_url: 'https://images.unsplash.com/photo-1571019613914-85f342c1d1f1?fit=crop&w=400&h=250' },
      { value: 'gain_muscle', label: 'Ganhar massa muscular', image: '💪', image_url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?fit=crop&w=400&h=250' },
      { value: 'health_energy', label: 'Melhorar disposição e saúde', image: '⚡', image_url: 'https://images.unsplash.com/photo-1605296867429-8e08b7eb3f36?fit=crop&w=400&h=250' },
      { value: 'create_habit', label: 'Criar uma rotina consistente', image: '🧠', image_url: 'https://images.unsplash.com/photo-1518611012118-f0c5f24e2c5a?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'environment',
    question: 'Onde você prefere treinar?',
    options: [
      { value: 'gym', label: 'Na academia', image: '🏋️', image_url: 'https://images.unsplash.com/photo-1571019613914-85f342c1d1f1?fit=crop&w=400&h=250' },
      { value: 'home', label: 'Em casa', image: '🏠', image_url: 'https://images.unsplash.com/photo-1601582583127-b1f7c1a08041?fit=crop&w=400&h=250' },
      { value: 'outdoor', label: 'Ao ar livre', image: '🌳', image_url: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?fit=crop&w=400&h=250' },
      { value: 'anywhere', label: 'Onde for mais prático', image: '📍', image_url: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'level',
    question: 'Qual é o seu nível atual de atividade física?',
    options: [
      { value: 'beginner', label: 'Iniciante', image: '🌱', image_url: 'https://images.unsplash.com/photo-1584467735871-92b8f9cfc3d1?fit=crop&w=400&h=250' },
      { value: 'returning', label: 'Intermediário', image: '🌿', image_url: 'https://images.unsplash.com/photo-1598966730015-8c9d62a70fc1?fit=crop&w=400&h=250' },
      { value: 'advanced', label: 'Avançado', image: '🌳', image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'days_per_week',
    question: 'Quantos dias por semana você quer treinar?',
    options: [
      { value: '2', label: '2 dias', image: '2️⃣', image_url: 'https://images.unsplash.com/photo-1546484959-f5d60b6d8193?fit=crop&w=400&h=250' },
      { value: '3', label: '3 dias', image: '3️⃣', image_url: 'https://images.unsplash.com/photo-1594737625785-cdfb0c80c1ea?fit=crop&w=400&h=250' },
      { value: '4', label: '4 dias', image: '4️⃣', image_url: 'https://images.unsplash.com/photo-1594737624964-bc2db7f4910d?fit=crop&w=400&h=250' },
      { value: '5_plus', label: '5 ou mais', image: '5️⃣', image_url: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3286?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'time_per_session',
    question: 'Quanto tempo por dia você pode dedicar aos treinos?',
    options: [
      { value: '15', label: 'Até 15 minutos', image: '🕒', image_url: 'https://images.unsplash.com/photo-1584466977771-7aa1cf20b379?fit=crop&w=400&h=250' },
      { value: '20_30', label: '20 a 30 minutos', image: '⏱️', image_url: 'https://images.unsplash.com/photo-1599058917212-d750089f9767?fit=crop&w=400&h=250' },
      { value: '30_45', label: '30 a 45 minutos', image: '⌛', image_url: 'https://images.unsplash.com/photo-1598277313843-76f3c0606ad9?fit=crop&w=400&h=250' },
      { value: '60+', label: 'Mais de 1 hora', image: '🕐', image_url: 'https://images.unsplash.com/photo-1598906351090-5e8d60cf91c2?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'personality',
    question: 'Como você se descreveria quando o assunto é treino?',
    options: [
      { value: 'focused', label: 'Focado, só preciso de um plano', image: '🎯', image_url: 'https://images.unsplash.com/photo-1584467735905-cf2829023480?fit=crop&w=400&h=250' },
      { value: 'needs_motivation', label: 'Preciso de motivação pra começar', image: '💡', image_url: 'https://images.unsplash.com/photo-1605296867429-8e08b7eb3f36?fit=crop&w=400&h=250' },
      { value: 'procrastinator', label: 'Procrastino, mas quero mudar', image: '⏳', image_url: 'https://images.unsplash.com/photo-1571019613914-85f342c1d1f1?fit=crop&w=400&h=250' },
      { value: 'busy', label: 'Tenho rotina apertada', image: '📆', image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'body_focus',
    question: 'Qual área do corpo você mais quer melhorar?',
    options: [
      { value: 'abs', label: 'Abdômen', image: '🧍‍♂️', image_url: 'https://images.unsplash.com/photo-1605296867435-89ecb6f8e83c?fit=crop&w=400&h=250' },
      { value: 'legs_glutes', label: 'Pernas e glúteos', image: '🦵', image_url: 'https://images.unsplash.com/photo-1605875292253-b3d73fe1b726?fit=crop&w=400&h=250' },
      { value: 'upper_body', label: 'Peito e braços', image: '💪', image_url: 'https://images.unsplash.com/photo-1579758629939-037fdd6f1819?fit=crop&w=400&h=250' },
      { value: 'full_body', label: 'Corpo inteiro', image: '🏋️', image_url: 'https://images.unsplash.com/photo-1594737625785-cdfb0c80c1ea?fit=crop&w=400&h=250' },
    ]
  },
  {
    id: 'training_history',
    question: 'Você já tentou seguir um plano de treino antes?',
    options: [
      { value: 'yes_gave_up', label: 'Sim, mas parei no meio', image: '🛑', image_url: 'https://images.unsplash.com/photo-1594737624964-bc2db7f4910d?fit=crop&w=400&h=250' },
      { value: 'yes_no_results', label: 'Sim, mas não tive resultados', image: '❌', image_url: 'https://images.unsplash.com/photo-1605296867429-8e08b7eb3f36?fit=crop&w=400&h=250' },
      { value: 'no_first_time', label: 'Não, será minha primeira vez', image: '✨', image_url: 'https://images.unsplash.com/photo-1584467735871-92b8f9cfc3d1?fit=crop&w=400&h=250' },
      { value: 'yes_still_doing', label: 'Sim, mas quero algo melhor', image: '✅', image_url: 'https://images.unsplash.com/photo-1518611012118-f0c5f24e2c5a?fit=crop&w=400&h=250' },
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
