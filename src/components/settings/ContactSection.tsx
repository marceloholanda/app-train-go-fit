
import React from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';
import Card from '@/components/Card';
import { toast } from "@/hooks/use-toast";

const ContactSection: React.FC = () => {
  const handleContactClick = () => {
    // Aqui poderia abrir um modal ou redirecionar para um formulário
    // Por enquanto, mostraremos uma notificação
    toast({
      title: "Contato",
      description: "Funcionalidade de contato em desenvolvimento. Em breve você poderá enviar suas dúvidas e feedback.",
    });
    
    // Abrir email como alternativa temporária
    window.location.href = "mailto:contato@traingo.app?subject=Contato%20TrainGO";
  };

  return (
    <section>
      <h2 className="font-bold text-lg mb-4">Ajuda e Contato</h2>
      
      <div className="space-y-3">
        <Card 
          className="flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors p-4"
          onClick={handleContactClick}
        >
          <div className="flex items-center">
            <div className="bg-traingo-gray p-2 rounded-full mr-3">
              <MessageCircle size={20} className="text-traingo-primary" />
            </div>
            <div>
              <span className="block">Fale conosco</span>
              <span className="text-sm text-gray-400">Suporte, dúvidas ou feedbacks</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
