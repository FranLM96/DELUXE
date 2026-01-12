
import React from 'react';
import type { Event, Ticket } from '../../types';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

interface OrderSummaryProps {
    event: Event;
    selectedTickets: { ticket: Ticket, quantity: number }[];
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ event, selectedTickets }) => {
    const { t } = useLanguage();
    const SERVICE_CHARGE_RATE = 0.125;
    const subtotal = selectedTickets.reduce((acc, { ticket, quantity }) => acc + ticket.price * quantity, 0);
    const serviceCharge = subtotal * SERVICE_CHARGE_RATE;
    const total = subtotal + serviceCharge;

    return (
        <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter border-b border-white/5 pb-6 mb-8">{t('checkout.order_summary')}</h2>
            
            <div className="flex gap-6 mb-8">
                <img src={event.imageUrl} alt={event.title} className="w-20 h-28 object-cover rounded-2xl flex-shrink-0 shadow-lg" />
                <div className="flex flex-col justify-center">
                    <h3 className="font-black text-white uppercase tracking-tight leading-tight">{event.title}</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">{event.date} &bull; {event.location}</p>
                    <div className="mt-3 space-y-1">
                        {selectedTickets.map(({ ticket, quantity }) => (
                            <p key={ticket.type} className="text-[10px] font-black uppercase tracking-widest text-cyan-400">{ticket.type} <span className="text-gray-400">x{quantity}</span></p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/5">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>{t('checkout.subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>{t('checkout.service_charge')}</span>
                    <span>${serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end pt-6 border-t border-white/5 mt-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{t('checkout.total')}</span>
                    <span className="text-3xl font-black text-white tracking-tighter">${total.toFixed(2)} <span className="text-xs font-medium text-gray-500">MXN</span></span>
                </div>
            </div>

            <Button className="w-full py-5 rounded-2xl mt-10 text-[10px] font-black uppercase tracking-[0.3em]">
                {t('checkout.pay_btn')}
            </Button>

            <p className="text-[9px] font-bold text-gray-500 text-center mt-6 uppercase leading-relaxed tracking-wider">
                {t('checkout.terms_notice')}
            </p>
        </div>
    );
};
