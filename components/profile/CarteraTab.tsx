
import React from 'react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { FiPlus } from 'react-icons/fi';
import { FaCcVisa } from 'react-icons/fa';

export const CarteraTab: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="max-w-2xl mx-auto border border-white/5 bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl">
             <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">{t('profile.payment_methods')}</h2>

             <div className="space-y-6">
                 <div className="bg-slate-800/50 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 border border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="bg-white/5 p-3 rounded-2xl">
                            <FaCcVisa className="w-10 h-auto text-white" />
                        </div>
                        <div>
                            <p className="font-black text-white uppercase tracking-widest text-sm">Visa •••• 4242</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Exp: 12/28</p>
                        </div>
                    </div>
                    <button className="text-[9px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors">Eliminar</button>
                 </div>

                 <Button variant="secondary" className="w-full py-5 rounded-2xl border-dashed border-white/10 bg-transparent flex items-center justify-center gap-3 group">
                     <FiPlus className="h-5 w-5 text-cyan-400 group-hover:scale-125 transition-transform" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('profile.add_payment')}</span>
                 </Button>
             </div>
        </div>
    );
};
