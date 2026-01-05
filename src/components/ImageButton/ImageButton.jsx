import React from 'react';

export const ImageButton = ({ src, alt, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`w-full h-auto transition-all hover:scale-105 active:scale-95 ${className}`}
    >
        <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain"
            onError={(e) => {
                console.error(`Failed to load image: ${alt}`);
                e.target.style.display = 'none';
            }}
        />
    </button>
);
