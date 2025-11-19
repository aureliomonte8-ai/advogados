import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  area: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome completo é obrigatório.';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres.';
      isValid = false;
    }

    // Telefone (Validação básica para formatos brasileiros: (XX) XXXXX-XXXX ou apenas dígitos)
    const phoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório.';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, '').length >= 10 ? formData.phone : '')) {
      // Verifica se tem pelo menos 10 digitos numéricos
      if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Telefone inválido. Inclua o DDD.';
        isValid = false;
      }
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de email inválido.';
      isValid = false;
    }

    // Área
    if (!formData.area || formData.area === 'Selecione uma área') {
      newErrors.area = 'Por favor, selecione uma área de interesse.';
      isValid = false;
    }

    // Mensagem
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória.';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro específico ao digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Formatar mensagem para o WhatsApp
      const messageText = `*Nova Solicitação de Contato - Silva & Associados*
      
*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*Email:* ${formData.email}
*Área:* ${formData.area}

*Mensagem:*
${formData.message}`;

      const whatsappNumber = "5588999734988";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

      // Simulação de envio/processamento visual
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, '_blank');
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', area: '', message: '' });
      setErrors({});
    }
  };

  return (
    <section id="contato" className="py-20 bg-navy-900 text-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="w-full lg:w-5/12">
            <h2 className="text-gold-500 font-bold tracking-widest text-sm uppercase mb-3">Fale Conosco</h2>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-8">Vamos conversar sobre o seu caso?</h3>
            <p className="text-slate-300 mb-10 leading-relaxed">
              Entre em contato para agendar uma consulta inicial. Nossa equipe retornará o mais breve possível para entender suas necessidades.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded text-gold-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Localização</h4>
                  <p className="text-slate-300 text-sm">Av. Paulista, 1000 - Conj. 1502<br />Bela Vista, São Paulo - SP</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded text-gold-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Telefones</h4>
                  <p className="text-slate-300 text-sm">(11) 3000-0000<br />(11) 99999-9999 (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded text-gold-500">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-slate-300 text-sm">contato@silvaassociados.com.br<br />juridico@silvaassociados.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded text-gold-500">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Horário de Atendimento</h4>
                  <p className="text-slate-300 text-sm">Segunda a Sexta: 09:00 - 18:00<br />Sábados: Apenas com agendamento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-7/12 bg-white rounded-lg p-8 md:p-10 text-slate-800 relative overflow-hidden">
            {isSuccess ? (
              <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-navy-900 mb-2">Redirecionando para WhatsApp!</h4>
                <p className="text-slate-600 mb-6">
                  Agradecemos seu contato. Você será redirecionado para concluir o envio da mensagem.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-gold-600 font-bold hover:underline"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <>
                <h4 className="font-serif text-2xl font-bold text-navy-900 mb-6">Envie sua mensagem</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-slate-50 border rounded px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-slate-200 focus:border-gold-500 focus:ring-gold-500/20'
                        }`}
                        placeholder="Seu nome" 
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Telefone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-slate-50 border rounded px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : 'border-slate-200 focus:border-gold-500 focus:ring-gold-500/20'
                        }`}
                        placeholder="(00) 00000-0000" 
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-gold-500 focus:ring-gold-500/20'
                      }`}
                      placeholder="seu@email.com" 
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Área de Interesse</label>
                    <select 
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                        errors.area
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-gold-500 focus:ring-gold-500/20'
                      }`}
                    >
                      <option value="">Selecione uma área</option>
                      <option value="Direito de Família">Direito de Família</option>
                      <option value="Direito Penal">Direito Penal</option>
                      <option value="Direito Trabalhista">Direito Trabalhista</option>
                      <option value="Direito Civil">Direito Civil</option>
                      <option value="Direito Empresarial">Direito Empresarial</option>
                      <option value="Outros">Outros</option>
                    </select>
                    {errors.area && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.area}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Mensagem</label>
                    <textarea 
                      rows={4} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 border rounded px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                        errors.message
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 focus:border-gold-500 focus:ring-gold-500/20'
                      }`}
                      placeholder="Descreva brevemente o seu caso..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded transition-colors uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Enviando para WhatsApp...
                      </>
                    ) : (
                      'Enviar Solicitação'
                    )}
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-4">
                    Ao enviar, você será redirecionado para o WhatsApp para confirmar a mensagem.
                  </p>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;