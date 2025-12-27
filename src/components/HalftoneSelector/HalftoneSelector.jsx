import React from 'react';

const halftonePatterns = [
  { id: null, name: 'None', preview: null },
  { id: 'dots', name: 'Dots', preview: 'radial-gradient(circle, #4ade80 1px, transparent 1px)' },
  { id: 'lines', name: 'Lines', preview: 'repeating-linear-gradient(45deg, #4ade80, #4ade80 2px, transparent 2px, transparent 6px)' },
  { id: 'grid', name: 'Grid', preview: 'repeating-linear-gradient(0deg, #4ade80, #4ade80 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, #4ade80, #4ade80 1px, transparent 1px, transparent 4px)' },
];

export const HalftoneSelector = ({ isOpen, onClose, selected, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 panel-cyber p-3 z-20 min-w-[200px]">
      <h4 className="font-display text-sm text-foreground mb-3">Halftone Effect</h4>
      <div className="grid grid-cols-2 gap-2">
        {halftonePatterns.map((pattern) => (
          <button
            key={pattern.id || 'none'}
            onClick={() => {
              onSelect(pattern.id);
              onClose();
            }}
            className={`aspect-square rounded-lg border-2 transition-all duration-300 overflow-hidden ${
              selected === pattern.id 
                ? 'border-primary shadow-[0_0_15px_hsl(142_76%_56%/0.5)]' 
                : 'border-border hover:border-primary/50'
            }`}
          >
            {pattern.preview ? (
              <div 
                className="w-full h-full bg-card"
                style={{ 
                  backgroundImage: pattern.preview,
                  backgroundSize: '8px 8px'
                }}
              />
            ) : (
              <div className="w-full h-full bg-card flex items-center justify-center text-muted-foreground text-xs">
                None
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
