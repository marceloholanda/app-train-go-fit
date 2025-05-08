
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4">
        <Logo />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="bg-traingo-gray rounded-full h-32 w-32 flex items-center justify-center mb-6">
          <span className="text-6xl">🔍</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <p className="text-xl text-gray-400 mb-8">Oops! Página não encontrada</p>
        
        <Button 
          leftIcon={<Home size={18} />}
          onClick={() => navigate('/')}
        >
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
