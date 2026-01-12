
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
        setMessage(t('auth.forgot_success'));
        setEmail('');
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
                    <h1 className="text-3xl font-black text-center mb-4 uppercase tracking-tighter">{t('auth.forgot_title')}</h1>
                    <p className="text-center text-gray-400 font-medium mb-10 leading-relaxed">{t('auth.forgot_desc')}</p>
                    
                    {message && (
                        <div className="p-4 mb-8 text-[10px] font-black uppercase tracking-widest bg-cyan-400/10 text-cyan-400 rounded-2xl text-center border border-cyan-400/20">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">{t('auth.email')}</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full py-5 rounded-2xl text-[10px] tracking-[0.3em]">{t('auth.send_link')}</Button>
                    </form>
                    
                    <div className="text-center mt-10">
                        <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all flex items-center justify-center gap-3">
                           <FiArrowLeft className="h-4 w-4" />
                            {t('auth.back_to_login')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
