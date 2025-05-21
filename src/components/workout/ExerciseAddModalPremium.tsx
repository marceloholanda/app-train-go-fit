
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ExerciseAddModalPremium: React.FC = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default ExerciseAddModalPremium;
