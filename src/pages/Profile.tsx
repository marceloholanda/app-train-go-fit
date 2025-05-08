
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { Edit2, Award, ChevronRight } from 'lucide-react';
import Card from '@/components/Card';
import { useToast } from "@/hooks/use-toast";

// Mapeia os valores do quiz para textos legíveis
const objectiveMap: Record<string, string> = {
  lose_weight: 'Perder peso',
  gain_muscle: 'Ganhar massa muscular',
  maintain: 'Manter a forma',
  home_training: 'Treinar em casa'
};

const levelMap: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado'
};

const daysMap: Record<string, string> = {
  '2': '2 dias por semana',
  '3': '3 dias por semana',
  '4': '4 dias por semana',
  '5+': '5 ou mais dias por semana'
};

const environmentMap: Record<string, string> = {
  gym: 'Academia',
  home_with_equipment: 'Casa com equipamentos',
  home_no_equipment: 'Casa sem equipamentos',
  outdoor: 'Ar livre'
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    objective: ''
  });

  useEffect(() => {
    // Carregar dados do usuário
    const loadUserData = () => {
      try {
        const user = localStorage.getItem('traingo-user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserData(parsedUser);
          setEditData({
            name: parsedUser.name || '',
            objective: parsedUser.profile?.objective || ''
          });
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar seu perfil.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate, toast]);

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
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar seu perfil.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-traingo-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isPremium = userData?.isPremium || false;

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
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

      {/* Profile Info */}
      {!isEditing && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Seu Perfil</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<Edit2 size={16} />}
              onClick={() => setIsEditing(true)}
            >
              Editar
            </Button>
          </div>

          <Card className="mb-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Objetivo Principal</h3>
                <p className="font-medium">{objectiveMap[userData?.profile?.objective] || 'Não definido'}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Nível de Experiência</h3>
                <p className="font-medium">{levelMap[userData?.profile?.level] || 'Não definido'}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Frequência de Treino</h3>
                <p className="font-medium">{daysMap[userData?.profile?.days_per_week] || 'Não definido'}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Local de Treino</h3>
                <p className="font-medium">{environmentMap[userData?.profile?.environment] || 'Não definido'}</p>
              </div>
            </div>
          </Card>

          {/* Achievements section placeholder */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <Award className="text-traingo-primary mr-2" size={20} />
              <h2 className="font-bold text-lg">Conquistas</h2>
            </div>
            
            <Card variant="outline" className="text-center py-8">
              <p className="text-gray-400 mb-4">Complete treinos para desbloquear conquistas</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Ver meus treinos
              </Button>
            </Card>
          </div>

          {/* Upgrade banner if not premium */}
          {!isPremium && (
            <div 
              className="mt-8 bg-gradient-to-r from-traingo-primary/20 to-traingo-primary/5 p-5 rounded-xl flex justify-between items-center cursor-pointer"
              onClick={() => navigate('/upgrade')}
            >
              <div>
                <h3 className="font-bold mb-1">Melhore sua experiência</h3>
                <p className="text-sm text-gray-300">Desbloqueie recursos premium</p>
              </div>
              <ChevronRight className="text-traingo-primary" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
