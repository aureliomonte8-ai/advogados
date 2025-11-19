import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import PracticeAreas from './components/PracticeAreas';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import Team from './components/Team';
import Testimonials from './components/Testimonials';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-gold-200 selection:text-navy-900">
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <About />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
};

export default App;