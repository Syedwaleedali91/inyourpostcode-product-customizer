import React from 'react';
import { X, ChevronUp, ChevronDown, Trash2, Image, Type, QrCode } from 'lucide-react';

export const LayersPanel = ({ 
  isOpen, 
  onClose, 
  layers, 
  selectedLayerId, 
  onSelect, 
  onMoveUp, 
  onMoveDown, 
  onRemove 
}) => {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'image': return <Image size={16} />;
      case 'text': return <Type size={16} />;
      case 'qrcode': return <QrCode size={16} />;
      default: return <Image size={16} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="panel-cyber w-full max-w-sm max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-foreground">Layers</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2">
          {layers.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No layers yet</p>
          ) : (
            [...layers].reverse().map((layer, index) => (
              <div
                key={layer.id}
                onClick={() => onSelect(layer.id)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedLayerId === layer.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <span className="text-primary">{getIcon(layer.type)}</span>
                <span className="flex-1 text-foreground font-body truncate">
                  {layer.type === 'text' ? layer.content : `${layer.type} ${layers.length - index}`}
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onMoveUp(layer.id); }}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onMoveDown(layer.id); }}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onRemove(layer.id); }}
                    className="p-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
