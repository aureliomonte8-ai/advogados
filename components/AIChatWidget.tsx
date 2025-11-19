import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ShieldAlert } from 'lucide-react';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o assistente virtual da Silva & Associados. Como posso ajudar você hoje com dúvidas gerais sobre nossos serviços?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize chat on mount (or when widget opens to save resources, but here on mount for readiness)
  useEffect(() => {
    initializeChat();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Desculpe, tive um problema técnico. Tente novamente.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-navy-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gold-600 rounded-full">
                <MessageSquare size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm">Assistente Jurídico IA</h3>
                <p className="text-xs text-slate-300">Sempre online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-100 rounded text-xs text-amber-800 flex gap-2 items-start">
              <ShieldAlert size={14} className="mt-0.5 shrink-0" />
              <p>Esta é uma IA. As respostas são apenas informativas e não substituem uma consulta jurídica real.</p>
            </div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-navy-900 text-white rounded-tr-none' 
                      : msg.isError 
                        ? 'bg-red-100 text-red-800 rounded-tl-none'
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-gold-600" />
                  <span className="text-xs text-slate-500">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-slate-100 text-slate-800 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="bg-gold-600 text-white p-2 rounded-full hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} transition-all duration-300 bg-navy-900 hover:bg-navy-800 text-white p-4 rounded-full shadow-lg flex items-center gap-2 group`}
      >
        <MessageSquare className="group-hover:animate-bounce" />
        <span className="font-medium pr-1">Dúvidas?</span>
      </button>
    </div>
  );
};

export default AIChatWidget;