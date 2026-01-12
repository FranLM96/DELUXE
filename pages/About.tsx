
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/ui/SEO';

const About: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="min-h-screen text-white">
            <SEO title={t('about.title')} description={t('about.p1')} />
            <div className="container mx-auto px-4 max-w-4xl">
                 <section className="relative h-[40vh] mb-12 flex items-center justify-center text-center rounded-[3rem] overflow-hidden shadow-2xl">
                    <img src="https://picsum.photos/seed/about-hero/1200/400" alt="Deluxe Experience" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/70"></div>
                    <div className="relative z-10 p-4">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{t('about.title')}</h1>
                        <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4 rounded-full"></div>
                    </div>
                </section>
                
                <section className="text-xl leading-relaxed space-y-8 mb-16 font-medium text-gray-300">
                    <p>{t('about.p1')}</p>
                    <p>{t('about.p2')}</p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="rounded-[2rem] overflow-hidden h-64 shadow-xl border border-white/5">
                        <img src="https://picsum.photos/seed/about1/600/400" alt="DJ mixing" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                    </div>
                    <div className="rounded-[2rem] overflow-hidden h-64 shadow-xl border border-white/5">
                        <img src="https://picsum.photos/seed/about2/600/400" alt="Deluxe crowd" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                    </div>
                </section>
                
                <section className="text-xl leading-relaxed space-y-8 mb-16 font-medium text-gray-300">
                    <p>{t('about.p3')}</p>
                    <p className="text-3xl font-black text-center py-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600 uppercase tracking-tight">
                        {t('about.motto')}
                    </p>
                </section>

                 <section className="my-16">
                     <img src="https://picsum.photos/seed/about3/1200/600" alt="Deluxe lifestyle" className="rounded-[3rem] w-full object-cover shadow-2xl border border-white/5" />
                 </section>
            </div>
        </div>
    );
};

export default About;
