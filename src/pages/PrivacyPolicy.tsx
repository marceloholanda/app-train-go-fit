
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
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
        <h1 className="text-xl font-bold">Política de Privacidade</h1>
      </header>
      <Separator className="bg-gray-700" />
      
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <p className="text-gray-400">Última atualização: 18 de maio de 2025</p>
          <p>Sua privacidade é importante para nós. Esta Política de Privacidade descreve como o TrainGO coleta, utiliza, armazena e protege as informações dos usuários.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">1. Coleta de Informações</h2>
          
          <h3 className="font-semibold">1.1 Informações fornecidas pelo usuário:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nome, e-mail e informações de login</li>
            <li>Objetivos de treino, nível de condicionamento e preferências físicas</li>
            <li>Dados inseridos nos formulários do app (ex: respostas no onboarding)</li>
          </ul>
          
          <h3 className="font-semibold mt-3">1.2 Informações coletadas automaticamente:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Dados de uso (quais treinos você realiza, frequência de acesso)</li>
            <li>Informações técnicas sobre seu dispositivo (modelo, sistema operacional, idioma)</li>
            <li>Cookies e identificadores anônimos para fins analíticos e de melhoria da experiência</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">2. Uso das Informações</h2>
          <p>As informações coletadas são utilizadas para:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Personalizar os planos de treino com base no seu perfil</li>
            <li>Fornecer suporte e melhorar continuamente o app</li>
            <li>Enviar notificações e mensagens informativas (caso você autorize)</li>
            <li>Realizar análises estatísticas internas (sem identificação individual)</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">3. Compartilhamento de Dados</h2>
          <p>Nós não vendemos suas informações. Podemos compartilhar dados apenas:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Com prestadores de serviço contratados para operar funcionalidades do app (ex: serviços de analytics, hospedagem ou email)</li>
            <li>Quando exigido por lei, ordem judicial ou para proteger direitos legais do TrainGO</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">4. Armazenamento e Segurança</h2>
          <p>Os dados são armazenados em servidores seguros e seguem práticas de proteção contra acesso não autorizado, alteração ou destruição.</p>
          <p>Utilizamos criptografia e autenticação para proteger suas informações sempre que possível.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">5. Direitos dos Usuários (segundo a LGPD)</h2>
          <p>Você pode, a qualquer momento:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Solicitar acesso às informações que temos sobre você</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a exclusão dos seus dados</li>
            <li>Revogar consentimentos dados anteriormente</li>
          </ul>
          <p className="mt-2">Para exercer esses direitos, entre em contato pelo e-mail: contato@traingo.app</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">6. Cookies e Tecnologias de Rastreamento</h2>
          <p>O TrainGO pode usar cookies e tecnologias similares para melhorar a navegação, personalizar conteúdos e coletar dados de uso. Você pode desativar os cookies nas configurações do seu navegador, mas isso pode impactar o funcionamento do app.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">7. Crianças e Adolescentes</h2>
          <p>O TrainGO não se destina a menores de 13 anos. Caso identifiquemos qualquer dado fornecido por menores sem autorização, ele será excluído.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">8. Alterações nesta Política</h2>
          <p>Podemos atualizar esta Política a qualquer momento. A versão mais recente estará sempre disponível no app ou site. O uso contínuo do TrainGO após mudanças implica concordância com os novos termos.</p>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Dúvidas?</h2>
          <p>Fale com a gente pelo e-mail: contato@traingo.app</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
