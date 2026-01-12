
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { SearchBar } from '../ui/SearchBar';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { FiMenu, FiSearch, FiX, FiLogOut, FiGrid, FiChevronDown, FiGlobe, FiHome, FiCalendar, FiPlayCircle, FiInfo } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaSpotify } from 'react-icons/fa';
import { HiTicket } from 'react-icons/hi2';

const Logo = () => (
    <img 
        src="/logos/deluxe-logo.png" 
        alt="Deluxe Logo" 
        className="h-20 w-auto drop-shadow-[0_0_12px_rgba(2,230,245,0.4)]"
    />
);

const NavItem: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => `
            relative px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300
            ${isActive ? 'text-white' : 'text-gray-500 hover:text-white'}
        `}
    >
        {children}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-400 transition-all duration-500 group-hover:w-full opacity-0 group-active:opacity-100"></span>
    </NavLink>
);

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700`}>
                <header className={`
                    container mx-auto px-8 py-4 flex items-center justify-between rounded-full transition-all duration-700
                    ${hasScrolled 
                        ? 'bg-slate-950/60 backdrop-blur-3xl border border-white/5 shadow-2xl scale-[0.98]' 
                        : 'bg-transparent border-transparent'}
                `}>
                    
                    <div className="flex-1">
                        <Link to="/" className="active:scale-95 transition-transform inline-block"><Logo /></Link>
                    </div>

                    <nav className="hidden lg:flex items-center">
                        <NavItem to="/">{t('nav.home')}</NavItem>
                        <NavItem to="/events">{t('nav.events')}</NavItem>
                        <NavItem to="/sessions">{t('nav.sessions')}</NavItem>
                        <NavItem to="/about">{t('nav.about')}</NavItem>
                    </nav>

                    <div className="flex-1 flex items-center justify-end gap-6">
                        <button 
                            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                            className="text-[9px] font-black text-gray-500 hover:text-white transition-colors"
                        >
                            {language.toUpperCase()}
                        </button>

                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="text-gray-400 hover:text-white transition-all"
                        >
                            <FiSearch className="h-5 w-5" />
                        </button>

                        <div className="hidden sm:block">
                            {user ? (
                                <Link to="/profile" className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all">
                                    <div className="w-6 h-6 rounded-full bg-cyan-400 text-black text-[10px] font-black flex items-center justify-center">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                                </Link>
                            ) : (
                                <Link to="/register">
                                    <button className="bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-cyan-400 transition-all">
                                        {t('nav.join')}
                                    </button>
                                </Link>
                            )}
                        </div>

                        <button 
                            onClick={() => setIsMenuOpen(true)} 
                            className="lg:hidden p-2 text-white bg-white/5 rounded-full"
                        >
                            <FiMenu className="h-6 w-6" />
                        </button>
                    </div>
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[100] opacity-0 animate-fadeIn"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-3/5 bg-slate-950/80 backdrop-blur-3xl border-l-2 border-cyan-400/20 shadow-2xl transform transition-all duration-500 ease-in-out flex flex-col z-[101] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">{t('nav.menu')}</h2>
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="p-3 bg-white/5 hover:bg-cyan-400/20 rounded-full hover:scale-110 transition-all duration-300"
                    >
                        <FiX className="h-6 w-6 text-white" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6 space-y-3">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all font-semibold"><FiHome /> {t('nav.home')}</Link>
                    <Link to="/events" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all font-semibold"><FiCalendar /> {t('nav.events')}</Link>
                    <Link to="/sessions" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all font-semibold"><FiPlayCircle /> {t('nav.sessions')}</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all font-semibold"><FiInfo /> {t('nav.about')}</Link>
                </nav>

                <div className="p-6 border-t border-white/10">
                    {user ? (
                        <div className="space-y-3">
                            <Link 
                                to="/profile" 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-4 px-4 py-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-semibold"
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 text-black text-lg font-black flex items-center justify-center flex-shrink-0">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <span className="font-bold">{user.name}</span>
                                    <span className="block text-xs text-gray-400">Ver Perfil</span>
                                </div>
                            </Link>
                            <button 
                                onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }}
                                className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-semibold"
                            >
                                <FiLogOut />
                                {t('nav.logout')}
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to="/register" 
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-center px-6 py-4 bg-gradient-to-r from-cyan-400 to-indigo-600 text-black rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all font-bold uppercase tracking-widest"
                        >
                            {t('nav.join')}
                        </Link>
                    )}
                </div>

                <div className="p-6 border-t border-white/10 text-center">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors hover:scale-110"><FaFacebookF size={22} /></a>
                        <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors hover:scale-110"><FaInstagram size={22} /></a>
                        <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors hover:scale-110"><FaSpotify size={22} /></a>
                    </div>
                    <button 
                        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-xs font-semibold border border-white/10 hover:border-white/20"
                    >
                        <FiGlobe />
                        {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    </button>
                </div>
            </div>

            {/* Search Modal */}
            {isSearchOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                    onClick={() => setIsSearchOpen(false)}
                />
            )}

            <div className={`fixed top-20 left-0 right-0 z-50 px-8 transform transition-all duration-300 ${isSearchOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                <div className="container mx-auto max-w-2xl">
                    <SearchBar onClose={() => setIsSearchOpen(false)} />
                </div>
            </div>
        </>
    );
};
