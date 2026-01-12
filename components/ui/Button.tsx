
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-black uppercase tracking-[0.2em] text-[10px] py-4 px-8 rounded-full transition-all duration-500 overflow-hidden active:scale-95 disabled:opacity-30 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    secondary: 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]',
    outline: 'bg-transparent border border-white/10 text-white hover:border-white/40 hover:bg-white/5',
    ghost: 'bg-transparent text-gray-500 hover:text-white',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
