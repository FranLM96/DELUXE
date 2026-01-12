
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../../types';
import { FiX, FiCalendar, FiMapPin, FiArrowRight } from 'react-icons/fi';

// Función hash simple para generar posiciones consistentes basadas en el título/ubicación
const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convertir a entero de 32 bits
    }
    return Math.abs(hash);
};

const Marker: React.FC<{ event: Event; onMarkerClick: (event: Event) => void; isActive: boolean }> = ({ event, onMarkerClick, isActive }) => {
    const top = (simpleHash(event.location) % 75) + 12; 
    const left = (simpleHash(event.title) % 80) + 10;

    return (
        <button
            onClick={() => onMarkerClick(event)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10 ${isActive ? 'scale-150' : 'hover:scale-125'}`}
            style={{ top: `${top}%`, left: `${left}%` }}
            aria-label={`Ver detalles de ${event.title}`}
        >
            <span className="relative flex h-5 w-5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isActive ? 'bg-cyan-400' : 'bg-indigo-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white shadow-[0_0_10px_rgba(2,230,245,0.5)] transition-colors duration-300 ${isActive ? 'bg-cyan-500' : 'bg-indigo-600'}`}></span>
            </span>
        </button>
    );
};

const EventPopup: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => {
    return (
        <div className="absolute top-6 left-6 right-6 sm:left-6 sm:right-auto z-30 w-auto max-w-sm bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden animate-slide-in-bottom sm:animate-fade-in group">
             {/* Barra de progreso decorativa superior */}
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent"></div>
             
             <div className="p-5 flex flex-col sm:flex-row gap-5">
                {/* Imagen del evento */}
                <div className="relative w-full sm:w-28 h-40 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                </div>

                {/* Información del evento */}
                <div className="flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex justify-between items-start">
                             <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">{event.title}</h3>
                             <button 
                                onClick={onClose} 
                                aria-label="Cerrar detalles del evento" 
                                className="p-1.5 -mr-1 -mt-1 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-all"
                             >
                                 <FiX className="w-5 h-5" />
                             </button>
                        </div>
                        
                        <div className="mt-3 space-y-1.5">
                            <p className="flex items-center text-[11px] font-bold text-gray-300 uppercase tracking-widest">
                                <FiCalendar className="mr-2 text-cyan-400" /> {event.date}
                            </p>
                            <p className="flex items-center text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                <FiMapPin className="mr-2 text-indigo-400" /> {event.location}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Link 
                            to={`/event/${event.id}`} 
                            className="inline-flex items-center justify-between w-full px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-cyan-400 transition-all shadow-lg active:scale-95"
                        >
                            Ver Detalles
                            <FiArrowRight className="ml-2 text-lg" />
                        </Link>
                    </div>
                </div>
             </div>
        </div>
    );
};

interface MapViewProps {
    events: Event[];
}

export const MapView: React.FC<MapViewProps> = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleMarkerClick = (event: Event) => {
        setSelectedEvent(event);
    };
    
    const handleClosePopup = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="relative w-full h-[75vh] md:h-[85vh] bg-slate-950 rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            {/* Mapa de fondo simulado con estética oscura */}
            <div className="absolute inset-0 bg-[#020617]">
                <img 
                    src="https://picsum.photos/seed/darkmap/1600/1200" 
                    alt="Mapa de eventos" 
                    className="w-full h-full object-cover opacity-20 grayscale brightness-50 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80"></div>
                
                {/* Patrón de cuadrícula tecnológica decorativa */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>
            
            {/* Marcadores de eventos */}
            <div className="relative z-10 w-full h-full">
                {events.map(event => (
                    <Marker 
                        key={event.id} 
                        event={event} 
                        onMarkerClick={handleMarkerClick} 
                        isActive={selectedEvent?.id === event.id}
                    />
                ))}
            </div>

            {/* Popup Detallado */}
            {selectedEvent && <EventPopup event={selectedEvent} onClose={handleClosePopup} />}
            
            {/* Controles del mapa (Decorativo) */}
            <div className="absolute bottom-10 right-10 z-20 flex flex-col gap-2">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col shadow-2xl">
                    <button className="w-10 h-10 flex items-center justify-center text-white hover:text-cyan-400 transition-colors font-bold">+</button>
                    <div className="h-[1px] bg-white/5 mx-2"></div>
                    <button className="w-10 h-10 flex items-center justify-center text-white hover:text-cyan-400 transition-colors font-bold">−</button>
                </div>
            </div>

            {/* Indicador de ubicación (Decorativo) */}
            <div className="absolute top-10 right-10 z-20">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2 text-[9px] font-black text-white uppercase tracking-[0.3em] flex items-center shadow-2xl">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 mr-3 animate-pulse"></span>
                    Live Scene: CDMX
                </div>
            </div>
        </div>
    );
};
