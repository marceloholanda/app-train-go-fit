import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserName } from '@/utils/userUtils';
import { toast } from "@/hooks/use-toast";
import { isPremiumUser } from '@/utils/userUtils';

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const [name, setName] = useState(currentUser?.user_metadata?.name || '');
  const [isPremium, setIsPremium] = useState(false);
  const [userIsPremium, setUserIsPremium] = useState(false);
  const navigate = useNavigate();

  const handleUpdateName = async () => {
    if (name.trim() === '') {
      toast({
        title: "Erro",
        description: "O nome não pode estar vazio.",
        variant: "destructive"
      });
      return;
    }

    const success = await updateUserName(name);
    if (success) {
      toast({
        title: "Nome atualizado!",
        description: "Seu nome foi atualizado com sucesso."
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o nome.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const premium = await isPremiumUser();
        setUserIsPremium(premium);
      } catch (error) {
        console.error("Error checking premium status:", error);
        setUserIsPremium(false);
      }
    };
    
    checkPremiumStatus();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>

      {/* Update Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nome:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button 
          className="bg-traingo-primary hover:bg-traingo-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          onClick={handleUpdateName}
        >
          Atualizar Nome
        </button>
      </div>

      {/* Premium Status */}
      <div className="mb-4">
        <p className="block text-gray-700 text-sm font-bold mb-2">
          Status Premium: {userIsPremium ? 'Ativo' : 'Inativo'}
        </p>
        {!userIsPremium && (
          <button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate('/upgrade')}
          >
            Assinar Premium
          </button>
        )}
      </div>

      {/* Logout */}
      <div>
        <button 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Settings;
