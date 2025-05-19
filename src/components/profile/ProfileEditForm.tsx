
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Button from '@/components/Button';
import { ArrowLeft } from 'lucide-react';
import { findBestWorkoutPlan } from '@/utils/workoutRecommendation';
import { QuizAnswers } from '@/utils/workoutRecommendation/types';

interface ProfileEditFormProps {
  userData: any;
  onCancel: () => void;
  onSave: (updatedUser: any) => void;
}

const objectiveOptions = [
  { value: 'lose_weight', label: 'Perder peso' },
  { value: 'gain_muscle', label: 'Ganhar massa muscular' },
  { value: 'maintain', label: 'Manter a forma' },
  { value: 'home_training', label: 'Treinar em casa' }
];

const levelOptions = [
  { value: 'beginner', label: 'Iniciante' },
  { value: 'intermediate', label: 'Intermediário' },
  { value: 'advanced', label: 'Avançado' }
];

const daysOptions = [
  { value: '2', label: '2 dias por semana' },
  { value: '3', label: '3 dias por semana' },
  { value: '4', label: '4 dias por semana' },
  { value: '5+', label: '5 ou mais dias por semana' }
];

const environmentOptions = [
  { value: 'gym', label: 'Academia' },
  { value: 'home_with_equipment', label: 'Casa com equipamentos' },
  { value: 'home_no_equipment', label: 'Casa sem equipamentos' },
  { value: 'outdoor', label: 'Ar livre' }
];

const ProfileEditForm = ({ userData, onCancel, onSave }: ProfileEditFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    objective: userData?.profile?.objective || 'lose_weight',
    level: userData?.profile?.level || 'beginner',
    days_per_week: userData?.profile?.days_per_week || '3',
    environment: userData?.profile?.environment || 'gym',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create answers object from form data
      const quizAnswers: QuizAnswers = {
        ...formData,
        age: userData?.profile?.age || 'unknown',
        weight: userData?.profile?.weight || 'unknown',
        height: userData?.profile?.height || 'unknown',
        fitness_goal: userData?.profile?.fitness_goal || 'unknown',
      };

      // Generate new workout plan based on updated answers
      const newWorkoutPlan = findBestWorkoutPlan(quizAnswers);
      
      // Update user data with new profile and workout plan
      const updatedUserData = {
        ...userData,
        profile: {
          ...userData.profile,
          ...formData
        },
        workoutPlan: newWorkoutPlan
      };
      
      // Save updated user data
      localStorage.setItem('traingo-user', JSON.stringify(updatedUserData));
      
      // Notify parent component about the update
      onSave(updatedUserData);
      
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil e plano de treino foram atualizados com sucesso!",
      });
      
      // Auto-redirect to dashboard to see the new plan
      localStorage.setItem('onboarding-completed', 'true');
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar seu perfil. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<ArrowLeft size={16} />}
          onClick={onCancel}
        >
          Voltar
        </Button>
        <h2 className="font-bold text-lg ml-2">Editar Perfil</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="objective" className="block text-gray-400 mb-1">
            Objetivo Principal
          </label>
          <select
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            required
          >
            {objectiveOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="level" className="block text-gray-400 mb-1">
            Nível de Experiência
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            required
          >
            {levelOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="days_per_week" className="block text-gray-400 mb-1">
            Frequência de Treino
          </label>
          <select
            id="days_per_week"
            name="days_per_week"
            value={formData.days_per_week}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            required
          >
            {daysOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="environment" className="block text-gray-400 mb-1">
            Local de Treino
          </label>
          <select
            id="environment"
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            required
          >
            {environmentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mt-6"
        >
          Salvar e Atualizar Plano
        </Button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
