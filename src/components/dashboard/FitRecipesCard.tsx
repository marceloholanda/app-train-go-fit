
import React, { useState } from 'react';
import Card from '@/components/Card';
import FitRecipesModal from './FitRecipesModal';

const FitRecipesCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card 
        variant="outline" 
        className="mt-4 bg-gradient-to-r from-green-900/30 to-green-800/10 cursor-pointer hover:border-green-700/50 transition-all"
        onClick={handleOpenModal}
      >
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              🍽 <span className="ml-2">Receitas Fit Exclusivas</span>
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Descubra receitas práticas, saudáveis e saborosas para acelerar seus resultados no TrainGO.
            </p>
            <div className="text-green-400 font-bold text-sm">Ver mais →</div>
          </div>
        </div>
      </Card>
      
      <FitRecipesModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FitRecipesCard;
