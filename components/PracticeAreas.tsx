import React from 'react';
import { Users, Briefcase, Gavel, ShieldCheck, HeartHandshake, Building2 } from 'lucide-react';
import { PracticeArea } from '../types';

const areas: PracticeArea[] = [
  {
    title: 'Direito de Família',
    description: 'Divórcios, guarda de filhos, pensão alimentícia e inventários com sensibilidade e discrição.',
    icon: Users
  },
  {
    title: 'Direito Penal',
    description: 'Defesa robusta em inquéritos e processos criminais, garantindo o devido processo legal.',
    icon: Gavel
  },
  {
    title: 'Direito Trabalhista',
    description: 'Proteção dos direitos de trabalhadores e assessoria preventiva para empresas.',
    icon: Briefcase
  },
  {
    title: 'Direito Civil',
    description: 'Resolução de conflitos, contratos, indenizações e responsabilidade civil.',
    icon: ShieldCheck
  },
  {
    title: 'Direito Previdenciário',
    description: 'Auxílio em aposentadorias, benefícios por incapacidade e revisões.',
    icon: HeartHandshake
  },
  {
    title: 'Direito Empresarial',
    description: 'Consultoria jurídica para negócios, fusões, aquisições e compliance.',
    icon: Building2
  }
];

const PracticeAreas: React.FC = () => {
  return (
    <section id="areas" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-gold-600 font-bold tracking-widest text-sm uppercase mb-3">Áreas de Atuação</h2>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-6">Soluções jurídicas completas para você e sua empresa</h3>
          <p className="text-slate-600 leading-relaxed">
            Nossa equipe multidisciplinar está preparada para atuar nas mais diversas esferas do direito, garantindo uma defesa técnica e eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <div key={index} className="group p-8 border border-slate-100 rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-50 hover:bg-white hover:border-gold-200">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-navy-900 mb-6 group-hover:bg-gold-600 group-hover:text-white transition-colors">
                <area.icon size={28} />
              </div>
              <h4 className="font-serif text-xl font-bold text-navy-900 mb-3">{area.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;