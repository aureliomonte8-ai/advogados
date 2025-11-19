import React, { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Áreas de Atuação', href: '#areas' },
    { name: 'Equipe', href: '#equipe' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <header 
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <div className={`p-2 rounded ${isScrolled ? 'bg-navy-900 text-white' : 'bg-white text-navy-900'}`}>
            <Scale size={24} />
          </div>
          <div>
            <h1 className={`font-serif text-xl md:text-2xl font-bold leading-tight ${
              isScrolled ? 'text-navy-900' : 'text-white'
            }`}>
              Silva <span className="text-gold-600">&</span> Associados
            </h1>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium uppercase tracking-wider hover:text-gold-600 transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contato"
            onClick={(e) => handleNavClick(e, '#contato')}
            className="bg-gold-600 hover:bg-gold-500 text-white px-6 py-2 rounded transition-colors text-sm font-semibold cursor-pointer"
          >
            Consulta Gratuita
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-navy-900' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col py-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-6 py-4 text-slate-800 font-medium border-b border-slate-100 hover:bg-slate-50 hover:text-gold-600"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;