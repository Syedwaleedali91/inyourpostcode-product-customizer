import React from 'react';
import Draggable from 'react-draggable';
import { QRCodeSVG } from 'qrcode.react';

export const ShirtCanvas = ({ 
  layers, 
  selectedLayerId, 
  onSelectLayer, 
  onUpdateLayer,
  shirtColor,
  side 
}) => {
  const renderLayer = (layer) => {
    const handleDrag = (e, data) => {
      onUpdateLayer(layer.id, { x: data.x, y: data.y });
    };

    const style = {
      width: layer.width,
      height: layer.type === 'text' ? 'auto' : layer.height,
      transform: `rotate(${layer.rotation}deg)`,
      filter: `brightness(${layer.effects?.brightness || 100}%) contrast(${layer.effects?.contrast || 100}%)`,
    };

    const halftoneStyle = layer.effects?.halftone ? {
      backgroundImage: layer.effects.halftone === 'dots' 
        ? 'radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)'
        : layer.effects.halftone === 'lines'
        ? 'repeating-linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 2px, transparent 2px, transparent 6px)'
        : 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 4px)',
      backgroundSize: '8px 8px',
    } : {};

    return (
      <Draggable
        key={layer.id}
        position={{ x: layer.x, y: layer.y }}
        onDrag={handleDrag}
        onStart={() => onSelectLayer(layer.id)}
        bounds="parent"
      >
        <div
          onClick={() => onSelectLayer(layer.id)}
          className={`absolute cursor-move ${
            selectedLayerId === layer.id 
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-transparent' 
              : ''
          }`}
          style={style}
        >
          {layer.type === 'image' && (
            <div className="relative w-full h-full" style={halftoneStyle}>
              <img 
                src={layer.content} 
                alt="Layer" 
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
              {layer.effects?.halftone && (
                <div className="absolute inset-0" style={halftoneStyle} />
              )}
            </div>
          )}
          {layer.type === 'text' && (
            <div
              className="whitespace-nowrap font-display font-bold pointer-events-none"
              style={{ 
                fontSize: layer.fontSize || 24,
                color: layer.color || '#4ade80',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                ...halftoneStyle,
              }}
            >
              {layer.content}
            </div>
          )}
          {layer.type === 'qrcode' && (
            <div className="bg-white p-2 rounded" style={halftoneStyle}>
              <QRCodeSVG 
                value={layer.content} 
                size={layer.width - 16}
                bgColor="white"
                fgColor="#1a1a1a"
              />
            </div>
          )}
        </div>
      </Draggable>
    );
  };

  return (
    <div className="relative flex-1 flex items-center justify-center py-8">
      {/* Glow platform effect */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full opacity-80" 
           style={{ 
             background: 'radial-gradient(ellipse at center, hsl(142 76% 56% / 0.6) 0%, hsl(142 76% 56% / 0.3) 30%, transparent 70%)',
             filter: 'blur(20px)',
           }} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 rounded-full"
           style={{
             background: 'radial-gradient(ellipse at center, hsl(142 76% 56% / 0.8) 0%, transparent 70%)',
             filter: 'blur(8px)',
           }} />
      
      {/* Shirt/Hoodie */}
      <div className="relative">
        <svg 
          viewBox="0 0 300 400" 
          className="w-64 md:w-80 h-auto drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
        >
          {/* Hoodie body */}
          <path
            d="M50 100 Q50 80 80 70 L100 60 Q150 45 200 60 L220 70 Q250 80 250 100 L250 380 Q250 395 235 395 L65 395 Q50 395 50 380 Z"
            fill={shirtColor}
            stroke="#333"
            strokeWidth="2"
          />
          {/* Hood */}
          <path
            d="M80 70 Q80 20 150 10 Q220 20 220 70"
            fill={shirtColor === '#ffffff' ? '#e5e5e5' : shirtColor}
            stroke="#333"
            strokeWidth="2"
          />
          {/* Hood inner */}
          <ellipse
            cx="150"
            cy="65"
            rx="50"
            ry="35"
            fill="#4ade80"
          />
          {/* Left sleeve */}
          <path
            d="M50 100 L20 180 Q15 200 30 210 L60 200 L50 120"
            fill={shirtColor}
            stroke="#333"
            strokeWidth="2"
          />
          {/* Right sleeve */}
          <path
            d="M250 100 L280 180 Q285 200 270 210 L240 200 L250 120"
            fill={shirtColor}
            stroke="#333"
            strokeWidth="2"
          />
          {/* Pocket */}
          <path
            d="M100 280 L200 280 L200 340 Q200 360 180 360 L120 360 Q100 360 100 340 Z"
            fill="none"
            stroke="#333"
            strokeWidth="1.5"
          />
          {/* Center line */}
          <line x1="150" y1="70" x2="150" y2="280" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
          {/* Drawstrings */}
          <path d="M130 70 L125 140" stroke="#4ade80" strokeWidth="3" />
          <path d="M170 70 L175 140" stroke="#4ade80" strokeWidth="3" />
        </svg>
        
        {/* Design area overlay */}
        <div 
          className="absolute top-[85px] left-1/2 -translate-x-1/2 w-32 h-40 md:w-40 md:h-48"
          style={{ pointerEvents: 'all' }}
        >
          {layers.map(renderLayer)}
        </div>
        
        {/* Side indicator */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-primary font-display text-sm uppercase tracking-wider">
          {side}
        </div>
      </div>
    </div>
  );
};
