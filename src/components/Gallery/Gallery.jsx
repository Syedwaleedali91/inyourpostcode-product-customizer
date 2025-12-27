import React, { useState, useRef } from 'react';
import { X, Upload, FolderPlus } from 'lucide-react';
import { CyberButton } from '../CyberButton/CyberButton';
import mascotArt from '@/assets/mascot-art.png';
import tigerArt from '@/assets/tiger-art.png';
import dragonArt from '@/assets/dragon-art.png';

const defaultImages = [
  mascotArt,
  tigerArt,
  dragonArt,
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=150&h=150&fit=crop',
];

export const Gallery = ({ isOpen, onClose, onSelect }) => {
  const [images, setImages] = useState(defaultImages);
  const inputRef = useRef(null);

  if (!isOpen) return null;

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [event.target?.result, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="panel-cyber w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-foreground">Art Gallery</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>
        
        <CyberButton variant="primary" className="w-full mb-4" icon={<Upload size={18} />} onClick={handleUploadClick}>
          Upload Image
        </CyberButton>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="mb-4">
          <h4 className="font-body text-foreground mb-2">My Folder</h4>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
            <FolderPlus size={16} />
            Create Folder
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <h4 className="font-body text-foreground mb-3">Images</h4>
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(img);
                  onClose();
                }}
                className="aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_hsl(142_76%_56%/0.4)] bg-card"
              >
                <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
