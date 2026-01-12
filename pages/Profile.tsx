
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DatosTab } from '../components/profile/DatosTab';
import { BoletosTab } from '../components/profile/BoletosTab';
import { CarteraTab } from '../components/profile/CarteraTab';
import { AyudaTab } from '../components/profile/AyudaTab';
import { useLanguage } from '../context/LanguageContext';

type Tab = 'Datos' | 'Boletos' | 'Cartera' | 'Ayuda';

export const Profile: React.FC = () => {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = (searchParams.get('tab') as Tab) || 'Boletos';
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);
    
    const tabs: Tab[] = ['Datos', 'Boletos', 'Cartera', 'Ayuda'];

    useEffect(() => {
        const tab = searchParams.get('tab') as Tab;
        if (tab && tabs.includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Datos': return <DatosTab />;
            case 'Boletos': return <BoletosTab />;
            case 'Cartera': return <CarteraTab />;
            case 'Ayuda': return <AyudaTab />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4">
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-center my-16">{t('profile.title')}</h1>
                
                <div className="border-b border-white/10 mb-12">
                    <nav className="-mb-px flex space-x-10 justify-center overflow-x-auto scrollbar-hide" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-cyan-400 text-cyan-400'
                                        : 'border-transparent text-gray-500 hover:text-white'
                                } whitespace-nowrap py-4 px-2 border-b-2 font-black text-[10px] uppercase tracking-[0.3em] transition-all focus:outline-none`}
                            >
                                {t(`profile.tabs.${tab.toLowerCase()}` as any)}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="animate-fade-in">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Profile;
