
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExerciseSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const ExerciseSearch: React.FC<ExerciseSearchProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Buscar exercício..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default ExerciseSearch;
