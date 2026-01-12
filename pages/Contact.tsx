
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Contact: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [emailError, setEmailError] = useState('');
    const [formStatus, setFormStatus] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'email') {
            if (value.trim() && !emailRegex.test(value)) {
                setEmailError('Por favor, ingresa un correo válido.');
            } else {
                setEmailError('');
            }
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('');

        if (!emailRegex.test(formData.email)) {
            setEmailError('Por favor, ingresa un correo válido.');
            return;
        }
        
        setFormStatus(t('contact.success'));
        setFormData({ name: '', phone: '', email: '', message: '' });
        setEmailError('');
        setTimeout(() => setFormStatus(''), 3000);
    };

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <section className="relative h-[40vh] mb-12 flex flex-col items-center justify-center text-center rounded-2xl p-4 overflow-hidden">
                    <img src="https://picsum.photos/seed/contact-hero/1200/400" alt="Stage lights" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/70 rounded-2xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">{t('contact.title')}</h1>
                        <p className="max-w-xl text-lg font-medium">{t('contact.subtitle')}</p>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="text-lg space-y-4 font-medium text-gray-300">
                        <p>{t('contact.desc')}</p>
                    </div>
                    <div className="relative rounded-[2.5rem] p-8 sm:p-10 overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
                        <div className="relative z-10">
                             <div className="text-center mb-8">
                                <img 
                                    src="https://storage.googleapis.com/pai-images/496f30a9058b4b7f9a888805f7787f7a.png" 
                                    alt="Deluxe Logo" 
                                    className="h-12 w-auto mx-auto drop-shadow-[0_0_12px_rgba(2,230,245,0.4)]"
                                />
                            </div>
                            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder={t('contact.form_name')} className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" required />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('contact.form_phone')} className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" required />
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('contact.form_email')}
                                        className={`w-full bg-slate-800 border rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 ${emailError ? 'border-red-500/50 ring-red-500' : 'border-white/5 focus:ring-cyan-500'}`}
                                        required
                                    />
                                    {emailError && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">{emailError}</p>}
                                </div>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={t('contact.form_message')} rows={5} className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" required></textarea>
                                <Button type="submit" className="w-full py-4 rounded-2xl">{t('contact.form_submit')}</Button>
                                {formStatus && <p className="text-green-400 text-center text-[10px] font-black uppercase tracking-widest mt-4 animate-fade-in">{formStatus}</p>}
                            </form>
                        </div>
                    </div>
                </section>
                
                <section className="text-center my-16 bg-white/5 rounded-[3rem] p-12 border border-white/5">
                     <h2 className="text-3xl font-black uppercase tracking-tight mb-4">{t('contact.social_title')}</h2>
                     <div className="flex justify-center space-x-12 mt-8">
                        <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-125">
                            <FaFacebookF size={36} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-125">
                            <FaInstagram size={36} />
                        </a>
                     </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
