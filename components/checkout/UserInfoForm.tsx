
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FormField: React.FC<{ id: string, label: string, type: string, placeholder?: string }> = ({ id, label, type, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">{label}</label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            required
        />
    </div>
);

export const UserInfoForm: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-8 sm:p-10 border border-white/5 shadow-2xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{t('checkout.your_data')}</h2>
            <p className="text-gray-400 font-medium mb-10 leading-relaxed">
                {t('checkout.checkout_desc')}
            </p>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                    <FormField id="fullName" label={t('auth.name')} type="text" placeholder="Juan Pérez" />
                </div>
                <FormField id="email" label={t('auth.email')} type="email" placeholder="juan.perez@email.com" />
                <FormField id="phone" label={t('contact.form_phone')} type="tel" placeholder="55 1234 5678" />
            </form>
        </div>
    );
};
