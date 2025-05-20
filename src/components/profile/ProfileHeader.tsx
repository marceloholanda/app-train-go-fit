import React, { useState } from 'react';
import Button from '@/components/Button';
import { Edit2 } from 'lucide-react';
import { toast } from "sonner";

// Mapeia os valores do quiz para textos legíveis
const objectiveMap: Record<string, string> = {
  lose_weight: 'Perder peso',
  gain_muscle: 'Ganhar massa muscular',
  maintain: 'Manter a forma',
  home_training: 'Treinar em casa'
};

interface ProfileHeaderProps {
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const ProfileHeader = ({ userData, setUserData }: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userData?.name || '',
    objective: userData?.profile?.objective || ''
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    try {
      const updatedUser = {
        ...userData,
        name: editData.name,
        profile: {
          ...userData.profile,
          objective: editData.objective
        }
      };
      
      localStorage.setItem('traingo-user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);
      
      toast("Perfil atualizado", {
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      toast("Erro ao salvar", {
        description: "Não foi possível atualizar seu perfil.",
      });
    }
  };

  const isPremium = userData?.isPremium || false;

  return (
    <header className="bg-traingo-gray p-6 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-4 border-2 border-traingo-primary">
        <span className="text-2xl">{userData?.name?.charAt(0) || 'U'}</span>
      </div>
      
      {!isEditing ? (
        <div>
          <h1 className="text-xl font-bold mb-1">{userData?.name}</h1>
          <p className="text-gray-400 text-sm mb-3">{userData?.email}</p>
          
          <div className="flex items-center justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPremium ? 'bg-traingo-primary text-black' : 'bg-gray-800 text-gray-300'}`}>
              {isPremium ? 'Plano PRO' : 'Plano Free'}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xs">
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            className="w-full p-3 mb-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            placeholder="Seu nome"
          />
          
          <select
            name="objective"
            value={editData.objective}
            onChange={handleEditChange}
            className="w-full p-3 mb-4 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
          >
            <option value="lose_weight">Perder peso</option>
            <option value="gain_muscle">Ganhar massa muscular</option>
            <option value="maintain">Manter a forma</option>
            <option value="home_training">Treinar em casa</option>
          </select>
          
          <div className="flex space-x-3">
            <Button 
              variant="ghost" 
              className="flex-1"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
            <Button 
              className="flex-1"
              onClick={handleSaveEdit}
            >
              Salvar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default ProfileHeader;
