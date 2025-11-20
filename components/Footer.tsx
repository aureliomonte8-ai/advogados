import React, { useState } from 'react';
import { Scale, Linkedin, Facebook, Instagram, Loader2, Check, AlertCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setMessage('');
    setStatus('loading');

    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Por favor, insira um email válido.');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('Inscrição realizada com sucesso!');
      setEmail('');

      // Reset success message after a few seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 4000);

    } catch (error) {
      setStatus('error');
      setMessage('Erro ao inscrever. Tente novamente.');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 mb-6 text-white hover:opacity-80 transition-opacity inline-flex"
            >
              <Scale size={24} />
              <span className="font-serif font-bold text-lg">Silva & Associados</span>
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Excelência jurídica e compromisso com a justiça. Atuamos com ética e transparência para garantir os melhores resultados para nossos clientes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-gold-500 transition-colors">Home</a></li>
              <li><a href="#sobre" onClick={(e) => handleNavClick(e, '#sobre')} className="hover:text-gold-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#areas" onClick={(e) => handleNavClick(e, '#areas')} className="hover:text-gold-500 transition-colors">Áreas de Atuação</a></li>
              <li><a href="#equipe" onClick={(e) => handleNavClick(e, '#equipe')} className="hover:text-gold-500 transition-colors">Equipe</a></li>
              <li><a href="#contato" onClick={(e) => handleNavClick(e, '#contato')} className="hover:text-gold-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Áreas</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#areas" onClick={(e) => handleNavClick(e, '#areas')} className="hover:text-gold-500 transition-colors">Direito Civil</a></li>
              <li><a href="#areas" onClick={(e) => handleNavClick(e, '#areas')} className="hover:text-gold-500 transition-colors">Direito de Família</a></li>
              <li><a href="#areas" onClick={(e) => handleNavClick(e, '#areas')} className="hover:text-gold-500 transition-colors">Direito Trabalhista</a></li>
              <li><a href="#areas" onClick={(e) => handleNavClick(e, '#areas')} className="hover:text-gold-500 transition-colors">Direito Penal</a></li>
              <li><a href="#areas" onClick={(e) => handleNavClick(e, '#areas')} className="hover:text-gold-500 transition-colors">Direito Empresarial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Receba notícias jurídicas e atualizações do escritório.</p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                placeholder="Seu email" 
                className={`bg-slate-900 border rounded px-3 py-2 text-sm flex-1 focus:outline-none transition-colors ${
                  status === 'error' ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-gold-500'
                }`}
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`px-4 py-2 rounded text-sm font-bold transition-all flex items-center justify-center min-w-[50px] ${
                  status === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gold-600 hover:bg-gold-500 text-white'
                }`}
              >
                {status === 'loading' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : status === 'success' ? (
                  <Check size={18} />
                ) : (
                  'Ok'
                )}
              </button>
            </form>
            
            {/* Feedback Messages */}
            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} /> {message}
              </p>
            )}
            {status === 'success' && (
              <p className="text-green-400 text-xs mt-2 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                <Check size={12} /> {message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Silva & Associados. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;