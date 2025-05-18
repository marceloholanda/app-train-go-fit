
import React from 'react';
import { ChevronRight } from 'lucide-react';
import Card from '@/components/Card';
import { Separator } from '@/components/ui/separator';

const PrivacySection: React.FC = () => {
  return (
    <section>
      <h2 className="font-bold text-lg mb-4">Privacidade</h2>
      
      <div className="space-y-3">
        <Card className="flex items-center justify-between">
          <div className="flex items-center">
            <span>Termos de uso</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>
        
        <Card className="flex items-center justify-between">
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
