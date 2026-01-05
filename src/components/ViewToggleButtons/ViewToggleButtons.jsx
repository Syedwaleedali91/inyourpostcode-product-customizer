import React from 'react';

export const ViewToggleButtons = ({ currentSide, onSideChange }) => {
    const buttons = [
        { id: 'front', label: 'FRONT' },
        { id: 'right-sleeve', label: 'RIGHT SLEEVE' },
        { id: 'back', label: 'BACK' },
        { id: 'left-sleeve', label: 'LEFT SLEEVE' }
    ];

    return (
        <div className="flex items-center gap-3 mt-1">
            {buttons.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => onSideChange(id)}
                    className={`px-3 py-1 rounded border-2 transition-all ${currentSide === id
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-primary/50 text-white hover:border-primary'
                        }`}
                >
                    <span className="font-arcade  ">{label}</span>
                    
                </button>
            ))}
        </div>
    );
};
