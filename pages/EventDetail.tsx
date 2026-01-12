
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/ui/EventCard';
import { SEO } from '../components/ui/SEO';
import { useLanguage } from '../context/LanguageContext';
import type { Ticket } from '../types';
import { FiCalendar, FiMapPin, FiMap, FiPlus, FiMinus, FiShare2, FiCopy, FiCheck } from 'react-icons/fi';
import { FaTwitter, FaFacebookF, FaWhatsapp, FaTicketAlt } from 'react-icons/fa';

const MAX_TICKETS_PER_TYPE = 4;

const TicketSelector: React.FC<{
    ticket: Ticket;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}> = ({ ticket, quantity, onIncrement, onDecrement }) => (
    <div className="flex justify-between items-center bg-slate-800 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
        <div>
            <span className="font-black text-white uppercase text-sm tracking-wide">{ticket.type}</span>
            <p className="font-black text-cyan-400 text-lg mt-0.5">${ticket.price.toFixed(2)} MXN</p>
        </div>
        <div className="flex items-center space-x-3">
            <button onClick={onDecrement} disabled={quantity <= 0} className="bg-slate-700/50 p-2.5 rounded-xl hover:bg-slate-600 disabled:opacity-20 disabled:cursor-not-allowed transition-all"><FiMinus className="h-5 w-5" /></button>
            <span className="w-10 text-center font-black text-xl text-white">{quantity}</span>
            <button onClick={onIncrement} disabled={quantity >= MAX_TICKETS_PER_TYPE} className="bg-cyan-600 p-2.5 rounded-xl hover:bg-cyan-500 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(2,230,245,0.3)]"><FiPlus className="h-5 w-5 text-white" /></button>
        </div>
    </div>
);


const EventDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const event = MOCK_EVENTS.find(e => e.id === parseInt(id || '', 10));

    const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleIncrement = (ticketType: string) => {
        setTicketQuantities(prev => ({
            ...prev,
            [ticketType]: Math.min((prev[ticketType] || 0) + 1, MAX_TICKETS_PER_TYPE)
        }));
    };
    
    const handleDecrement = (ticketType: string) => {
        setTicketQuantities(prev => ({
            ...prev,
            [ticketType]: Math.max((prev[ticketType] || 0) - 1, 0)
        }));
    };

    const { total, totalQuantity } = useMemo(() => {
        let currentTotal = 0;
        let currentQuantity = 0;
        if (event) {
            for (const ticket of event.tickets) {
                const quantity = ticketQuantities[ticket.type] || 0;
                currentTotal += quantity * ticket.price;
                currentQuantity += quantity;
            }
        }
        return { total: currentTotal, totalQuantity: currentQuantity };
    }, [ticketQuantities, event]);

    const handlePurchase = () => {
        if (!event || totalQuantity === 0) return;
        
        const params = new URLSearchParams();
        for(const ticketType in ticketQuantities) {
            if (ticketQuantities[ticketType] > 0) {
                params.set(ticketType, ticketQuantities[ticketType].toString());
            }
        }
        navigate(`/checkout/${event.id}?${params.toString()}`);
    };

    const handleShare = async () => {
        if (!event) return;
        const shareData = {
            title: event.title,
            text: language === 'es' ? `¡No te pierdas ${event.title} el ${event.date}! Compra tus boletos aquí:` : `Don't miss ${event.title} on ${event.date}! Buy your tickets here:`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Error sharing:', error);
                setIsShareOpen(true);
            }
        } else {
            setIsShareOpen(!isShareOpen);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
                setIsShareOpen(false);
            }, 2000);
        });
    };

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">{t('event_detail.not_found')}</h1>
                    <p className="text-gray-400 mt-2">{language === 'es' ? 'El evento que buscas no existe o fue movido.' : 'The event you are looking for does not exist or was moved.'}</p>
                    <Link to="/events" className="mt-6">
                        <Button variant="secondary">{t('event_detail.back_to_events')}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const relatedEvents = MOCK_EVENTS.filter(e => e.id !== event.id).slice(0, 3);
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(language === 'es' ? `¡No te pierdas ${event.title} el ${event.date}!` : `Don't miss ${event.title} on ${event.date}!`);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

    return (
        <div className="text-white">
            <SEO 
                title={event.title}
                description={event.description.substring(0, 160) + '...'}
                ogImage={event.imageUrl}
                ogType="event"
            />
            {/* Hero Section */}
            <section 
                className="relative h-[60vh] md:h-[75vh] flex items-end -mt-36 lg:-mt-44" 
                aria-label={`Imagen de ${event.title}`}
            >
                <img src={event.imageUrl} alt={`Póster oficial de ${event.title}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="relative z-10 container mx-auto px-6 pb-16">
                    <h1 className="pt-20 text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">{event.title}</h1>
                    <p className="text-cyan-400 font-black tracking-[0.4em] uppercase text-lg animate-fade-in">{t('event_detail.exclusive')}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-6 md:gap-10 text-lg font-black uppercase tracking-widest text-white/80">
                        <span className="flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10"><FiCalendar className="h-6 w-6 mr-3 text-cyan-400" /> {event.date}</span>
                        <span className="flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10"><FiMapPin className="h-6 w-6 mr-3 text-indigo-400" /> {event.location}</span>
                        <div className="flex gap-4">
                            <a 
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3.5 bg-white text-black rounded-2xl hover:bg-cyan-400 transition-all shadow-xl"
                                aria-label="Ver ubicación en Google Maps"
                            >
                                <FiMap className="h-6 w-6" />
                            </a>
                            <div className="relative" ref={shareRef}>
                                <button
                                    onClick={handleShare}
                                    className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/20 transition-all"
                                    aria-label="Compartir este evento"
                                >
                                    <FiShare2 className="h-6 w-6" />
                                </button>
                                {isShareOpen && (
                                    <div className="absolute bottom-full mb-4 right-0 w-64 bg-slate-900/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-20 p-4 border border-white/10 animate-slide-in-bottom">
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={handleCopyLink}
                                                className="flex items-center gap-4 w-full p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left text-white hover:bg-white/5 transition-all"
                                            >
                                                {isCopied ? <FiCheck className="h-5 w-5 text-green-400" /> : <FiCopy className="h-5 w-5 text-cyan-400" />}
                                                {isCopied ? t('event_detail.copied') : t('event_detail.copy_link')}
                                            </button>
                                            <a href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left text-white hover:bg-white/5 transition-all">
                                                <FaTwitter className="h-5 w-5 text-blue-400" /> Twitter
                                            </a>
                                            <a href={`https://api.whatsapp.com/send?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-left text-white hover:bg-white/5 transition-all">
                                                <FaWhatsapp className="h-5 w-5 text-green-500" /> WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main content */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left: Description & Lineup */}
                    <div className="lg:col-span-2 space-y-20">
                        <section>
                            <h2 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-6">{t('event_detail.immersion')}</h2>
                            <h3 className="text-4xl font-black text-white tracking-tighter mb-8">{t('event_detail.about_night')}</h3>
                            <p className="text-xl text-gray-400 leading-relaxed font-medium">{event.description}</p>
                        </section>
                        
                        <section>
                            <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-6">{t('event_detail.main_stage')}</h2>
                            <h3 className="text-4xl font-black text-white tracking-tighter mb-10">{t('event_detail.lineup')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {event.lineup.map((artist, index) => (
                                    <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-3xl hover:border-cyan-500/30 transition-all group">
                                        <p className="text-white font-black text-xl tracking-tighter group-hover:text-cyan-400 transition-colors">{artist}</p>
                                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Live Performance</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Ticket Info */}
                    <aside>
                        <div className="sticky top-32 bg-slate-900/50 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 bg-cyan-500/20 rounded-2xl">
                                    <FaTicketAlt className="h-6 w-6 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-black text-white tracking-tighter">{t('event_detail.available_tickets')}</h2>
                            </div>
                            
                            <div className="space-y-4 mb-10">
                                {event.tickets.map(ticket => (
                                    <TicketSelector
                                        key={ticket.type}
                                        ticket={ticket}
                                        quantity={ticketQuantities[ticket.type] || 0}
                                        onIncrement={() => handleIncrement(ticket.type)}
                                        onDecrement={() => handleDecrement(ticket.type)}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between items-end mb-10">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('event_detail.total_investment')}</span>
                                <span className="text-4xl font-black text-white tracking-tighter">${total.toFixed(2)} <span className="text-sm font-medium text-gray-500">MXN</span></span>
                            </div>

                            <Button onClick={handlePurchase} disabled={totalQuantity === 0} className="w-full py-6 text-[10px] font-black uppercase tracking-[0.3em] rounded-[2rem]">
                                {t('event_detail.reserve_now')}
                            </Button>
                            
                            <p className="text-center text-[10px] text-gray-500 font-bold mt-6 tracking-wide uppercase">{t('event_detail.secure_guarantee')}</p>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
                <section className="py-24 bg-slate-900/50 border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4">{t('event_detail.related_title')}</h2>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">{t('event_detail.explore_more')}</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {relatedEvents.map(relatedEvent => (
                                <EventCard key={relatedEvent.id} event={relatedEvent} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default EventDetail;
