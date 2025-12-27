import React from 'react';
import { Move, RotateCw, Maximize2 } from 'lucide-react';

export const AttributesBar = ({ layer, onUpdate }) => {
  if (!layer) {
    return (
      <div className="panel-cyber flex items-center gap-4 px-6">
        <span className="font-display text-sm text-foreground">Attributes:</span>
        <span className="text-muted-foreground text-sm">Select a layer to edit</span>
      </div>
    );
  }

  return (
    <div className="panel-cyber flex items-center gap-4 px-6 flex-wrap">
      <span className="font-display text-sm text-foreground">Attributes:</span>
      
      <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
        <Maximize2 size={14} className="text-primary" />
        <span className="text-xs text-muted-foreground">Width</span>
        <input
          type="number"
          value={layer.width}
          onChange={(e) => onUpdate(layer.id, { width: Number(e.target.value) })}
          className="w-16 bg-transparent text-foreground text-sm focus:outline-none"
        />
      </div>
      
      <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
        <Maximize2 size={14} className="text-primary rotate-90" />
        <span className="text-xs text-muted-foreground">Height</span>
        <input
          type="number"
          value={layer.height}
          onChange={(e) => onUpdate(layer.id, { height: Number(e.target.value) })}
          className="w-16 bg-transparent text-foreground text-sm focus:outline-none"
        />
      </div>
      
      <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
        <RotateCw size={14} className="text-primary" />
        <span className="text-xs text-muted-foreground">Rotate</span>
        <input
          type="number"
          value={layer.rotation}
          onChange={(e) => onUpdate(layer.id, { rotation: Number(e.target.value) })}
          className="w-16 bg-transparent text-foreground text-sm focus:outline-none"
        />
        <span className="text-muted-foreground">°</span>
      </div>
      
      <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2">
        <Move size={14} className="text-primary" />
        <span className="text-xs text-muted-foreground">Effects</span>
        <input
          type="range"
          min="50"
          max="150"
          value={layer.effects?.brightness || 100}
          onChange={(e) => onUpdate(layer.id, { 
            effects: { ...layer.effects, brightness: Number(e.target.value) } 
          })}
          className="w-16 accent-primary"
        />
      </div>
    </div>
  );
};
