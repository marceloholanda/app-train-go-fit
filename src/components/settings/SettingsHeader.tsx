
import React from 'react';
import { Separator } from '@/components/ui/separator';

const SettingsHeader: React.FC = () => {
  return (
    <header className="bg-traingo-gray p-6">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <Separator className="mt-4 bg-gray-700" />
    </header>
  );
};

export default SettingsHeader;
