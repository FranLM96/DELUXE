
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import type { Event } from '../../types';
import { FiSearch } from 'react-icons/fi';

export const SearchBar: React.FC<{ onSearch?: () => void; onClose?: () => void; autoFocus?: boolean; }> = ({ onSearch, onClose, autoFocus }) => {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('search') || '');
    const [suggestions, setSuggestions] = useState<Event[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);
    useEffect(() => { setQuery(searchParams.get('search') || ''); }, [searchParams]);

    useEffect(() => {
        if (query.trim().length > 1 && isFocused) {
            const lowerCaseQuery = query.toLowerCase();
            const filteredEvents = MOCK_EVENTS.filter(event =>
                event.title.toLowerCase().includes(lowerCaseQuery) ||
                event.lineup.some(artist => artist.toLowerCase().includes(lowerCaseQuery))
            ).slice(0, 5);
            setSuggestions(filteredEvents);
        } else {
            setSuggestions([]);
        }
    }, [query, isFocused]);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
                onClose?.();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuggestions([]);
        setIsFocused(false);
        onSearch?.();
        if (query.trim()) {
            navigate(`/events?search=${encodeURIComponent(query.trim())}`);
        } else {
            navigate('/events');
        }
    };

    return (
        <div ref={searchContainerRef} className="relative w-full">
            <form onSubmit={handleSearchSubmit} className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    placeholder={t('nav.search_placeholder')}
                    className="w-full bg-slate-800/50 backdrop-blur-3xl border border-white/10 text-white rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium text-lg"
                    aria-label="Search"
                    autoComplete="off"
                />
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <FiSearch className="h-6 w-6 text-gray-500" />
                </div>
            </form>
            
            {isFocused && suggestions.length > 0 && (
                <div className="absolute top-full mt-4 w-full bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-50 overflow-hidden animate-slide-in-bottom">
                    <ul>
                        {suggestions.map(event => (
                            <li key={event.id}>
                                <Link
                                    to={`/event/${event.id}`}
                                    onClick={() => { setQuery(''); setIsFocused(false); onSearch?.(); }}
                                    className="flex items-center gap-6 p-4 hover:bg-white/5 transition-all group"
                                >
                                    <img src={event.imageUrl} alt={event.title} className="w-16 h-20 object-cover rounded-xl shadow-lg" />
                                    <div className="overflow-hidden">
                                        <p className="font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">{event.title}</p>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{event.date} &bull; {event.location}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
