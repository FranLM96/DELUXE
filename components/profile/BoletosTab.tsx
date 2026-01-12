
import React, { useState } from 'react';
import type { UserTicket, ReceivedUserTicket } from '../../types';
import { Link } from 'react-router-dom';
import { SendTicketModal } from './SendTicketModal';
import { MOCK_USER_TICKETS, MOCK_PAST_USER_TICKETS, MOCK_RECEIVED_TICKETS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { FiSend, FiCheck } from 'react-icons/fi';

const TicketCard: React.FC<{ ticket: UserTicket; isPast?: boolean; isSent?: boolean; onSendClick: (ticket: UserTicket) => void; }> = ({ ticket, isPast = false, isSent = false, onSendClick }) => {
    const [isQrLoading, setIsQrLoading] = useState(true);
    const { t } = useLanguage();
    
    const qrData = JSON.stringify({ ticketId: ticket.id, eventId: ticket.event.id });
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrData)}&ecc=H`;
    
    return (
    <div className="relative bg-slate-900 rounded-[2rem] overflow-hidden group border border-white/5 shadow-2xl">
        <div className="relative flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 p-8 flex flex-col">
                <div className="flex gap-6 items-start">
                    <img src={ticket.event.imageUrl} alt={ticket.event.title} className="w-24 h-32 object-cover rounded-2xl flex-shrink-0 shadow-lg" />
                    <div>
                        <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em]">{ticket.ticketType}</p>
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-1">{ticket.event.title}</h3>
                        <p className="text-gray-400 font-bold text-sm mt-1">{ticket.event.date} &bull; {ticket.event.location}</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                     <Link to={`/event/${ticket.event.id}`} className="text-indigo-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                        {t('profile.view_details')}
                    </Link>
                    {!isPast && (
                        isSent ? (
                            <button disabled className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-400 py-2.5 px-6 rounded-full">
                                <FiCheck className="h-4 w-4" /> {t('profile.sent')}
                            </button>
                        ) : (
                            <button onClick={() => onSendClick(ticket)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 px-6 rounded-full transition-all">
                                <FiSend className="h-4 w-4" /> {t('profile.send_ticket')}
                            </button>
                        )
                    )}
                </div>
            </div>

            <Link 
                to={isPast ? '#' : `/confirmation/${ticket.id}`} 
                className={`w-full md:w-1/3 bg-slate-800/30 md:border-l-2 md:border-dashed md:border-white/5 p-8 flex flex-col items-center justify-center text-center ${isPast ? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-800/50 transition-colors'}`}
            >
                 <div className="w-32 h-32 bg-white p-2 rounded-2xl shadow-2xl flex items-center justify-center">
                    <img 
                        src={qrCodeUrl} 
                        alt="QR" 
                        className={`w-full h-full object-contain transition-opacity duration-500 ${isQrLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsQrLoading(false)}
                    />
                </div>
                <div className="flex items-center mt-6">
                    <p className="font-black text-2xl tracking-tighter text-white uppercase italic">BluePass<span className="text-cyan-400">®</span></p>
                </div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-2">{isPast ? t('profile.used_instruction') : t('profile.qr_instruction')}</p>
            </Link>
        </div>
    </div>
)};

export const BoletosTab: React.FC = () => {
    const { t } = useLanguage();
    const [upcomingTickets, setUpcomingTickets] = useState(MOCK_USER_TICKETS);
    const [receivedTickets, setReceivedTickets] = useState(MOCK_RECEIVED_TICKETS);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const [ticketToSend, setTicketToSend] = useState<UserTicket | null>(null);
    const [sentTicketIds, setSentTicketIds] = useState<string[]>([]);

    const handleOpenSendModal = (ticket: UserTicket) => { setTicketToSend(ticket); setIsSendModalOpen(true); };
    const handleCloseSendModal = () => { setIsSendModalOpen(false); setTicketToSend(null); };
    const handleSendTicket = (email: string) => { if (ticketToSend) setSentTicketIds(prev => [...prev, ticketToSend.id]); handleCloseSendModal(); };
    
    const handleAcceptTicket = (ticketId: string) => {
        const ticketToAccept = receivedTickets.find(t => t.id === ticketId);
        if (ticketToAccept) {
            setReceivedTickets(prev => prev.filter(t => t.id !== ticketId));
            const { senderEmail, ...acceptedTicket } = ticketToAccept;
            setUpcomingTickets(prev => [acceptedTicket, ...prev]);
        }
    };

    return (
        <div className="space-y-16">
            {receivedTickets.length > 0 && (
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">{t('profile.pending_invites')}</h2>
                    <div className="space-y-6">
                        {receivedTickets.map(ticket => (
                            <div key={ticket.id} className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-2xl shadow-cyan-500/5">
                                <div className="text-center sm:text-left">
                                    <p className="text-gray-300 font-medium">
                                        <span className="font-black text-white">{ticket.senderEmail}</span> {t('profile.invitation_text')}
                                    </p>
                                    <p className="font-black text-xl text-cyan-400 uppercase tracking-tight mt-1">{ticket.event.title} &bull; {ticket.ticketType}</p>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button onClick={() => setReceivedTickets(prev => prev.filter(t => t.id !== ticket.id))} className="flex-1 sm:flex-none py-3 px-8 text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 rounded-full transition-all">{t('profile.decline')}</button>
                                    <button onClick={() => handleAcceptTicket(ticket.id)} className="flex-1 sm:flex-none py-3 px-8 text-[10px] font-black uppercase tracking-widest bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition-all shadow-lg">{t('profile.accept')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">{t('profile.upcoming_tickets')}</h2>
                {upcomingTickets.length > 0 ? (
                    <div className="space-y-8">
                        {upcomingTickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} onSendClick={handleOpenSendModal} isSent={sentTicketIds.includes(ticket.id)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                        <p className="text-xl text-gray-500 font-black uppercase tracking-widest">{t('profile.no_tickets')}</p>
                    </div>
                )}
            </div>

            <SendTicketModal isOpen={isSendModalOpen} onClose={handleCloseSendModal} onSend={handleSendTicket} ticket={ticketToSend} />
        </div>
    );
};
