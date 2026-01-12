
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FaFacebookF, FaInstagram, FaSpotify } from 'react-icons/fa';

const FooterNavSection: React.FC<{ title: string; links: { name: string; path: string }[] }> = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">{title}</h3>
    <ul className="space-y-3">
      {links.map(link => (
        <li key={link.name}>
            <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">{link.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    
    const navLinks = {
        navigation: [
            { name: t('nav.home'), path: "/" },
            { name: t('nav.events'), path: "/events" },
            { name: t('nav.sessions'), path: "/sessions" },
            { name: t('nav.about'), path: "/about" },
            { name: t('nav.profile'), path: "/profile" },
        ],
        information: [
            { name: "Términos y Condiciones", path: "/terms" },
            { name: "Aviso de Privacidad", path: "/privacy" },
            { name: "Términos de Compra", path: "/purchase-terms" },
        ],
        contact: [
             { name: "Ayuda / Contacto", path: "/contact" },
        ]
    };
    
    return (
        <footer className="bg-slate-950 text-white py-16 px-4 mt-20 border-t border-white/5">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="md:col-span-2 lg:col-span-1">
                    <h3 className="font-bold text-lg mb-4 uppercase tracking-wider">{t('footer.join_beat')}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{t('footer.newsletter_desc')}</p>
                     <form className="flex">
                        <input 
                            type="email" 
                            placeholder="email@example.com" 
                            className="w-full bg-slate-900 border border-white/10 rounded-l-2xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                        />
                        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-r-2xl transition-colors">
                            ›
                        </button>
                    </form>
                </div>

                <FooterNavSection title={t('footer.nav_title')} links={navLinks.navigation} />
                <FooterNavSection title={t('footer.info_title')} links={navLinks.information} />
                <FooterNavSection title={t('footer.support_title')} links={navLinks.contact} />

            </div>

            <div className="container mx-auto mt-12 pt-8 border-t border-white/5 text-center">
                 <div className="flex justify-center space-x-8 mb-6">
                    <a href="#" className="text-gray-500 hover:text-white transition-colors hover:scale-110"><FaFacebookF size={22} /></a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors hover:scale-110"><FaInstagram size={22} /></a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors hover:scale-110"><FaSpotify size={22} /></a>
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">&copy; {new Array(new Date().getFullYear())} {t('footer.rights')}</p>
            </div>
        </footer>
    );
};
