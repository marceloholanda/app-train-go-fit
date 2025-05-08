
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { ArrowLeft, Check, Play, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// Mock data para exercícios
const workouts = {
  1: {
    id: 1,
    name: 'Treino A - Peitoral e Tríceps',
    exercises: [
      { 
        id: 101, 
        name: 'Supino Reto com Barra', 
        sets: 4, 
        reps: '10-12',
        completed: false,
        instruction: 'Deite no banco com os pés no chão. Segure a barra com os braços estendidos e as mãos um pouco mais abertas que a largura dos ombros. Abaixe a barra até o meio do peito e empurre de volta para cima.'
      },
      { 
        id: 102, 
        name: 'Crucifixo com Halteres', 
        sets: 3, 
        reps: '12-15',
        completed: false,
        instruction: 'Deite no banco segurando um haltere em cada mão com os braços estendidos. Abaixe os halteres em um movimento de arco até sentir o alongamento no peito, então volte à posição inicial.'
      },
      { 
        id: 103, 
        name: 'Supino Inclinado', 
        sets: 3, 
        reps: '10-12',
        completed: false,
        instruction: 'Ajuste o banco para 30-45 graus. Segure a barra com as mãos um pouco mais abertas que a largura dos ombros. Abaixe a barra até a parte superior do peito e empurre para cima.'
      },
      { 
        id: 104, 
        name: 'Tríceps Polia', 
        sets: 4, 
        reps: '12-15',
        completed: false,
        instruction: 'Com os cotovelos junto ao corpo, segure a corda/barra e estenda os braços, mantendo os cotovelos no lugar. Foco na contração do tríceps.'
      },
      { 
        id: 105, 
        name: 'Tríceps Francês', 
        sets: 3, 
        reps: '12-15',
        completed: false,
        instruction: 'Segure um haltere com as duas mãos acima da cabeça. Flexione os cotovelos para abaixar o haltere atrás da cabeça, mantendo os cotovelos apontados para cima.'
      },
      { 
        id: 106, 
        name: 'Flexão Diamante', 
        sets: 3, 
        reps: 'Até falha',
        completed: false,
        instruction: 'Posicione as mãos próximas formando um diamante com os polegares e indicadores. Mantenha o corpo reto e desça até quase tocar o peito no chão.'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Treino B - Costas e Bíceps',
    exercises: [
      { 
        id: 201, 
        name: 'Puxada Alta Frontal', 
        sets: 4, 
        reps: '10-12',
        completed: false,
        instruction: 'Segure a barra com as palmas para frente e mãos mais abertas que a largura dos ombros. Puxe a barra até a clavícula, contraindo as costas.'
      },
      { 
        id: 202, 
        name: 'Remada Curvada', 
        sets: 4, 
        reps: '10-12',
        completed: false,
        instruction: 'Com joelhos levemente flexionados, incline o tronco para frente mantendo as costas retas. Puxe a barra até o abdômen, contraindo as escápulas.'
      },
      { 
        id: 203, 
        name: 'Remada Unilateral', 
        sets: 3, 
        reps: '10-12 (cada lado)',
        completed: false,
        instruction: 'Apoie um joelho e uma mão no banco. Com a outra mão, puxe o haltere até o quadril, mantendo o cotovelo junto ao corpo.'
      },
      { 
        id: 204, 
        name: 'Rosca Direta com Barra', 
        sets: 3, 
        reps: '10-12',
        completed: false,
        instruction: 'Em pé, segure a barra com as palmas viradas para cima. Flexione os cotovelos para levantar a barra, mantendo os cotovelos junto ao corpo.'
      },
      { 
        id: 205, 
        name: 'Rosca Martelo', 
        sets: 3, 
        reps: '12-15',
        completed: false,
        instruction: 'Segure os halteres com as palmas viradas para dentro. Flexione os cotovelos para levantar os halteres, mantendo as palmas viradas para dentro durante todo o movimento.'
      },
      { 
        id: 206, 
        name: 'Rosca Concentrada', 
        sets: 3, 
        reps: '12 (cada braço)',
        completed: false,
        instruction: 'Sentado, apoie o cotovelo na parte interna da coxa. Flexione o cotovelo para levantar o haltere, concentrando-se na contração do bíceps.'
      }
    ]
  },
  3: {
    id: 3,
    name: 'Treino C - Pernas',
    exercises: [
      { 
        id: 301, 
        name: 'Agachamento Livre', 
        sets: 4, 
        reps: '10-12',
        completed: false,
        instruction: 'Com a barra apoiada nos ombros, flexione os joelhos e quadril como se fosse sentar em uma cadeira, mantendo as costas retas. Desça até as coxas ficarem paralelas ao solo.'
      },
      { 
        id: 302, 
        name: 'Leg Press', 
        sets: 4, 
        reps: '12-15',
        completed: false,
        instruction: 'Sente-se na máquina com os pés na plataforma na largura dos ombros. Empurre a plataforma até estender as pernas e controle o retorno.'
      },
      { 
        id: 303, 
        name: 'Cadeira Extensora', 
        sets: 3, 
        reps: '12-15',
        completed: false,
        instruction: 'Ajuste o assento para que seus joelhos alinhem com o eixo da máquina. Estenda as pernas até ficarem retas e retorne controladamente.'
      },
      { 
        id: 304, 
        name: 'Mesa Flexora', 
        sets: 3, 
        reps: '12-15',
        completed: false,
        instruction: 'Deite na mesa flexora com os calcanhares abaixo dos rolos. Flexione os joelhos puxando os rolos em direção aos glúteos.'
      },
      { 
        id: 305, 
        name: 'Elevação de Panturrilha em Pé', 
        sets: 4, 
        reps: '15-20',
        completed: false,
        instruction: 'Em pé com as pontas dos pés em uma elevação, deixe os calcanhares descerem abaixo do nível do apoio e depois eleve-se até ficar na ponta dos pés.'
      },
      { 
        id: 306, 
        name: 'Abdominais', 
        sets: 3, 
        reps: '20',
        completed: false,
        instruction: 'Deite de costas com os joelhos dobrados. Coloque as mãos atrás da cabeça ou no peito e eleve os ombros do chão, contraindo os abdominais.'
      }
    ]
  }
};

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [workout, setWorkout] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    
    // Simulando carregamento de dados
    setTimeout(() => {
      const workoutData = workouts[Number(id) as keyof typeof workouts];
      if (workoutData) {
        setWorkout(workoutData);
        setExercises(workoutData.exercises);
      } else {
        toast({
          title: "Treino não encontrado",
          description: "O treino que você procura não existe.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
      setIsLoading(false);
    }, 1000);
  }, [id, navigate, toast]);

  const handleToggleExerciseCompletion = (exerciseId: number) => {
    setExercises(prev => 
      prev.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, completed: !ex.completed } 
          : ex
      )
    );

    toast({
      title: "Exercício atualizado",
      description: "Seu progresso foi salvo.",
    });
  };

  const handleShowExerciseDetails = (exercise: any) => {
    setSelectedExercise(exercise);
  };

  const handleCloseDetails = () => {
    setSelectedExercise(null);
  };

  const calculateCompletionPercentage = () => {
    if (!exercises.length) return 0;
    const completedCount = exercises.filter(ex => ex.completed).length;
    return Math.round((completedCount / exercises.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="bg-traingo-gray p-6">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={18} className="mr-1" /> Voltar
        </button>
        
        <h1 className="text-2xl font-bold mb-2">{workout?.name}</h1>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {exercises.length} exercícios
          </span>
          
          <div className="flex items-center">
            <div className="h-2 w-20 bg-gray-800 rounded-full overflow-hidden mr-2">
              <div 
                className="h-full bg-traingo-primary rounded-full" 
                style={{ width: `${calculateCompletionPercentage()}%` }} 
              />
            </div>
            <span className="text-sm text-gray-400">
              {calculateCompletionPercentage()}%
            </span>
          </div>
        </div>
      </header>

      {/* Exercise List */}
      <section className="p-6">
        <h2 className="font-bold text-lg mb-4">Exercícios</h2>

        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <Card 
              key={exercise.id} 
              className={`transition-all ${exercise.completed ? 'opacity-75' : ''}`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-traingo-gray rounded-full mr-4 text-lg font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold">{exercise.name}</h3>
                  <p className="text-sm text-gray-400">
                    {exercise.sets} séries x {exercise.reps}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button 
                    className="p-2 rounded-full hover:bg-gray-800"
                    onClick={() => handleShowExerciseDetails(exercise)}
                  >
                    <Play size={18} className="text-traingo-primary" />
                  </button>
                  
                  <button 
                    className={`p-2 rounded-full ${exercise.completed ? 'bg-green-500/20 text-green-500' : 'hover:bg-gray-800'}`}
                    onClick={() => handleToggleExerciseCompletion(exercise.id)}
                  >
                    <Check size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Exercise Button (for Premium only) */}
        <div className="mt-6">
          <Button 
            variant="ghost"
            leftIcon={<Plus size={16} />}
            onClick={() => {
              toast({
                title: "Recurso Premium",
                description: "Faça o upgrade para adicionar exercícios personalizados.",
              });
              navigate('/upgrade');
            }}
            className="border border-dashed border-gray-700 w-full justify-center py-4"
          >
            Adicionar Exercício
          </Button>
        </div>
      </section>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-traingo-gray rounded-2xl w-full max-w-md overflow-hidden">
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-6xl">{selectedExercise.id % 3 === 0 ? '🏋️' : selectedExercise.id % 2 === 0 ? '💪' : '🦵'}</div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{selectedExercise.name}</h3>
              <p className="text-traingo-primary font-bold mb-4">
                {selectedExercise.sets} séries x {selectedExercise.reps}
              </p>
              
              <h4 className="font-bold mb-2">Como fazer:</h4>
              <p className="text-gray-300 mb-6">
                {selectedExercise.instruction}
              </p>
              
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  className="flex-1"
                  onClick={handleCloseDetails}
                >
                  Fechar
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleToggleExerciseCompletion(selectedExercise.id);
                    handleCloseDetails();
                  }}
                  leftIcon={<Check size={18} />}
                >
                  {selectedExercise.completed ? 'Não concluído' : 'Concluído'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseDetail;
