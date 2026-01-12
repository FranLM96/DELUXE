
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            <Header />
            <main className="flex-grow">
                {/* 
                  Espaciador superior para respetar la altura del header fijo
                */}
                <div className="pt-36 lg:pt-44">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
