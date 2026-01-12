
import React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => (
    <img 
        src="/logos/deluxe-logo.png" 
        alt="Deluxe Logo" 
        className={`h-full w-auto object-contain ${className || ''}`}
        {...props}
    />
);
