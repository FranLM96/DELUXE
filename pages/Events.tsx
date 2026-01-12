
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EventCard } from '../components/ui/EventCard';
import { Pagination } from '../components/ui/Pagination';
import { MOCK_EVENTS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { FiFilter, FiX } from 'react-icons/fi';

interface FilterButtonProps {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ isActive, onClick, children }) => {
    const baseClasses = 'w-full text-left py-3 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all focus:outline-none';
    const activeClasses = 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(2,230,245,0.3)]';
    const inactiveClasses = 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white';
    
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};

const Events: React.FC = () => {
    const { t } = useLanguage();
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        document.body.style.overflow = isFilterPanelOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isFilterPanelOpen]);

    const uniqueLocations = useMemo(() => 
        ['all', ...new Set(MOCK_EVENTS.map(event => event.location))], 
    []);
    
    const uniqueMonths = useMemo(() => 
        ['all', ...new Set(MOCK_EVENTS.map(event => event.date.split(' ')[1]))],
    []);

    const filteredEvents = useMemo(() => {
        return MOCK_EVENTS.filter(event => {
            const locationMatch = selectedLocation === 'all' || event.location === selectedLocation;
            const monthMatch = selectedMonth === 'all' || event.date.split(' ')[1] === selectedMonth;
            
            const searchMatch = searchQuery === '' ||
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.lineup.join(' ').toLowerCase().includes(searchQuery.toLowerCase());

            return locationMatch && monthMatch && searchMatch;
        });
    }, [selectedLocation, selectedMonth, searchQuery]);

    const clearFilters = () => {
        setSelectedLocation('all');
        setSelectedMonth('all');
    };

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4">
                
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 mb-16">
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">{t('events.title')}</h1>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsFilterPanelOpen(true)} 
                            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest py-3 px-6 rounded-2xl border border-white/10 transition-all"
                        >
                            <FiFilter className="h-5 w-5 text-cyan-400" />
                            {t('events.filters')}
                        </button>
                    </div>
                </div>

                {searchQuery && (
                    <div className="text-center mb-12 -mt-4">
                        <p className="text-xl text-gray-400 font-medium">
                            {t('events.search_results')} <span className="font-black text-white italic">"{searchQuery}"</span>
                        </p>
                    </div>
                )}

                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                        <p className="text-2xl text-gray-400 font-bold">{t('events.no_results')}</p>
                        <Button variant="secondary" onClick={clearFilters} className="mt-8">
                            {t('events.clear_filters')}
                        </Button>
                    </div>
                )}
                
                <Pagination />
            </div>

            {/* Panel de Filtros */}
            <div 
                role="dialog"
                className={`fixed inset-0 z-[200] transition-all duration-500 ${isFilterPanelOpen ? 'visible' : 'invisible'}`}
            >
                <div 
                    className={`absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity duration-500 ${isFilterPanelOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsFilterPanelOpen(false)}
                ></div>

                <div 
                    className={`absolute top-0 right-0 h-full w-full max-w-sm bg-slate-900 border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isFilterPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex justify-between items-center p-8 border-b border-white/5">
                        <h2 className="text-2xl font-black uppercase tracking-tighter">{t('events.filters')}</h2>
                        <button onClick={() => setIsFilterPanelOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
                            <FiX className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-8 space-y-10 overflow-y-auto flex-grow">
                        <div>
                            <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-4">{t('events.location')}</h3>
                            <div className="space-y-2">
                                {uniqueLocations.map(location => (
                                    <FilterButton
                                        key={location}
                                        isActive={selectedLocation === location}
                                        onClick={() => setSelectedLocation(location)}
                                    >
                                        {location === 'all' ? t('events.all') : location}
                                    </FilterButton>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">{t('events.month')}</h3>
                            <div className="space-y-2">
                                {uniqueMonths.map(month => (
                                    <FilterButton
                                        key={month}
                                        isActive={selectedMonth === month}
                                        onClick={() => setSelectedMonth(month)}
                                    >
                                        {month === 'all' ? t('events.all') : month}
                                    </FilterButton>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-8 border-t border-white/5 flex gap-4">
                        <button
                            onClick={clearFilters}
                            className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
                        >
                            {t('events.clear_filters')}
                        </button>
                         <Button 
                            onClick={() => setIsFilterPanelOpen(false)}
                            className="flex-1 rounded-2xl"
                        >
                            {t('events.view_results')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
