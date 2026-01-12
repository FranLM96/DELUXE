
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EventCard } from '../components/ui/EventCard';
import { SEO } from '../components/ui/SEO';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_EVENTS, MOCK_SESSIONS } from '../data/mockData';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { FaTicketAlt } from 'react-icons/fa';

const Home: React.FC = () => {
    const { t } = useLanguage();
    const featuredEvents = MOCK_EVENTS.slice(0, 3);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredEvents.length);
    }, [featuredEvents.length]);

    useEffect(() => {
        const timer = setTimeout(goToNext, 8000);
        return () => clearTimeout(timer);
    }, [currentIndex, goToNext]);

    return (
        <div className="text-white">
            <SEO title={t('nav.home')} description="Deluxe: Elite Music Experience." />
            
            {/* Massive Hero Section */}
            <section className="relative h-screen flex items-center justify-start -mt-36 lg:-mt-44 overflow-hidden px-6 lg:px-20">
                {featuredEvents.map((event, index) => (
                    <div
                        key={event.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img 
                          src={event.imageUrl} 
                          className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'} brightness-[0.4]`}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="relative z-10 max-w-4xl pt-20">
                    <p className="text-cyan-400 font-black tracking-[0.4em] uppercase text-[10px] mb-6 reveal">Deluxe Premium Series</p>
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase reveal" style={{ animationDelay: '0.2s' }}>
                        {featuredEvents[currentIndex].title}
                    </h1>
                    <div className="flex items-center gap-10 mb-12 reveal" style={{ animationDelay: '0.4s' }}>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">When</span>
                            <span className="text-xl font-black uppercase tracking-tight">{featuredEvents[currentIndex].date}</span>
                        </div>
                        <div className="w-[1px] h-10 bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Where</span>
                            <span className="text-xl font-black uppercase tracking-tight">{featuredEvents[currentIndex].location}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 reveal" style={{ animationDelay: '0.6s' }}>
                        <Link to={`/event/${featuredEvents[currentIndex].id}`}>
                            <Button variant="primary">
                                {t('home.hero_cta')} <FiArrowRight className="ml-3 text-lg" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-20 left-6 lg:left-20 flex gap-4 z-20">
                    {featuredEvents.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1 transition-all duration-700 ${index === currentIndex ? 'w-24 bg-cyan-400' : 'w-8 bg-white/20'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Billboard Grid */}
            <section className="py-32 container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Cartelera Elite</p>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">{t('home.billboard_title')}</h2>
                    </div>
                    <Link to="/events">
                        <Button variant="outline">{t('home.explore_all')}</Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_EVENTS.slice(0, 4).map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>

            {/* Premium Sessions Layout */}
            <section className="py-32 bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">{t('home.sessions_title')}</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Pure Audio Immersion</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 h-[700px]">
                        <div className="lg:col-span-7 h-full">
                            <Link to="/sessions" className="block h-full group relative rounded-[3rem] overflow-hidden">
                                <img src={MOCK_SESSIONS[0].imageUrl} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500">
                                        <FiPlay className="w-10 h-10 text-white fill-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-12 left-12">
                                    <h3 className="text-4xl font-black uppercase tracking-tight mb-2">{MOCK_SESSIONS[0].title}</h3>
                                    <p className="text-cyan-400 font-black tracking-widest uppercase text-xs">{MOCK_SESSIONS[0].date}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="lg:col-span-5 grid grid-rows-2 gap-10">
                            {MOCK_SESSIONS.slice(1, 3).map(session => (
                                <Link key={session.id} to="/sessions" className="block group relative rounded-[3rem] overflow-hidden">
                                    <img src={session.imageUrl} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-slate-950/60 flex items-center p-12">
                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{session.title}</h3>
                                            <p className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">{session.date}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
