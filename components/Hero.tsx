import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      // Adjust offset based on screen width (md breakpoint is 768px)
      const isMobile = window.innerWidth < 768;
      const headerOffset = isMobile ? 60 : 80;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center bg-navy-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80" 
          alt="Advogado atendendo cliente em escritório moderno" 
          className="w-full h-full object-cover object-right md:object-center"
        />
        {/* Gradient Overlay - Dark on left (text), transparent on right (image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/40 md:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-3xl text-white">
          <div className="inline-block bg-gold-600 px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
            Excelência Jurídica desde 1995
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
            Defendendo seus direitos com <span className="text-gold-500 italic">integridade</span> e determinação.
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed drop-shadow-md font-medium">
            Especialistas em resolver casos complexos com estratégias personalizadas. 
            Seu sucesso é nossa prioridade absoluta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contato" 
              onClick={(e) => handleNavClick(e, '#contato')}
              className="inline-flex items-center justify-center bg-white text-navy-900 px-8 py-4 rounded font-bold hover:bg-slate-100 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
            >
              Agendar Consulta
            </a>
            <a 
              href="#areas" 
              onClick={(e) => handleNavClick(e, '#areas')}
              className="inline-flex items-center justify-center border-2 border-slate-300 text-white px-8 py-4 rounded font-semibold hover:bg-white/10 hover:border-white transition-colors cursor-pointer text-shadow"
            >
              Nossas Áreas
              <ChevronRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;