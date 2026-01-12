
import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { MOCK_EVENTS } from '../data/mockData';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { UserInfoForm } from '../components/checkout/UserInfoForm';
import { PaymentMethod } from '../components/checkout/PaymentMethod';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import type { Ticket } from '../types';
import { FiLock, FiChevronDown } from 'react-icons/fi';

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
    <FiChevronDown className={`h-6 w-6 text-indigo-400 transition-transform transform ${isOpen ? 'rotate-180' : ''}`} />
);


const Checkout: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
    const { t } = useLanguage();
    
    const event = MOCK_EVENTS.find(e => e.id === parseInt(id || ''));
    
    const selectedTickets = useMemo(() => {
        if (!event) return [];
        const tickets: { ticket: Ticket, quantity: number }[] = [];
        searchParams.forEach((quantityStr, type) => {
            const ticketInfo = event.tickets.find(t => t.type === type);
            const quantity = parseInt(quantityStr, 10);
            if (ticketInfo && quantity > 0) {
                tickets.push({ ticket: ticketInfo, quantity });
            }
        });
        return tickets;
    }, [searchParams, event]);

    const SERVICE_CHARGE_RATE = 0.125;

    const { subtotal, serviceCharge, total } = useMemo(() => {
        const sub = selectedTickets.reduce((acc, { ticket, quantity }) => acc + (ticket.price * quantity), 0);
        const charge = sub * SERVICE_CHARGE_RATE;
        return {
            subtotal: sub,
            serviceCharge: charge,
            total: sub + charge,
        };
    }, [selectedTickets]);

    if (!event || selectedTickets.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center p-4">
                    <h1 className="text-4xl font-bold">{t('checkout.error_title')}</h1>
                    <p className="text-gray-400 mt-2">{t('checkout.error_desc')}</p>
                    <Link to={`/event/${id}`} className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
                        {t('checkout.back_to_event')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4">
                <div className="text-center my-8">
                    <h1 className="text-4xl md:text-5xl font-bold">{t('checkout.title')}</h1>
                    <p className="text-gray-400 mt-2 flex items-center justify-center">
                        <FiLock className="h-5 w-5 inline-block mr-2" />
                        {t('checkout.secure_payment')}
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    <main className="lg:col-span-2 space-y-8">
                        
                        {/* --- Mobile Order Summary --- */}
                        <div className="lg:hidden bg-slate-900 rounded-2xl p-4 mb-8">
                            <button
                                className="w-full flex justify-between items-center text-left"
                                onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
                                aria-expanded={isMobileSummaryOpen}
                                aria-controls="mobile-order-summary"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-indigo-400">{isMobileSummaryOpen ? t('checkout.hide_summary') : t('checkout.show_summary')}</span>
                                    <ChevronIcon isOpen={isMobileSummaryOpen} />
                                </div>
                                <span className="text-xl font-bold text-white">${total.toFixed(2)} MXN</span>
                            </button>

                            {isMobileSummaryOpen && (
                                <div id="mobile-order-summary" className="mt-4 border-t border-slate-700 pt-4 space-y-4">
                                    <div className="flex gap-4">
                                        <img src={event.imageUrl} alt={`Poster de ${event.title}`} className="w-16 h-24 object-cover rounded-lg flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold">{event.title}</h3>
                                            <p className="text-sm text-gray-400">{event.date} &bull; {event.location}</p>
                                            <ul className="text-sm text-gray-300 mt-2">
                                                {selectedTickets.map(({ ticket, quantity }) => (
                                                    <li key={ticket.type}>{ticket.type} x {quantity}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-4 border-t border-slate-700">
                                        <div className="flex justify-between text-sm text-gray-300">
                                            <span>{t('checkout.subtotal')}</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-300">
                                            <span>{t('checkout.service_charge')}</span>
                                            <span>${serviceCharge.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold pt-2">
                                            <span>{t('checkout.total')}</span>
                                            <span>${total.toFixed(2)} MXN</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <UserInfoForm />
                        <PaymentMethod />
                        <div className="lg:hidden">
                            <Button className="w-full text-lg">
                                {t('checkout.pay_btn')} ${total.toFixed(2)}
                            </Button>
                        </div>
                    </main>

                    <aside className="hidden lg:block">
                        <div className="lg:sticky lg:top-32">
                             <OrderSummary event={event} selectedTickets={selectedTickets} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
