
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      // In a real app, we would register the user first
      // For now, just simulate registration and auto-login
      
      // Mock registration
      const user = { email, id: 'new-user-id' };
      localStorage.setItem('traingo-user', JSON.stringify(user));
      
      // Auto login the user
      await login(email, password);
      
      // Redirect to onboarding after successful registration
      navigate('/onboarding');
      
      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso",
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro",
        description: "Falha ao criar conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-gray-500 mt-2">Comece a treinar com o TrainGO</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirme a senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-traingo-primary hover:bg-traingo-dark text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-traingo-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="text-traingo-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
