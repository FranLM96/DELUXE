
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../ui/Logo';
import { SearchBar } from '../ui/SearchBar';
import { FiMenu, FiSearch, FiX, FiLogOut, FiGlobe, FiHome, FiCalendar, FiPlayCircle, FiInfo } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaSpotify } from 'react-icons/fa';

const NavItem: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => `
            relative py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300
            ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
        `}
    >
        {children}
    </NavLink>
);

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`
                fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out
                ${hasScrolled ? 'py-3 bg-slate-950/80 backdrop-blur-2xl shadow-2xl shadow-black/20' : 'py-6 bg-transparent'}
            `}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="h-14 w-auto active:scale-95 transition-transform">
                        <Logo className="drop-shadow-[0_0_12px_rgba(2,230,245,0.4)]" />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8">
                        <NavItem to="/">{t('nav.home')}</NavItem>
                        <NavItem to="/events">{t('nav.events')}</NavItem>
                        <NavItem to="/sessions">{t('nav.sessions')}</NavItem>
                        <NavItem to="/about">{t('nav.about')}</NavItem>
                    </nav>

                    <div className="hidden lg:flex items-center justify-end gap-4">
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="p-3 text-gray-400 hover:text-white transition-colors"
                            aria-label="Search"
                        >
                            <FiSearch className="h-5 w-5" />
                        </button>

                        <div className="w-px h-6 bg-white/10"></div>

                        {user ? (
                            <Link to="/profile" className="flex items-center gap-3 rounded-full hover:bg-white/10 p-1 pr-4 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 text-black text-sm font-black flex items-center justify-center">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider">{user.name.split(' ')[0]}</span>
                            </Link>
                        ) : (
                            <Link to="/register">
                                <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                                    {t('nav.join')}
                                </button>
                            </Link>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => setIsMenuOpen(true)} 
                        className="lg:hidden p-2 text-white"
                        aria-label="Open menu"
                    >
                        <FiMenu className="h-7 w-7" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100]"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transform transition-all duration-300 ease-out flex flex-col z-[101] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-white">{t('nav.menu')}</h2>
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="p-2"
                        aria-label="Close menu"
                    >
                        <FiX className="h-6 w-6 text-white" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"><FiHome /> {t('nav.home')}</Link>
                    <Link to="/events" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"><FiCalendar /> {t('nav.events')}</Link>
                    <Link to="/sessions" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"><FiPlayCircle /> {t('nav.sessions')}</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 px-4 py-3 text-white hover:bg-white/5 rounded-lg transition-colors"><FiInfo /> {t('nav.about')}</Link>
                </nav>

                <div className="p-6 border-t border-white/10">
                    {user ? (
                        <div className="space-y-3">
                            <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 text-black text-sm font-black flex items-center justify-center flex-shrink-0">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <span className="font-semibold text-sm">{user.name}</span>
                                    <span className="block text-xs text-gray-400">View Profile</span>
                                </div>
                            </Link>
                            <button onClick={() => { logout(); setIsMenuOpen(false); navigate('/'); }} className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm">
                                <FiLogOut /> {t('nav.logout')}
                            </button>
                        </div>
                    ) : (
                        <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block w-full text-center p-4 bg-cyan-500 text-black rounded-lg font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors">
                            {t('nav.join')}
                        </Link>
                    )}
                </div>

                <div className="p-6 border-t border-white/10 text-center space-y-4">
                     <div className="flex justify-center gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><FaFacebookF size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><FaInstagram size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><FaSpotify size={20} /></a>
                    </div>
                    <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white">
                        <FiGlobe /> {language === 'es' ? 'English' : 'Español'}
                    </button>
                </div>
            </div>

            {/* Search Modal */}
            <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSearchOpen(false)} />
            <div className={`fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg p-4 z-[120] transition-all ${isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
        </>
    );
};
