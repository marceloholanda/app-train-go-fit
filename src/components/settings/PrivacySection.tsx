
import React from 'react';
import { ChevronRight } from 'lucide-react';
import Card from '@/components/Card';
import { useNavigate } from 'react-router-dom';

const PrivacySection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section>
      <h2 className="font-bold text-lg mb-4">Privacidade</h2>
      
      <div className="space-y-3">
        <Card 
          className="flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors p-4"
          onClick={() => navigate('/terms')}
        >
          <div className="flex items-center">
            <span>Termos de uso</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>
        
        <Card 
          className="flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors p-4"
          onClick={() => navigate('/privacy')}
        >
          <div className="flex items-center">
            <span>Política de privacidade</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>
      </div>
    </section>
  );
};

export default PrivacySection;
