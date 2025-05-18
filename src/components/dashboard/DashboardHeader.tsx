
import React from 'react';

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <header className="bg-traingo-gray p-6">
      <h1 className="text-2xl font-bold mb-1">
        Olá, {userName?.split(' ')[0] || 'Atleta'}! 
      </h1>
      <p className="text-gray-400">Vamos treinar hoje?</p>
    </header>
  );
};

export default DashboardHeader;
