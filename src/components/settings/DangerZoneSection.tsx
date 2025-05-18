
import React from 'react';
import { AlertTriangle, Trash2, ChevronRight } from 'lucide-react';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DangerZoneSectionProps {
  showDeleteConfirm: boolean;
  onDeleteAccount: () => void;
  onCancelDelete: () => void;
}

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({
  showDeleteConfirm,
  onDeleteAccount,
  onCancelDelete
}) => {
  return (
    <section className="pt-4">
      <h2 className="font-bold text-lg mb-4 text-red-500">Zona de perigo</h2>
      
      {showDeleteConfirm ? (
        <Alert className="border border-red-500/50 bg-red-500/10">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <h3 className="font-bold text-red-500">Confirmar exclusão</h3>
          </div>
          <AlertDescription className="text-gray-300 mb-4">
            Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente.
          </AlertDescription>
          <div className="flex space-x-3">
            <Button 
              variant="ghost" 
              className="flex-1"
              onClick={onCancelDelete}
            >
              Cancelar
            </Button>
            <Button 
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={onDeleteAccount}
            >
              Sim, excluir
            </Button>
          </div>
        </Alert>
      ) : (
        <Card 
          onClick={onDeleteAccount}
          className="flex items-center justify-between text-red-400 hover:bg-red-500/10"
        >
          <div className="flex items-center">
            <div className="p-2 rounded-full mr-3">
              <Trash2 size={18} />
            </div>
            <span>Excluir minha conta</span>
          </div>
          <ChevronRight size={18} />
        </Card>
      )}
    </section>
  );
};

export default DangerZoneSection;
