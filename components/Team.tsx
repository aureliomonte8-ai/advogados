import React, { useRef, useEffect, useState } from 'react';
import { Lawyer } from '../types';
import { Linkedin, Mail } from 'lucide-react';

const lawyers: Lawyer[] = [
  {
    name: 'Dr. Carlos Silva',
    role: 'Sócio Fundador',
    bio: 'Especialista em Direito Empresarial com mais de 25 anos de experiência, liderando casos de alta complexidade.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dra. Ana Souza',
    role: 'Direito Civil e Família',
    bio: 'Pós-graduada em Direito de Família, com foco na resolução humanizada e extrajudicial de conflitos.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Dr. Marcos Oliveira',
    role: 'Direito Penal',
    bio: 'Ex-defensor público com vasta experiência em tribunais do júri e defesa criminal estratégica.',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const LawyerCard: React.FC<{ lawyer: Lawyer }> = ({ lawyer }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const { top, height } = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate if the element is in view
      if (top < windowHeight && top + height > 0) {
        // Calculate distance from the center of the viewport
        const distanceFromCenter = top - (windowHeight / 2) + (height / 2);
        
        // Apply a small factor to create the parallax lag (move slower than scroll)
        // A negative factor moves the image up while we scroll down, 
        // but since we want it to look "further away" (slower), we move it 
        // slightly in the direction of the scroll or hold it back.
        // Moving it slightly down (positive) while scrolling down makes it appear to move slower than the frame.
        setOffset(distanceFromCenter * 0.15);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={cardRef} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 h-[500px]">
      {/* Image Container - Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={lawyer.imageUrl} 
          alt={lawyer.name} 
          style={{ transform: `translateY(${offset}px) scale(1.1)` }}
          className="w-full h-[120%] object-cover -mt-[10%] transition-transform duration-75 ease-linear will-change-transform"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-10">
        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
          <h4 className="font-serif text-xl font-bold text-white mb-1 drop-shadow-md">{lawyer.name}</h4>
          <p className="text-gold-500 text-sm font-medium mb-3 uppercase tracking-wider drop-shadow-sm">{lawyer.role}</p>
          
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <p className="text-slate-200 text-sm mb-4 leading-relaxed">
                {lawyer.bio}
              </p>
              <div className="flex gap-4 mb-2">
                <a href="#" className="text-white hover:text-gold-500 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-white hover:text-gold-500 transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="equipe" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gold-600 font-bold tracking-widest text-sm uppercase mb-3">Nossos Profissionais</h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-6">Experiência e dedicação ao seu dispor</h3>
          <p className="text-slate-600 leading-relaxed">
            Contamos com uma equipe de advogados altamente qualificados e especializados em diferentes áreas do direito para oferecer um atendimento completo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {lawyers.map((lawyer, index) => (
            <LawyerCard key={index} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;