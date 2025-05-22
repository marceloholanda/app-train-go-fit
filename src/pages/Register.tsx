
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      await register(
        formData.email,
        formData.password,
        formData.name
      );
      
      // Após o registro bem-sucedido, o usuário será redirecionado para a página de onboarding
      // pelo handler onAuthStateChange no AuthContext
      
      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso",
      });
    } catch (error) {
      // Error is handled in the register function
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <Logo />
      </div>
      
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-sm mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Crie sua conta</h1>
            <p className="text-gray-400">Comece sua jornada fitness</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
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
                className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                value={formData.email}
                onChange={handleChange}
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
                className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirme a senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Digite a senha novamente"
              />
            </div>
          
            <button
              type="submit"
              className="w-full py-3 px-4 bg-traingo-primary hover:bg-traingo-dark text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-traingo-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-traingo-primary hover:underline">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
