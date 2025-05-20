
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      
      toast({
        title: "Login bem-sucedido!",
        description: "Redirecionando para o dashboard...",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Falha no login",
        description: error.message || "Email ou senha incorretos.",
        variant: "destructive",
      });
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
            <h1 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p className="text-gray-400">Entre com sua conta para continuar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Senha
                </label>
                <a href="#" className="text-sm text-traingo-primary hover:underline">
                  Esqueci minha senha
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-traingo-gray border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-traingo-primary"
                placeholder="********"
              />
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading}>
              Entrar
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Não tem uma conta?{' '}
              <Link to="/onboarding" className="text-traingo-primary hover:underline">
                Criar Agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
