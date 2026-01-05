import React from 'react';

const colors = [
  '#1a1a1a', // Black
  '#4a4a4a', // Dark Gray
  '#ffffff', // White
  '#4ade80', // Green (Primary)
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#f59e0b', // Orange
  '#8b5cf6', // Purple
];

export const ColorPicker = ({ selectedColor, onSelect }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onSelect(color)}
          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor === color
            ? 'border-primary scale-110 shadow-[0_0_15px_hsl(142_76%_56%/0.5)]'
            : 'border-border hover:border-primary/50'
            }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
