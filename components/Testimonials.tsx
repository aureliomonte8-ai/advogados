import React from 'react';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  caseType: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Roberto Almeida',
    caseType: 'Direito Empresarial',
    text: 'A assessoria jurídica da Silva & Associados foi fundamental para a reestruturação da minha empresa. A clareza nas orientações e a estratégia adotada nos salvaram de um prejuízo inestimável.',
  },
  {
    name: 'Maria Fernanda Costa',
    caseType: 'Direito de Família',
    text: 'Em um momento tão delicado como meu divórcio, encontrei não apenas advogados excelentes, mas seres humanos que acolheram minha família com respeito, agilidade e discrição.',
  },
  {
    name: 'João Pedro Santos',
    caseType: 'Direito Trabalhista',
    text: 'Recuperei meus direitos de forma justa graças à atuação firme da equipe. A transparência durante todo o processo me passou muita segurança, sempre me mantendo informado.',
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-slate-50 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gold-600 font-bold tracking-widest text-sm uppercase mb-3">Depoimentos</h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-6">A voz de quem confia em nosso trabalho</h3>
          <p className="text-slate-600 leading-relaxed">
            A satisfação e o sucesso dos nossos clientes são o maior indicativo da nossa dedicação e excelência jurídica.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-slate-100 flex flex-col relative group hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute top-6 right-6 text-gold-100 group-hover:text-gold-500/20 transition-colors">
                <Quote size={64} fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-6 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="font-serif text-slate-700 italic mb-6 relative z-10 leading-relaxed">
                "{item.text}"
              </p>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <p className="font-bold text-navy-900">{item.name}</p>
                <p className="text-xs text-gold-600 font-medium uppercase tracking-wide">{item.caseType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;