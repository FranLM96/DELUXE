
import React from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';

export const DatosTab: React.FC = () => {
    const { user } = useAuth();
    const { t } = useLanguage();

    return (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-slate-900 rounded-2xl border border-white/5">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">{t('profile.personal_info')}</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="fullName" className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">{t('auth.name')}</label>
                    <input
                        type="text"
                        id="fullName"
                        defaultValue={user?.name || ''}
                        className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">{t('auth.email')}</label>
                    <input
                        type="email"
                        id="email"
                        defaultValue={user?.email || ''}
                        readOnly
                        className="w-full bg-slate-700/50 border border-white/5 rounded-2xl p-4 text-gray-400 focus:outline-none cursor-not-allowed"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">{t('contact.form_phone')}</label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="Ej. 55 1234 5678"
                        className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">{t('auth.password')}</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••••••"
                        className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    />
                </div>
                <div className="pt-4">
                    <Button type="submit" className="w-full py-4 rounded-2xl text-[10px] tracking-[0.3em]">{t('profile.save_changes')}</Button>
                </div>
            </form>
        </div>
    );
};
