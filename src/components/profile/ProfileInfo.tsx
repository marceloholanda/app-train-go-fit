
import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { calculateIMC, getIMCClassification, saveUserData } from '@/utils/userUtils';
import { useToast } from '@/hooks/use-toast';

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

const ageMap: Record<string, string> = {
  under_18: 'Menos de 18 anos',
  '18_29': 'Entre 18 e 29 anos',
  '30_44': 'Entre 30 e 44 anos',
  '45_59': 'Entre 45 e 59 anos',
  '60_plus': '60 anos ou mais'
};

const weightMap: Record<string, string> = {
  under_60: 'Abaixo de 60kg',
  '60_75': 'Entre 60kg e 75kg',
  '75_90': 'Entre 75kg e 90kg',
  '90_110': 'Entre 90kg e 110kg',
  above_110: 'Acima de 110kg'
};

const heightMap: Record<string, string> = {
  under_160: 'Abaixo de 1,60m',
  '160_175': 'Entre 1,60m e 1,75m',
  '175_185': 'Entre 1,75m e 1,85m',
  above_185: 'Acima de 1,85m'
};

interface ProfileInfoProps {
  userData: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileInfo = ({ userData, setIsEditing }: ProfileInfoProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [physicalData, setPhysicalData] = useState({
    age: userData?.profile?.age_exact || userData?.profile?.age ? Number(userData.profile.age_exact || 30) : 30,
    weight: userData?.profile?.weight_exact || userData?.profile?.weight ? Number(userData.profile.weight_exact || 70) : 70,
    height: userData?.profile?.height_exact || userData?.profile?.height ? Number(userData.profile.height_exact || 1.70) : 1.70,
  });
  
  const form = useForm({
    defaultValues: {
      age: String(physicalData.age),
      weight: String(physicalData.weight),
      height: String(physicalData.height)
    }
  });

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleSavePhysicalData = (values: any) => {
    try {
      // Parse values to numbers
      const age = Number(values.age);
      const weight = Number(values.weight);
      const height = Number(values.height);
      
      // Update local state
      setPhysicalData({ age, weight, height });
      
      // Update user data in localStorage
      const updatedUserData = {
        ...userData,
        profile: {
          ...userData.profile,
          age_exact: age,
          weight_exact: weight,
          height_exact: height
        }
      };
      
      saveUserData(updatedUserData);
      
      toast({
        title: "Dados atualizados",
        description: "Suas informações físicas foram atualizadas com sucesso.",
      });
      
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível atualizar seus dados físicos.",
        variant: "destructive",
      });
    }
  };

  // Calculate IMC
  const imc = calculateIMC(physicalData.weight, physicalData.height);
  const imcClassification = getIMCClassification(imc);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Seu Perfil</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<Edit2 size={16} />}
          onClick={() => setIsEditing(true)}
        >
          Editar Perfil
        </Button>
      </div>

      <Card className="mb-6">
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

      <Card className="mb-6">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-md mb-3">Dados Físicos</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            leftIcon={<Edit2 size={16} />}
            onClick={handleOpenDialog}
          >
            Editar
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Idade</h3>
            <p className="font-medium">
              {physicalData.age ? `${physicalData.age} anos` : 
               ageMap[userData?.profile?.age] || 'Não definido'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Peso</h3>
            <p className="font-medium">
              {physicalData.weight ? `${physicalData.weight} kg` : 
               weightMap[userData?.profile?.weight] || 'Não definido'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">Altura</h3>
            <p className="font-medium">
              {physicalData.height ? `${physicalData.height.toFixed(2)}m` : 
               heightMap[userData?.profile?.height] || 'Não definido'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-400 mb-1">IMC</h3>
            <p className="font-medium">
              {imc ? `${imc.toFixed(1)} (${imcClassification})` : 'Não calculado'}
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-traingo-gray border border-gray-700 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Dados Físicos</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSavePhysicalData)} className="space-y-6">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade (anos)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        max="120"
                        placeholder="Digite sua idade"
                        className="bg-black border-gray-700" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="30"
                        max="300"
                        step="0.1"
                        placeholder="Digite seu peso em kg"
                        className="bg-black border-gray-700" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        max="2.5"
                        step="0.01"
                        placeholder="Digite sua altura em metros (ex: 1.75)"
                        className="bg-black border-gray-700" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
                <Button variant="ghost" type="button" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileInfo;
