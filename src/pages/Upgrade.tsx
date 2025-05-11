
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { ArrowLeft, Check, X, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Upgrade = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async () => {
    setIsSubscribing(true);

    try {
      // Simulação de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Atualização no localStorage
      const user = localStorage.getItem('traingo-user');
      if (user) {
        const userData = JSON.parse(user);
        userData.plan = 'premium'; // Mudança de isPremium para plan='premium' para compatibilidade com isPremiumUser()
        localStorage.setItem('traingo-user', JSON.stringify(userData));
      }

      toast({
        title: "Assinatura realizada!",
        description: "Bem-vindo ao plano PRO do TrainGO.",
      });

      navigate('/dashboard', { replace: true }); // Força navegação completa para recarregar o estado
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar seu pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <header className="bg-traingo-gray p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center mb-4 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={18} className="mr-1" /> Voltar
        </button>
        
        <h1 className="text-2xl font-bold mb-2">Upgrade para o PRO</h1>
        <p className="text-gray-400">Desbloqueie todo o potencial do TrainGO</p>
      </header>

      {/* Plan Comparison */}
      <section className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Free Plan */}
          <Card variant="outline" className="p-5">
            <div className="mb-6">
              <span className="text-lg font-bold">Free</span>
              <h3 className="text-2xl font-bold mb-1">R$ 0</h3>
              <p className="text-sm text-gray-400">para sempre</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Treinos A-B-C</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>6 exercícios por treino</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Registro de progresso básico</span>
              </li>
              <li className="flex items-start">
                <X size={18} className="text-red-500 mr-2 min-w-[18px] mt-0.5" />
                <span className="text-gray-500">Exercícios personalizados</span>
              </li>
              <li className="flex items-start">
                <X size={18} className="text-red-500 mr-2 min-w-[18px] mt-0.5" />
                <span className="text-gray-500">Treino D adicional</span>
              </li>
            </ul>

            <div>
              <Button variant="outline" fullWidth>
                Plano Atual
              </Button>
            </div>
          </Card>

          {/* Pro Plan */}
          <Card className="p-5 border-2 border-traingo-primary relative overflow-hidden">
            <div className="absolute top-0 right-0">
              <div className="bg-traingo-primary text-black text-xs font-bold py-1 px-3 transform rotate-45 translate-x-7 translate-y-2">
                POPULAR
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-1">
                <span className="text-lg font-bold mr-2">PRO</span>
                <Zap size={16} className="text-traingo-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-1">R$ 19,90</h3>
              <p className="text-sm text-gray-400">por mês</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Treinos A-B-C-D</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Até 8 exercícios por treino</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Registro de progresso detalhado</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Adicionar exercícios personalizados</span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 min-w-[18px] mt-0.5" />
                <span>Suporte prioritário</span>
              </li>
            </ul>

            <div>
              <Button 
                fullWidth 
                isLoading={isSubscribing} 
                onClick={handleSubscribe}
              >
                Assinar Agora
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-6">
        <h2 className="font-bold text-lg mb-4">Perguntas Frequentes</h2>

        <div className="space-y-4">
          <Card>
            <h3 className="font-bold mb-2">Posso cancelar a qualquer momento?</h3>
            <p className="text-gray-400 text-sm">
              Sim, você pode cancelar sua assinatura a qualquer momento e continuar com acesso até o final do período pago.
            </p>
          </Card>
          
          <Card>
            <h3 className="font-bold mb-2">Como funciona o treino D adicional?</h3>
            <p className="text-gray-400 text-sm">
              O treino D é um treino adicional que complementa seu plano, focando em exercícios específicos para seu objetivo.
            </p>
          </Card>
          
          <Card>
            <h3 className="font-bold mb-2">Posso personalizar meus exercícios?</h3>
            <p className="text-gray-400 text-sm">
              Com o plano PRO, você pode adicionar, remover e substituir exercícios conforme suas necessidades e preferências.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Upgrade;
