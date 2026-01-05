import React, { useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { QRCodeSVG } from 'qrcode.react';
import group7Image from '@/assets/Group 7.png';
import groupImage from '@/assets/Group.png';

export const ShirtCanvas = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  onDeleteLayer,
  shirtColor,
  side,
  productImage
}) => {
  const canvasRef = useRef(null);

  // Handle keyboard delete
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedLayerId) {
        e.preventDefault();
        if (onDeleteLayer && typeof onDeleteLayer === 'function') {
          onDeleteLayer(selectedLayerId);
        } else {
          console.error('onDeleteLayer function is not provided or not a function');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLayerId, onDeleteLayer]);

  const renderLayer = (layer) => {
    const handleDrag = (e, data) => {
      onUpdateLayer(layer.id, { x: data.x, y: data.y });
    };

    const handleResize = (e, corner) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = layer.width;
      const startHeight = layer.height;
      const startPosX = layer.x;
      const startPosY = layer.y;

      const handleMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = startPosX;
        let newY = startPosY;

        // Calculate new dimensions based on corner
        if (corner.includes('right')) {
          newWidth = Math.max(30, startWidth + deltaX);
        }
        if (corner.includes('left')) {
          newWidth = Math.max(30, startWidth - deltaX);
          newX = startPosX + (startWidth - newWidth);
        }
        if (corner.includes('bottom')) {
          newHeight = Math.max(30, startHeight + deltaY);
        }
        if (corner.includes('top')) {
          newHeight = Math.max(30, startHeight - deltaY);
          newY = startPosY + (startHeight - newHeight);
        }

        // Maintain aspect ratio for images
        if (layer.type === 'image' && e.shiftKey) {
          const aspectRatio = startWidth / startHeight;
          newHeight = newWidth / aspectRatio;
        }

        onUpdateLayer(layer.id, {
          width: newWidth,
          height: layer.type === 'text' ? 'auto' : newHeight,
          x: newX,
          y: newY
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleRotate = (e) => {
      e.stopPropagation();
      e.preventDefault();

      const rect = e.currentTarget.parentElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const startRotation = layer.rotation || 0;

      const handleMouseMove = (moveEvent) => {
        const currentAngle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
        const angleDiff = ((currentAngle - startAngle) * 180) / Math.PI;
        const newRotation = (startRotation + angleDiff) % 360;
        onUpdateLayer(layer.id, { rotation: newRotation });
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
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
          className={`absolute cursor-move select-none`}
          style={style}
        >
          {/* Layer Content */}
          {layer.type === 'image' && (
            <div className="relative w-full h-full" style={halftoneStyle}>
              <img
                src={layer.content}
                alt="Layer"
                className="w-full h-full object-contain pointer-events-none select-none"
                draggable={false}
              />
              {layer.effects?.halftone && (
                <div className="absolute inset-0" style={halftoneStyle} />
              )}
            </div>
          )}
          {layer.type === 'text' && (
            <div
              className="whitespace-nowrap font-display font-bold pointer-events-none select-none"
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

          {/* Resize Handles - Only show for selected layer */}
          {selectedLayerId === layer.id && (
            <>
              {/* Corner Handles */}
              <div
                className="absolute -top-1 -left-1 w-3 h-3 bg-primary rounded-full cursor-nwse-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'top-left')}
              />
              <div
                className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full cursor-nesw-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'top-right')}
              />
              <div
                className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary rounded-full cursor-nesw-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'bottom-left')}
              />
              <div
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary rounded-full cursor-nwse-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'bottom-right')}
              />

              {/* Edge Handles */}
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full cursor-ns-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'top')}
              />
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full cursor-ns-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'bottom')}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-3 bg-primary rounded-full cursor-ew-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'left')}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 bg-primary rounded-full cursor-ew-resize border-2 border-white shadow-lg z-10"
                onMouseDown={(e) => handleResize(e, 'right')}
              />

              {/* Rotate Handle */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full cursor-grab active:cursor-grabbing border-2 border-white shadow-lg z-10 flex items-center justify-center"
                onMouseDown={handleRotate}
                title="Rotate (click and drag)"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>

              {/* Delete Button */}
              <button
                className="absolute -top-8 -right-8 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full text-white font-bold shadow-lg z-10 flex items-center justify-center transition-colors cursor-pointer"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (onDeleteLayer && typeof onDeleteLayer === 'function') {
                    onDeleteLayer(layer.id);
                  } else {
                    console.error('onDeleteLayer function is not provided or not a function');
                  }
                }}
                title="Delete (or press Delete key)"
              >
                ×
              </button>
            </>
          )}
        </div>
      </Draggable>
    );
  };

  return (
    <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 w-full" style={{ minHeight: '100vh' }}>

      {/* Glow Platform Effect - Group 7.png ONLY */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">

        {/* Group 7.png - The Main Platform Glow */}
        <img
          src={group7Image}
          alt="Platform glow effect"
          className="max-w-none"
          style={{
            width: '600px',
            height: 'auto',
            objectFit: 'contain',
            opacity: 1,
            mixBlendMode: 'normal',
            transform: 'translateY(-20px)',
          }}
        />
      </div>

      {/* Shirt/Hoodie or Product Image - PROPERLY SIZED TO FIT */}
      <div className="relative z-10 w-full max-w-md md:max-w-lg flex items-center justify-center" style={{ maxHeight: '85vh' }} ref={canvasRef}>
        {productImage ? (
          // Display product image as the canvas - FITS IN VIEWPORT
          <div
            className="relative w-full h-auto drop-shadow-2xl bg-cover bg-center rounded-lg overflow-visible"
            style={{
              aspectRatio: '1 / 1.3',
              backgroundImage: `url(${productImage})`,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              pointerEvents: 'none',
              maxHeight: '85vh',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            {/* Design area overlay for product image - FULL SHIRT COVERAGE */}
            <div
              className="absolute inset-0"
              style={{ pointerEvents: 'all' }}
            >
              {layers.map(renderLayer)}
            </div>
          </div>
        ) : (
          // Display default SVG shirt - FITS IN VIEWPORT
          <svg
            viewBox="0 0 300 400"
            className="w-full h-auto drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))', maxHeight: '85vh' }}
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
        )}

        {/* Design area overlay for SVG shirt - FULL SHIRT COVERAGE */}
        {!productImage && (
          <div
            className="absolute inset-0"
            style={{ pointerEvents: 'all' }}
          >
            {layers.map(renderLayer)}
          </div>
        )}

        {/* Side indicator */}

      </div>

      {/* Instructions tooltip */}
      {/* {selectedLayerId && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xl z-50 backdrop-blur-sm">
          <div className="flex flex-col gap-1">
            <div>🖱️ Drag to move | 🔄 Blue handle to rotate</div>
            <div>⬜ Corner/Edge handles to resize | Hold Shift for aspect ratio</div>
            <div>🗑️ Delete key or ❌ button to remove</div>
          </div>
        </div>
      )} */}
    </div>
  );
};