
import React from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4.5] shadow-2xl border border-white/5 transition-all duration-700 hover:border-cyan-400/50">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col justify-end p-8 h-full">
          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {event.location}
          </p>
          <h3 className="text-3xl font-black text-white leading-none uppercase tracking-tighter mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {event.title}
          </h3>
          <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest border-t border-white/10 pt-4">
            <span>{event.date}</span>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <span className="truncate">{event.lineup[0]} + {event.lineup.length - 1} artists</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
