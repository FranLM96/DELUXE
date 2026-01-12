
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FiChevronDown } from 'react-icons/fi';

const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-6 text-left group">
                <span className={`text-lg font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'}`}>{title}</span>
                <FiChevronDown className={`w-6 h-6 text-gray-500 transform transition-transform duration-500 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <div className="text-gray-400 font-medium leading-relaxed">{children}</div>
            </div>
        </div>
    );
};

export const AyudaTab: React.FC = () => {
    const { t, language } = useLanguage();
    
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">¿Necesitas ayuda?</h2>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em]">Estamos aquí para resolver tus dudas</p>
            </div>
            
            <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                 <AccordionItem title={language === 'es' ? "¿Cómo uso mis boletos BluePass?" : "How do I use my BluePass tickets?"}>
                    <p>{language === 'es' ? "Es muy fácil. Una vez completada tu compra, tus boletos aparecerán en la sección 'Boletos' de tu perfil. Cada boleto tiene un código QR único que presentarás en el evento." : "It's easy. Once your purchase is complete, your tickets will appear in the 'Tickets' section of your profile. Each ticket has a unique QR code to present at the event."}</p>
                </AccordionItem>
                <AccordionItem title={language === 'es' ? "¿Puedo cancelar o transferir mis boletos?" : "Can I cancel or transfer my tickets?"}>
                    <p>{language === 'es' ? "Las ventas son finales. La transferibilidad depende de las políticas específicas de cada evento. Puedes usar la función 'Enviar Boleto' si el evento lo permite." : "All sales are final. Transferability depends on specific event policies. You can use the 'Send Ticket' function if the event allows it."}</p>
                </AccordionItem>
            </div>
            
            <div className="text-center mt-16">
                <p className="text-gray-400 font-medium mb-6">¿No encontraste lo que buscabas?</p>
                <Link to="/contact" className="inline-block py-4 px-10 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-cyan-400 transition-all shadow-xl">
                    {t('contact.title')}
                </Link>
            </div>
        </div>
    );
};
