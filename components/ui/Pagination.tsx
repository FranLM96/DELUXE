
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Pagination: React.FC = () => {
    const pages = [1, 2, 3];
    const currentPage = 1;

    return (
        <nav className="flex justify-center items-center space-x-4 my-24">
            <button className="p-4 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                <FiChevronLeft className="h-6 w-6" />
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    className={`w-14 h-14 rounded-full font-black text-xs transition-all tracking-tighter ${currentPage === page ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'}`}
                >
                    {page.toString().padStart(2, '0')}
                </button>
            ))}
            <button className="p-4 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                <FiChevronRight className="h-6 w-6" />
            </button>
        </nav>
    );
};
