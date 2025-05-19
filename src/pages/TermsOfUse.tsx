
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TermsOfUse = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-24">
      <header className="bg-traingo-gray p-6 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-3"
        >
          <ArrowLeft size={22} />
        </Button>
        <h1 className="text-xl font-bold">Termos de Uso</h1>
      </header>
      <Separator className="bg-gray-700" />
      
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-gray-400">Última atualização: 18 de maio de 2025</p>
          <p>Seja bem-vindo ao TrainGO! Ao utilizar nosso aplicativo, você concorda com os termos e condições abaixo. Leia com atenção.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">1. Sobre o TrainGO</h2>
          <p>O TrainGO é um aplicativo de treinos voltado para pessoas que buscam praticidade e autonomia na academia, oferecendo planos de treino personalizados com base nos seus objetivos e nível de condicionamento físico.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">2. Aceitação dos Termos</h2>
          <p>Ao acessar ou usar o TrainGO, o usuário declara estar de acordo com estes Termos de Uso e com nossa Política de Privacidade. Se você não concorda com os termos, não deve utilizar o aplicativo.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">3. Cadastro e Acesso</h2>
          <p>Para utilizar o aplicativo, o usuário deve se cadastrar fornecendo informações verdadeiras.</p>
          <p>É de responsabilidade do usuário manter suas credenciais de acesso seguras e não compartilhá-las com terceiros.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">4. Planos e Acesso ao Conteúdo</h2>
          <p>O TrainGO oferece treinos gratuitos com acesso limitado e conteúdos exclusivos disponíveis apenas para usuários do plano premium.</p>
          <p>Os valores, funcionalidades e formas de pagamento do plano premium podem ser alterados a qualquer momento, mediante aviso prévio.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">5. Responsabilidades do Usuário</h2>
          <p>O usuário é responsável por garantir que está apto fisicamente para realizar os treinos sugeridos.</p>
          <p>Em caso de dúvidas sobre saúde, recomenda-se consulta médica antes de iniciar qualquer plano de treino.</p>
          <p>O usuário se compromete a utilizar o app de forma ética, respeitando as leis e normas vigentes.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">6. Limitações de Responsabilidade</h2>
          <p>O TrainGO não se responsabiliza por lesões, acidentes ou problemas de saúde decorrentes do uso indevido do app ou da execução incorreta dos exercícios.</p>
          <p>O app é uma ferramenta de orientação e não substitui o acompanhamento profissional presencial.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">7. Propriedade Intelectual</h2>
          <p>Todos os direitos sobre os conteúdos, imagens, vídeos, marca e interface do aplicativo são de propriedade exclusiva do TrainGO.</p>
          <p>É proibida a reprodução, distribuição ou modificação de qualquer parte do app sem autorização prévia.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">8. Cancelamento e Exclusão de Conta</h2>
          <p>O usuário pode cancelar sua conta a qualquer momento.</p>
          <p>O TrainGO se reserva o direito de suspender ou excluir contas que violem estes termos ou apresentem comportamento inadequado.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">9. Alterações nos Termos</h2>
          <p>Estes termos podem ser atualizados periodicamente. O uso contínuo do app após mudanças implica concordância com os novos termos.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">10. Contato</h2>
          <p>Em caso de dúvidas, sugestões ou solicitações, entre em contato pelo e-mail: contato@traingo.app</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
