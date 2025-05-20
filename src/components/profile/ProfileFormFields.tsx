
import React from 'react';

interface ProfileFormFieldsProps {
  formData: {
    objective: string;
    level: string;
    days_per_week: string;
    environment: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Options arrays for select fields
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

const ProfileFormFields = ({ formData, handleChange }: ProfileFormFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export { objectiveOptions, levelOptions, daysOptions, environmentOptions };
export default ProfileFormFields;
