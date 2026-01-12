
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Logo = () => (
    <img 
        src="/logos/deluxe-logo.png" 
        alt="Deluxe Logo" 
        className="h-20 w-auto drop-shadow-[0_0_20px_rgba(2,230,245,0.6)] animate-pulse"
    />
);

export const Preloader: React.FC<{ isExiting: boolean }> = ({ isExiting }) => {
    const { language } = useLanguage();
    const [messageIndex, setMessageIndex] = useState(0);
    
    const messages = language === 'es' ? [
        "Sintonizando el Beat...",
        "Preparando la Pista...",
        "Cargando Experiencia Deluxe...",
        "Conectando con la Escena..."
    ] : [
        "Tuning the Beat...",
        "Preparing the Floor...",
        "Loading Deluxe Experience...",
        "Connecting with the Scene..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#020617] transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}>
            <div className="relative flex flex-col items-center">
                <div className="absolute inset-0 bg-indigo-500/10 blur-[60px] rounded-full animate-pulse scale-150"></div>
                
                <div className="relative animate-bounce-slow">
                    <Logo />
                </div>

                <div className="mt-12 text-center">
                    <p className="text-white font-black text-xl tracking-[0.2em] uppercase mb-4 h-8">
                        {messages[messageIndex]}
                    </p>
                    
                    <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full animate-loading-slide"></div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-1 h-32 opacity-20 px-4 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-1 bg-indigo-500 rounded-t-full animate-wave"
                        style={{ 
                            height: `${20 + Math.random() * 60}%`,
                            animationDelay: `${i * 0.05}s`
                        }}
                    ></div>
                ))}
            </div>

            <style>{`
                @keyframes loading-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(300%); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes wave {
                    0%, 100% { height: 20%; }
                    50% { height: 80%; }
                }
                .animate-loading-slide {
                    animation: loading-slide 2s infinite linear;
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s infinite ease-in-out;
                }
                .animate-wave {
                    animation: wave 1.5s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};
