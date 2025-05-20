
import React from 'react';
import { Link } from 'react-router-dom';

const SimpleLanding = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-4">Bem-vindo ao TrainGO</h1>
      <p className="text-xl mb-8">Esta é uma página simplificada para resolver o problema de tela branca.</p>
      
      <div className="flex gap-4">
        <Link to="/login" className="bg-traingo-primary text-white px-6 py-2 rounded-lg">
          Entrar
        </Link>
        <Link to="/register" className="border border-traingo-primary text-traingo-primary px-6 py-2 rounded-lg">
          Cadastrar
        </Link>
      </div>
      
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Versão de diagnóstico
        </p>
      </div>
    </div>
  );
};

export default SimpleLanding;
