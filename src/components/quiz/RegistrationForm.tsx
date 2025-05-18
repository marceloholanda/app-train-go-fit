
import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface RegistrationFormProps {
  data: RegistrationData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting
}) => {
  return (
    <div className="max-w-md mx-auto w-full animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">Criar sua conta</h2>
      <p className="text-center text-xl text-gray-800 mb-8">
        Seu perfil está quase pronto! Complete seu cadastro para ver seu plano personalizado.
      </p>
      
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={data.name}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            placeholder="Seu nome"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={data.email}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={data.password}
            onChange={onChange}
            className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
            placeholder="Crie uma senha forte"
            minLength={6}
          />
        </div>
        
        <Button 
          type="submit" 
          fullWidth 
          isLoading={isSubmitting}
          rightIcon={!isSubmitting && <ArrowRight />}
        >
          Finalizar e Ver Meu Plano
        </Button>
        
        <p className="text-xs text-gray-400 text-center mt-4">
          Ao criar uma conta, você concorda com nossos termos de uso e política de privacidade.
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
