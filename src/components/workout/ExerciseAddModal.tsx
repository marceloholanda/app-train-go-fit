import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Exercise } from '@/types/workout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Card from '@/components/Card';

// Lista de exercícios disponíveis organizados por grupo muscular
const availableExercises: Record<string, Exercise[]> = {
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

interface ExerciseAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPremium: boolean;
  onAddExercises: (exercises: Exercise[]) => void;
}

const ExerciseAddModal: React.FC<ExerciseAddModalProps> = ({
  isOpen,
  onClose,
  isPremium,
  onAddExercises
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Peito");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  
  if (!isPremium) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recurso Premium</DialogTitle>
            <DialogDescription>
              Este recurso está disponível apenas para usuários Premium. 
              Faça o upgrade para personalizar ainda mais seus treinos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="secondary">Fechar</Button>
            </DialogClose>
            <Button 
              variant="default" 
              onClick={() => navigate('/upgrade')}
            >
              Fazer upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Filtrar exercícios com base na busca
  const getFilteredExercises = () => {
    if (!searchTerm.trim()) {
      return availableExercises[activeTab];
    }
    
    const normalizedSearch = searchTerm.toLowerCase();
    
    // Se estiver na aba de busca, pesquisar em todos os grupos musculares
    if (activeTab === "search") {
      return Object.values(availableExercises)
        .flat()
        .filter(ex => 
          ex.nome.toLowerCase().includes(normalizedSearch)
        );
    }
    
    // Se estiver em uma aba específica, filtrar apenas nesse grupo muscular
    return availableExercises[activeTab].filter(ex => 
      ex.nome.toLowerCase().includes(normalizedSearch)
    );
  };
  
  const isExerciseSelected = (exercise: Exercise) => {
    return selectedExercises.some(ex => ex.nome === exercise.nome);
  };
  
  const toggleExerciseSelection = (exercise: Exercise) => {
    if (isExerciseSelected(exercise)) {
      setSelectedExercises(selectedExercises.filter(ex => ex.nome !== exercise.nome));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };
  
  const handleAddSelectedExercises = () => {
    onAddExercises(selectedExercises);
    onClose();
  };
  
  const filteredExercises = getFilteredExercises();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Adicionar exercícios</DialogTitle>
          <DialogDescription>
            Selecione os exercícios que deseja adicionar ao seu treino.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar exercício..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="Peito" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="Peito">Peito</TabsTrigger>
            <TabsTrigger value="Costas">Costas</TabsTrigger>
            <TabsTrigger value="Pernas">Pernas</TabsTrigger>
            <TabsTrigger value="Ombros">Ombros</TabsTrigger>
            <TabsTrigger value="Braços">Braços</TabsTrigger>
            <TabsTrigger value="Abdômen">Abdômen</TabsTrigger>
          </TabsList>
        </Tabs>
          
        <div className="overflow-y-auto flex-1 py-2 space-y-3">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => (
              <div
                key={`${activeTab}-${index}`}
                className={`
                  border border-gray-700 rounded-lg p-3 cursor-pointer
                  transition-colors duration-200 
                  ${isExerciseSelected(exercise) ? 'border-traingo-primary bg-traingo-primary/10' : 'hover:bg-gray-800'}
                `}
                onClick={() => toggleExerciseSelection(exercise)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{exercise.nome}</h4>
                    <p className="text-xs text-gray-400">{exercise.reps}</p>
                  </div>
                  {isExerciseSelected(exercise) && (
                    <div className="bg-traingo-primary h-6 w-6 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-black" />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              Nenhum exercício encontrado.
            </div>
          )}
        </div>
        
        <DialogFooter className="border-t border-gray-700 pt-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-sm">
              {selectedExercises.length} exercício(s) selecionado(s)
            </div>
            <div className="space-x-2">
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button 
                onClick={handleAddSelectedExercises}
                disabled={selectedExercises.length === 0}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseAddModal;
