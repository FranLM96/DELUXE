
import React from 'react';
import { MOCK_SESSIONS } from '../data/mockData';
import { Pagination } from '../components/ui/Pagination';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { FiPlayCircle } from 'react-icons/fi';

const Sessions: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4">
                <div className="text-center my-20 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">{t('sessions.title')}</h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        {t('sessions.desc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {MOCK_SESSIONS.map(session => (
                        <Link key={session.id} to="#" className="block group relative rounded-[2.5rem] overflow-hidden aspect-square border border-white/5 shadow-2xl">
                            <img src={session.imageUrl} alt={session.title} className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                               <FiPlayCircle className="h-20 w-20 text-white drop-shadow-2xl" />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-xl font-black uppercase tracking-tight text-white">{session.title}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mt-1">{session.date}</p>
                            </div>
                        </Link>
                    ))}
                    {MOCK_SESSIONS.slice(0, 3).map(session => (
                         <Link key={session.id + 'dup'} to="#" className="block group relative rounded-[2.5rem] overflow-hidden aspect-square border border-white/5 shadow-2xl">
                            <img src={session.imageUrl} alt={session.title} className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                               <FiPlayCircle className="h-20 w-20 text-white drop-shadow-2xl" />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <h3 className="text-xl font-black uppercase tracking-tight text-white">{session.title}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mt-1">{session.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Pagination />
            </div>
        </div>
    );
};

export default Sessions;
