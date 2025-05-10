
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import WorkoutPlanDisplay from '@/components/WorkoutPlanDisplay';
import { QuizAnswers, findBestWorkoutPlan, generatePersonalizedMessage } from '@/utils/workoutRecommendation';
import { WorkoutPlan } from '@/data/workoutPlans';

// Componentes refatorados
import Quiz from '@/components/quiz/Quiz';
import RegistrationForm from '@/components/quiz/RegistrationForm';
import { quizQuestions } from '@/components/quiz/QuizData';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: keyof QuizAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Automatic advance to next question unless it's the last one
    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else {
      setCurrentStep(quizQuestions.length); // Go to registration form
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

      // Verificamos que todas as perguntas foram respondidas
      const quizAnswers = answers as QuizAnswers;
      
      if (Object.keys(quizAnswers).length !== quizQuestions.length) {
        throw new Error("Por favor, responda todas as perguntas do quiz");
      }

      // Encontrar o plano de treino mais adequado
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
          <Quiz
            questions={quizQuestions}
            answers={answers}
            onAnswerChange={handleOptionSelect}
            currentStep={currentStep}
            onPrevStep={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          />
        ) : (
          <RegistrationForm
            data={registrationData}
            onChange={handleRegistrationChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
