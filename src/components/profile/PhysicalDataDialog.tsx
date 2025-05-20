import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import Button from '@/components/Button';
import { toast } from "sonner";
import { saveUserData } from '@/utils/userUtils';

interface PhysicalDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  physicalData: {
    age: number;
    weight: number;
    height: number;
  };
  setPhysicalData: React.Dispatch<React.SetStateAction<{
    age: number;
    weight: number;
    height: number;
  }>>;
  userData: any;
}

const PhysicalDataDialog = ({ 
  isOpen, 
  onClose, 
  physicalData, 
  setPhysicalData, 
  userData 
}: PhysicalDataDialogProps) => {
  const form = useForm({
    defaultValues: {
      age: String(physicalData.age),
      weight: String(physicalData.weight),
      height: String(physicalData.height)
    }
  });

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
      
      toast("Dados atualizados", {
        description: "Suas informações físicas foram atualizadas com sucesso."
      });
      
      onClose();
    } catch (error) {
      toast("Erro ao salvar", {
        description: "Não foi possível atualizar seus dados físicos."
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <Button variant="ghost" type="button" onClick={onClose}>
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
  );
};

export default PhysicalDataDialog;
