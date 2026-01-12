
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_USER_TICKETS, MOCK_PAST_USER_TICKETS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

// Animated Checkmark SVG Component
const AnimatedCheckmark = () => (
    <svg className="w-24 h-24 text-green-400 mx-auto mb-6" viewBox="0 0 52 52">
        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" stroke="#4ade80" strokeWidth="3" />
        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <style>{`
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
        `}</style>
    </svg>
);

const Confirmation: React.FC = () => {
    const { ticketId } = useParams<{ ticketId: string }>();
    const { t } = useLanguage();
    
    // Combine all possible tickets to find the match
    const allUserTickets = [...MOCK_USER_TICKETS, ...MOCK_PAST_USER_TICKETS];
    const ticket = allUserTickets.find(t => t.id === ticketId);

    if (!ticket) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white text-center p-4">
                <h1 className="text-4xl font-bold text-red-500">{t('confirmation.invalid')}</h1>
                <p className="text-gray-400 mt-2">{t('confirmation.invalid_desc')}</p>
                <Link to="/profile" className="mt-8">
                    <Button variant="secondary">{t('confirmation.back_profile')}</Button>
                </Link>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white text-center p-4">
            <div className="bg-slate-900 max-w-lg w-full rounded-2xl p-8 md:p-12 border border-green-500/30">
                <AnimatedCheckmark />
                <h1 className="text-4xl font-bold text-green-400">{t('confirmation.success')}</h1>
                <p className="text-xl text-gray-300 mt-4 mb-8">
                    {t('confirmation.welcome')} <span className="font-bold">{ticket.event.title}</span>.
                </p>

                <div className="bg-slate-800 text-left p-4 rounded-lg mb-8 space-y-1">
                    <p><span className="font-semibold text-gray-400">{t('confirmation.event')}:</span> {ticket.event.title}</p>
                    <p><span className="font-semibold text-gray-400">{t('confirmation.ticket')}:</span> {ticket.ticketType}</p>
                    <p><span className="font-semibold text-gray-400">{t('confirmation.date')}:</span> {ticket.event.date}</p>
                </div>
                
                <p className="text-gray-400 mb-8">{t('confirmation.enjoy')}</p>

                <Link to="/profile">
                    <Button variant="primary">{t('confirmation.view_tickets')}</Button>
                </Link>
            </div>
        </div>
    );
};

export default Confirmation;
