import React from 'react';

export const ColorButton = ({ src, alt, color, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full h-auto transition-all hover:scale-105 active:scale-95 ${isSelected ? 'ring-2 ring-primary shadow-lg shadow-primary/50' : ''
            }`}
    >
        <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain"
            onError={(e) => {
                console.error(`Failed to load color image: ${alt}`);
                e.target.style.display = 'none';
            }}
        />
    </button>
);
