import React, { useState } from 'react';
import { X, Type } from 'lucide-react';
import { CyberButton } from '../CyberButton/CyberButton';

export const TextEditor = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#4ade80');

  if (!isOpen) return null;

  const handleAdd = () => {
    if (text.trim()) {
      onAdd({ text, fontSize, color });
      setText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="panel-cyber w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Type size={20} className="text-primary" />
            <h3 className="font-display text-lg text-foreground">Add Text</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Your Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your text here..."
              className="input-cyber w-full"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-muted-foreground mb-2">Font Size</label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min={12}
                max={72}
                className="input-cyber w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-muted-foreground mb-2">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer bg-input border border-border"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <CyberButton onClick={onClose} className="flex-1">
              Cancel
            </CyberButton>
            <CyberButton variant="primary" onClick={handleAdd} className="flex-1">
              Add Text
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );
};
