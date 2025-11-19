import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Equipe de Advogados" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded shadow-xl max-w-xs hidden md:block border-l-4 border-gold-600">
              <p className="font-serif text-4xl font-bold text-navy-900 mb-1">28+</p>
              <p className="text-slate-600 text-sm font-medium">Anos de experiência combinada em casos de alta complexidade.</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-gold-600 font-bold tracking-widest text-sm uppercase mb-3">Sobre o Escritório</h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Compromisso inabalável com a justiça e a ética.
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Fundado em 1995 pelo Dr. Carlos Silva, nosso escritório cresceu baseado em pilares de confiança, transparência e excelência técnica. Entendemos que por trás de cada processo existe uma história de vida, uma empresa ou uma família que precisa de amparo.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Nossa abordagem é humanizada e estratégica. Não tratamos apenas de leis, tratamos de pessoas e de seus direitos fundamentais.
            </p>

            <div className="space-y-4 mb-8">
              {[
                'Atendimento personalizado e sigiloso',
                'Equipe especializada em múltiplas áreas',
                'Histórico comprovado de sucesso',
                'Tecnologia jurídica de ponta'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-gold-600 shrink-0" size={20} />
                  <span className="text-navy-900 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                alt="Dr. Carlos Silva" 
                className="w-16 h-16 rounded-full object-cover border-2 border-gold-600"
              />
              <div>
                <p className="font-serif font-bold text-navy-900 text-lg">Dr. Carlos Silva</p>
                <p className="text-gold-600 text-sm font-medium">Sócio Fundador</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;