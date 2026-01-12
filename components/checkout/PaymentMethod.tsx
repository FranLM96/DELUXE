
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';

const PaymentTab: React.FC<{isActive: boolean, onClick: () => void, children: React.ReactNode}> = ({isActive, onClick, children}) => (
    <button
        onClick={onClick}
        className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500 border-b border-white/5 hover:text-white'}`}
    >
        {children}
    </button>
)

export const PaymentMethod: React.FC = () => {
    const [activeMethod, setActiveMethod] = useState<'card' | 'paypal'>('card');
    const { t } = useLanguage();
    
    return (
        <div className="bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex bg-slate-950/50">
                <PaymentTab isActive={activeMethod === 'card'} onClick={() => setActiveMethod('card')}>
                    {t('checkout.card_payment')}
                </PaymentTab>
                <PaymentTab isActive={activeMethod === 'paypal'} onClick={() => setActiveMethod('paypal')}>
                    {t('checkout.other_payment')}
                </PaymentTab>
            </div>
            <div className="p-8 sm:p-10">
                {activeMethod === 'card' && (
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl"></div>
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex gap-4">
                                    <FaCcVisa className="w-12 h-auto text-white" />
                                    <FaCcMastercard className="w-12 h-auto text-white/30" />
                                </div>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Deluxe Black Card</span>
                            </div>
                            <div className="tracking-[0.3em] text-2xl font-black text-white mb-10 text-center">
                                •••• •••• •••• 4242
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Card Holder</p>
                                    <p className="text-xs font-black text-white uppercase tracking-widest">Juan Pérez</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Expires</p>
                                    <p className="text-xs font-black text-white uppercase tracking-widest">12 / 28</p>
                                </div>
                            </div>
                        </div>
                        
                        <form className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">Número de tarjeta</label>
                                <input type="text" placeholder="•••• •••• •••• ••••" className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2 ml-1">Nombre en la tarjeta</label>
                                <input type="text" placeholder="JUAN PEREZ" className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
                            </div>
                        </form>
                    </div>
                )}
                 {activeMethod === 'paypal' && (
                    <div className="text-center py-10">
                        <p className="text-gray-400 font-medium mb-8">Serás redirigido para completar tu pago de forma segura.</p>
                        <button className="bg-[#003087] hover:bg-[#00296b] text-white font-black text-[10px] tracking-[0.2em] px-12 py-5 rounded-full transition-all shadow-xl uppercase">
                           Pagar con PayPal
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
